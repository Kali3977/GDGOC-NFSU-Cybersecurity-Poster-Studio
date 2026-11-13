import React from 'react';
import { X, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  renderedPosterNode?: React.ReactNode;
}

export function ComparisonModal({ isOpen, onClose, renderedPosterNode }: ComparisonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-stone-950 border border-stone-800 rounded-xl shadow-2xl p-4 sm:p-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase">
              DESIGN TRANSFORMATION ANALYSIS
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
              Before vs. After: From Generic Cliché to Agency Campaign
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Analyzing the departure from stereotypical college flyers toward an award-winning editorial identity.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors border border-stone-700/60"
            aria-label="Close Comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT: The Basic Cliché Reference Image */}
          <div className="bg-stone-900/60 rounded-lg p-4 border border-rose-900/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Previous Version (Basic College Template)
              </span>
              <span className="text-[10px] font-mono text-stone-500">
                REFERENCE UPLOAD
              </span>
            </div>

            <div className="relative aspect-[4/5] rounded overflow-hidden border border-stone-800 bg-black flex items-center justify-center">
              <img
                src="/assets/aistudio/GDG_NFSU__Learn__Build__Connect_28a9f913.png"
                alt="Previous Basic Poster"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/signal_brutalist_monolith_1794418292586.jpg';
                }}
              />
            </div>

            {/* Critique Points */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800 text-[11px] text-stone-400">
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Cartoon rocket with fluffy cloud smoke cliché</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Uncoordinated rainbow text colors (blue, yellow, green, white)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Predictable circuit-board trace decorations and glowing stars</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Unverified QR code placeholder and stock building shot</span>
              </div>
            </div>
          </div>

          {/* RIGHT: The New Agency Campaign Poster */}
          <div className="bg-stone-900/60 rounded-lg p-4 border border-emerald-900/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                New Campaign: "THE SIGNAL"
              </span>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                AGENCY EDITORIAL
              </span>
            </div>

            <div className="relative aspect-[4/5] rounded overflow-hidden border border-stone-800 bg-black flex items-center justify-center p-2">
              {renderedPosterNode || (
                <img
                  src="/assets/aistudio/OIP_72f641f4.webp"
                  alt="New NFSU Campaign Architecture"
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/signal_silicon_forensics_1794419167984.jpg';
                  }}
                />
              )}
            </div>

            {/* Quality Achievements */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800 text-[11px] text-stone-300">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Tangible brutalist architectural metaphor (brushed steel beacon & acoustic sound mirror)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Disciplined Swiss typography (Syne display + JetBrains Mono tabular system)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Official GDG 4-color brackets & authentic NFSU crest with Sanskrit motto</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Dashed clean reserved area for verified RSVP/QR details without composition clutter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-stone-200 transition-colors"
          >
            <span>Return to Studio Editor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
