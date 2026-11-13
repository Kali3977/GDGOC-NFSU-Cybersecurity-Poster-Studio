import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { PosterContent, PreflightIssue } from '../types/poster';
import { CampusInfo } from '../data/campuses';
import { runPreflightChecks, ExportFormatType } from '../utils/posterEngine';

interface PreflightAuditPanelProps {
  content: PosterContent;
  onChange: (updated: PosterContent) => void;
  campus: CampusInfo;
  exportFormat?: ExportFormatType;
}

export function PreflightAuditPanel({
  content,
  onChange,
  campus,
  exportFormat
}: PreflightAuditPanelProps) {
  const issues: PreflightIssue[] = runPreflightChecks(content, campus, exportFormat);

  const errorCount = issues.filter((i) => i.level === 'error').length;
  const warningCount = issues.filter((i) => i.level === 'warning').length;
  const infoCount = issues.filter((i) => i.level === 'info').length;

  const handleApplyFix = (issue: PreflightIssue) => {
    if (!issue.fieldToFix) return;
    if (issue.fieldToFix === 'customImageUrl' && !issue.recommendedValue) {
      onChange({
        ...content,
        customImageUrl: undefined,
        imageKey: 'forensics'
      });
      return;
    }
    onChange({
      ...content,
      [issue.fieldToFix]: issue.recommendedValue
    });
  };

  return (
    <div className="bg-[#090D15] rounded-xl border border-slate-800 p-4 sm:p-5 shadow-2xl space-y-4 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase font-bold">
                QUALITY-CONTROL ASSISTANT
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                PRE-FLIGHT AUDIT
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Export Readiness & Compliance Check
            </h3>
          </div>
        </div>

        {/* Severity Metrics */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span
            className={`px-2 py-0.5 rounded flex items-center gap-1 ${
              errorCount > 0 ? 'bg-red-500/20 text-red-400 font-bold border border-red-500/40' : 'bg-slate-900 text-slate-500'
            }`}
          >
            {errorCount} Errors
          </span>
          <span
            className={`px-2 py-0.5 rounded flex items-center gap-1 ${
              warningCount > 0 ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'bg-slate-900 text-slate-500'
            }`}
          >
            {warningCount} Warnings
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400">
            {infoCount} Advisories
          </span>
        </div>
      </div>

      {/* Status Summary Banner */}
      {errorCount === 0 && warningCount === 0 ? (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 font-mono">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold block text-white">All Pre-flight Checks Passed!</span>
            <span>Poster adheres to official GDG & NFSU readability, print bleed, and contrast standards.</span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5 font-mono">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold block text-white">Review Identified Design Advisories</span>
            <span>Resolve the items below or click "Quick Fix" to automatically repair each warning.</span>
          </div>
        </div>
      )}

      {/* Issues List */}
      <div className="space-y-2.5">
        {issues.map((issue) => {
          const badgeClass = {
            error: 'bg-red-500/15 text-red-400 border-red-500/40',
            warning: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
            info: 'bg-sky-500/15 text-sky-300 border-sky-500/40'
          }[issue.level];

          const IconComponent = issue.level === 'error' ? AlertTriangle : issue.level === 'warning' ? AlertTriangle : Info;

          return (
            <div
              key={issue.id}
              className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-2.5">
                <IconComponent className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border font-semibold ${badgeClass}`}>
                      {issue.level}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{issue.category}</span>
                  </div>
                  <p className="text-slate-200">{issue.message}</p>
                </div>
              </div>

              {issue.fixLabel && (
                <button
                  type="button"
                  onClick={() => handleApplyFix(issue)}
                  className="px-3 py-1.5 rounded bg-sky-600/90 hover:bg-sky-500 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors shrink-0 self-start sm:self-auto shadow-sm"
                >
                  <Wrench className="w-3 h-3" />
                  <span>{issue.fixLabel}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
