import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, RefreshCw, CheckCircle, Lightbulb } from 'lucide-react';
import { PosterContent, CyberCategory, CyberStyle, AccentColor, PosterImageKey } from '../types/poster';

interface AICampaignGeneratorProps {
  onApplyCampaign: (data: {
    content: Partial<PosterContent>;
    category?: CyberCategory;
    style?: CyberStyle;
    accentColor?: AccentColor;
    imageKey?: PosterImageKey;
  }) => void;
  currentCampusName?: string;
}

export function AICampaignGenerator({ onApplyCampaign, currentCampusName = 'NFSU Gandhinagar' }: AICampaignGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<'technical' | 'bold' | 'vibrant' | 'academic'>('technical');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<any | null>(null);
  const [applied, setApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const quickPrompts = [
    { title: 'Reverse Engineering CTF', prompt: '36-hour Security Sprint on Malware Reverse Engineering, Memory Forensics and Rootkit Mitigation' },
    { title: 'Red Team Web Exploitation', prompt: 'Ethical Hacking Workshop on GraphQL vulnerabilities, SSRF attacks and Active Directory defense' },
    { title: 'GDG Cybersecurity Induction', prompt: 'Annual Member Recruitment Drive for GDG on Campus NFSU exploring low-level security, CTFs and dev projects' },
    { title: 'Digital Forensics Symposium', prompt: 'Specialized Seminar on AI in Criminal Investigation, Deepfake Detection and Hardware Forensics' },
    { title: 'Kernel Security Masterclass', prompt: 'Hands-on Lab on eBPF runtime monitoring, Linux kernel exploits and memory safe systems in Rust' }
  ];

  const handleGenerate = async (targetPrompt?: string) => {
    const inputPrompt = targetPrompt || prompt;
    if (!inputPrompt.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    setApplied(false);

    try {
      const response = await fetch('/api/ai/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${inputPrompt} at ${currentCampusName}`,
          tone,
          needType: 'cybersecurity'
        })
      });

      const res = await response.json();
      if (res.success && res.data) {
        setGeneratedData(res.data);
      } else {
        throw new Error(res.error || 'Failed to generate campaign content');
      }
    } catch (err: any) {
      console.error('AI Generation error:', err);
      setErrorMessage(err.message || 'Unable to connect to AI engine. Using local synthesis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (!generatedData) return;

    const tracks = [
      { title: generatedData.pillar1Title || 'Track 01', desc: generatedData.pillar1Desc || 'Core technical track' },
      { title: generatedData.pillar2Title || 'Track 02', desc: generatedData.pillar2Desc || 'Advanced forensics module' },
      { title: generatedData.pillar3Title || 'Track 03', desc: generatedData.pillar3Desc || 'Defensive countermeasures' },
      { title: generatedData.pillar4Title || 'Track 04', desc: generatedData.pillar4Desc || 'Community hands-on lab' }
    ];

    onApplyCampaign({
      content: {
        headline: generatedData.headline,
        subtitle: generatedData.subtitle,
        kicker: generatedData.kicker,
        foundingManifesto: generatedData.foundingManifesto,
        cycleTagline: generatedData.cycleTagline,
        tracks,
        ctaText: generatedData.ctaText,
        subCtaText: generatedData.subCtaText,
        hashtag: generatedData.hashtag,
        date: generatedData.dateTime || 'OCTOBER 2026',
        venue: generatedData.venue,
        speakerName: generatedData.speakerName || 'Distinguished Forensic Researcher',
        speakerDesignation: generatedData.speakerDesignation || 'Cyber Defense Specialist',
        showSpeaker: true,
        showTracks: true
      },
      category: 'ctf',
      style: (generatedData.recommendedTheme as CyberStyle) || 'cyberpunk',
      accentColor: 'blue',
      imageKey: (generatedData.recommendedImage as PosterImageKey) || 'forensics'
    });

    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="bg-[#090D15]/95 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-4 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <div>
            <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block">
              AI CAMPAIGN COPILOT (GEMINI 3.8 FLASH)
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Generate Cybersecurity Poster Content
            </h3>
          </div>
        </div>
        <span className="text-[9px] font-mono bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800">
          NFSU CSAS KNOWLEDGE
        </span>
      </div>

      <p className="text-[11px] text-slate-300 leading-snug">
        Describe your cybersecurity workshop, CTF, technical seminar, or induction. The AI synthesizes institutional knowledge of NFSU and GDG to craft precise technical copy, operational taglines, and venue recommendations.
      </p>

      {/* Input Box */}
      <div className="space-y-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. 2-day hands-on workshop on eBPF kernel tracing, memory forensics and Linux exploit analysis for student cyber defenders..."
          rows={2}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
        />

        {/* Quick Inspiration Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
          <span className="text-slate-500 shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" /> Quick ideas:
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(q.prompt);
                handleGenerate(q.prompt);
              }}
              className="shrink-0 px-2 py-1 rounded bg-slate-950 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 transition-colors whitespace-nowrap"
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tone & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Tone:</span>
          {(['technical', 'bold', 'vibrant', 'academic'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-2 py-1 rounded text-[10px] font-medium capitalize transition-colors ${
                tone === t
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-sky-950/40 disabled:opacity-40"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Synthesizing Copy with AI...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-3.5 h-3.5" />
              <span>Generate Poster Copy</span>
            </>
          )}
        </button>
      </div>

      {errorMessage && (
        <div className="text-[11px] text-amber-400 bg-amber-950/40 p-2 rounded border border-amber-800/40">
          {errorMessage}
        </div>
      )}

      {/* Generated Result Preview */}
      {generatedData && (
        <div className="mt-3 p-3.5 bg-slate-950 rounded-lg border border-slate-700 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[9.5px] font-mono text-sky-400 uppercase tracking-wider">
              GENERATED CYBER CAMPAIGN SPECS
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span>Style: <strong className="text-white uppercase">{generatedData.recommendedTheme}</strong></span>
              <span>·</span>
              <span>Visual: <strong className="text-white uppercase">{generatedData.recommendedImage}</strong></span>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <h4 className="text-sm font-bold text-white font-display uppercase tracking-tight">
              {generatedData.headline}
            </h4>
            <p className="text-xs text-slate-300 leading-snug">
              {generatedData.subtitle}
            </p>
            <p className="text-[11px] font-serif italic text-sky-200/90 pt-0.5">
              "{generatedData.foundingManifesto}"
            </p>
          </div>

          {/* 4 Tracks Summary */}
          <div className="grid grid-cols-2 gap-2 text-[10px] border-y border-slate-800/80 py-2">
            <div>
              <span className="text-slate-400 font-mono block">TRACK 1</span>
              <strong className="text-slate-200">{generatedData.pillar1Title}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-mono block">TRACK 2</span>
              <strong className="text-slate-200">{generatedData.pillar2Title}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-mono block">TRACK 3</span>
              <strong className="text-slate-200">{generatedData.pillar3Title}</strong>
            </div>
            <div>
              <span className="text-slate-400 font-mono block">TRACK 4</span>
              <strong className="text-slate-200">{generatedData.pillar4Title}</strong>
            </div>
          </div>

          {/* Venue & Schedule */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>SCHEDULE: <span className="text-slate-200">{generatedData.dateTime}</span></span>
            <span>VENUE: <span className="text-slate-200">{generatedData.venue}</span></span>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md"
          >
            {applied ? (
              <>
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Applied to Poster Canvas!</span>
              </>
            ) : (
              <>
                <span>Apply This AI Campaign to Poster Canvas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
