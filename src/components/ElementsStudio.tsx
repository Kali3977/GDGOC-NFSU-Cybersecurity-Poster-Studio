import React, { useState, useMemo } from 'react';
import {
  Shapes,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Search
} from 'lucide-react';
import { PosterContent, CanvasElement } from '../types/poster';
import {
  DECORATIVE_ELEMENTS_LIBRARY,
  ELEMENT_CATEGORIES,
  ElementCategory,
  DecorativeSvgAsset
} from '../data/elementsLibrary';
import { addDecorativeSvgElement } from '../utils/posterEngine';

interface ElementsStudioProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
  onOpenInteractiveCanvas?: () => void;
}

export function ElementsStudio({
  content,
  onChange,
  onOpenInteractiveCanvas
}: ElementsStudioProps) {
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = useMemo(() => {
    return DECORATIVE_ELEMENTS_LIBRARY.filter((asset) => {
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          asset.name.toLowerCase().includes(q) ||
          asset.categoryLabel.toLowerCase().includes(q) ||
          asset.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const activeDecorations = useMemo(() => {
    return (content.elements || []).filter(
      (el) => el.type === 'svg_graphic' || el.id.startsWith('el_decor')
    );
  }, [content.elements]);

  const handleInsertAsset = (asset: DecorativeSvgAsset) => {
    onChange(addDecorativeSvgElement(content, asset));
  };

  const patchElement = (id: string, updates: Partial<CanvasElement>) => {
    const next = (content.elements || []).map((el) =>
      el.id === id ? { ...el, ...updates } : el
    );
    onChange({ ...content, elements: next });
  };

  const duplicateElement = (el: CanvasElement) => {
    const clone: CanvasElement = {
      ...el,
      id: `el_copy_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      label: `${el.label} (Copy)`,
      x: Math.min(84, el.x + 5),
      y: Math.min(84, el.y + 5),
      zIndex: (el.zIndex || 20) + 1
    };
    onChange({
      ...content,
      elements: [...(content.elements || []), clone]
    });
  };

  const removeElement = (id: string) => {
    onChange({
      ...content,
      elements: (content.elements || []).filter((el) => el.id !== id)
    });
  };

  return (
    <div className="bg-[#090D15]/95 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-5 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 uppercase tracking-widest">
            <Shapes className="w-3.5 h-3.5" /> ELEMENTS &amp; GRAPHICS STUDIO
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
            Foreground Vector Graphics, HUD Frames &amp; Stickers
          </h3>
        </div>
        {onOpenInteractiveCanvas && (
          <button
            type="button"
            onClick={onOpenInteractiveCanvas}
            className="px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 text-[11px] font-mono font-bold"
          >
            Drag on Interactive Canvas →
          </button>
        )}
      </div>

      <p className="text-xs text-slate-300 bg-[#040711] p-2.5 rounded-lg border border-slate-800">
        Elements insert strictly as independent foreground objects above your Hero &amp; Background layers. They never overwrite your canvas background.
      </p>

      {/* Search + Category Pills */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vector elements (shield, radar, circuit, badge, isometric)..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#040711] border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded text-[11px] font-mono shrink-0 border ${
              selectedCategory === 'all'
                ? 'bg-sky-500 text-black border-sky-400 font-bold'
                : 'bg-slate-950 text-slate-300 border-slate-800'
            }`}
          >
            All ({DECORATIVE_ELEMENTS_LIBRARY.length})
          </button>
          {ELEMENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-sky-500 text-black border-sky-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Picker Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {filteredAssets.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => handleInsertAsset(asset)}
            className="p-2.5 rounded-lg border border-slate-800 hover:border-sky-400 bg-[#040711] hover:bg-slate-900/90 transition-colors flex flex-col items-center text-center gap-2 group"
          >
            <div
              className="w-12 h-12 flex items-center justify-center"
              style={{ color: asset.defaultColor }}
            >
              <svg
                viewBox={asset.viewBox}
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: asset.svgInner }}
              />
            </div>
            <div className="w-full">
              <span className="text-[11px] font-bold text-white block truncate group-hover:text-sky-300">
                {asset.name}
              </span>
              <span className="text-[9px] font-mono text-sky-400 inline-flex items-center gap-1 mt-0.5">
                <Plus className="w-2.5 h-2.5" /> Add Graphic
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Active Foreground Decorative Elements Inspector */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold uppercase">
            Active Foreground Decorations ({activeDecorations.length})
          </span>
        </div>

        {activeDecorations.length === 0 ? (
          <p className="text-xs font-mono text-slate-400 p-3 rounded-lg bg-[#040711] border border-slate-800">
            Click any vector graphic above or use &ldquo;Add as Decoration&rdquo; inside the Image Library to place movable foreground accents.
          </p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {activeDecorations.map((el) => (
              <div
                key={el.id}
                className="p-2.5 rounded-lg border border-slate-800 bg-[#040711] space-y-2 text-xs font-mono"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white truncate">{el.label}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      aria-label={el.hidden ? `Show ${el.label}` : `Hide ${el.label}`}
                      onClick={() => patchElement(el.id, { hidden: !el.hidden })}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {el.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      aria-label={el.locked ? `Unlock ${el.label}` : `Lock ${el.label}`}
                      onClick={() => patchElement(el.id, { locked: !el.locked })}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {el.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      aria-label={`Duplicate ${el.label}`}
                      onClick={() => duplicateElement(el)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${el.label}`}
                      onClick={() => removeElement(el.id)}
                      className="p-1 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-center text-[10px] text-slate-300">
                  <label className="flex items-center gap-1.5">
                    <span>X: {Math.round(el.x)}%</span>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={el.x}
                      onChange={(e) => patchElement(el.id, { x: Number(e.target.value) })}
                      className="w-full accent-sky-400"
                    />
                  </label>
                  <label className="flex items-center gap-1.5">
                    <span>Y: {Math.round(el.y)}%</span>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={el.y}
                      onChange={(e) => patchElement(el.id, { y: Number(e.target.value) })}
                      className="w-full accent-sky-400"
                    />
                  </label>
                  <label className="flex items-center gap-1.5">
                    <span>W: {Math.round(el.width)}%</span>
                    <input
                      type="range"
                      min={6}
                      max={75}
                      value={el.width}
                      onChange={(e) => patchElement(el.id, { width: Number(e.target.value) })}
                      className="w-full accent-sky-400"
                    />
                  </label>
                  <label className="flex items-center gap-1.5">
                    <span>Rot: {el.rotation}°</span>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      value={el.rotation}
                      onChange={(e) => patchElement(el.id, { rotation: Number(e.target.value) })}
                      className="w-full accent-sky-400"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[10px]">
                  {el.type === 'svg_graphic' && (
                    <label className="flex items-center gap-1.5 text-slate-300">
                      <span>Color:</span>
                      <input
                        type="color"
                        value={el.fillColor || '#38BDF8'}
                        onChange={(e) => patchElement(el.id, { fillColor: e.target.value })}
                        className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                    </label>
                  )}
                  <label className="flex items-center gap-2 flex-1 text-slate-300">
                    <span>Opacity: {el.opacity ?? 90}%</span>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={el.opacity ?? 90}
                      onChange={(e) => patchElement(el.id, { opacity: Number(e.target.value) })}
                      className="flex-1 accent-sky-400"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
