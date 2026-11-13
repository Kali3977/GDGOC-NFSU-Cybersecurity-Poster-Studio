import React, { useState } from 'react';
import { 
  PosterContent, 
  PosterProject, 
  ExportHistoryItem, 
  CYBER_CATEGORIES_INFO, 
  DEFAULT_POSTER 
} from '../types/poster';
import { CampusInfo } from '../data/campuses';
import { PosterCanvas } from './PosterCanvas';
import { 
  FolderHeart, 
  History, 
  Plus, 
  Copy, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  HardDrive
} from 'lucide-react';

interface ProjectGalleryViewProps {
  currentPoster: PosterContent;
  projects: PosterProject[];
  onSaveCurrentProject: (name: string) => void;
  onOpenProject: (content: PosterContent) => void;
  onDuplicateProject: (project: PosterProject) => void;
  onRenameProject: (id: string, newName: string) => void;
  onDeleteProject: (id: string) => void;
  onImportProjects: (imported: PosterProject[]) => void;
  exportHistory: ExportHistoryItem[];
  onClearExportHistory: () => void;
  campuses: CampusInfo[];
}

export function ProjectGalleryView({
  currentPoster,
  projects,
  onSaveCurrentProject,
  onOpenProject,
  onDuplicateProject,
  onRenameProject,
  onDeleteProject,
  onImportProjects,
  exportHistory,
  onClearExportHistory,
  campuses
}: ProjectGalleryViewProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'history'>('projects');
  const [saveName, setSaveName] = useState('');
  const [renameModalProject, setRenameModalProject] = useState<PosterProject | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<PosterProject | null>(null);

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    const name = saveName.trim() || currentPoster.headline.slice(0, 36) || 'Untitled Cyber Poster';
    onSaveCurrentProject(name);
    setSaveName('');
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gdgoc_nfsu_poster_projects_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportProjects(parsed);
        }
      } catch (err) {
        alert('Invalid JSON projects backup file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner and Save Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#090D15] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <FolderHeart className="w-5 h-5 text-sky-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Project Gallery & Export Archives
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Organize saved poster drafts, duplicate variations for different campuses, and inspect past production exports.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'projects' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Saved Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === 'history' ? 'bg-sky-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Export History ({exportHistory.length})
            </button>
          </div>
        </div>

        {/* Save Current Poster Form & Backup Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <form onSubmit={handleSaveCurrent} className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Save current poster as... (e.g. CyberStrike CTF Final Draft)"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-bold transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-sky-950/40"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Save to Projects</span>
            </button>
          </form>

          {/* Backup / Restore */}
          <div className="flex items-center gap-2 shrink-0 text-xs font-mono">
            <button
              onClick={handleExportBackup}
              title="Download JSON Backup"
              className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-sky-400" />
              <span>Export JSON</span>
            </button>

            <label className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer">
              <Upload className="w-3 h-3 text-emerald-400" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
          </div>
        </div>

        {/* Persistence Disclosure */}
        <div className="flex items-center gap-2 p-2 rounded bg-slate-950/60 border border-slate-800/80 text-[10px] text-slate-400 font-mono">
          <HardDrive className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>
            Storage: Projects are reliably persisted in your browser's local sandbox with offline support. Use "Export JSON" to create external backups or migrate between machines.
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SAVED PROJECTS GALLERY */}
      {/* ========================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-[#090D15] border border-slate-800 space-y-3">
              <FolderHeart className="w-8 h-8 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-300">No Saved Projects Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Customize your poster in the Studio and click "Save to Projects" above to store your design drafts here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const projectCampus = campuses.find((c) => c.id === project.content.campusId) || campuses[0];
                const catInfo = CYBER_CATEGORIES_INFO[project.content.category] || CYBER_CATEGORIES_INFO.ctf;

                return (
                  <div
                    key={project.id}
                    className="bg-[#090D15] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between space-y-3 group hover:border-slate-700 transition-all"
                  >
                    {/* Project Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xs truncate">{project.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400 block truncate">
                          {projectCampus.name} · {catInfo.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setRenameModalProject(project);
                            setRenameValue(project.name);
                          }}
                          title="Rename Project"
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmProject(project)}
                          title="Delete Project"
                          className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Poster Canvas Miniature Preview */}
                    <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-[#050811] flex items-center justify-center pointer-events-none transform scale-[0.98]">
                      <div className="w-full pointer-events-none select-none">
                        <PosterCanvas
                          content={project.content}
                          format="4:5"
                          currentCampus={projectCampus}
                        />
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-[9px] text-slate-500">
                        Edited: {new Date(project.lastEdited).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDuplicateProject(project)}
                          className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-[10px] flex items-center gap-1 transition-colors"
                        >
                          <Copy className="w-3 h-3 text-sky-400" />
                          <span>Duplicate</span>
                        </button>

                        <button
                          onClick={() => onOpenProject(project.content)}
                          className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-[10px] font-bold flex items-center gap-1 transition-colors shadow-sm"
                        >
                          <span>Open & Edit</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: EXPORT HISTORY LOG */}
      {/* ========================================================= */}
      {activeTab === 'history' && (
        <div className="bg-[#090D15] rounded-xl border border-slate-800 p-4 sm:p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Production Export Activity Log
              </h3>
            </div>

            {exportHistory.length > 0 && (
              <button
                onClick={onClearExportHistory}
                className="text-[10px] font-mono text-slate-400 hover:text-red-400 transition-colors"
              >
                Clear Export History
              </button>
            )}
          </div>

          {exportHistory.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              No exports logged yet. When you download PNG, JPEG, SVG or Print assets, their records will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="py-2 px-3">Timestamp</th>
                    <th className="py-2 px-3">Poster Title</th>
                    <th className="py-2 px-3">Campus</th>
                    <th className="py-2 px-3">Format</th>
                    <th className="py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {exportHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40 text-slate-300">
                      <td className="py-2.5 px-3 text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-white truncate max-w-xs">
                        {item.title}
                      </td>
                      <td className="py-2.5 px-3 text-sky-400">
                        {item.campusName}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
                          {item.format}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Exported</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Rename Project Modal */}
      {renameModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090D15] border border-slate-800 rounded-xl p-5 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              Rename Project
            </h3>
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-xs font-mono focus:outline-none focus:border-sky-500"
            />
            <div className="flex items-center justify-end gap-2 text-xs font-mono">
              <button
                onClick={() => setRenameModalProject(null)}
                className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (renameValue.trim()) {
                    onRenameProject(renameModalProject.id, renameValue.trim());
                  }
                  setRenameModalProject(null);
                }}
                className="px-3.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold"
              >
                Save Name
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#090D15] border border-red-900/50 rounded-xl p-5 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-red-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="text-sm font-bold font-mono uppercase">
                Confirm Project Deletion
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete <strong className="text-white">"{deleteConfirmProject.name}"</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 text-xs font-mono">
              <button
                onClick={() => setDeleteConfirmProject(null)}
                className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteProject(deleteConfirmProject.id);
                  setDeleteConfirmProject(null);
                }}
                className="px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
