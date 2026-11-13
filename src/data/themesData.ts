// 32 Distinct Professional Design Themes for GDG on Campus NFSU Cybersecurity Studio
// Categorized into 5 specialized groups: Cybersecurity, Technology, Professional, Creative, and Event.

import { CyberStyle, AccentColor, PosterFont } from '../types/poster';

export type ThemeGroup = 'cybersecurity' | 'technology' | 'professional' | 'creative' | 'event';

export interface PosterThemeDefinition {
  id: string;
  name: string;
  group: ThemeGroup;
  groupLabel: string;
  tagline: string;
  cyberStyle: CyberStyle;
  accentColor: AccentColor;
  palette: {
    bg: string;
    cardBg: string;
    text: string;
    subtext: string;
    accent: string;
    accentHex: string;
    border: string;
    glow: string;
  };
  typography: {
    fontFamily: PosterFont;
    headlineWeight: string;
    headlineTracking: string;
    isUppercase: boolean;
  };
  decorative: {
    pattern: 'subtle-grid' | 'terminal-scanline' | 'hex-mesh' | 'radar-hud' | 'swiss-cross' | 'circuit-board' | 'mesh-dots' | 'none';
    showCornerMarks: boolean;
    showTelemetryBar: boolean;
    telemetryText?: string;
    kickerPrefix?: string;
    badgeStyle: string;
  };
  previewGradient: string;
}

export const THEME_GROUPS: { id: ThemeGroup; label: string; count: number; icon: string }[] = [
  { id: 'cybersecurity', label: 'Cybersecurity', count: 8, icon: '🛡️' },
  { id: 'technology', label: 'Technology', count: 6, icon: '⚡' },
  { id: 'professional', label: 'Professional', count: 6, icon: '🏛️' },
  { id: 'creative', label: 'Creative', count: 6, icon: '🎨' },
  { id: 'event', label: 'Event', count: 6, icon: '🚩' }
];

