import React from 'react';
import { AccentColor, PosterTheme } from '../types/poster';

interface MockupViewProps {
  mode: 'studio' | 'gallery' | 'street' | 'instagram';
  children: React.ReactNode;
  edition?: PosterTheme | string;
  accentColor?: AccentColor;
  headline?: string;
  campusName?: string;
}

export function MockupView({ 
  mode, 
  children, 
  edition = 'cyber',
  headline = 'CYBERSTRIKE 2026',
  campusName = 'NFSU Gandhinagar' 
}: MockupViewProps) {
  if (mode === 'studio') {
    return (
      <div className="w-full flex items-center justify-center p-2 sm:p-6">
        {children}
      </div>
    );
  }

  if (mode === 'gallery') {
    return (
      <div className="relative w-full py-10 px-4 sm:px-12 bg-[#0c0f16] rounded-lg border border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle museum ambient spotlight effect */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-sky-200/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Gallery Wall with Subtle Plaster Texture */}
        <div className="relative z-10 max-w-[540px] w-full flex flex-col items-center">
          {/* Picture Frame with Matte Margin */}
          <div className="p-3 sm:p-5 bg-[#050811] rounded shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-slate-800 ring-1 ring-white/10">
            {children}
          </div>

          {/* Museum Gallery Plaque / Placard */}
          <div className="mt-6 self-end sm:self-center bg-[#131926] border border-slate-700/60 p-3 sm:p-4 rounded shadow-lg max-w-[300px] text-left">
            <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase block">
              GDG ON CAMPUS · {campusName.toUpperCase()}
            </span>
            <h4 className="text-xs font-serif font-bold text-white mt-0.5 truncate">
              {headline}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-snug">
              Official cybersecurity campaign for Google Developer Groups at National Forensic Sciences University.
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[8px] font-mono text-slate-500">
              <span>CYBER ARCHIVAL EDITION</span>
              <span>CURATED DESIGN</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'street') {
    return (
      <div className="relative w-full py-12 px-4 sm:px-10 bg-[#090d14] rounded-lg border border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
        {/* Street urban nighttime lighting effect */}
        <div
          className="absolute inset-0 bg-radial-gradient from-sky-900/15 via-transparent to-black pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[520px] w-full flex flex-col items-center">
          {/* Backlit Urban Bus Shelter Lightbox Display Frame */}
          <div className="w-full p-4 sm:p-6 rounded-md bg-[#04060a] border-4 border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.95)] ring-2 ring-sky-500/30">
            <div className="flex items-center justify-between pb-2 text-[9px] font-mono text-slate-500 border-b border-slate-800 mb-3">
              <span>NFSU CAMPUS COMMONS // LIGHTBOX #04</span>
              <span className="text-sky-400">LED BACKLIT</span>
            </div>

            {/* Poster inside illuminated enclosure */}
            <div className="shadow-inner rounded-sm overflow-hidden">
              {children}
            </div>

            {/* Lightbox Base Hardware Bar */}
            <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[8px] font-mono text-slate-600">
              <span>ALUMINIUM EXTRUSION CASING</span>
              <span>1080 × 1350 HIGH DEF</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'instagram') {
    return (
      <div className="w-full flex items-center justify-center p-3 sm:p-8 bg-[#04060a] rounded-lg border border-slate-800">
        {/* Instagram Post Mockup Container */}
        <div className="w-full max-w-[440px] bg-black border border-slate-800 rounded-xl overflow-hidden shadow-2xl text-left">
          {/* IG Header */}
          <div className="p-3 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  G
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-white block leading-none">
                  gdgoncampus_nfsu
                </span>
                <span className="text-[10px] text-slate-400">
                  {campusName} · Original audio
                </span>
              </div>
            </div>
            <span className="text-slate-400 text-xs font-mono">···</span>
          </div>

          {/* Post Image Container */}
          <div className="w-full bg-[#050811] flex items-center justify-center">
            {children}
          </div>

          {/* IG Interaction Footer */}
          <div className="p-3 space-y-1.5 border-t border-slate-800/80 text-xs">
            <div className="flex items-center justify-between text-white font-bold">
              <div className="flex items-center gap-3">
                <span className="cursor-pointer hover:text-rose-500">❤️</span>
                <span className="cursor-pointer hover:text-sky-400">💬</span>
                <span className="cursor-pointer hover:text-emerald-400">↗️</span>
              </div>
              <span className="cursor-pointer">🔖</span>
            </div>

            <p className="text-[11px] text-slate-200 pt-1 leading-snug">
              <strong className="text-white">gdgoncampus_nfsu</strong> {headline} — Built by student cyber defenders at {campusName}.
            </p>

            <span className="text-[10px] text-sky-400 font-mono block">
              #GDGonNFSU #CyberSecurity #NFSU #GoogleDeveloperGroups
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}
