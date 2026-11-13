import React, { useState, useRef, useEffect } from 'react';
import { 
  PosterContent, 
  CanvasElement, 
  PosterFormat, 
  PosterFont, 
  QRContrastMode 
} from '../types/poster';
import { CampusInfo } from '../data/campuses';
import { QRCodeDisplay } from './QRCodeDisplay';
import { NFSUUniversityMark, GDGBrackets } from './OfficialLogos';
import { SmartPosterImage } from './SmartPosterImage';
import { normalizeImageUrl, validateImageUrl } from '../utils/imageValidation';
import { createDefaultElementsFromContent } from '../utils/canvasLayers';
import {
  buildGradientString,
  getPosterDimensionMetrics,
  resolveBackgroundConfig,
  resolveHeroImageConfig
} from '../utils/posterEngine';
import { GOOGLE_FONT_OPTIONS } from '../data/fonts';
import {
  Layers,
  Move,
  RotateCw,
  Type,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Grid,
  ShieldAlert,
  Maximize2,
  Sliders,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Undo,
  Redo,
  Image as ImageIcon
} from 'lucide-react';

interface InteractiveCanvasEditorProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
  format: PosterFormat;
  campuses: CampusInfo[];
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenBackgroundStudio?: () => void;
}

export function InteractiveCanvasEditor({
  content,
  onChange,
  format,
  campuses,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenBackgroundStudio
}: InteractiveCanvasEditorProps) {
  // Elements state: initialize from content or defaults
  const elements = content.elements && content.elements.length > 0
    ? content.elements
    : createDefaultElementsFromContent(content);

  const [selectedId, setSelectedId] = useState<string>(elements[1]?.id || 'layer_headline');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; elemX: number; elemY: number }>({ x: 0, y: 0, elemX: 0, elemY: 0 });
  const [isRotating, setIsRotating] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const currentCampus = campuses.find((c) => c.id === content.campusId) || campuses[0];

  // Helper to commit element changes
  const updateElements = (newElements: CanvasElement[]) => {
    onChange({
      ...content,
      elements: newElements
    });
  };

  const selectedElement = elements.find((e) => e.id === selectedId) || elements[0];

  const updateSelected = (partial: Partial<CanvasElement>) => {
    if (!selectedElement) return;
    const updated = elements.map((e) => (e.id === selectedElement.id ? { ...e, ...partial } : e));
    updateElements(updated);
  };

  // Reordering layers
  const moveLayer = (direction: 'up' | 'down' | 'front' | 'back') => {
    if (!selectedElement) return;
    const index = elements.findIndex((e) => e.id === selectedElement.id);
    if (index === -1) return;

    const list = [...elements];
    if (direction === 'up' && index < list.length - 1) {
      const temp = list[index];
      list[index] = list[index + 1];
      list[index + 1] = temp;
    } else if (direction === 'down' && index > 0) {
      const temp = list[index];
      list[index] = list[index - 1];
      list[index - 1] = temp;
    } else if (direction === 'front') {
      const [item] = list.splice(index, 1);
      list.push(item);
    } else if (direction === 'back') {
      const [item] = list.splice(index, 1);
      list.unshift(item);
    }

    // Reassign zIndices
    const reindexed = list.map((item, idx) => ({ ...item, zIndex: (idx + 1) * 10 }));
    updateElements(reindexed);
  };

  // Duplicate selected element
  const duplicateSelected = () => {
    if (!selectedElement) return;
    const newId = `elem_${Date.now()}`;
    const clone: CanvasElement = {
      ...selectedElement,
      id: newId,
      label: `${selectedElement.label} (Copy)`,
      x: Math.min(selectedElement.x + 4, 85),
      y: Math.min(selectedElement.y + 4, 85),
      zIndex: (elements.length + 1) * 10
    };
    updateElements([...elements, clone]);
    setSelectedId(newId);
  };

  // Delete selected element
  const deleteSelected = () => {
    if (!selectedElement || elements.length <= 1) return;
    const filtered = elements.filter((e) => e.id !== selectedElement.id);
    updateElements(filtered);
    setSelectedId(filtered[0]?.id || '');
  };

  // Add new layer
  const addLayer = (type: 'text' | 'badge' | 'qr' | 'image') => {
    const newId = `elem_${Date.now()}`;
    let newElement: CanvasElement;

    if (type === 'text') {
      newElement = {
        id: newId,
        type: 'text',
        label: 'Custom Text Block',
        x: 10,
        y: 40,
        width: 80,
        rotation: 0,
        locked: false,
        hidden: false,
        zIndex: (elements.length + 1) * 10,
        text: 'Enter custom text here',
        fontSize: 14,
        fontWeight: 600,
        fontFamily: content.fontFamily || 'Syne',
        color: '#FFFFFF',
        align: 'left',
        lineHeight: 1.3
      };
    } else if (type === 'badge') {
      newElement = {
        id: newId,
        type: 'badge',
        label: 'Security Status Badge',
        x: 10,
        y: 20,
        width: 60,
        rotation: 0,
        locked: false,
        hidden: false,
        zIndex: (elements.length + 1) * 10,
        text: '[ DEFENSE LEVEL // CRITICAL ]',
        fontSize: 11,
        fontWeight: 700,
        fontFamily: 'JetBrains Mono',
        color: '#38BDF8',
        align: 'left'
      };
    } else if (type === 'image') {
      const defaultSrc =
        normalizeImageUrl(content.customImageUrl) ||
        '/assets/images/signal_silicon_forensics_1794419167984.jpg';
      newElement = {
        id: newId,
        type: 'image',
        label: 'Poster Visual Layer',
        x: 12,
        y: 36,
        width: 56,
        height: 28,
        rotation: 0,
        locked: false,
        hidden: false,
        zIndex: (elements.length + 1) * 10,
        src: defaultSrc,
        opacity: 100,
        borderRadius: 6,
        imageFilter: content.imageFilter || 'none',
        imageZoom: 100,
        imageFocalX: 50,
        imageFocalY: 50,
        borderWidth: 1,
        borderColor: '#38BDF8',
        shadow: true
      };
    } else {
      newElement = {
        id: newId,
        type: 'qr',
        label: 'Floating QR Badge',
        x: 65,
        y: 75,
        width: 25,
        rotation: 0,
        locked: false,
        hidden: false,
        zIndex: (elements.length + 1) * 10,
        qrDestination: content.qrDestination || 'https://gdg.community.dev',
        qrContrast: content.qrContrastMode || 'dark_on_light'
      };
    }

    updateElements([...elements, newElement]);
    setSelectedId(newId);
  };

  // Replace image on selected image layer while keeping position/dimensions/rotation
  const handleReplaceLayerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedElement || selectedElement.type !== 'image') return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateSelected({ src: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  // Dragging handling
  const handlePointerDown = (e: React.PointerEvent, elem: CanvasElement) => {
    if (elem.locked) return;
    e.stopPropagation();
    setSelectedId(elem.id);
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      elemX: elem.x,
      elemY: elem.y
    });
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !canvasRef.current || !selectedElement || selectedElement.locked) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const deltaX = ((e.clientX - dragStart.x) / rect.width) * 100;
      const deltaY = ((e.clientY - dragStart.y) / rect.height) * 100;

      let newX = Math.max(0, Math.min(100 - selectedElement.width, dragStart.elemX + deltaX));
      let newY = Math.max(0, Math.min(95, dragStart.elemY + deltaY));

      // Grid snap if enabled (snap to 2% intervals)
      if (content.showGridSnap) {
        newX = Math.round(newX / 2) * 2;
        newY = Math.round(newY / 2) * 2;
      }

      updateSelected({ x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, dragStart, selectedElement, content.showGridSnap]);

  const bg = resolveBackgroundConfig(content);
  const hero = resolveHeroImageConfig(content);
  const isTransparentMode = bg.mode === 'transparent' || bg.mode === 'none';
  const dim = getPosterDimensionMetrics(format, content.customWidthPx, content.customHeightPx);
  const maxWidthClass =
    format === '9:16'
      ? 'max-w-[420px]'
      : format === 'a4'
      ? 'max-w-[500px]'
      : 'max-w-[540px]';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
      {/* ========================================================= */}
      {/* LEFT: INTERACTIVE CANVAS VIEWPORT */}
      {/* ========================================================= */}
      <div className="lg:col-span-8 flex flex-col items-center gap-3">
        {/* Editor Toolbar (Snap, Safe Margins, Undo, Redo) */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 bg-[#090D15] p-2.5 rounded-lg border border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-sky-400 uppercase font-bold tracking-wider">
              INTERACTIVE CANVAS
            </span>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => onChange({ ...content, showGridSnap: !content.showGridSnap })}
              className={`px-2 py-1 rounded flex items-center gap-1.5 transition-colors ${
                content.showGridSnap
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid Snap</span>
            </button>

            <button
              onClick={() => onChange({ ...content, showSafeMargins: !content.showSafeMargins })}
              className={`px-2 py-1 rounded flex items-center gap-1.5 transition-colors ${
                content.showSafeMargins
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Safe Print Margins</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo"
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo"
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 transition-colors"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* The Live Interactive Poster Board */}
        <div
          className={`w-full ${maxWidthClass} mx-auto ${isTransparentMode ? 'bg-checkerboard rounded-sm overflow-hidden' : ''}`}
        >
        <div
          ref={canvasRef}
          id="signal-poster-canvas"
          className={`relative w-full mx-auto select-none overflow-hidden rounded-sm border border-sky-500/30 shadow-2xl transition-all ${
            isTransparentMode ? 'bg-transparent' : 'bg-[#080D1A]'
          }`}
          style={{
            aspectRatio: dim.aspectRatio,
            backgroundColor: isTransparentMode ? 'transparent' : bg.solidColor || '#080D1A'
          }}
          onClick={() => setSelectedId('')}
        >
          {/* Independent Background Visual Layer */}
          {!isTransparentMode && (bg.mode === 'gradient' || bg.mode === 'preset') && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: buildGradientString(bg),
                opacity: (bg.gradientOpacity ?? 100) / 100
              }}
            />
          )}
          {!isTransparentMode && bg.mode === 'image' && bg.imageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-all pointer-events-none"
              style={{
                backgroundImage: `url(${normalizeImageUrl(bg.imageUrl)})`,
                opacity: (bg.imageOpacity ?? 100) / 100,
                filter: `blur(${bg.imageBlur ?? 0}px) brightness(${bg.imageBrightness ?? 100}%) contrast(${bg.imageContrast ?? 100}%) saturate(${bg.imageSaturation ?? 100}%) hue-rotate(${bg.imageHue ?? 0}deg)`,
                transform:
                  bg.imageFit === 'custom'
                    ? `scale(${(bg.imageZoom ?? 100) / 100}) translate(${bg.imageOffsetX ?? 0}%, ${bg.imageOffsetY ?? 0}%)`
                    : undefined
              }}
            />
          )}

          {/* Dark Text Protection Overlay */}
          {!isTransparentMode && (
            <div
              className="absolute inset-0 pointer-events-none z-15 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity"
              style={{ opacity: (bg.overlayOpacity ?? 55) / 100 }}
              aria-hidden="true"
            />
          )}

          {/* Safe Margins Overlay (80% boundary) */}
          {content.showSafeMargins && (
            <div className="absolute inset-[10%] border-2 border-dashed border-amber-400/50 pointer-events-none z-40 rounded flex items-start justify-end p-1">
              <span className="text-[8px] font-mono text-amber-300/80 bg-black/60 px-1 rounded uppercase">
                SAFE PRINT MARGIN (10%)
              </span>
            </div>
          )}

          {/* Grid Snap Lines Overlay */}
          {content.showGridSnap && (
            <div className="absolute inset-0 pointer-events-none z-30 subtle-grid opacity-20" />
          )}

          {/* Fixed Institutional Header for Authenticity */}
          <div className="absolute top-4 left-5 right-5 z-20 flex items-center justify-between border-b border-white/10 pb-2 pointer-events-none">
            <div className="flex items-center gap-2">
              <GDGBrackets className="w-6 h-6 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white uppercase font-sans">
                  {content.organizerName || 'Google Developer Groups on Campus'}
                </span>
                <span className="text-[8px] font-mono text-sky-400">
                  {currentCampus.name} · {currentCampus.isVerified ? '✓ VERIFIED CYBER CAMPUS' : 'CAMPUS'}
                </span>
              </div>
            </div>
            <NFSUUniversityMark
              campusName={currentCampus.city}
              customLogoUrl={content.customLogoUrl}
              className="h-8"
            />
          </div>

          {/* Interactive Editable Layers */}
          {elements.map((elem) => {
            if (elem.hidden) return null;
            const isSelected = selectedId === elem.id;

            return (
              <div
                key={elem.id}
                onPointerDown={(e) => handlePointerDown(e, elem)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(elem.id);
                }}
                style={{
                  position: 'absolute',
                  left: `${elem.x}%`,
                  top: `${elem.y}%`,
                  width: `${elem.width}%`,
                  transform: `rotate(${elem.rotation}deg)`,
                  zIndex: elem.zIndex,
                  cursor: elem.locked ? 'not-allowed' : isDragging ? 'grabbing' : 'grab'
                }}
                className={`group transition-shadow p-1.5 rounded ${
                  isSelected
                    ? 'ring-2 ring-sky-400 bg-sky-950/30 shadow-lg'
                    : 'hover:ring-1 hover:ring-sky-500/40'
                }`}
              >
                {/* Selection Bounding Box & Handles */}
                {isSelected && !elem.locked && (
                  <div className="absolute -top-6 left-0 bg-sky-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow flex items-center gap-1 z-50">
                    <Move className="w-2.5 h-2.5" />
                    <span>{elem.label}</span>
                    <span className="opacity-70">({Math.round(elem.x)}%, {Math.round(elem.y)}%)</span>
                  </div>
                )}

                {/* Layer Content Rendering based on type */}
                {elem.type === 'text' && (
                  <div
                    style={{
                      fontSize: `${elem.fontSize || 16}px`,
                      fontWeight: elem.fontWeight || 600,
                      fontStyle: elem.italic ? 'italic' : 'normal',
                      textDecoration: elem.underline ? 'underline' : 'none',
                      fontFamily: `${elem.fontFamily || content.fontFamily || 'Syne'}, "${content.hindiFontFamily || 'Noto Sans Devanagari'}", sans-serif`,
                      color: elem.color || '#FFFFFF',
                      textAlign: elem.align || 'left',
                      letterSpacing: `${elem.letterSpacing || 0}em`,
                      wordSpacing: elem.wordSpacing ? `${elem.wordSpacing}em` : undefined,
                      lineHeight: elem.lineHeight || 1.3,
                      WebkitTextStroke: elem.strokeWidth ? `${elem.strokeWidth}px ${elem.strokeColor || '#000000'}` : undefined,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {elem.text}
                  </div>
                )}

                {elem.type === 'badge' && (
                  <div
                    style={{
                      fontSize: `${elem.fontSize || 11}px`,
                      fontWeight: elem.fontWeight || 700,
                      fontFamily: 'JetBrains Mono',
                      color: elem.color || '#38BDF8',
                      letterSpacing: `${elem.letterSpacing || 0.08}em`
                    }}
                    className="inline-block px-2 py-0.5 rounded bg-sky-950/70 border border-sky-500/40 uppercase"
                  >
                    {elem.text}
                  </div>
                )}

                {elem.type === 'qr' && (
                  <div className="inline-block p-1 rounded-lg bg-slate-900 border border-slate-700 shadow-md">
                    <QRCodeDisplay
                      value={elem.qrDestination || content.qrDestination || content.registrationLink}
                      size={90}
                      contrastMode={elem.qrContrast || content.qrContrastMode || 'dark_on_light'}
                      label={content.qrLabel}
                      showPlaceholderIfEmpty={true}
                    />
                  </div>
                )}

                {elem.type === 'image' && (
                  <div
                    className="w-full overflow-hidden"
                    style={{
                      height: `${(elem.height || 26) * 4.5}px`,
                      borderRadius: `${elem.borderRadius ?? 6}px`,
                      border: elem.borderWidth
                        ? `${elem.borderWidth}px solid ${elem.borderColor || '#38BDF8'}`
                        : undefined,
                      boxShadow: elem.shadow ? '0 12px 30px rgba(0,0,0,0.65)' : undefined
                    }}
                  >
                    <SmartPosterImage
                      src={elem.src}
                      alt={elem.label}
                      fit={elem.fit || 'cover'}
                      zoom={elem.imageZoom ?? 100}
                      focalX={elem.imageFocalX ?? 50}
                      focalY={elem.imageFocalY ?? 50}
                      opacity={elem.opacity ?? 100}
                      brightness={elem.brightness ?? 100}
                      contrast={elem.contrast ?? 100}
                      saturation={elem.saturation ?? 100}
                      hue={elem.hue ?? 0}
                      blur={elem.blur ?? 0}
                      maskShape={elem.maskShape || 'none'}
                      filter={elem.imageFilter || 'none'}
                      className="w-full h-full"
                    />
                  </div>
                )}

                {elem.type === 'svg_graphic' && elem.svgInner && (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      color: elem.fillColor || '#38BDF8',
                      opacity: (elem.opacity ?? 90) / 100
                    }}
                  >
                    <svg
                      viewBox={elem.svgViewBox || '0 0 100 100'}
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: elem.svgInner }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>

        {/* Bottom Helper Bar */}
        <span className="text-[10px] font-mono text-slate-400">
          💡 Click any layer to select · Drag to move with live coordinates · Use properties panel to edit typography, color & scale
        </span>
      </div>

      {/* ========================================================= */}
      {/* RIGHT: LAYERS & ELEMENT INSPECTOR PANEL */}
      {/* ========================================================= */}
      <div className="lg:col-span-4 space-y-4">
        {/* Layer Controls & Reordering */}
        <div className="bg-[#090D15] rounded-xl border border-slate-800 p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              <h4 className="text-xs font-mono font-bold text-white uppercase">
                Layers Panel ({elements.length})
              </h4>
            </div>

            {/* Add Layer Actions */}
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => addLayer('text')}
                title="Add Text Layer"
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 text-sky-400" />
                <span>Text</span>
              </button>
              <button
                type="button"
                onClick={() => addLayer('image')}
                title="Add Image Layer"
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                <span>Image</span>
              </button>
              <button
                type="button"
                onClick={() => addLayer('badge')}
                title="Add Security Badge"
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 text-emerald-400" />
                <span>Badge</span>
              </button>
              <button
                type="button"
                onClick={() => addLayer('qr')}
                title="Add QR Overlay"
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3 text-amber-400" />
                <span>QR</span>
              </button>
            </div>
          </div>

          {/* Layer List */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {elements.map((elem) => {
              const isSelected = selectedId === elem.id;
              return (
                <div
                  key={elem.id}
                  className={`flex items-center justify-between p-1.5 rounded-lg border text-xs transition-colors ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-500/50 text-white font-medium'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(elem.id)}
                    className="flex-1 flex items-center gap-2 truncate text-left px-1 py-0.5"
                  >
                    <span className="text-[10px] font-mono text-slate-400">
                      #{Math.round(elem.zIndex / 10)}
                    </span>
                    <span className="truncate">{elem.label}</span>
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Hide/Show */}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = elements.map((item) =>
                          item.id === elem.id ? { ...item, hidden: !item.hidden } : item
                        );
                        updateElements(updated);
                      }}
                      aria-label={elem.hidden ? `Show ${elem.label}` : `Hide ${elem.label}`}
                      title={elem.hidden ? 'Show layer' : 'Hide layer'}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {elem.hidden ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>

                    {/* Lock/Unlock */}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = elements.map((item) =>
                          item.id === elem.id ? { ...item, locked: !item.locked } : item
                        );
                        updateElements(updated);
                      }}
                      aria-label={elem.locked ? `Unlock ${elem.label}` : `Lock ${elem.label}`}
                      title={elem.locked ? 'Unlock layer' : 'Lock layer'}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {elem.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explicit Independent Background Layer Row */}
          <button
            type="button"
            onClick={() => onOpenBackgroundStudio?.()}
            className="w-full flex items-center justify-between p-2 rounded-lg border border-dashed border-cyan-500/40 bg-cyan-950/20 hover:bg-cyan-950/35 text-xs font-mono transition-colors text-left"
          >
            <div>
              <span className="text-cyan-300 font-bold block">Layer 0 · Background ({bg.mode.toUpperCase()})</span>
              <span className="text-[10px] text-slate-400 block">
                {hero.enabled ? 'Hero Image & Background strictly separated' : 'Edit in Background Studio'}
              </span>
            </div>
            <span className="text-[10px] text-cyan-300 underline">Edit BG</span>
          </button>

          {/* Layer Order & Actions Toolbar */}
          {selectedElement && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveLayer('up')}
                  title="Bring Forward"
                  className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveLayer('down')}
                  title="Send Backward"
                  className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateSelected({
                      groupId: selectedElement.groupId ? undefined : 'group_primary'
                    })
                  }
                  className={`px-2 py-1 rounded border text-[10px] ${
                    selectedElement.groupId
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {selectedElement.groupId ? 'Grouped' : 'Group'}
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={duplicateSelected}
                  title="Duplicate Layer"
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Duplicate</span>
                </button>
                <button
                  type="button"
                  onClick={deleteSelected}
                  title="Delete Layer"
                  className="p-1.5 rounded bg-red-950/40 border border-red-800/60 text-red-400 hover:text-red-200 hover:bg-red-900/60"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selected Layer Properties Inspector */}
        {selectedElement ? (
          <div className="bg-[#090D15] rounded-xl border border-slate-800 p-4 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                {selectedElement.label} Properties
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {selectedElement.type.toUpperCase()}
              </span>
            </div>

            {/* Text Editor if text/badge */}
            {(selectedElement.type === 'text' || selectedElement.type === 'badge') && (
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Text Content
                </label>
                <textarea
                  value={selectedElement.text || ''}
                  onChange={(e) => updateSelected({ text: e.target.value })}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs font-mono focus:outline-none focus:border-sky-500"
                />
              </div>
            )}

            {/* Typography Controls */}
            {selectedElement.type === 'text' && (
              <div className="space-y-3 pt-1 border-t border-slate-800">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Font Family
                    </label>
                    <select
                      aria-label="Selected layer font family"
                      value={selectedElement.fontFamily || 'Syne'}
                      onChange={(e) => updateSelected({ fontFamily: e.target.value as PosterFont })}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
                    >
                      {GOOGLE_FONT_OPTIONS.map((f) => (
                        <option key={f.family} value={f.family}>
                          {f.family} {f.supportsHindi ? '(EN+HI)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Font Size: {selectedElement.fontSize || 16}px
                    </label>
                    <input
                      type="range"
                      min={9}
                      max={48}
                      value={selectedElement.fontSize || 16}
                      onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })}
                      className="w-full accent-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Font Weight
                    </label>
                    <select
                      value={selectedElement.fontWeight || 600}
                      onChange={(e) => updateSelected({ fontWeight: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
                    >
                      <option value={400}>Regular (400)</option>
                      <option value={500}>Medium (500)</option>
                      <option value={600}>SemiBold (600)</option>
                      <option value={700}>Bold (700)</option>
                      <option value={900}>Black Heavy (900)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Text Align
                    </label>
                    <div className="flex rounded border border-slate-700 bg-slate-950 overflow-hidden">
                      <button
                        onClick={() => updateSelected({ align: 'left' })}
                        className={`flex-1 p-1 flex justify-center ${selectedElement.align === 'left' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateSelected({ align: 'center' })}
                        className={`flex-1 p-1 flex justify-center ${selectedElement.align === 'center' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => updateSelected({ align: 'right' })}
                        className={`flex-1 p-1 flex justify-center ${selectedElement.align === 'right' ? 'bg-sky-600 text-white' : 'text-slate-400'}`}
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Color, Spacing & Rotation */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Text Color
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={selectedElement.color || '#FFFFFF'}
                        onChange={(e) => updateSelected({ color: e.target.value })}
                        className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={selectedElement.color || '#FFFFFF'}
                        onChange={(e) => updateSelected({ color: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-1 text-[11px] text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Rotation: {selectedElement.rotation}°
                    </label>
                    <input
                      type="range"
                      min={-45}
                      max={45}
                      value={selectedElement.rotation || 0}
                      onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                      className="w-full accent-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Image Layer Properties & Replace (Keep Position) */}
            {selectedElement.type === 'image' && (
              <div className="space-y-3 pt-1 border-t border-slate-800">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Image URL (Preserves Position &amp; Scale)
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="url"
                      value={selectedElement.src || ''}
                      onChange={(e) => updateSelected({ src: e.target.value })}
                      placeholder="https://... or /assets/..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded p-1.5 text-[11px] text-white font-mono focus:outline-none focus:border-sky-500"
                    />
                    <label className="cursor-pointer px-2 py-1.5 rounded bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-[10px] font-mono shrink-0">
                      Replace
                      <input type="file" accept="image/*" className="hidden" onChange={handleReplaceLayerImageUpload} />
                    </label>
                  </div>
                  {selectedElement.src && !validateImageUrl(selectedElement.src).valid && (
                    <p className="text-[10px] font-mono text-rose-400 mt-1">
                      {validateImageUrl(selectedElement.src).reason}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Height: {selectedElement.height ?? 28}%
                    </label>
                    <input
                      type="range"
                      min={12}
                      max={75}
                      value={selectedElement.height ?? 28}
                      onChange={(e) => updateSelected({ height: Number(e.target.value) })}
                      className="w-full accent-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Opacity: {selectedElement.opacity ?? 100}%
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={selectedElement.opacity ?? 100}
                      onChange={(e) => updateSelected({ opacity: Number(e.target.value) })}
                      className="w-full accent-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Zoom: {selectedElement.imageZoom ?? 100}%
                    </label>
                    <input
                      type="range"
                      min={100}
                      max={220}
                      value={selectedElement.imageZoom ?? 100}
                      onChange={(e) => updateSelected({ imageZoom: Number(e.target.value) })}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Filter
                    </label>
                    <select
                      aria-label="Layer image filter"
                      value={selectedElement.imageFilter || 'none'}
                      onChange={(e) => updateSelected({ imageFilter: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-xs text-white"
                    >
                      <option value="none">Original</option>
                      <option value="duotone">Cyber Duotone</option>
                      <option value="high_contrast">High-Contrast B&amp;W</option>
                      <option value="matrix_green">Matrix Terminal</option>
                      <option value="ice_cyan">Ice Cyan</option>
                      <option value="warm_amber">Warm Amber</option>
                      <option value="invert">Cyber Invert</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 items-end">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Border: {selectedElement.borderWidth ?? 0}px
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={6}
                      value={selectedElement.borderWidth ?? 0}
                      onChange={(e) => updateSelected({ borderWidth: Number(e.target.value) })}
                      className="w-full accent-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                      Border Color
                    </label>
                    <input
                      type="color"
                      aria-label="Image border color"
                      value={selectedElement.borderColor || '#38BDF8'}
                      onChange={(e) => updateSelected({ borderColor: e.target.value })}
                      className="w-full h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => updateSelected({ shadow: !selectedElement.shadow })}
                    className={`h-7 rounded border text-[10px] font-mono ${
                      selectedElement.shadow
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    {selectedElement.shadow ? 'Shadow ON' : 'Shadow OFF'}
                  </button>
                </div>
              </div>
            )}

            {/* SVG Graphic Color & Opacity Controls */}
            {selectedElement.type === 'svg_graphic' && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <label className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Vector Fill Color</span>
                  <input
                    type="color"
                    value={selectedElement.fillColor || '#38BDF8'}
                    onChange={(e) => updateSelected({ fillColor: e.target.value })}
                    className="w-full h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">
                    Opacity: {selectedElement.opacity ?? 90}%
                  </span>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={selectedElement.opacity ?? 90}
                    onChange={(e) => updateSelected({ opacity: Number(e.target.value) })}
                    className="w-full accent-sky-500"
                  />
                </label>
              </div>
            )}

            {/* Dimensions & Scale */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Width: {Math.round(selectedElement.width)}%
                </label>
                <input
                  type="range"
                  min={8}
                  max={95}
                  value={selectedElement.width}
                  onChange={(e) => updateSelected({ width: Number(e.target.value) })}
                  className="w-full accent-sky-500"
                />
              </div>
              {selectedElement.type !== 'text' && (
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Rotation: {selectedElement.rotation}°
                  </label>
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    value={selectedElement.rotation || 0}
                    onChange={(e) => updateSelected({ rotation: Number(e.target.value) })}
                    className="w-full accent-sky-500"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#090D15] rounded-xl border border-slate-800 p-6 text-center text-slate-400 text-xs">
            Select an element on the canvas or from the Layers panel to modify its typography, position, or rotation.
          </div>
        )}

        {/* Canvas Background Settings Panel */}
        <div className="bg-[#090D15] rounded-xl border border-slate-800 p-4 shadow-xl space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-mono font-bold text-white uppercase">
              Background & Visual Framing
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                Base Color
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={content.backgroundSettings?.color || '#080D1A'}
                  onChange={(e) =>
                    onChange({
                      ...content,
                      backgroundSettings: {
                        ...(content.backgroundSettings || {
                          type: 'image',
                          color: '#080D1A',
                          zoom: 100,
                          offsetX: 0,
                          offsetY: 0,
                          opacity: 100
                        }),
                        color: e.target.value
                      }
                    })
                  }
                  className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <span className="font-mono text-[11px] text-slate-300">
                  {content.backgroundSettings?.color || '#080D1A'}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                Image Zoom: {content.backgroundSettings?.zoom ?? 100}%
              </label>
              <input
                type="range"
                min={100}
                max={200}
                value={content.backgroundSettings?.zoom ?? 100}
                onChange={(e) =>
                  onChange({
                    ...content,
                    backgroundSettings: {
                      ...(content.backgroundSettings || {
                        type: 'image',
                        color: '#080D1A',
                        zoom: 100,
                        offsetX: 0,
                        offsetY: 0,
                        opacity: 100
                      }),
                      zoom: Number(e.target.value)
                    }
                  })
                }
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
