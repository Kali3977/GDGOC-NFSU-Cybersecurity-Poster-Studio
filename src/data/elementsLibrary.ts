export type ElementCategory =
  | 'cyber_icons'
  | 'network_circuits'
  | 'geometric_shapes'
  | 'badges_stickers'
  | 'dividers_arrows'
  | 'isometric_3d';

export interface DecorativeSvgAsset {
  id: string;
  name: string;
  category: ElementCategory;
  categoryLabel: string;
  defaultColor: string;
  defaultWidthPct: number;
  defaultHeightPct: number;
  viewBox: string;
  svgInner: string;
  tags: string[];
}

export const ELEMENT_CATEGORIES: { id: ElementCategory; label: string }[] = [
  { id: 'cyber_icons', label: 'Cybersecurity Icons' },
  { id: 'network_circuits', label: 'Circuits & Network' },
  { id: 'geometric_shapes', label: 'Geometric & Frames' },
  { id: 'badges_stickers', label: 'Badges & Stickers' },
  { id: 'dividers_arrows', label: 'Lines & Callouts' },
  { id: 'isometric_3d', label: '3D Isometric Tech' }
];

export const DECORATIVE_ELEMENTS_LIBRARY: DecorativeSvgAsset[] = [
  // Cybersecurity Icons
  {
    id: 'el_shield_lock',
    name: 'Zero-Trust Shield Lock',
    category: 'cyber_icons',
    categoryLabel: 'Cybersecurity Icons',
    defaultColor: '#38BDF8',
    defaultWidthPct: 16,
    defaultHeightPct: 16,
    viewBox: '0 0 100 100',
    svgInner: `<path d="M50 8L16 22v26c0 22 14.5 39.5 34 44 19.5-4.5 34-22 34-44V22L50 8z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><rect x="36" y="46" width="28" height="22" rx="4" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="4"/><path d="M41 46v-7a9 9 0 0 1 18 0v7" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="57" r="3" fill="currentColor"/>`,
    tags: ['shield', 'lock', 'security', 'zero-trust']
  },
  {
    id: 'el_fingerprint_scan',
    name: 'Biometric Fingerprint',
    category: 'cyber_icons',
    categoryLabel: 'Cybersecurity Icons',
    defaultColor: '#22D3EE',
    defaultWidthPct: 16,
    defaultHeightPct: 16,
    viewBox: '0 0 100 100',
    svgInner: `<path d="M22 45c0-16 12-28 28-28s28 12 28 28" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M30 52c0-11 9-20 20-20s20 9 20 20c0 14-4 25-10 34" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M38 55c0-7 5-12 12-12s12 5 12 12c0 12-3 22-8 31" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M46 56c0-2.5 2-4.5 4-4.5s4 2 4 4.5c0 10-2 19-6 28" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/>`,
    tags: ['biometric', 'forensics', 'fingerprint']
  },
  {
    id: 'el_bug_exploit',
    name: 'Bug Exploit Vector',
    category: 'cyber_icons',
    categoryLabel: 'Cybersecurity Icons',
    defaultColor: '#F43F5E',
    defaultWidthPct: 15,
    defaultHeightPct: 15,
    viewBox: '0 0 100 100',
    svgInner: `<rect x="34" y="34" width="32" height="40" rx="16" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="4"/><path d="M38 34a12 12 0 0 1 24 0" fill="none" stroke="currentColor" stroke-width="4"/><line x1="50" y1="36" x2="50" y2="74" stroke="currentColor" stroke-width="3"/><path d="M34 44H16M34 56H14M36 68H20M66 44h18M66 56h20M64 68h16M40 24l-8-10M60 24l8-10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`,
    tags: ['bug', 'bounty', 'ctf', 'exploit']
  },
  {
    id: 'el_radar_target',
    name: 'SOC Threat Radar',
    category: 'cyber_icons',
    categoryLabel: 'Cybersecurity Icons',
    defaultColor: '#10B981',
    defaultWidthPct: 18,
    defaultHeightPct: 18,
    viewBox: '0 0 100 100',
    svgInner: `<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5 5"/><circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="4" x2="50" y2="96" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.6"/><line x1="4" y1="50" x2="96" y2="50" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.6"/><path d="M50 50L78 22" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="68" cy="34" r="4" fill="currentColor"/>`,
    tags: ['radar', 'soc', 'hud', 'telemetry']
  },
  {
    id: 'el_crypto_key',
    name: 'Cryptographic Key',
    category: 'cyber_icons',
    categoryLabel: 'Cybersecurity Icons',
    defaultColor: '#FBBF24',
    defaultWidthPct: 16,
    defaultHeightPct: 16,
    viewBox: '0 0 100 100',
    svgInner: `<circle cx="32" cy="50" r="16" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="50" r="5" fill="currentColor"/><path d="M48 50h38v14M72 50v10" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
    tags: ['key', 'ssh', 'crypto']
  },
  {
    id: 'el_terminal_prompt',
    name: 'Root Shell Emblem',
    category: 'cyber_icons',
    categoryLabel: 'Cybersecurity Icons',
    defaultColor: '#00FF66',
    defaultWidthPct: 18,
    defaultHeightPct: 14,
    viewBox: '0 0 120 90',
    svgInner: `<rect x="6" y="6" width="108" height="78" rx="10" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="4"/><line x1="6" y1="24" x2="114" y2="24" stroke="currentColor" stroke-width="3"/><circle cx="20" cy="15" r="3.5" fill="currentColor"/><circle cx="32" cy="15" r="3.5" fill="currentColor"/><path d="M24 44l14 11-14 11" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><line x1="48" y1="66" x2="76" y2="66" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`,
    tags: ['terminal', 'cli', 'bash', 'linux']
  },

  // Circuits & Network
  {
    id: 'el_circuit_corner',
    name: 'Circuit Trace Bus',
    category: 'network_circuits',
    categoryLabel: 'Circuits & Network',
    defaultColor: '#00F5FF',
    defaultWidthPct: 26,
    defaultHeightPct: 22,
    viewBox: '0 0 140 120',
    svgInner: `<path d="M10 10h54l16 16h44M10 34h36l18 18h46M10 58h24l18 18h30" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><circle cx="124" cy="26" r="5" fill="currentColor"/><circle cx="110" cy="52" r="5" fill="currentColor"/><circle cx="82" cy="76" r="5" fill="currentColor"/><path d="M10 86h18v22" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="28" cy="108" r="5" fill="none" stroke="currentColor" stroke-width="3"/>`,
    tags: ['circuit', 'pcb', 'traces', 'hardware']
  },
  {
    id: 'el_network_graph',
    name: 'Distributed Mesh Nodes',
    category: 'network_circuits',
    categoryLabel: 'Circuits & Network',
    defaultColor: '#60A5FA',
    defaultWidthPct: 24,
    defaultHeightPct: 20,
    viewBox: '0 0 140 110',
    svgInner: `<line x1="25" y1="25" x2="75" y2="18" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/><line x1="75" y1="18" x2="115" y2="48" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/><line x1="25" y1="25" x2="55" y2="65" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/><line x1="75" y1="18" x2="55" y2="65" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/><line x1="55" y1="65" x2="115" y2="48" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/><line x1="55" y1="65" x2="90" y2="92" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/><circle cx="25" cy="25" r="7" fill="currentColor"/><circle cx="75" cy="18" r="9" fill="currentColor"/><circle cx="115" cy="48" r="7" fill="currentColor"/><circle cx="55" cy="65" r="10" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="3.5"/><circle cx="90" cy="92" r="6" fill="currentColor"/>`,
    tags: ['network', 'mesh', 'nodes', 'graph']
  },
  {
    id: 'el_hex_cluster',
    name: 'Hexagon Cyber Cluster',
    category: 'network_circuits',
    categoryLabel: 'Circuits & Network',
    defaultColor: '#38BDF8',
    defaultWidthPct: 20,
    defaultHeightPct: 20,
    viewBox: '0 0 120 120',
    svgInner: `<polygon points="60,10 88,26 88,58 60,74 32,58 32,26" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="3.5"/><polygon points="32,58 60,74 60,106 32,122 4,106 4,74" fill="none" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/><polygon points="88,58 116,74 116,106 88,122 60,106 60,74" fill="none" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.7"/>`,
    tags: ['hexagon', 'cluster', 'firewall']
  },
  {
    id: 'el_microchip_die',
    name: 'Silicon Coprocessor Chip',
    category: 'network_circuits',
    categoryLabel: 'Circuits & Network',
    defaultColor: '#C084FC',
    defaultWidthPct: 16,
    defaultHeightPct: 16,
    viewBox: '0 0 100 100',
    svgInner: `<rect x="24" y="24" width="52" height="52" rx="6" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="4"/><rect x="38" y="38" width="24" height="24" rx="2" fill="currentColor"/><path d="M36 24V10M50 24V10M64 24V10M36 76v14M50 76v14M64 76v14M24 36H10M24 50H10M24 64H10M76 36h14M76 50h14M76 64h14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`,
    tags: ['cpu', 'chip', 'hardware', 'silicon']
  },

  // Geometric & Frames
  {
    id: 'el_hud_brackets',
    name: 'HUD Corner Reticle',
    category: 'geometric_shapes',
    categoryLabel: 'Geometric & Frames',
    defaultColor: '#38BDF8',
    defaultWidthPct: 28,
    defaultHeightPct: 20,
    viewBox: '0 0 140 100',
    svgInner: `<path d="M6 26V6h20M114 6h20v20M6 74v20h20M114 94h20V74" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="square"/><rect x="18" y="18" width="104" height="64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4" stroke-opacity="0.5"/>`,
    tags: ['frame', 'hud', 'reticle', 'corners']
  },
  {
    id: 'el_chamfer_panel',
    name: 'Chamfer Cyber Frame',
    category: 'geometric_shapes',
    categoryLabel: 'Geometric & Frames',
    defaultColor: '#00F5FF',
    defaultWidthPct: 34,
    defaultHeightPct: 18,
    viewBox: '0 0 180 90',
    svgInner: `<polygon points="16,4 176,4 176,74 164,86 4,86 4,16" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="3.5"/>`,
    tags: ['chamfer', 'panel', 'card', 'sci-fi']
  },
  {
    id: 'el_hazard_stripes',
    name: 'Security Caution Stripes',
    category: 'geometric_shapes',
    categoryLabel: 'Geometric & Frames',
    defaultColor: '#F59E0B',
    defaultWidthPct: 28,
    defaultHeightPct: 6,
    viewBox: '0 0 200 32',
    svgInner: `<g fill="currentColor"><polygon points="0,32 16,0 32,0 16,32"/><polygon points="32,32 48,0 64,0 48,32"/><polygon points="64,32 80,0 96,0 80,32"/><polygon points="96,32 112,0 128,0 112,32"/><polygon points="128,32 144,0 160,0 144,32"/><polygon points="160,32 176,0 192,0 176,32"/></g>`,
    tags: ['hazard', 'alert', 'stripes', 'warning']
  },
  {
    id: 'el_concentric_orbit',
    name: 'Orbital Concentric Rings',
    category: 'geometric_shapes',
    categoryLabel: 'Geometric & Frames',
    defaultColor: '#818CF8',
    defaultWidthPct: 22,
    defaultHeightPct: 22,
    viewBox: '0 0 120 120',
    svgInner: `<circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="10 6"/><circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="60" cy="60" r="18" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2"/><circle cx="94" cy="60" r="5" fill="currentColor"/>`,
    tags: ['orbit', 'rings', 'abstract', 'geometric']
  },
  {
    id: 'el_swiss_cross_cluster',
    name: 'Swiss Alignment Marks',
    category: 'geometric_shapes',
    categoryLabel: 'Geometric & Frames',
    defaultColor: '#E2E8F0',
    defaultWidthPct: 14,
    defaultHeightPct: 14,
    viewBox: '0 0 100 100',
    svgInner: `<path d="M22 10v24M10 22h24M78 10v24M66 22h24M22 66v24M10 78h24M78 66v24M66 78h24" stroke="currentColor" stroke-width="4" stroke-linecap="square"/>`,
    tags: ['swiss', 'cross', 'grid', 'minimal']
  },

  // Badges & Stickers
  {
    id: 'el_badge_ctf_verified',
    name: 'CTF Arena Seal',
    category: 'badges_stickers',
    categoryLabel: 'Badges & Stickers',
    defaultColor: '#38BDF8',
    defaultWidthPct: 24,
    defaultHeightPct: 10,
    viewBox: '0 0 220 72',
    svgInner: `<rect x="3" y="3" width="214" height="66" rx="10" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="3.5"/><circle cx="34" cy="36" r="12" fill="currentColor"/><path d="M29 36l4 4 7-8" fill="none" stroke="#050811" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><text x="58" y="32" fill="currentColor" font-family="monospace" font-size="14" font-weight="700">OFFICIAL EVENT</text><text x="58" y="52" fill="#FFFFFF" font-family="sans-serif" font-size="16" font-weight="800">CTF SANDBOX</text>`,
    tags: ['badge', 'ctf', 'sticker', 'seal']
  },
  {
    id: 'el_badge_live_lab',
    name: 'Live Cyber Lab Tag',
    category: 'badges_stickers',
    categoryLabel: 'Badges & Stickers',
    defaultColor: '#10B981',
    defaultWidthPct: 22,
    defaultHeightPct: 8,
    viewBox: '0 0 200 58',
    svgInner: `<rect x="3" y="3" width="194" height="52" rx="6" fill="#04120B" stroke="currentColor" stroke-width="3"/><circle cx="28" cy="29" r="7" fill="currentColor"/><text x="46" y="35" fill="currentColor" font-family="monospace" font-size="19" font-weight="800">LIVE LAB // ON</text>`,
    tags: ['live', 'badge', 'workshop', 'sticker']
  },
  {
    id: 'el_badge_zero_day',
    name: 'Security Bulletin Stamp',
    category: 'badges_stickers',
    categoryLabel: 'Badges & Stickers',
    defaultColor: '#F43F5E',
    defaultWidthPct: 24,
    defaultHeightPct: 9,
    viewBox: '0 0 210 64',
    svgInner: `<polygon points="12,4 206,4 198,60 4,60" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="3.5"/><text x="105" y="39" text-anchor="middle" fill="currentColor" font-family="monospace" font-size="20" font-weight="900">PRIORITY // SEC</text>`,
    tags: ['alert', 'stamp', 'sticker', 'red-team']
  },
  {
    id: 'el_starburst_award',
    name: 'Championship Starburst',
    category: 'badges_stickers',
    categoryLabel: 'Badges & Stickers',
    defaultColor: '#FBBF24',
    defaultWidthPct: 16,
    defaultHeightPct: 16,
    viewBox: '0 0 100 100',
    svgInner: `<polygon points="50,6 61,30 88,24 72,47 94,62 67,69 72,94 50,78 28,94 33,69 6,62 28,47 12,24 39,30" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/><text x="50" y="56" text-anchor="middle" fill="currentColor" font-family="monospace" font-size="18" font-weight="900">#1</text>`,
    tags: ['award', 'trophy', 'achievement', 'sticker']
  },

  // Lines & Callouts
  {
    id: 'el_divider_tech',
    name: 'Telemetry Divider Rule',
    category: 'dividers_arrows',
    categoryLabel: 'Lines & Callouts',
    defaultColor: '#38BDF8',
    defaultWidthPct: 48,
    defaultHeightPct: 4,
    viewBox: '0 0 300 24',
    svgInner: `<circle cx="10" cy="12" r="5" fill="currentColor"/><line x1="15" y1="12" x2="110" y2="12" stroke="currentColor" stroke-width="3"/><rect x="118" y="6" width="64" height="12" rx="2" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="2"/><line x1="190" y1="12" x2="285" y2="12" stroke="currentColor" stroke-width="3" stroke-dasharray="8 6"/><circle cx="290" cy="12" r="5" fill="currentColor"/>`,
    tags: ['divider', 'line', 'separator']
  },
  {
    id: 'el_callout_arrow',
    name: 'Vector Callout Arrow',
    category: 'dividers_arrows',
    categoryLabel: 'Lines & Callouts',
    defaultColor: '#22D3EE',
    defaultWidthPct: 18,
    defaultHeightPct: 10,
    viewBox: '0 0 140 70',
    svgInner: `<path d="M12 52L58 18h64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="106,8 124,18 106,28" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="52" r="6" fill="currentColor"/>`,
    tags: ['arrow', 'callout', 'pointer']
  },
  {
    id: 'el_signal_wave',
    name: 'Oscilloscope Signal Wave',
    category: 'dividers_arrows',
    categoryLabel: 'Lines & Callouts',
    defaultColor: '#00FF66',
    defaultWidthPct: 36,
    defaultHeightPct: 10,
    viewBox: '0 0 240 60',
    svgInner: `<polyline points="4,30 34,30 48,10 64,50 78,16 92,44 106,30 146,30 158,8 172,52 186,22 200,38 212,30 236,30" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    tags: ['waveform', 'signal', 'telemetry']
  },

  // 3D Isometric Tech
  {
    id: 'el_iso_cube',
    name: 'Isometric Silicon Cube',
    category: 'isometric_3d',
    categoryLabel: '3D Isometric Tech',
    defaultColor: '#38BDF8',
    defaultWidthPct: 18,
    defaultHeightPct: 18,
    viewBox: '0 0 120 120',
    svgInner: `<polygon points="60,12 104,36 60,60 16,36" fill="currentColor" fill-opacity="0.35" stroke="currentColor" stroke-width="3"/><polygon points="16,36 60,60 60,108 16,84" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="3"/><polygon points="104,36 60,60 60,108 104,84" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="3"/>`,
    tags: ['3d', 'isometric', 'cube', 'architecture']
  },
  {
    id: 'el_iso_server_rack',
    name: '3D Isometric Server Tower',
    category: 'isometric_3d',
    categoryLabel: '3D Isometric Tech',
    defaultColor: '#818CF8',
    defaultWidthPct: 18,
    defaultHeightPct: 22,
    viewBox: '0 0 120 140',
    svgInner: `<polygon points="60,10 100,32 60,54 20,32" fill="currentColor" fill-opacity="0.35" stroke="currentColor" stroke-width="3"/><polygon points="20,32 60,54 60,126 20,104" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="3"/><polygon points="100,32 60,54 60,126 100,104" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="3"/><line x1="28" y1="54" x2="52" y2="67" stroke="currentColor" stroke-width="3"/><line x1="28" y1="72" x2="52" y2="85" stroke="currentColor" stroke-width="3"/><line x1="28" y1="90" x2="52" y2="103" stroke="currentColor" stroke-width="3"/>`,
    tags: ['3d', 'server', 'cloud', 'datacenter']
  },
  {
    id: 'el_iso_shield_pad',
    name: 'Isometric Enclave Platform',
    category: 'isometric_3d',
    categoryLabel: '3D Isometric Tech',
    defaultColor: '#22D3EE',
    defaultWidthPct: 22,
    defaultHeightPct: 18,
    viewBox: '0 0 140 110',
    svgInner: `<polygon points="70,40 126,68 70,96 14,68" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="3"/><polygon points="70,50 108,68 70,86 32,68" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/><path d="M70 12L46 22v18c0 14 10 25 24 29 14-4 24-15 24-29V22L70 12z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="3"/>`,
    tags: ['3d', 'isometric', 'shield', 'enclave']
  }
];
