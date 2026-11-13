import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Sparkles,
  Printer,
  FileText,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { PosterContent, PosterFormat, PosterTheme } from '../types/poster';
import { getExportSafeImageUrl } from '../utils/imageValidation';
import { getExportPlan, getPosterDimensionMetrics, resolveBackgroundConfig } from '../utils/posterEngine';
import { GOOGLE_FONT_OPTIONS, loadStoredCustomFonts } from '../data/fonts';

interface ExportPanelProps {
  posterRef: React.RefObject<HTMLDivElement | null>;
  content: PosterContent;
  theme?: PosterTheme;
  format: PosterFormat;
  onChangeFormat?: (format: PosterFormat) => void;
  onUpdateCustomDimensions?: (widthPx: number, heightPx: number) => void;
  campusName?: string;
  defaultJpegFallbackColor?: string;
  onRecordExport?: (title: string, campusName: string, format: PosterFormat) => void;
}

export function ExportPanel({
  posterRef,
  content,
  format,
  onChangeFormat,
  onUpdateCustomDimensions,
  campusName = 'NFSU Gandhinagar',
  defaultJpegFallbackColor = '#FFFFFF',
  onRecordExport
}: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [jpegFallbackColor, setJpegFallbackColor] = useState(defaultJpegFallbackColor);
  const [showJpegPrompt, setShowJpegPrompt] = useState(false);

  const bg = resolveBackgroundConfig(content);
  const isTransparentMode = bg.mode === 'transparent' || bg.mode === 'none';
  const dim = getPosterDimensionMetrics(format, content.customWidthPx, content.customHeightPx);
  const pixelRatio = format === 'a4' ? 3.5 : 2.5;
  const printRatio = format === 'a4' ? 4.5 : 3.5;

  const collectEmbeddedFontCss = async (): Promise<string> => {
    const families = new Set<string>([
      content.fontFamily || 'Syne',
      content.hindiFontFamily || 'Noto Sans Devanagari',
      'JetBrains Mono',
      'Plus Jakarta Sans'
    ]);
    if (content.typographyMap) {
      Object.values(content.typographyMap).forEach((st) => {
        if (st?.fontFamily) families.add(st.fontFamily);
      });
    }

    const googleNames = Array.from(families).filter((f) =>
      GOOGLE_FONT_OPTIONS.some((opt) => opt.family === f)
    );

    let cssChunks = '';
    if (googleNames.length > 0) {
      try {
        const resp = await fetch(`/api/font-embed?families=${encodeURIComponent(googleNames.join(','))}`);
        if (resp.ok) {
          cssChunks += await resp.text();
        }
      } catch {
        // fallback cleanly to system fonts if server unreachable
      }
    }

    // Inline user uploaded custom fonts as @font-face
    const customFonts = loadStoredCustomFonts();
    for (const cf of customFonts) {
      if (families.has(cf.family)) {
        const fmt = cf.format === 'ttf' ? 'truetype' : cf.format === 'otf' ? 'opentype' : cf.format;
        cssChunks += `\n@font-face { font-family: "${cf.family}"; src: url("${cf.dataUrl}") format("${fmt}"); font-display: swap; }`;
      }
    }

    return cssChunks;
  };

  const triggerDownload = async (exportType: 'png' | 'png_transparent' | 'jpeg' | 'svg' | 'print') => {
    if (!posterRef.current) return;

    if (exportType === 'jpeg' && isTransparentMode && !showJpegPrompt) {
      setShowJpegPrompt(true);
      return;
    }

    const plan = getExportPlan(
      exportType === 'print' ? 'png' : exportType,
      bg.mode,
      jpegFallbackColor
    );

    setIsExporting(true);
    setExportMessage(`Rendering ${dim.widthPx}×${dim.heightPx} ${exportType.toUpperCase()}...`);

    const node = posterRef.current;
    const restoredImgs: { img: HTMLImageElement; originalSrc: string; originalCrossOrigin: string | null }[] = [];
    const prevNodeBg = node.style.backgroundColor;

    try {
      if (typeof document !== 'undefined' && 'fonts' in document) {
        await document.fonts.ready;
      }

      // Temporarily apply opaque fill on JPEG exports over transparent canvases
      if (exportType === 'jpeg' && isTransparentMode) {
        node.style.backgroundColor = plan.effectiveBackgroundColor || jpegFallbackColor;
      }

      const imgs = Array.from(node.querySelectorAll('img'));
      await Promise.all(
        imgs.map(async (img) => {
          const currentSrc = img.getAttribute('src') || '';
          if (!currentSrc) return;
          const safeSrc = getExportSafeImageUrl(currentSrc);
          if (safeSrc !== currentSrc) {
            restoredImgs.push({
              img,
              originalSrc: currentSrc,
              originalCrossOrigin: img.getAttribute('crossorigin')
            });
            img.removeAttribute('crossorigin');
            img.src = safeSrc;
          }
          if (!img.complete || img.naturalWidth === 0) {
            await new Promise<void>((resolve) => {
              const onDone = () => {
                img.removeEventListener('load', onDone);
                img.removeEventListener('error', onDone);
                resolve();
              };
              img.addEventListener('load', onDone);
              img.addEventListener('error', onDone);
              setTimeout(onDone, 4000);
            });
          }
        })
      );

      const fontEmbedCSS = await collectEmbeddedFontCss();

      let dataUrl = '';
      const cleanHeadline = content.headline.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 24);
      let filename = `GDG_NFSU_${cleanHeadline}_${content.style?.toUpperCase() || 'CYBER'}_${format.replace(':', 'x')}`;

      const commonOptions = {
        skipFonts: true,
        fontEmbedCSS: fontEmbedCSS || undefined,
        cacheBust: false,
        filter: (domNode: HTMLElement) => {
          if (domNode?.getAttribute?.('data-export-hide') === 'true') {
            return false;
          }
          return true;
        }
      };

      if (exportType === 'png' || exportType === 'png_transparent') {
        dataUrl = await toPng(node, {
          ...commonOptions,
          backgroundColor: exportType === 'png_transparent' || isTransparentMode ? undefined : '#050814',
          pixelRatio,
          quality: 1
        });
        filename += exportType === 'png_transparent' ? '_ALPHA.png' : '_DIGITAL.png';
      } else if (exportType === 'jpeg') {
        dataUrl = await toJpeg(node, {
          ...commonOptions,
          backgroundColor: plan.effectiveBackgroundColor || '#050811',
          pixelRatio,
          quality: 0.95
        });
        filename += '_IMAGE.jpg';
        setShowJpegPrompt(false);
      } else if (exportType === 'svg') {
        dataUrl = await toSvg(node, {
          ...commonOptions
        });
        filename += '_VECTOR.svg';
      } else if (exportType === 'print') {
        dataUrl = await toPng(node, {
          ...commonOptions,
          backgroundColor: isTransparentMode ? undefined : '#050814',
          pixelRatio: printRatio,
          quality: 1
        });
        filename += '_300DPI_PRINT.png';
      }

      if (dataUrl) {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
      }

      if (onRecordExport) {
        onRecordExport(content.headline, campusName, format);
      }

      setExportMessage(`${filename} downloaded successfully.`);
      setTimeout(() => setExportMessage(null), 3500);
    } catch (err) {
      console.error('Export error:', err);
      setExportMessage('Export failed due to an unreachable image or memory constraint. Check preflight audit and retry.');
      setTimeout(() => setExportMessage(null), 5000);
    } finally {
      node.style.backgroundColor = prevNodeBg;
      for (const entry of restoredImgs) {
        if (entry.originalCrossOrigin !== null) {
          entry.img.setAttribute('crossorigin', entry.originalCrossOrigin);
        }
        entry.img.src = entry.originalSrc;
      }
      setIsExporting(false);
    }
  };

  const copyCampaignCopy = () => {
    const text = `GOOGLE DEVELOPER GROUPS ON CAMPUS — ${campusName.toUpperCase()}
EVENT: ${content.headline}
CATEGORY: ${content.category.toUpperCase()} // ${content.kicker}
CAMPUS & VENUE: ${content.venue}
DATE & TIME: ${content.date} · ${content.time}

ABOUT:
${content.subtitle}
${content.description}

${content.registrationLink ? `REGISTRATION: ${content.registrationLink}\n` : ''}CALL TO ACTION: ${content.ctaText}
TAGS: ${content.socialHandle || '#GDGonNFSU'}`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="bg-[#090D15]/95 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-4 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block">
            PRODUCTION EXPORT ENGINE
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white">
            {dim.label} ({dim.widthPx} × {dim.heightPx} px)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
          BG: {bg.mode.toUpperCase()}
        </span>
      </div>

      {/* Format & Custom Dimensions */}
      {onChangeFormat && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
            {(
              [
                ['4:5', 'IG Portrait (4:5)'],
                ['1:1', 'IG Square (1:1)'],
                ['9:16', 'Story (9:16)'],
                ['whatsapp', 'WhatsApp Flyer'],
                ['a4', 'A4 Print'],
                ['custom', 'Custom Size']
              ] as [PosterFormat, string][]
            ).map(([fId, fLabel]) => (
              <button
                key={fId}
                type="button"
                onClick={() => onChangeFormat(fId)}
                className={`px-2.5 py-1 rounded border transition-colors ${
                  format === fId
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400 font-bold'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {fLabel}
              </button>
            ))}
          </div>

          {format === 'custom' && onUpdateCustomDimensions && (
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <label className="space-y-1">
                <span className="text-[10px] text-slate-400 block">Width (px)</span>
                <input
                  type="number"
                  min={320}
                  max={4096}
                  value={content.customWidthPx || 1080}
                  onChange={(e) =>
                    onUpdateCustomDimensions(Number(e.target.value), content.customHeightPx || 1350)
                  }
                  className="w-full bg-[#070B16] border border-slate-700 rounded px-2 py-1 text-white"
                />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] text-slate-400 block">Height (px)</span>
                <input
                  type="number"
                  min={320}
                  max={4096}
                  value={content.customHeightPx || 1350}
                  onChange={(e) =>
                    onUpdateCustomDimensions(content.customWidthPx || 1080, Number(e.target.value))
                  }
                  className="w-full bg-[#070B16] border border-slate-700 rounded px-2 py-1 text-white"
                />
              </label>
            </div>
          )}
        </div>
      )}

      {/* JPEG Fallback Prompt when Background is Transparent */}
      {isTransparentMode && showJpegPrompt && (
        <div className="p-3.5 rounded-xl border border-amber-500/50 bg-amber-950/25 space-y-2.5 text-xs">
          <div className="flex items-start gap-2 text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">JPEG Transparency Notice</span>
              <p className="text-slate-300 text-[11px] mt-0.5">
                JPEG cannot store an alpha channel. Choose a solid background fill color for this JPEG export, or cancel and export as Transparent PNG.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <label className="flex items-center gap-2 text-slate-200">
              <span>Fill Color:</span>
              <input
                type="color"
                aria-label="JPEG transparent fallback fill color"
                value={jpegFallbackColor}
                onChange={(e) => setJpegFallbackColor(e.target.value)}
                className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
              />
            </label>
            <button
              type="button"
              onClick={() => setJpegFallbackColor('#FFFFFF')}
              className="px-2 py-1 rounded bg-white text-black font-bold text-[10px]"
            >
              White (#FFFFFF)
            </button>
            <button
              type="button"
              onClick={() => setJpegFallbackColor('#050814')}
              className="px-2 py-1 rounded bg-[#050814] text-white border border-slate-700 text-[10px]"
            >
              Obsidian (#050814)
            </button>
            <button
              type="button"
              onClick={() => triggerDownload('jpeg')}
              className="px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] ml-auto"
            >
              Confirm JPEG Export
            </button>
          </div>
        </div>
      )}

      {/* Export Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => triggerDownload('png')}
          disabled={isExporting}
          className="flex items-center justify-between p-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs transition-colors shadow-lg disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <div className="text-left">
              <span className="font-bold block">Download PNG</span>
              <span className="text-[10px] text-sky-100 block">{dim.widthPx}×{dim.heightPx} px</span>
            </div>
          </div>
          <span className="text-[9px] font-mono bg-sky-700/80 px-1.5 py-0.5 rounded uppercase">PNG</span>
        </button>

        <button
          type="button"
          onClick={() => triggerDownload('png_transparent')}
          disabled={isExporting}
          className="flex items-center justify-between p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-white font-medium text-xs transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-400" />
            <div className="text-left">
              <span className="font-bold block">Transparent PNG</span>
              <span className="text-[10px] text-slate-300 block">Genuine alpha compositing</span>
            </div>
          </div>
          <span className="text-[9px] font-mono bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded uppercase">ALPHA</span>
        </button>

        <button
          type="button"
          onClick={() => triggerDownload('jpeg')}
          disabled={isExporting}
          className="flex items-center justify-between p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-medium text-xs transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <div className="text-left">
              <span className="font-bold block">Download JPEG</span>
              <span className="text-[10px] text-slate-400 block">
                {isTransparentMode ? 'Applies fallback fill color' : 'Web & Social compression'}
              </span>
            </div>
          </div>
          <span className="text-[9px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 uppercase">JPG</span>
        </button>

        <button
          type="button"
          onClick={() => triggerDownload('print')}
          disabled={isExporting}
          className="flex items-center justify-between p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-medium text-xs transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <span className="font-bold block">Ultra-HD 300 DPI</span>
              <span className="text-[10px] text-slate-400 block">High-density print master</span>
            </div>
          </div>
          <span className="text-[9px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 uppercase">4K+</span>
        </button>

        <button
          type="button"
          onClick={() => triggerDownload('svg')}
          disabled={isExporting}
          className="sm:col-span-2 flex items-center justify-between p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-medium text-xs transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <div className="text-left">
              <span className="font-bold block">Download Vector SVG</span>
              <span className="text-[10px] text-slate-400 block">Embedded fonts + scalable vector geometry</span>
            </div>
          </div>
          <span className="text-[9px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 uppercase">SVG</span>
        </button>
      </div>

      {/* Copy Announcement Text & Print Dialog */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={copyCampaignCopy}
          className="w-full sm:flex-1 p-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
        >
          {copiedText ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied Event Announcement!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Formatted Announcement Text</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto px-4 py-2 rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / PDF</span>
        </button>
      </div>

      {exportMessage && (
        <div className="p-2 text-xs font-mono text-center rounded bg-sky-950/50 border border-sky-800 text-sky-300 animate-in fade-in">
          {exportMessage}
        </div>
      )}
    </div>
  );
}