export const POSTER_THEMES: PosterThemeDefinition[] = [
  // =========================================================================
  // CYBERSECURITY (8 Themes)
  // =========================================================================
  {
    id: 'cyberpunk_neon',
    name: 'Cyberpunk Neon',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'High-contrast nocturnal glow with vivid electric cyan & magenta flares',
    cyberStyle: 'cyberpunk',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#050811]',
      cardBg: 'bg-[#091124]/70 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-sky-200/80',
      accent: 'text-cyan-400',
      accentHex: '#00F5FF',
      border: 'border-cyan-500/40',
      glow: 'shadow-[0_0_25px_rgba(0,245,255,0.25)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'CYBERPUNK_GRID // OPTICAL_FREQUENCY_480THz',
      kickerPrefix: '01 / SYSTEM // ',
      badgeStyle: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40'
    },
    previewGradient: 'from-cyan-900 via-[#050811] to-blue-900'
  },
  {
    id: 'dark_terminal',
    name: 'Dark Terminal',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'Authentic Linux root shell, Monospace CLI commands and green phosphors',
    cyberStyle: 'terminal',
    accentColor: 'green',
    palette: {
      bg: 'bg-[#020503]',
      cardBg: 'bg-[#040C07]/80 backdrop-blur-md',
      text: 'text-emerald-100',
      subtext: 'text-emerald-400/70',
      accent: 'text-emerald-400',
      accentHex: '#10B981',
      border: 'border-emerald-500/40',
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)]'
    },
    typography: {
      fontFamily: 'JetBrains Mono',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-normal',
      isUppercase: true
    },
    decorative: {
      pattern: 'terminal-scanline',
      showCornerMarks: false,
      showTelemetryBar: true,
      telemetryText: 'root@nfsu-terminal:~# ./execute_trace',
      kickerPrefix: '$ ',
      badgeStyle: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
    },
    previewGradient: 'from-emerald-950 via-[#020503] to-green-900'
  },
  {
    id: 'matrix_green',
    name: 'Matrix Green',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'Cascading digital rainfall with high-voltage emerald character cascade',
    cyberStyle: 'terminal',
    accentColor: 'green',
    palette: {
      bg: 'bg-[#000501]',
      cardBg: 'bg-[#021004]/75 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-emerald-300/80',
      accent: 'text-[#00FF66]',
      accentHex: '#00FF66',
      border: 'border-[#00FF66]/40',
      glow: 'shadow-[0_0_30px_rgba(0,255,102,0.3)]'
    },
    typography: {
      fontFamily: 'JetBrains Mono',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-wide',
      isUppercase: true
    },
    decorative: {
      pattern: 'terminal-scanline',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'MATRIX_STREAM_VERIFIED // 0x2A9F',
      kickerPrefix: 'DECODE // ',
      badgeStyle: 'bg-[#00FF66]/15 text-[#00FF66] border-[#00FF66]/50'
    },
    previewGradient: 'from-green-950 via-black to-[#003B14]'
  },
  {
    id: 'digital_forensics',
    name: 'Digital Forensics',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'Scientific precision, evidentiary chain of custody and forensic telemetry',
    cyberStyle: 'security_interface',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#060B14]',
      cardBg: 'bg-[#0B1528]/80 backdrop-blur-md',
      text: 'text-slate-100',
      subtext: 'text-slate-300',
      accent: 'text-sky-400',
      accentHex: '#38BDF8',
      border: 'border-sky-500/35',
      glow: 'shadow-[0_0_20px_rgba(56,189,248,0.2)]'
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headlineWeight: 'font-extrabold',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'radar-hud',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'NFSU_FORENSIC_CHAIN // EVIDENCE_ID#8834',
      kickerPrefix: 'CASE_FILE // ',
      badgeStyle: 'bg-sky-500/15 text-sky-200 border-sky-400/40'
    },
    previewGradient: 'from-sky-950 via-[#060B14] to-indigo-950'
  },
  {
    id: 'red_team',
    name: 'Red Team',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'Aggressive offensive security, exploit injection, crimson tactical alerts',
    cyberStyle: 'bold_type',
    accentColor: 'red',
    palette: {
      bg: 'bg-[#0D0305]',
      cardBg: 'bg-[#1E060A]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-rose-200/80',
      accent: 'text-rose-500',
      accentHex: '#F43F5E',
      border: 'border-rose-500/40',
      glow: 'shadow-[0_0_25px_rgba(244,63,94,0.3)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'ATTACK_SURFACE // ZERO_DAY_DEPLOYED',
      kickerPrefix: 'OFFENSIVE OPS // ',
      badgeStyle: 'bg-rose-500/20 text-rose-300 border-rose-500/50'
    },
    previewGradient: 'from-rose-950 via-[#0D0305] to-red-900'
  },
  {
    id: 'blue_team',
    name: 'Blue Team',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'Sovereign perimeter defense, threat hunting, resilience, cobalt shielding',
    cyberStyle: 'security_interface',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#030914]',
      cardBg: 'bg-[#071328]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-blue-200/80',
      accent: 'text-blue-400',
      accentHex: '#60A5FA',
      border: 'border-blue-500/40',
      glow: 'shadow-[0_0_25px_rgba(96,165,250,0.25)]'
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'hex-mesh',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'DEFENSE_MESH // PERIMETER_SHIELD_ACTIVE',
      kickerPrefix: 'DEFENSIVE SEC // ',
      badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-400/40'
    },
    previewGradient: 'from-blue-950 via-[#030914] to-indigo-950'
  },
  {
    id: 'zero_trust',
    name: 'Zero Trust',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'Never trust, always verify. Cryptographic isolation with stark monochrome contrast',
    cyberStyle: 'editorial',
    accentColor: 'titanium',
    palette: {
      bg: 'bg-[#08080A]',
      cardBg: 'bg-[#121216]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-zinc-300',
      accent: 'text-zinc-200',
      accentHex: '#E4E4E7',
      border: 'border-zinc-500/30',
      glow: 'shadow-[0_0_20px_rgba(228,228,231,0.15)]'
    },
    typography: {
      fontFamily: 'Bricolage Grotesque',
      headlineWeight: 'font-extrabold',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'swiss-cross',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'ZERO_TRUST_ENCLAVE // IDENTITY_REQUIRED',
      kickerPrefix: 'POLICY // ',
      badgeStyle: 'bg-zinc-800 text-zinc-100 border-zinc-600'
    },
    previewGradient: 'from-zinc-900 via-black to-stone-900'
  },
  {
    id: 'network_defense',
    name: 'Network Defense',
    group: 'cybersecurity',
    groupLabel: 'Cybersecurity',
    tagline: 'Packet tracing, BGP routing anomaly detection, sapphire server architecture',
    cyberStyle: 'security_interface',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#040A18]',
      cardBg: 'bg-[#081533]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-cyan-200/80',
      accent: 'text-cyan-400',
      accentHex: '#22D3EE',
      border: 'border-cyan-500/40',
      glow: 'shadow-[0_0_25px_rgba(34,211,238,0.25)]'
    },
    typography: {
      fontFamily: 'JetBrains Mono',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-normal',
      isUppercase: true
    },
    decorative: {
      pattern: 'circuit-board',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'PACKET_INSPECT // 100Gbps_BACKBONE',
      kickerPrefix: 'INFRA // ',
      badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
    },
    previewGradient: 'from-cyan-950 via-[#040A18] to-blue-950'
  },

  // =========================================================================
  // TECHNOLOGY (6 Themes)
  // =========================================================================
  {
    id: 'futuristic_blue',
    name: 'Futuristic Blue',
    group: 'technology',
    groupLabel: 'Technology',
    tagline: 'Aerospace grade electric cobalt with luminous optical interfaces',
    cyberStyle: 'tech_conference',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#050D20]',
      cardBg: 'bg-[#0B1A40]/75 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-sky-200',
      accent: 'text-sky-400',
      accentHex: '#38BDF8',
      border: 'border-sky-500/40',
      glow: 'shadow-[0_0_25px_rgba(56,189,248,0.25)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'FUTURE_TECH // NFSU_SYSTEMS',
      kickerPrefix: 'HORIZON // ',
      badgeStyle: 'bg-sky-500/20 text-sky-200 border-sky-400/50'
    },
    previewGradient: 'from-sky-950 via-[#050D20] to-blue-900'
  },
  {
    id: 'ai_intelligence',
    name: 'AI Intelligence',
    group: 'technology',
    groupLabel: 'Technology',
    tagline: 'Neural weights, generative Gemini aura and violet-cyan luminescence',
    cyberStyle: 'cyberpunk',
    accentColor: 'purple',
    palette: {
      bg: 'bg-[#0A0518]',
      cardBg: 'bg-[#150B30]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-purple-200/80',
      accent: 'text-purple-400',
      accentHex: '#C084FC',
      border: 'border-purple-500/40',
      glow: 'shadow-[0_0_25px_rgba(192,132,252,0.3)]'
    },
    typography: {
      fontFamily: 'Bricolage Grotesque',
      headlineWeight: 'font-extrabold',
      headlineTracking: 'tracking-tight',
      isUppercase: false
    },
    decorative: {
      pattern: 'mesh-dots',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'NEURAL_GRAPH // ATTENTION_HEADS_ACTIVATED',
      kickerPrefix: 'COGNITIVE // ',
      badgeStyle: 'bg-purple-500/20 text-purple-200 border-purple-400/50'
    },
    previewGradient: 'from-purple-950 via-[#0A0518] to-indigo-950'
  },
  {
    id: 'quantum_technology',
    name: 'Quantum Technology',
    group: 'technology',
    groupLabel: 'Technology',
    tagline: 'Superposition qubits, cryogenic brass and golden dilutors',
    cyberStyle: 'corporate',
    accentColor: 'amber',
    palette: {
      bg: 'bg-[#0F0C06]',
      cardBg: 'bg-[#1E170A]/80 backdrop-blur-md',
      text: 'text-amber-50',
      subtext: 'text-amber-200/80',
      accent: 'text-amber-400',
      accentHex: '#FBBF24',
      border: 'border-amber-500/40',
      glow: 'shadow-[0_0_25px_rgba(251,191,36,0.25)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-extrabold',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'QUANTUM_ENCLAVE // COHERENCE_TIME_99.9%',
      kickerPrefix: 'QUBITS // ',
      badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/50'
    },
    previewGradient: 'from-amber-950 via-[#0F0C06] to-yellow-950'
  },
  {
    id: 'digital_grid',
    name: 'Digital Grid',
    group: 'technology',
    groupLabel: 'Technology',
    tagline: 'Systematic wireframe matrices and calibrated Cartesian coordinates',
    cyberStyle: 'security_interface',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#040711]',
      cardBg: 'bg-[#091024]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-sky-300/80',
      accent: 'text-sky-400',
      accentHex: '#38BDF8',
      border: 'border-sky-500/35',
      glow: 'shadow-[0_0_20px_rgba(56,189,248,0.2)]'
    },
    typography: {
      fontFamily: 'JetBrains Mono',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-normal',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'CARTESIAN_GRID // X:429.1 Y:812.6',
      kickerPrefix: 'MATRIX // ',
      badgeStyle: 'bg-sky-500/15 text-sky-200 border-sky-400/40'
    },
    previewGradient: 'from-sky-950 via-[#040711] to-slate-900'
  },
  {
    id: 'holographic_interface',
    name: 'Holographic Interface',
    group: 'technology',
    groupLabel: 'Technology',
    tagline: 'Floating glass heads-up display with neon turquoise refractions',
    cyberStyle: 'cyberpunk',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#040C16]',
      cardBg: 'bg-[#081B30]/70 backdrop-blur-xl',
      text: 'text-white',
      subtext: 'text-cyan-200',
      accent: 'text-cyan-300',
      accentHex: '#67E8F9',
      border: 'border-cyan-400/50',
      glow: 'shadow-[0_0_30px_rgba(103,232,249,0.3)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'radar-hud',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'HOLOGRAM_ACTIVE // FIELD_STRENGTH:100%',
      kickerPrefix: 'HUD // ',
      badgeStyle: 'bg-cyan-400/20 text-cyan-200 border-cyan-300/60'
    },
    previewGradient: 'from-cyan-950 via-[#040C16] to-teal-950'
  },
  {
    id: 'abstract_geometry',
    name: 'Abstract Geometry',
    group: 'technology',
    groupLabel: 'Technology',
    tagline: 'Sharp angular polyhedra, isometric facets and stark architectural shadows',
    cyberStyle: 'bold_type',
    accentColor: 'titanium',
    palette: {
      bg: 'bg-[#090A0D]',
      cardBg: 'bg-[#13151D]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-slate-300',
      accent: 'text-slate-200',
      accentHex: '#E2E8F0',
      border: 'border-white/20',
      glow: 'shadow-[0_0_20px_rgba(255,255,255,0.15)]'
    },
    typography: {
      fontFamily: 'Bricolage Grotesque',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'swiss-cross',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'GEOM // ',
      badgeStyle: 'bg-white/10 text-white border-white/25'
    },
    previewGradient: 'from-slate-900 via-[#090A0D] to-stone-900'
  },

  // =========================================================================
  // PROFESSIONAL (6 Themes)
  // =========================================================================
  {
    id: 'swiss_editorial',
    name: 'Swiss Editorial',
    group: 'professional',
    groupLabel: 'Professional',
    tagline: 'International Typographic Style, asymmetric grid and disciplined whitespace',
    cyberStyle: 'editorial',
    accentColor: 'titanium',
    palette: {
      bg: 'bg-[#0C0D0E]',
      cardBg: 'bg-[#151719]/85 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-stone-300',
      accent: 'text-white',
      accentHex: '#FFFFFF',
      border: 'border-white/20',
      glow: 'shadow-none'
    },
    typography: {
      fontFamily: 'Bricolage Grotesque',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'swiss-cross',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'EDITION 2026 / ',
      badgeStyle: 'bg-white text-black font-bold'
    },
    previewGradient: 'from-stone-900 via-[#0C0D0E] to-neutral-900'
  },
  {
    id: 'minimal_corporate',
    name: 'Minimal Corporate',
    group: 'professional',
    groupLabel: 'Professional',
    tagline: 'Crisp corporate governance, refined navy tones and understated elegance',
    cyberStyle: 'corporate',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#0A101D]',
      cardBg: 'bg-[#111B30]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-slate-300',
      accent: 'text-sky-400',
      accentHex: '#38BDF8',
      border: 'border-slate-700/60',
      glow: 'shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-tight',
      isUppercase: false
    },
    decorative: {
      pattern: 'none',
      showCornerMarks: false,
      showTelemetryBar: false,
      badgeStyle: 'bg-sky-500/10 text-sky-300 border-sky-400/30'
    },
    previewGradient: 'from-slate-900 via-[#0A101D] to-sky-950'
  },
  {
    id: 'modern_conference',
    name: 'Modern Conference',
    group: 'professional',
    groupLabel: 'Professional',
    tagline: 'High-visibility summit keynotes, authoritative schedule tracks and badges',
    cyberStyle: 'tech_conference',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#080D1A]',
      cardBg: 'bg-[#0E162B]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-slate-300',
      accent: 'text-blue-400',
      accentHex: '#60A5FA',
      border: 'border-blue-500/30',
      glow: 'shadow-[0_0_20px_rgba(96,165,250,0.2)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'NFSU_NATIONAL_SUMMIT // OCT_2026',
      kickerPrefix: 'CONFERENCE // ',
      badgeStyle: 'bg-blue-500/20 text-blue-200 border-blue-400/40'
    },
    previewGradient: 'from-blue-950 via-[#080D1A] to-slate-900'
  },
  {
    id: 'bold_typography',
    name: 'Bold Typography',
    group: 'professional',
    groupLabel: 'Professional',
    tagline: 'Massive, room-commanding display font weights that refuse to be ignored',
    cyberStyle: 'bold_type',
    accentColor: 'titanium',
    palette: {
      bg: 'bg-[#070707]',
      cardBg: 'bg-[#141414]/90 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-stone-300',
      accent: 'text-stone-100',
      accentHex: '#F5F5F4',
      border: 'border-white/20',
      glow: 'shadow-2xl'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'none',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'STATEMENT // ',
      badgeStyle: 'bg-white text-black font-black'
    },
    previewGradient: 'from-neutral-900 via-[#070707] to-black'
  },
  {
    id: 'black_gold',
    name: 'Premium Black & Gold',
    group: 'professional',
    groupLabel: 'Professional',
    tagline: 'Executive university honours, warm brass gilding and velvet midnight carbon',
    cyberStyle: 'corporate',
    accentColor: 'amber',
    palette: {
      bg: 'bg-[#0B0906]',
      cardBg: 'bg-[#18130B]/85 backdrop-blur-md',
      text: 'text-amber-100',
      subtext: 'text-amber-200/70',
      accent: 'text-amber-400',
      accentHex: '#F59E0B',
      border: 'border-amber-500/40',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-extrabold',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'HONOURS // ',
      badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-400/50'
    },
    previewGradient: 'from-amber-950 via-[#0B0906] to-stone-900'
  },
  {
    id: 'clean_academic',
    name: 'Clean Academic',
    group: 'professional',
    groupLabel: 'Professional',
    tagline: 'Formal National Forensic Sciences University institutional publication look',
    cyberStyle: 'editorial',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#0A0E18]',
      cardBg: 'bg-[#101726]/85 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-slate-300',
      accent: 'text-sky-400',
      accentHex: '#38BDF8',
      border: 'border-slate-600/50',
      glow: 'shadow-lg'
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-normal',
      isUppercase: false
    },
    decorative: {
      pattern: 'none',
      showCornerMarks: false,
      showTelemetryBar: false,
      kickerPrefix: 'OFFICIAL ACADEMIC NOTICE // ',
      badgeStyle: 'bg-sky-500/10 text-sky-300 border-sky-400/30'
    },
    previewGradient: 'from-slate-900 via-[#0A0E18] to-blue-950'
  },

  // =========================================================================
  // CREATIVE (6 Themes)
  // =========================================================================
  {
    id: 'retro_computing',
    name: 'Retro Computing',
    group: 'creative',
    groupLabel: 'Creative',
    tagline: '1980s monochrome CRT curvature, Commodore PET / Apple II aesthetics',
    cyberStyle: 'terminal',
    accentColor: 'amber',
    palette: {
      bg: 'bg-[#0A0802]',
      cardBg: 'bg-[#151004]/85 backdrop-blur-md',
      text: 'text-amber-200',
      subtext: 'text-amber-400/70',
      accent: 'text-amber-400',
      accentHex: '#FBBF24',
      border: 'border-amber-500/50',
      glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]'
    },
    typography: {
      fontFamily: 'JetBrains Mono',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-widest',
      isUppercase: true
    },
    decorative: {
      pattern: 'terminal-scanline',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'BASIC_V2.0 // 64K_RAM_SYSTEM',
      kickerPrefix: 'READY. > ',
      badgeStyle: 'bg-amber-400/20 text-amber-200 border-amber-400/60'
    },
    previewGradient: 'from-amber-950 via-[#0A0802] to-yellow-950'
  },
  {
    id: 'glitch_art',
    name: 'Glitch Art',
    group: 'creative',
    groupLabel: 'Creative',
    tagline: 'Chromatic aberration offsets, signal corruption and subversive digital noise',
    cyberStyle: 'cyberpunk',
    accentColor: 'red',
    palette: {
      bg: 'bg-[#080205]',
      cardBg: 'bg-[#15040B]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-rose-200',
      accent: 'text-rose-400',
      accentHex: '#FB7185',
      border: 'border-rose-500/50',
      glow: 'shadow-[0_0_25px_rgba(251,113,133,0.35)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'terminal-scanline',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'ERR_BUFFER_OVERFLOW // 0xDEADC0DE',
      kickerPrefix: 'SIGNAL_CORRUPT // ',
      badgeStyle: 'bg-rose-500/25 text-rose-200 border-rose-400/60'
    },
    previewGradient: 'from-rose-950 via-[#080205] to-fuchsia-950'
  },
  {
    id: 'brutalist_poster',
    name: 'Brutalist Poster',
    group: 'creative',
    groupLabel: 'Creative',
    tagline: 'Raw concrete borders, hyper-dense functional typography and anti-decorative honesty',
    cyberStyle: 'bold_type',
    accentColor: 'titanium',
    palette: {
      bg: 'bg-[#050505]',
      cardBg: 'bg-[#111111]/95',
      text: 'text-white',
      subtext: 'text-stone-300',
      accent: 'text-stone-100',
      accentHex: '#FAFAFA',
      border: 'border-2 border-white',
      glow: 'shadow-none'
    },
    typography: {
      fontFamily: 'Bricolage Grotesque',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'none',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'DOCUMENT NO. 01 / ',
      badgeStyle: 'bg-white text-black font-black border-2 border-white'
    },
    previewGradient: 'from-neutral-900 via-[#050505] to-black'
  },
  {
    id: 'gradient_glass',
    name: 'Gradient Glass',
    group: 'creative',
    groupLabel: 'Creative',
    tagline: 'Luminous multi-stop glassmorphic panels floating over ambient cyber gradients',
    cyberStyle: 'tech_conference',
    accentColor: 'purple',
    palette: {
      bg: 'bg-[#0B0517]',
      cardBg: 'bg-[#1A0C33]/60 backdrop-blur-xl',
      text: 'text-white',
      subtext: 'text-purple-200',
      accent: 'text-purple-300',
      accentHex: '#D8B4FE',
      border: 'border-purple-400/35',
      glow: 'shadow-[0_15px_35px_rgba(216,180,254,0.2)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-extrabold',
      headlineTracking: 'tracking-tight',
      isUppercase: false
    },
    decorative: {
      pattern: 'mesh-dots',
      showCornerMarks: false,
      showTelemetryBar: false,
      kickerPrefix: 'SPECTRUM // ',
      badgeStyle: 'bg-purple-500/20 text-purple-200 border-purple-300/40'
    },
    previewGradient: 'from-purple-950 via-[#0B0517] to-indigo-950'
  },
  {
    id: 'isometric_technology',
    name: 'Isometric Technology',
    group: 'creative',
    groupLabel: 'Creative',
    tagline: 'Architectural isometric axonometry, blueprint precision and 3D silicon cubes',
    cyberStyle: 'security_interface',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#060A14]',
      cardBg: 'bg-[#0C152B]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-sky-200',
      accent: 'text-sky-400',
      accentHex: '#38BDF8',
      border: 'border-sky-500/40',
      glow: 'shadow-[0_0_20px_rgba(56,189,248,0.25)]'
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'AXONOMETRIC_PROJECTION // ISO_30_DEG',
      kickerPrefix: '3D BLUEPRINT // ',
      badgeStyle: 'bg-sky-500/20 text-sky-200 border-sky-400/40'
    },
    previewGradient: 'from-sky-950 via-[#060A14] to-blue-950'
  },
  {
    id: 'experimental_typography',
    name: 'Experimental Typography',
    group: 'creative',
    groupLabel: 'Creative',
    tagline: 'Avant-garde kinetic type layout, variable font expressions and bold breaks',
    cyberStyle: 'bold_type',
    accentColor: 'green',
    palette: {
      bg: 'bg-[#050906]',
      cardBg: 'bg-[#0C150E]/85 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-emerald-200',
      accent: 'text-emerald-400',
      accentHex: '#34D399',
      border: 'border-emerald-500/35',
      glow: 'shadow-[0_0_25px_rgba(52,211,153,0.2)]'
    },
    typography: {
      fontFamily: 'Bricolage Grotesque',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'swiss-cross',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'AVANT-GARDE // ',
      badgeStyle: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40'
    },
    previewGradient: 'from-emerald-950 via-[#050906] to-slate-900'
  },

  // =========================================================================
  // EVENT (6 Themes)
  // =========================================================================
  {
    id: 'hackathon_energy',
    name: 'Hackathon Energy',
    group: 'event',
    groupLabel: 'Event',
    tagline: '36-hour sprint adrenaline, high-wattage electricity and builder momentum',
    cyberStyle: 'cyberpunk',
    accentColor: 'amber',
    palette: {
      bg: 'bg-[#0B0703]',
      cardBg: 'bg-[#1A0F05]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-amber-200',
      accent: 'text-amber-400',
      accentHex: '#FBBF24',
      border: 'border-amber-500/45',
      glow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'HACKATHON_SPRINT // T-MINUS_LIVE_BUILD',
      kickerPrefix: 'NON-STOP BUILD // ',
      badgeStyle: 'bg-amber-500/25 text-amber-200 border-amber-400/60 font-black'
    },
    previewGradient: 'from-amber-950 via-[#0B0703] to-red-950'
  },
  {
    id: 'ctf_competition',
    name: 'CTF Competition',
    group: 'event',
    groupLabel: 'Event',
    tagline: 'Capture The Flag scoreboard, binary exploitation arena and flag submission telemetry',
    cyberStyle: 'terminal',
    accentColor: 'red',
    palette: {
      bg: 'bg-[#080204]',
      cardBg: 'bg-[#140508]/85 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-rose-200',
      accent: 'text-rose-400',
      accentHex: '#F43F5E',
      border: 'border-rose-500/45',
      glow: 'shadow-[0_0_25px_rgba(244,63,94,0.3)]'
    },
    typography: {
      fontFamily: 'JetBrains Mono',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'terminal-scanline',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'CTF_ARENA // FLAG{ROOT_ACCESS_CLAIMED}',
      kickerPrefix: 'CTF TOURNAMENT // ',
      badgeStyle: 'bg-rose-500/20 text-rose-200 border-rose-400/50'
    },
    previewGradient: 'from-rose-950 via-[#080204] to-red-950'
  },
  {
    id: 'technical_workshop',
    name: 'Technical Workshop',
    group: 'event',
    groupLabel: 'Event',
    tagline: 'Hands-on practical code lab, instructor screen-shares and step-by-step tracks',
    cyberStyle: 'security_interface',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#050C18]',
      cardBg: 'bg-[#0B1830]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-cyan-200',
      accent: 'text-cyan-400',
      accentHex: '#22D3EE',
      border: 'border-cyan-500/40',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.25)]'
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headlineWeight: 'font-bold',
      headlineTracking: 'tracking-tight',
      isUppercase: false
    },
    decorative: {
      pattern: 'circuit-board',
      showCornerMarks: true,
      showTelemetryBar: true,
      telemetryText: 'HANDS-ON_LAB // VIRTUAL_SANDBOX_ACTIVE',
      kickerPrefix: 'WORKSHOP // ',
      badgeStyle: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40'
    },
    previewGradient: 'from-cyan-950 via-[#050C18] to-blue-950'
  },
  {
    id: 'speaker_spotlight',
    name: 'Speaker Spotlight',
    group: 'event',
    groupLabel: 'Event',
    tagline: 'Distinguished keynotes, executive speaker portraits and credential spotlight',
    cyberStyle: 'corporate',
    accentColor: 'amber',
    palette: {
      bg: 'bg-[#0A0D15]',
      cardBg: 'bg-[#121A2C]/85 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-amber-100/80',
      accent: 'text-amber-400',
      accentHex: '#FBBF24',
      border: 'border-amber-400/40',
      glow: 'shadow-[0_0_20px_rgba(251,191,36,0.2)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'DISTINGUISHED GUEST // ',
      badgeStyle: 'bg-amber-500/20 text-amber-200 border-amber-400/50 font-bold'
    },
    previewGradient: 'from-amber-950 via-[#0A0D15] to-slate-900'
  },
  {
    id: 'recruitment_campaign',
    name: 'Recruitment Campaign',
    group: 'event',
    groupLabel: 'Event',
    tagline: 'Next-gen student builder intake, call for core leads and community recruitment',
    cyberStyle: 'bold_type',
    accentColor: 'blue',
    palette: {
      bg: 'bg-[#040815]',
      cardBg: 'bg-[#0A122E]/80 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-sky-200',
      accent: 'text-sky-400',
      accentHex: '#38BDF8',
      border: 'border-sky-500/40',
      glow: 'shadow-[0_0_25px_rgba(56,189,248,0.25)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tighter',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'CALL FOR BUILDERS // ',
      badgeStyle: 'bg-sky-500/20 text-sky-200 border-sky-400/50'
    },
    previewGradient: 'from-sky-950 via-[#040815] to-blue-900'
  },
  {
    id: 'community_celebration',
    name: 'Community Celebration',
    group: 'event',
    groupLabel: 'Event',
    tagline: 'Trophy awards, tournament champions, national victory honors and community pride',
    cyberStyle: 'tech_conference',
    accentColor: 'amber',
    palette: {
      bg: 'bg-[#0B0912]',
      cardBg: 'bg-[#161224]/85 backdrop-blur-md',
      text: 'text-white',
      subtext: 'text-amber-200',
      accent: 'text-amber-400',
      accentHex: '#FBBF24',
      border: 'border-amber-400/45',
      glow: 'shadow-[0_0_30px_rgba(251,191,36,0.3)]'
    },
    typography: {
      fontFamily: 'Syne',
      headlineWeight: 'font-black',
      headlineTracking: 'tracking-tight',
      isUppercase: true
    },
    decorative: {
      pattern: 'subtle-grid',
      showCornerMarks: true,
      showTelemetryBar: false,
      kickerPrefix: 'COMMUNITY HONOURS // ',
      badgeStyle: 'bg-amber-400/20 text-amber-200 border-amber-300/50 font-black'
    },
    previewGradient: 'from-amber-950 via-[#0B0912] to-purple-950'
  }
];

export const TOTAL_THEMES_COUNT = POSTER_THEMES.length;
