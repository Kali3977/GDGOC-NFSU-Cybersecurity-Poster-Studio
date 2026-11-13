import React, { forwardRef } from 'react';
import { GDGBrackets, NFSUUniversityMark } from './OfficialLogos';
import {
  PosterFormat,
  PosterContent,
  PosterImageKey,
  CyberStyle,
  AccentColor,
  TextElementStyle,
  TypographyElementKey
} from '../types/poster';
import { CampusInfo, INITIAL_VERIFIED_CAMPUSES } from '../data/campuses';
import { QRCodeDisplay } from './QRCodeDisplay';
import { ShieldCheck, Calendar, Clock, MapPin, User, Award, Terminal as TerminalIcon } from 'lucide-react';
import { SmartPosterImage } from './SmartPosterImage';
import { POSTER_THEMES } from '../data/themesData';
import { buildFontFamilyStack } from '../data/fonts';
import {
  buildGradientString,
  getPosterDimensionMetrics,
  resolveBackgroundConfig,
  resolveHeroImageConfig
} from '../utils/posterEngine';

export interface PosterProps {
  content: PosterContent;
  format: PosterFormat;
  campuses?: CampusInfo[];
  selectedCampusOverride?: CampusInfo;
  currentCampus?: CampusInfo;
  activeImageKey?: PosterImageKey;
  showTransparentCheckerboard?: boolean;
  preferExportProxy?: boolean;
  forcedOpaqueBackgroundColor?: string;
}

