import {
  LayoutDashboard,
  Sliders,
  Grid,
  Image as ImageIcon,
  Paintbrush,
  Palette,
  Building2,
  FolderHeart,
  ShieldCheck,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { GDGBrackets } from './OfficialLogos';
import { IMAGE_LIBRARY } from '../data/imageLibrary';

export type StudioView =
  | 'dashboard'
  | 'studio'
  | 'templates'
  | 'images'
  | 'backgrounds'
  | 'assets'
  | 'campaigns'
  | 'projects'
  | 'preflight'
  | 'export'
  | 'settings'
  | 'interactive'
  | 'themes';

interface SidebarNavProps {
  activeView: StudioView;
  onSelectView: (view: StudioView) => void;
  savedCount: number;
  verifiedCampusesCount: number;
  onOpenCampusDirectory: () => void;
  preflightIssueCount?: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function SidebarNav({
  activeView,
  onSelectView,
  savedCount,
  verifiedCampusesCount,
  onOpenCampusDirectory,
  preflightIssueCount = 0,
  isCollapsed,
  onToggleCollapse
}: SidebarNavProps) {
  const navItems: {
    id: StudioView;
    label: string;
    subtitle: string;
    icon: any;
    badge?: string;
    badgeColor?: string;
    matchIds?: StudioView[];
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      subtitle: 'Studio Home & Overview',
      icon: LayoutDashboard
    },
    {
      id: 'studio',
      label: 'Create Poster',
      subtitle: 'Editor, Layers, Fonts & AI',
      icon: Sliders,
      matchIds: ['studio', 'interactive', 'themes']
    },
    {
      id: 'templates',
      label: 'Template Library',
      subtitle: '12+ Cyber Layouts',
      icon: Grid
    },
    {
      id: 'images',
      label: 'Image Library',
      subtitle: `${IMAGE_LIBRARY.length}+ Verified Assets`,
      icon: ImageIcon,
      badge: `${IMAGE_LIBRARY.length}`
    },
    {
      id: 'backgrounds',
      label: 'Background Studio',
      subtitle: '7 Modes & 32 Presets',
      icon: Paintbrush
    },
    {
      id: 'assets',
      label: 'Brand Kit',
      subtitle: 'Logos, Slots & Palettes',
      icon: Palette
    },
    {
      id: 'campaigns',
      label: 'Campus Campaigns',
      subtitle: 'Multi-Campus Publishing',
      icon: Building2
    },
    {
      id: 'projects',
      label: 'Project Gallery',
      subtitle: `Saved Designs (${savedCount})`,
      icon: FolderHeart
    },
    {
      id: 'preflight',
      label: 'Quality Assistant',
      subtitle: 'Pre-Flight Audit',
      icon: ShieldCheck,
      badge: preflightIssueCount > 0 ? `${preflightIssueCount}` : undefined,
      badgeColor:
        preflightIssueCount > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : undefined
    },
    {
      id: 'export',
      label: 'Export Studio',
      subtitle: 'PNG, Alpha, JPG, SVG',
      icon: Download
    },
    {
      id: 'settings',
      label: 'Settings',
      subtitle: 'Units, Backup & Defaults',
      icon: Settings
    }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between bg-[#060911] border-r border-slate-800 transition-all duration-300 z-40 shrink-0 text-left select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div>
        <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <GDGBrackets className="w-6 h-6 shrink-0" />
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-display font-black text-xs tracking-tight text-white uppercase truncate">
                  GDG ON CAMPUS
                </span>
                <span className="text-[9px] text-sky-400 font-mono tracking-wider truncate">
                  NFSU CYBER STUDIO
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors shrink-0"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav aria-label="Studio Navigation" className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              activeView === item.id || (item.matchIds ? item.matchIds.includes(activeView) : false);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-sky-500/20 text-white font-bold border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}
                />

                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <div className="truncate">
                      <span className="block truncate font-medium text-slate-200 whitespace-nowrap">
                        {item.label}
                      </span>
                      <span className="text-[9.5px] text-slate-400 block truncate font-sans">
                        {item.subtitle}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded border font-mono font-bold shrink-0 ml-1.5 ${
                          item.badgeColor || 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-2.5 border-t border-slate-800/80 space-y-2">
        <button
          type="button"
          onClick={onOpenCampusDirectory}
          className={`w-full flex items-center gap-2 p-2 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors text-left ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
          {!isCollapsed && (
            <div className="truncate text-[10px] font-mono">
              <span className="text-white font-bold block truncate">
                {verifiedCampusesCount} Verified Campuses
              </span>
              <span className="text-slate-400 text-[9px] block truncate">
                NFSU CSAS Directory
              </span>
            </div>
          )}
        </button>

        {!isCollapsed && (
          <div className="px-2 py-1 text-[9px] text-slate-400 font-mono flex items-center justify-between">
            <span>#GDGonNFSU</span>
            <span className="text-sky-400">STUDIO v3.0</span>
          </div>
        )}
      </div>
    </aside>
  );
}