const ACCENT_COLOR_MAP: Record<AccentColor, {
  hex: string;
  text: string;
  bg: string;
  border: string;
  glow: string;
  badge: string;
}> = {
  blue: {
    hex: '#38BDF8',
    text: 'text-sky-400',
    bg: 'bg-sky-400',
    border: 'border-sky-400/40',
    glow: 'shadow-[0_0_15px_rgba(56,189,248,0.3)]',
    badge: 'bg-sky-500/10 text-sky-300 border-sky-500/30'
  },
  green: {
    hex: '#10B981',
    text: 'text-emerald-400',
    bg: 'bg-emerald-400',
    border: 'border-emerald-400/40',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  },
  amber: {
    hex: '#F59E0B',
    text: 'text-amber-400',
    bg: 'bg-amber-400',
    border: 'border-amber-400/40',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  red: {
    hex: '#EF4444',
    text: 'text-rose-400',
    bg: 'bg-rose-400',
    border: 'border-rose-400/40',
    glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  },
  purple: {
    hex: '#A855F7',
    text: 'text-purple-400',
    bg: 'bg-purple-400',
    border: 'border-purple-400/40',
    glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  },
  titanium: {
    hex: '#E2E8F0',
    text: 'text-slate-200',
    bg: 'bg-slate-200',
    border: 'border-slate-400/30',
    glow: 'shadow-[0_0_15px_rgba(226,232,240,0.2)]',
    badge: 'bg-slate-500/10 text-slate-200 border-slate-500/30'
  }
};

function getTextShadowCss(shadow?: TextElementStyle['shadow'], accentHex = '#38BDF8'): string | undefined {
  if (!shadow || shadow === 'none') return undefined;
  if (shadow === 'soft') return '0 2px 10px rgba(0,0,0,0.75)';
  if (shadow === 'neon') return `0 0 12px ${accentHex}AA, 0 0 24px ${accentHex}55`;
  if (shadow === 'hard') return '2px 2px 0px rgba(0,0,0,0.95)';
  return undefined;
}

function buildElementTypographyCss(
  content: PosterContent,
  key: TypographyElementKey,
  accentHex: string,
  baseFont?: string
): React.CSSProperties {
  const s = content.typographyMap?.[key];
  const hindiFont = content.hindiFontFamily || 'Noto Sans Devanagari';
  const family = s?.fontFamily || baseFont;

  const css: React.CSSProperties = {};
  if (family || content.hindiFontFamily) {
    css.fontFamily = buildFontFamilyStack(family || content.fontFamily || 'Syne', hindiFont);
  }
  if (!s) return css;

  if (s.fontSizePx) css.fontSize = `${s.fontSizePx}px`;
  else if (s.fontScale && s.fontScale !== 1) css.fontSize = `${s.fontScale}em`;
  if (s.bold) css.fontWeight = 800;
  else if (s.fontWeight) css.fontWeight = s.fontWeight;
  if (s.italic) css.fontStyle = 'italic';
  if (s.underline) css.textDecoration = 'underline';
  if (s.align) css.textAlign = s.align;
  if (s.letterSpacing !== undefined) css.letterSpacing = `${s.letterSpacing}em`;
  if (s.wordSpacing !== undefined) css.wordSpacing = `${s.wordSpacing}em`;
  if (s.lineHeight !== undefined) css.lineHeight = s.lineHeight;
  if (s.textTransform) css.textTransform = s.textTransform;
  if (s.color) css.color = s.color;
  if (s.opacity !== undefined) css.opacity = s.opacity / 100;
  if (s.strokeWidth && s.strokeWidth > 0) {
    css.WebkitTextStroke = `${s.strokeWidth}px ${s.strokeColor || '#000000'}`;
  }
  const shadowCss = getTextShadowCss(s.shadow, accentHex);
  if (shadowCss) css.textShadow = shadowCss;
  if (s.backgroundColor) {
    css.backgroundColor = s.backgroundColor;
    css.padding = '2px 6px';
    css.borderRadius = '3px';
    css.display = 'inline-block';
  }
  if (s.rotation) {
    css.transform = `rotate(${s.rotation}deg)`;
    css.display = 'inline-block';
  }
  return css;
}

export const PosterCanvas = forwardRef<HTMLDivElement, PosterProps>(function PosterCanvas(
  {
    content,
    format,
    campuses = INITIAL_VERIFIED_CAMPUSES,
    selectedCampusOverride,
    currentCampus: propsCampus,
    activeImageKey,
    showTransparentCheckerboard = false,
    preferExportProxy = false,
    forcedOpaqueBackgroundColor
  },
  ref
) {
  const currentCampus =
    selectedCampusOverride ||
    propsCampus ||
    campuses.find((c) => c.id === content.campusId) ||
    INITIAL_VERIFIED_CAMPUSES[0];

  const accent = ACCENT_COLOR_MAP[content.accentColor || 'blue'];
  const activeTheme = content.themeId ? POSTER_THEMES.find((t) => t.id === content.themeId) : undefined;
  const style: CyberStyle = (activeTheme?.cyberStyle || content.style || 'cyberpunk') as CyberStyle;
  const accentHex = activeTheme?.palette?.accentHex || accent.hex;
  const textAlign = content.textAlign || 'left';

  // Decoupled Background & Hero Image resolution
  const bg = resolveBackgroundConfig(content);
  const heroContent = activeImageKey
    ? { ...content, imageKey: activeImageKey, customImageUrl: activeImageKey === 'custom' ? content.customImageUrl : undefined }
    : content;
  const hero = resolveHeroImageConfig(heroContent);

  const isTransparentMode = bg.mode === 'transparent' || bg.mode === 'none';

  // Dimension metrics
  const dim = getPosterDimensionMetrics(format, content.customWidthPx, content.customHeightPx);
  const maxWidthClass =
    format === '9:16'
      ? 'max-w-[440px]'
      : format === '1:1'
      ? 'max-w-[560px]'
      : 'max-w-[600px]';

  const isTerminal = style === 'terminal';
  const isCyberpunk = style === 'cyberpunk';
  const isEditorial = style === 'editorial';
  const isSecurity = style === 'security_interface';
  const isConference = style === 'tech_conference';
  const isCorporate = style === 'corporate';
  const isBoldType = style === 'bold_type';

  const displayTracks =
    content.tracks && content.tracks.length > 0
      ? content.tracks
      : [
          { title: content.pillar1Title || 'Reverse Engineering', desc: content.pillar1Desc || 'Binary exploitation & memory analysis' },
          { title: content.pillar2Title || 'Forensic Telemetry', desc: content.pillar2Desc || 'Packet capture & artifact triage' },
          { title: content.pillar3Title || 'Sovereign Hardening', desc: content.pillar3Desc || 'Kernel level exploit mitigations' },
          { title: content.pillar4Title || 'Community & Mentorship', desc: content.pillar4Desc || 'Peer cohorts & technical guidance' }
        ].slice(0, 4);

  // Background inline CSS computed strictly from BackgroundConfig
  const bgContainerStyle: React.CSSProperties = {
    aspectRatio: dim.aspectRatio,
    fontFamily: buildFontFamilyStack(content.fontFamily || 'Syne', content.hindiFontFamily || 'Noto Sans Devanagari')
  };

  if (forcedOpaqueBackgroundColor) {
    bgContainerStyle.backgroundColor = forcedOpaqueBackgroundColor;
  } else if (isTransparentMode) {
    bgContainerStyle.backgroundColor = 'transparent';
    bgContainerStyle.background = 'transparent';
  } else if (bg.mode === 'solid') {
    bgContainerStyle.backgroundColor = bg.solidColor || '#050814';
  } else if (bg.mode === 'gradient' || bg.mode === 'preset') {
    bgContainerStyle.backgroundColor = bg.solidColor || '#050814';
  } else if (bg.mode === 'pattern' || bg.mode === 'image') {
    bgContainerStyle.backgroundColor = bg.solidColor || '#050814';
  }

  const effectivePattern =
    bg.mode === 'transparent' || bg.mode === 'none'
      ? 'none'
      : bg.patternId !== 'none'
      ? bg.patternId
      : activeTheme?.decorative?.pattern || (isTerminal ? 'terminal-scanline' : 'none');

  const kickerPrefix = activeTheme?.decorative?.kickerPrefix || '';
  const telemetryBannerText =
    activeTheme?.decorative?.telemetryText ||
    (isSecurity ? 'SEC_DEFENSE: LEVEL_01 · SOC_TELEMETRY: ACTIVE · NFSU_CYBER_ENCLAVE' : '');

  const cardSurfaceClass =
    activeTheme?.palette?.cardBg ||
    (isEditorial || isCorporate
      ? 'bg-white/[0.04]'
      : isTerminal
      ? 'bg-black/60 border-emerald-500/35'
      : isBoldType
      ? 'bg-white/[0.05] border-2 border-white/25'
      : 'bg-white/[0.04]');

  const trackGridClass =
    isEditorial || isCorporate || isConference
      ? 'grid-cols-2 gap-2.5'
      : isTerminal
      ? 'grid-cols-1 sm:grid-cols-2 gap-1.5'
      : 'grid-cols-2 sm:grid-cols-4 gap-2';

  const heroShadowCss = {
    none: undefined,
    soft: '0 14px 32px rgba(0,0,0,0.65)',
    glow: `0 0 28px ${accentHex}44, 0 12px 28px rgba(0,0,0,0.7)`,
    hard: '6px 6px 0px rgba(0,0,0,0.9)'
  }[hero.shadow || 'glow'];

  // Brand Slots
  const gdgEnabled = content.brandSlots?.gdgEnabled ?? true;
  const gdgVariant = content.brandSlots?.gdgVariant || (isTerminal ? 'white' : 'color');
  const nfsuEnabled = content.brandSlots?.nfsuEnabled ?? true;
  const nfsuLogoUrl = content.brandSlots?.nfsuLogoUrl || content.customLogoUrl;
  const eventLogoUrl = content.brandSlots?.eventLogoUrl;
  const campusBadgeEnabled = content.brandSlots?.campusBadgeEnabled ?? true;

  // Decorative foreground overlays added via Image Library ("Add as Decoration") or Elements Studio
  const foregroundDecorations = (content.elements || []).filter(
    (el) => !el.hidden && (el.type === 'svg_graphic' || el.id.startsWith('el_decor'))
  );

  const canvasNode = (
    <div
      ref={ref}
      id="signal-poster-canvas"
      data-theme-id={activeTheme?.id || style}
      data-bg-mode={bg.mode}
      className={`relative w-full ${maxWidthClass} mx-auto select-none overflow-hidden transition-all duration-200 text-slate-100 ${
        isTransparentMode
          ? 'border border-dashed border-cyan-500/30'
          : activeTheme?.palette?.border || 'border border-white/15'
      } ${isEditorial || isTerminal || isBoldType ? 'rounded-none' : 'rounded-sm'}`}
      style={{
        ...bgContainerStyle,
        boxShadow: isTransparentMode
          ? undefined
          : '0 25px 70px -15px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* ========================================================= */}
      {/* LAYER 1: INDEPENDENT BACKGROUND STUDIO RENDERING          */}
      {/* ========================================================= */}
      {!isTransparentMode && (bg.mode === 'gradient' || bg.mode === 'preset') && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: buildGradientString(bg),
            opacity: (bg.gradientOpacity ?? 100) / 100
          }}
        />
      )}

      {/* Background Image (Strictly separate from Hero Image) */}
      {!isTransparentMode && bg.mode === 'image' && bg.imageUrl && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          style={{
            opacity: (bg.imageOpacity ?? 100) / 100,
            transform:
              bg.imageFit === 'custom'
                ? `scale(${(bg.imageZoom ?? 100) / 100}) translate(${bg.imageOffsetX ?? 0}%, ${bg.imageOffsetY ?? 0}%)`
                : undefined
          }}
        >
          <SmartPosterImage
            src={bg.imageUrl}
            alt="Background Layer"
            fit={bg.imageFit === 'stretch' ? 'fill' : bg.imageFit === 'contain' ? 'contain' : 'cover'}
            brightness={bg.imageBrightness ?? 100}
            contrast={bg.imageContrast ?? 100}
            saturation={bg.imageSaturation ?? 100}
            hue={bg.imageHue ?? 0}
            blur={bg.imageBlur ?? 0}
            className="w-full h-full"
            styleContext={style}
            isBackdrop={true}
            preferProxy={preferExportProxy}
          />
        </div>
      )}

      {/* Pattern Overlay (from Background Studio or Active Theme) */}
      {!isTransparentMode && (effectivePattern !== 'none' || bg.effects.grid || bg.effects.matrix || bg.effects.circuit || bg.effects.network || bg.effects.particles || bg.effects.geometricLines) && (
        <div
          className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
          style={{ opacity: (bg.patternOpacity ?? 55) / 100 }}
          aria-hidden="true"
        >
          {(effectivePattern === 'circuit-board' || bg.effects.circuit) && (
            <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pat-circuit" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M0 15 H20 L28 23 H50 M15 0 V20 L23 28 V60 M40 0 V15 L48 23 H60" fill="none" stroke={bg.patternColor || accentHex} strokeWidth="1" />
                  <circle cx="20" cy="15" r="2" fill={bg.patternColor || accentHex} />
                  <circle cx="50" cy="23" r="2" fill={bg.patternColor || accentHex} />
                  <circle cx="23" cy="28" r="2" fill={bg.patternColor || accentHex} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pat-circuit)" />
            </svg>
          )}
          {(effectivePattern === 'network-diagram' || bg.effects.network) && (
            <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pat-net" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M10 15 L45 35 L70 15 M45 35 L25 70 M45 35 L72 65" fill="none" stroke={bg.patternColor || accentHex} strokeWidth="0.9" strokeDasharray="3 2" />
                  <circle cx="10" cy="15" r="2.2" fill={bg.patternColor || accentHex} />
                  <circle cx="45" cy="35" r="2.8" fill={bg.patternColor || accentHex} />
                  <circle cx="70" cy="15" r="2.2" fill={bg.patternColor || accentHex} />
                  <circle cx="25" cy="70" r="2" fill={bg.patternColor || accentHex} />
                  <circle cx="72" cy="65" r="2" fill={bg.patternColor || accentHex} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pat-net)" />
            </svg>
          )}
          {(effectivePattern === 'particles' || bg.effects.particles) && (
            <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pat-particles" width="70" height="70" patternUnits="userSpaceOnUse">
                  <circle cx="12" cy="14" r="1.4" fill={bg.patternColor || accentHex} />
                  <circle cx="46" cy="22" r="0.9" fill="#ffffff" />
                  <circle cx="28" cy="54" r="1.6" fill={bg.patternColor || accentHex} />
                  <circle cx="62" cy="48" r="1" fill="#ffffff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pat-particles)" />
            </svg>
          )}
          {(effectivePattern === 'isometric-cubes' || bg.effects.geometricLines) && (
            <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pat-iso" width="48" height="42" patternUnits="userSpaceOnUse">
                  <path d="M24 0 L48 14 V28 L24 42 L0 28 V14 Z M24 0 V42 M0 14 L24 28 L48 14" fill="none" stroke={bg.patternColor || accentHex} strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pat-iso)" />
            </svg>
          )}
          {effectivePattern === 'hex-mesh' && (
            <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pat-hex" width="40" height="35" patternUnits="userSpaceOnUse">
                  <polygon points="20,1 39,10 39,25 20,34 1,25 1,10" fill="none" stroke={bg.patternColor || accentHex} strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pat-hex)" />
            </svg>
          )}
          {effectivePattern === 'radar-hud' && (
            <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
              <circle cx="200" cy="250" r="90" fill="none" stroke={bg.patternColor || accentHex} strokeWidth="0.8" strokeDasharray="4 4" />
              <circle cx="200" cy="250" r="160" fill="none" stroke={bg.patternColor || accentHex} strokeWidth="0.7" />
              <circle cx="200" cy="250" r="220" fill="none" stroke={bg.patternColor || accentHex} strokeWidth="0.5" strokeDasharray="2 6" />
              <line x1="200" y1="20" x2="200" y2="480" stroke={bg.patternColor || accentHex} strokeWidth="0.5" />
              <line x1="20" y1="250" x2="380" y2="250" stroke={bg.patternColor || accentHex} strokeWidth="0.5" />
            </svg>
          )}
          {effectivePattern === 'swiss-cross' && (
            <svg className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pat-swiss" width="44" height="44" patternUnits="userSpaceOnUse">
                  <path d="M22 17 V27 M17 22 H27" stroke="#ffffff" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pat-swiss)" />
            </svg>
          )}
          {effectivePattern === 'terminal-scanline' && (
            <div
              className="w-full h-full opacity-25"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${accentHex}22 3px, ${accentHex}22 4px)`
              }}
            />
          )}
          {effectivePattern === 'mesh-dots' && (
            <div
              className="w-full h-full opacity-30"
              style={{
                backgroundImage: `radial-gradient(${bg.patternColor || accentHex} 1.1px, transparent 1.1px)`,
                backgroundSize: '18px 18px'
              }}
            />
          )}
          {(effectivePattern === 'subtle-grid' || bg.effects.grid) && (
            <div className="w-full h-full opacity-35 subtle-grid" />
          )}
          {(effectivePattern === 'matrix-rain' || bg.effects.matrix) && (
            <div
              className="w-full h-full opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(0,255,102,0.12) 18px, rgba(0,255,102,0.12) 19px)`
              }}
            />
          )}
        </div>
      )}

      {/* Soft Glow / Radial Light Background Effects */}
      {!isTransparentMode && (bg.effects.glow || bg.effects.radialLight) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at 75% 22%, ${accentHex}28 0%, transparent 55%), radial-gradient(circle at 20% 82%, ${accentHex}18 0%, transparent 45%)`
          }}
        />
      )}

      {/* Background Scrim & Vignette (skipped for transparent/none modes) */}
      {!isTransparentMode && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-200"
            style={{
              backgroundColor: bg.overlayColor || '#050814',
              opacity: (bg.overlayOpacity ?? 45) / 100
            }}
          />
          {bg.vignette > 0 && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-15"
              style={{
                background: `radial-gradient(circle, transparent 45%, rgba(0,0,0,${bg.vignette / 100}) 100%)`
              }}
            />
          )}
        </>
      )}

      {/* Noise / Film Grain Texture */}
      {!isTransparentMode && (content.showFilmGrain || bg.noiseIntensity > 0) && (
        <div
          className="absolute inset-0 pointer-events-none z-25 film-grain mix-blend-overlay"
          style={{ opacity: Math.max(content.showFilmGrain ? 0.35 : 0, (bg.noiseIntensity || 0) / 100) }}
          aria-hidden="true"
        />
      )}

      {/* Safe Print Margins Overlay */}
      {content.showSafeMargins && (
        <div
          data-export-hide="true"
          className="absolute inset-[10%] border-2 border-dashed border-amber-400/50 pointer-events-none z-40 rounded flex items-start justify-end p-1.5"
          aria-hidden="true"
        >
          <span className="text-[7.5px] font-mono text-amber-300 bg-black/75 px-1 rounded uppercase tracking-wider">
            SAFE PRINT MARGIN (10%)
          </span>
        </div>
      )}

      {/* Grid Guidelines Overlay */}
      {content.showGridSnap && (
        <div data-export-hide="true" className="absolute inset-0 pointer-events-none z-30 subtle-grid opacity-25" aria-hidden="true" />
      )}

      {/* Swiss Crop / Registration Marks */}
      {(content.showCropMarks || activeTheme?.decorative?.showCornerMarks) && !isTransparentMode && (
        <div className="absolute inset-0 pointer-events-none z-30" aria-hidden="true">
          <div className="absolute top-2 left-2 flex gap-1">
            <span className="w-2.5 h-[1px] block bg-white/45"></span>
            <span className="h-2.5 w-[1px] block bg-white/45"></span>
          </div>
          <div className="absolute top-2 right-2 flex justify-end gap-1">
            <span className="h-2.5 w-[1px] block bg-white/45"></span>
            <span className="w-2.5 h-[1px] block bg-white/45"></span>
          </div>
          <div className="absolute bottom-2 left-2 flex items-end gap-1">
            <span className="w-2.5 h-[1px] block bg-white/45"></span>
            <span className="h-2.5 w-[1px] block bg-white/45"></span>
          </div>
          <div className="absolute bottom-2 right-2 flex items-end justify-end gap-1">
            <span className="h-2.5 w-[1px] block bg-white/45"></span>
            <span className="w-2.5 h-[1px] block bg-white/45"></span>
          </div>
        </div>
      )}

      {/* Security / Theme Telemetry Bar */}
      {(isSecurity || activeTheme?.decorative?.showTelemetryBar) && telemetryBannerText && (
        <div
          className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[7.5px] font-mono uppercase tracking-widest pointer-events-none whitespace-nowrap opacity-85"
          style={{ color: accentHex }}
        >
          <span>{telemetryBannerText}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* DECORATIVE FOREGROUND ELEMENTS (SVG / Decor Images)       */}
      {/* ========================================================= */}
      {foregroundDecorations.map((el) => (
        <div
          key={el.id}
          className="absolute pointer-events-none"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.width}%`,
            height: el.height ? `${el.height}%` : undefined,
            transform: `rotate(${el.rotation || 0}deg)`,
            opacity: (el.opacity ?? 90) / 100,
            zIndex: Math.max(22, Math.min(35, el.zIndex || 25))
          }}
        >
          {el.type === 'svg_graphic' && el.svgInner ? (
            <svg
              viewBox={el.svgViewBox || '0 0 100 100'}
              className="w-full h-full drop-shadow-md"
              style={{ color: el.fillColor || accentHex }}
              dangerouslySetInnerHTML={{ __html: el.svgInner }}
            />
          ) : el.type === 'image' && el.src ? (
            <SmartPosterImage
              src={el.src}
              alt={el.label}
              fit={el.fit || 'cover'}
              borderRadius={el.borderRadius ?? 8}
              borderWidth={el.borderWidth ?? 1}
              borderColor={el.borderColor || accentHex}
              maskShape={el.maskShape || 'rounded'}
              className="w-full h-full shadow-lg"
              preferProxy={preferExportProxy}
            />
          ) : null}
        </div>
      ))}

      {/* ========================================================= */}
      {/* POSTER INNER CONTENT CANVAS                               */}
      {/* ========================================================= */}
      <div className="relative w-full h-full p-4 sm:p-6 flex flex-col justify-between z-20">
        {/* 1. TOP BRAND HEADER ROW */}
        <header
          className={`flex items-start justify-between border-b pb-2.5 sm:pb-3 ${
            isBoldType ? 'border-white/30' : 'border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            {gdgEnabled && (
              <GDGBrackets
                className="w-7 h-7 sm:w-8 sm:h-8 shrink-0"
                variant={gdgVariant}
              />
            )}
            {eventLogoUrl && (
              <img
                src={eventLogoUrl}
                alt="Event Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded border border-white/20 bg-black/30 p-0.5 shrink-0"
              />
            )}
            <div className="flex flex-col text-left">
              {isTerminal && (
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[7.5px] font-mono text-emerald-400/80 ml-1">tty1 // nfsu-sec</span>
                </div>
              )}
              <span
                className="text-[11px] sm:text-[12.5px] font-bold tracking-tight uppercase font-sans text-white"
                style={buildElementTypographyCss(content, 'campusInfo', accentHex)}
              >
                {content.organizerName || 'Google Developer Groups on Campus'}
              </span>
              {campusBadgeEnabled && (
                <div className="text-[9px] sm:text-[10px] tracking-wider font-mono flex items-center gap-1.5 text-stone-300">
                  <span className="text-white font-semibold flex items-center gap-1">
                    {currentCampus.name}
                    {currentCampus.isVerified ? (
                      <span title="Officially Verified Cybersecurity Campus" className="inline-flex text-emerald-400 text-[10px]">
                        ✓
                      </span>
                    ) : (
                      <span className="text-[8px] text-amber-400 border border-amber-500/30 px-1 rounded-sm">
                        Unverified
                      </span>
                    )}
                  </span>
                  <span className="opacity-40">/</span>
                  <span className={accent.text}>{content.date || '2026 COHORT'}</span>
                </div>
              )}
            </div>
          </div>

          {nfsuEnabled && (
            <div className="text-right flex items-center justify-end">
              <NFSUUniversityMark
                className="scale-90 sm:scale-100 origin-right"
                campusName={currentCampus.name}
                customLogoUrl={nfsuLogoUrl}
              />
            </div>
          )}
        </header>

        {/* 2. MAIN POSTER CONTENT BODY */}
        <div className={`my-auto py-2 flex flex-col gap-2 sm:gap-2.5 ${textAlign === 'center' ? 'text-center' : 'text-left'}`}>
          {/* Kicker & Campus Indicator */}
          <div className="flex items-baseline justify-between text-[9px] sm:text-[10px] font-mono">
            {isTerminal ? (
              <div
                className="flex items-center gap-1 text-emerald-400"
                style={buildElementTypographyCss(content, 'kicker', accentHex, 'JetBrains Mono')}
              >
                <TerminalIcon className="w-3 h-3" />
                <span>{kickerPrefix}root@nfsu-{currentCampus.city.toLowerCase()}:~# ./run_defense</span>
              </div>
            ) : (
              <span
                className={`uppercase tracking-[0.2em] font-semibold ${isSecurity ? 'text-cyan-400' : accent.text}`}
                style={buildElementTypographyCss(content, 'kicker', accentHex, 'JetBrains Mono')}
              >
                {kickerPrefix}{content.kicker}
              </span>
            )}

            <span className="text-stone-300 tracking-wider truncate max-w-[180px] sm:max-w-none">
              CAMPUS: {currentCampus.city.toUpperCase()}
            </span>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="space-y-1">
            <h1
              className={`text-[22px] sm:text-[31px] leading-[0.96] text-white ${
                activeTheme?.typography?.headlineWeight || 'font-black'
              } ${activeTheme?.typography?.headlineTracking || 'tracking-tight'} ${
                activeTheme ? (activeTheme.typography.isUppercase ? 'uppercase' : '') : 'uppercase'
              }`}
              style={buildElementTypographyCss(content, 'headline', accentHex, content.fontFamily || 'Syne')}
            >
              {content.headline}
              <span style={{ color: accentHex }}>.</span>
            </h1>

            <p
              className="text-[11px] sm:text-[12.5px] font-medium tracking-tight leading-snug text-slate-200 max-w-[95%]"
              style={buildElementTypographyCss(content, 'subtitle', accentHex, 'Plus Jakarta Sans')}
            >
              {content.subtitle}
            </p>
          </div>

          {/* INDEPENDENT FOREGROUND HERO IMAGE SLOT */}
          {hero.enabled && hero.src ? (
            <div
              className={`relative w-full aspect-[16/7.5] sm:aspect-[2.2/1] overflow-hidden group ${
                isEditorial || isTerminal || isBoldType ? 'rounded-none' : 'rounded-sm'
              }`}
              style={{
                borderWidth: `${hero.borderWidth ?? 1}px`,
                borderStyle: 'solid',
                borderColor: hero.borderColor || 'rgba(255,255,255,0.16)',
                borderRadius: hero.maskShape === 'rounded' ? `${hero.borderRadius ?? 8}px` : undefined,
                boxShadow: heroShadowCss
              }}
            >
              <SmartPosterImage
                src={hero.src}
                alt={hero.alt || content.headline}
                fit={hero.fit}
                filter={hero.filter}
                zoom={hero.zoom}
                focalX={hero.focalX}
                focalY={hero.focalY}
                rotation={hero.rotation}
                opacity={hero.opacity}
                brightness={hero.brightness}
                contrast={hero.contrast}
                saturation={hero.saturation}
                hue={hero.hue}
                blur={hero.blur}
                maskShape={hero.maskShape}
                className="w-full h-full"
                styleContext={style}
                preferProxy={preferExportProxy}
              />
              <div
                className={`absolute inset-0 pointer-events-none ${
                  isTerminal
                    ? 'bg-gradient-to-t from-[#030708]/90 via-transparent to-transparent'
                    : isCyberpunk
                    ? 'bg-gradient-to-t from-[#050811]/90 via-transparent to-transparent'
                    : 'bg-gradient-to-t from-black/80 via-black/15 to-transparent'
                }`}
              />

              {/* Manifesto & Verification Stamp */}
              <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between pointer-events-none z-10">
                <p
                  className="text-[10.5px] sm:text-[12px] font-serif italic max-w-[70%] leading-tight text-white/95"
                  style={buildElementTypographyCss(content, 'manifesto', accentHex)}
                >
                  "{content.foundingManifesto}"
                </p>
                <div className="text-right">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-stone-200 block">
                    {currentCampus.isVerified ? 'NFSU VERIFIED' : 'CUSTOM CHAPTER'}
                  </span>
                  <span className={`text-[7.5px] font-mono ${accent.text}`}>
                    {currentCampus.state.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-3 border border-white/10 ${cardSurfaceClass} flex flex-col justify-between`}>
              <div className="flex justify-between text-[8px] font-mono text-stone-400">
                <span>0x7F // NFSU_CYBER_ENCLAVE</span>
                <span>SHA-256: 4F2A9...</span>
              </div>
              <p
                className="text-[11px] font-serif italic text-center text-stone-200 py-3"
                style={buildElementTypographyCss(content, 'manifesto', accentHex)}
              >
                "{content.foundingManifesto}"
              </p>
            </div>
          )}

          {/* Operational Tagline Cycle */}
          <div className="flex items-center justify-between border-y border-white/10 py-1 text-[9.5px] sm:text-[11px] font-mono">
            <span
              className="font-semibold text-stone-200 tracking-wider"
              style={buildElementTypographyCss(content, 'cycleTagline', accentHex)}
            >
              {content.cycleTagline}
            </span>
            <span className={`uppercase tracking-widest font-bold ${accent.text}`}>
              [ {currentCampus.isVerified ? 'VERIFIED CYBER PROGRAMME' : 'COMMUNITY CAMPUS'} ]
            </span>
          </div>

          {/* KEYNOTE SPEAKER CARD */}
          {content.showSpeaker && content.speakerName && (
            <div className={`p-2 sm:p-2.5 border border-white/10 ${cardSurfaceClass} flex items-center justify-between gap-3 text-left`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border border-sky-400/40 bg-sky-950 flex items-center justify-center shrink-0 overflow-hidden">
                  {content.speakerPhotoUrl ? (
                    <img
                      src={content.speakerPhotoUrl}
                      alt={content.speakerName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <User className="w-4 h-4 text-sky-300" />
                  )}
                </div>
                <div>
                  <div className="text-[8px] font-mono text-stone-300 uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-amber-400" /> KEYNOTE SPEAKER
                  </div>
                  <div
                    className="text-[11px] font-bold text-white leading-tight"
                    style={buildElementTypographyCss(content, 'speakerName', accentHex)}
                  >
                    {content.speakerName}
                  </div>
                  <div
                    className="text-[9px] text-stone-300 leading-tight"
                    style={buildElementTypographyCss(content, 'speakerDesignation', accentHex)}
                  >
                    {content.speakerDesignation}
                  </div>
                </div>
              </div>
              {content.registrationDeadline && (
                <div className="text-right text-[8px] font-mono text-stone-300 shrink-0">
                  <span className="block text-amber-400 font-bold uppercase">RSVP BY</span>
                  <span>{content.registrationDeadline}</span>
                </div>
              )}
            </div>
          )}

          {/* 4 CORE TRACKS */}
          {content.showTracks && (
            <div className={`grid ${trackGridClass} pt-0.5 text-left`}>
              {displayTracks.map((tr, idx) => (
                <div
                  key={idx}
                  className={
                    isTerminal
                      ? 'border border-emerald-500/25 bg-black/40 p-1.5'
                      : isBoldType
                      ? 'border-l-2 border-white/50 pl-2 pt-0.5'
                      : 'border-t border-white/15 pt-1'
                  }
                >
                  <span className={`text-[8px] font-mono block ${isTerminal ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {isTerminal ? `[0${idx + 1}]` : `0${idx + 1} / TRACK`}
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-bold block mt-0.5 text-white leading-tight"
                    style={buildElementTypographyCss(content, 'tracksTitle', accentHex)}
                  >
                    {tr.title}
                  </span>
                  <p className="text-[8px] mt-0.5 leading-snug text-stone-300">{tr.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Event Logistics Info Strip */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[8.5px] sm:text-[9.5px] font-mono text-stone-200 p-1.5 border border-white/10 text-left ${cardSurfaceClass}`}>
            <div className="flex items-center gap-1 truncate" style={buildElementTypographyCss(content, 'dateTime', accentHex)}>
              <Calendar className="w-3 h-3 text-sky-400 shrink-0" />
              <span className="truncate">{content.date}</span>
            </div>
            <div className="flex items-center gap-1 truncate" style={buildElementTypographyCss(content, 'dateTime', accentHex)}>
              <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{content.time}</span>
            </div>
            <div className="flex items-center gap-1 truncate" style={buildElementTypographyCss(content, 'venue', accentHex)}>
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">{content.venue || currentCampus.defaultVenue}</span>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM CALL TO ACTION & REGISTRATION STRIP */}
        <footer className="border-t border-white/15 pt-2 space-y-2 text-left">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-[11px] sm:text-[12.5px] font-bold tracking-tight uppercase font-sans text-white"
                style={buildElementTypographyCss(content, 'cta', accentHex)}
              >
                {content.ctaText}
              </p>
              <p
                className="text-[9px] sm:text-[10px] font-mono text-stone-300"
                style={buildElementTypographyCss(content, 'footer', accentHex)}
              >
                {content.subCtaText}
              </p>
            </div>

            <div className="text-right">
              <span className={`text-[11px] sm:text-[13px] font-mono font-bold tracking-wider ${accent.text}`}>
                {content.socialHandle || content.hashtag || '#GDGonNFSU'}
              </span>
              <span className="text-[7.5px] font-mono block tracking-widest uppercase text-stone-400">
                OFFICIAL COMMUNITY TAG
              </span>
            </div>
          </div>

          <div className={`border border-dashed border-white/20 p-2 flex items-center justify-between ${cardSurfaceClass}`}>
            <div className="flex items-center gap-2.5">
              {content.showQrCode && (
                <div className="shrink-0">
                  <QRCodeDisplay
                    value={content.qrDestination || content.registrationLink}
                    size={52}
                    contrastMode={content.qrContrastMode || 'dark_on_light'}
                    showPlaceholderIfEmpty={true}
                  />
                </div>
              )}

              <div>
                <span
                  className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-stone-100 flex items-center gap-1"
                  style={buildElementTypographyCss(content, 'registration', accentHex)}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {currentCampus.name} Registration & Passes
                </span>
                <span className="text-[8px] font-mono block text-stone-300">
                  {content.registrationLink ? (
                    <span className="text-sky-300 font-semibold">{content.registrationLink}</span>
                  ) : (
                    <span>{content.reservedNotice || 'Official registration link & attendee pass verified at entry'}</span>
                  )}
                </span>
                {content.contactDetails && (
                  <span className="text-[7.5px] font-mono text-stone-400 block mt-0.5">
                    Contact: {content.contactDetails}
                  </span>
                )}
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end text-[7.5px] font-mono text-stone-400 tracking-wider uppercase">
              <span>FORMAT: {format.toUpperCase()}</span>
              <span className={accent.text}>{currentCampus.city.toUpperCase()} CHAPTER</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );

  // If Transparent mode is active in UI workspace, display checkerboard strictly OUTSIDE the exported ref!
  if (showTransparentCheckerboard && isTransparentMode) {
    return (
      <div className={`relative w-full ${maxWidthClass} mx-auto bg-checkerboard rounded-sm overflow-hidden`}>
        {canvasNode}
      </div>
    );
  }

  return canvasNode;
});
