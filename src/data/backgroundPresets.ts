import { BackgroundConfig, BackgroundPatternId } from '../types/poster';

export interface CuratedColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  description: string;
}

export const CURATED_CYBER_PALETTES: CuratedColorPalette[] = [
  { id: 'midnight_blue', name: 'Midnight Blue', primary: '#050814', secondary: '#0C1A3A', accent: '#38BDF8', description: 'Deep nocturnal navy base with electric sky highlights' },
  { id: 'electric_cyan', name: 'Electric Cyan', primary: '#03121E', secondary: '#072B44', accent: '#00F5FF', description: 'High-frequency cybernetic teal and cyan telemetry' },
  { id: 'neon_green', name: 'Neon Green', primary: '#020B05', secondary: '#062814', accent: '#00FF66', description: 'Terminal root-shell emerald phosphor' },
  { id: 'cyber_purple', name: 'Cyber Purple', primary: '#0A0416', secondary: '#1E0B3D', accent: '#C084FC', description: 'Neural network violet & ultraviolet sheen' },
  { id: 'crimson_red', name: 'Crimson Red', primary: '#120306', secondary: '#2D0711', accent: '#F43F5E', description: 'Red Team offensive ops & zero-day alert crimson' },
  { id: 'black_gold', name: 'Black & Gold', primary: '#0A0804', secondary: '#1F1709', accent: '#FBBF24', description: 'Institutional honors & forensic university brass' },
  { id: 'arctic_blue', name: 'Arctic Blue', primary: '#061322', secondary: '#0F2B47', accent: '#7DD3FC', description: 'Clean frosted cobalt for academic seminars' },
  { id: 'digital_matrix', name: 'Digital Matrix', primary: '#000802', secondary: '#03200B', accent: '#22C55E', description: 'Pure obsidian matrix rainfall contrast' },
  { id: 'graphite_orange', name: 'Graphite & Orange', primary: '#101216', secondary: '#22262E', accent: '#FB923C', description: 'Industrial hardware safety & exploit warnings' },
  { id: 'deep_space', name: 'Deep Space', primary: '#04050D', secondary: '#0E1233', accent: '#818CF8', description: 'Sub-orbital satellite network indigo' },
  { id: 'cyberpunk_violet', name: 'Cyberpunk Violet', primary: '#120318', secondary: '#2E0738', accent: '#E879F9', description: 'Vivid neon magenta & deep plum wireframes' },
  { id: 'ice_blue', name: 'Ice Blue', primary: '#06151C', secondary: '#0D2F3F', accent: '#67E8F9', description: 'Cryogenic quantum lab cool spectrum' }
];

export interface BackgroundPreset {
  id: string;
  name: string;
  category: 'Dark Cyber' | 'Gradients' | 'Tech Patterns' | 'Minimal & Print' | 'High Energy';
  description: string;
  previewCss: string;
  config: Partial<BackgroundConfig>;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // Dark Cyber (8)
  {
    id: 'preset_obsidian_grid',
    name: 'Obsidian Defense Grid',
    category: 'Dark Cyber',
    description: 'Deep navy void with calibrated Cartesian cyber grid lines',
    previewCss: 'linear-gradient(135deg, #040814 0%, #091734 100%)',
    config: {
      mode: 'preset',
      solidColor: '#040814',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [{ color: '#040814', position: 0 }, { color: '#091734', position: 100 }],
      patternId: 'subtle-grid',
      patternOpacity: 55,
      vignette: 35,
      effects: { grid: true, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_matrix_rain',
    name: 'Matrix Terminal Cascade',
    category: 'Dark Cyber',
    description: 'Deep hacker forest void with subtle emerald scanlines',
    previewCss: 'linear-gradient(180deg, #010803 0%, #04220E 100%)',
    config: {
      mode: 'preset',
      solidColor: '#010803',
      gradientType: 'linear',
      gradientAngle: 180,
      gradientStops: [{ color: '#010803', position: 0 }, { color: '#04220E', position: 100 }],
      patternId: 'matrix-rain',
      patternOpacity: 60,
      vignette: 45,
      effects: { grid: false, matrix: true, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_red_team_radar',
    name: 'Red Team Breach Radar',
    category: 'Dark Cyber',
    description: 'Adversarial crimson darkness with subtle HUD radar concentric circles',
    previewCss: 'radial-gradient(circle at 75% 25%, #3B0914 0%, #0A0205 75%)',
    config: {
      mode: 'preset',
      solidColor: '#0A0205',
      gradientType: 'radial',
      gradientPosition: { x: 75, y: 25 },
      gradientStops: [{ color: '#3B0914', position: 0 }, { color: '#0A0205', position: 80 }],
      patternId: 'radar-hud',
      patternOpacity: 50,
      vignette: 40,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: true }
    }
  },
  {
    id: 'preset_zero_day_noir',
    name: 'Zero-Day Carbon Noir',
    category: 'Dark Cyber',
    description: 'Monochrome forensic carbon textured with 35mm darkroom grain',
    previewCss: 'linear-gradient(160deg, #07080A 0%, #16181F 100%)',
    config: {
      mode: 'preset',
      solidColor: '#07080A',
      gradientType: 'linear',
      gradientAngle: 160,
      gradientStops: [{ color: '#07080A', position: 0 }, { color: '#16181F', position: 100 }],
      patternId: 'swiss-cross',
      patternOpacity: 40,
      noiseIntensity: 35,
      vignette: 50,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_cobalt_soc',
    name: 'Cobalt SOC Telemetry',
    category: 'Dark Cyber',
    description: 'Blue Team operational dark sapphire with subtle hex shield overlay',
    previewCss: 'linear-gradient(145deg, #030A1C 0%, #0D2959 100%)',
    config: {
      mode: 'preset',
      solidColor: '#030A1C',
      gradientType: 'linear',
      gradientAngle: 145,
      gradientStops: [{ color: '#030A1C', position: 0 }, { color: '#0D2959', position: 100 }],
      patternId: 'hex-mesh',
      patternOpacity: 55,
      vignette: 30,
      effects: { grid: false, matrix: false, circuit: false, network: true, particles: false, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_arctic_enclave',
    name: 'Arctic Forensic Enclave',
    category: 'Dark Cyber',
    description: 'Frosted slate navy calibrated for digital forensics reports',
    previewCss: 'radial-gradient(circle at 30% 20%, #0E344D 0%, #050C16 80%)',
    config: {
      mode: 'preset',
      solidColor: '#050C16',
      gradientType: 'radial',
      gradientPosition: { x: 30, y: 20 },
      gradientStops: [{ color: '#0E344D', position: 0 }, { color: '#050C16', position: 85 }],
      patternId: 'subtle-grid',
      patternOpacity: 40,
      vignette: 25,
      effects: { grid: true, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: true }
    }
  },
  {
    id: 'preset_silicon_circuit',
    name: 'Silicon Wafer Traces',
    category: 'Dark Cyber',
    description: 'Hardware microchip trace texture over nocturnal dark indigo',
    previewCss: 'linear-gradient(135deg, #040915 0%, #07213B 100%)',
    config: {
      mode: 'preset',
      solidColor: '#040915',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [{ color: '#040915', position: 0 }, { color: '#07213B', position: 100 }],
      patternId: 'circuit-board',
      patternOpacity: 65,
      vignette: 30,
      effects: { grid: false, matrix: false, circuit: true, network: false, particles: false, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_quantum_brass',
    name: 'Quantum Dilution Brass',
    category: 'Dark Cyber',
    description: 'Cryogenic black paired with subtle warm gold ambient glow',
    previewCss: 'radial-gradient(circle at 80% 15%, #3B2806 0%, #090704 75%)',
    config: {
      mode: 'preset',
      solidColor: '#090704',
      gradientType: 'radial',
      gradientPosition: { x: 80, y: 15 },
      gradientStops: [{ color: '#3B2806', position: 0 }, { color: '#090704', position: 80 }],
      patternId: 'subtle-grid',
      patternOpacity: 30,
      vignette: 40,
      effects: { grid: true, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: true }
    }
  },

  // Gradients (8)
  {
    id: 'preset_electric_nebula',
    name: 'Electric Cyan Nebula',
    category: 'Gradients',
    description: 'Tri-stop diagonal gradient blending midnight, cobalt and neon teal',
    previewCss: 'linear-gradient(135deg, #050817 0%, #0D2D66 52%, #084C61 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [
        { color: '#050817', position: 0 },
        { color: '#0D2D66', position: 52 },
        { color: '#084C61', position: 100 }
      ],
      patternId: 'none',
      vignette: 25,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: true, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_ultraviolet_mesh',
    name: 'Ultraviolet Neural Mesh',
    category: 'Gradients',
    description: 'AI & Machine Learning violet-to-indigo deep luminous field',
    previewCss: 'linear-gradient(125deg, #0A0418 0%, #2A0C59 55%, #0B2545 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 125,
      gradientStops: [
        { color: '#0A0418', position: 0 },
        { color: '#2A0C59', position: 55 },
        { color: '#0B2545', position: 100 }
      ],
      patternId: 'mesh-dots',
      patternOpacity: 45,
      vignette: 25,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: true, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_solar_flare',
    name: 'Hackathon Solar Flare',
    category: 'Gradients',
    description: 'Energetic burnt amber fading into carbon obsidian',
    previewCss: 'radial-gradient(circle at 20% 80%, #5C2805 0%, #1F0A0A 50%, #07050A 100%)',
    config: {
      mode: 'preset',
      gradientType: 'radial',
      gradientPosition: { x: 20, y: 80 },
      gradientStops: [
        { color: '#5C2805', position: 0 },
        { color: '#1F0A0A', position: 50 },
        { color: '#07050A', position: 100 }
      ],
      patternId: 'none',
      vignette: 30,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: true }
    }
  },
  {
    id: 'preset_conic_aurora',
    name: 'Conic Prism Aurora',
    category: 'Gradients',
    description: 'Angular conic sweep across deep cyan, sapphire and dark emerald',
    previewCss: 'conic-gradient(from 45deg at 50% 50%, #050A18, #0C3559, #094D45, #050A18)',
    config: {
      mode: 'preset',
      gradientType: 'conic',
      gradientAngle: 45,
      gradientPosition: { x: 50, y: 50 },
      gradientStops: [
        { color: '#050A18', position: 0 },
        { color: '#0C3559', position: 45 },
        { color: '#094D45', position: 100 }
      ],
      patternId: 'none',
      vignette: 35,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_crimson_horizon',
    name: 'Crimson Threat Horizon',
    category: 'Gradients',
    description: 'Deep ruby horizon meeting midnight charcoal for CVE bulletins',
    previewCss: 'linear-gradient(180deg, #090308 0%, #240712 50%, #4A0B18 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 180,
      gradientStops: [
        { color: '#090308', position: 0 },
        { color: '#240712', position: 50 },
        { color: '#4A0B18', position: 100 }
      ],
      patternId: 'terminal-scanline',
      patternOpacity: 35,
      vignette: 30,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_emerald_depth',
    name: 'Emerald Kernel Depth',
    category: 'Gradients',
    description: 'Deep pine and dark teal radial spotlight',
    previewCss: 'radial-gradient(circle at 50% 35%, #08422B 0%, #031512 60%, #010806 100%)',
    config: {
      mode: 'preset',
      gradientType: 'radial',
      gradientPosition: { x: 50, y: 35 },
      gradientStops: [
        { color: '#08422B', position: 0 },
        { color: '#031512', position: 60 },
        { color: '#010806', position: 100 }
      ],
      patternId: 'none',
      vignette: 25,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: true }
    }
  },
  {
    id: 'preset_steel_spotlight',
    name: 'Titanium Spotlight',
    category: 'Gradients',
    description: 'Clean studio metallic radial sheen on deep obsidian',
    previewCss: 'radial-gradient(circle at 50% 25%, #242B38 0%, #0B0E14 75%)',
    config: {
      mode: 'preset',
      gradientType: 'radial',
      gradientPosition: { x: 50, y: 25 },
      gradientStops: [{ color: '#242B38', position: 0 }, { color: '#0B0E14', position: 80 }],
      patternId: 'none',
      vignette: 30,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: true }
    }
  },
  {
    id: 'preset_cyberpunk_sunset',
    name: 'Synthwave Violet-Cyan',
    category: 'Gradients',
    description: 'Vivid cyberpunk neon night from magenta-violet to deep cyan',
    previewCss: 'linear-gradient(135deg, #210633 0%, #0D153B 55%, #053345 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [
        { color: '#210633', position: 0 },
        { color: '#0D153B', position: 55 },
        { color: '#053345', position: 100 }
      ],
      patternId: 'subtle-grid',
      patternOpacity: 35,
      vignette: 30,
      effects: { grid: true, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: false }
    }
  },

  // Tech Patterns (6)
  {
    id: 'preset_network_topology',
    name: 'Network Topology Mesh',
    category: 'Tech Patterns',
    description: 'Interconnected telemetry nodes across midnight slate',
    previewCss: 'linear-gradient(135deg, #040B1A 0%, #091B3A 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [{ color: '#040B1A', position: 0 }, { color: '#091B3A', position: 100 }],
      patternId: 'network-diagram',
      patternOpacity: 65,
      effects: { grid: false, matrix: false, circuit: false, network: true, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_isometric_blueprint',
    name: 'Isometric Blueprint Grid',
    category: 'Tech Patterns',
    description: 'Architectural 3D cube matrix for systems & hardware events',
    previewCss: 'linear-gradient(160deg, #060D1E 0%, #0E1F42 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 160,
      gradientStops: [{ color: '#060D1E', position: 0 }, { color: '#0E1F42', position: 100 }],
      patternId: 'isometric-cubes',
      patternOpacity: 60,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: true, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_particle_field',
    name: 'Subtle Particle Constellation',
    category: 'Tech Patterns',
    description: 'Atmospheric micro-particles suspended in deep indigo darkness',
    previewCss: 'linear-gradient(180deg, #040712 0%, #0D1430 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 180,
      gradientStops: [{ color: '#040712', position: 0 }, { color: '#0D1430', position: 100 }],
      patternId: 'particles',
      patternOpacity: 70,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: true, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_scanline_crt',
    name: 'CRT Scanline Monitor',
    category: 'Tech Patterns',
    description: 'Horizontal phosphor scanlines tuned for retro terminal posters',
    previewCss: 'linear-gradient(180deg, #030905 0%, #091C10 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 180,
      gradientStops: [{ color: '#030905', position: 0 }, { color: '#091C10', position: 100 }],
      patternId: 'terminal-scanline',
      patternOpacity: 70,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_hex_firewall',
    name: 'Hexagonal Firewall Barrier',
    category: 'Tech Patterns',
    description: 'Honeycomb perimeter lattice over electric navy',
    previewCss: 'linear-gradient(145deg, #040917 0%, #082342 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 145,
      gradientStops: [{ color: '#040917', position: 0 }, { color: '#082342', position: 100 }],
      patternId: 'hex-mesh',
      patternOpacity: 65,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: true, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_halftone_dots',
    name: 'Editorial Halftone Matrix',
    category: 'Tech Patterns',
    description: 'Calibrated micro-dot matrix on graphite surface',
    previewCss: 'linear-gradient(135deg, #0A0B0F 0%, #171A24 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [{ color: '#0A0B0F', position: 0 }, { color: '#171A24', position: 100 }],
      patternId: 'mesh-dots',
      patternOpacity: 75,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },

  // Minimal & Print (5)
  {
    id: 'preset_pure_obsidian',
    name: 'Pure Obsidian Void',
    category: 'Minimal & Print',
    description: 'Ultra-clean #050811 canvas zero-distraction backdrop',
    previewCss: '#050811',
    config: {
      mode: 'solid',
      solidColor: '#050811',
      patternId: 'none',
      vignette: 0,
      noiseIntensity: 0,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_institutional_navy',
    name: 'Institutional Academic Navy',
    category: 'Minimal & Print',
    description: 'Formal NFSU deep navy backdrop for seminars & guest talks',
    previewCss: '#091124',
    config: {
      mode: 'solid',
      solidColor: '#091124',
      patternId: 'none',
      vignette: 15,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_swiss_chalk',
    name: 'Swiss Gallery Slate',
    category: 'Minimal & Print',
    description: 'Muted charcoal matte finish with subtle registration crosses',
    previewCss: '#111216',
    config: {
      mode: 'preset',
      solidColor: '#111216',
      gradientType: 'linear',
      gradientAngle: 180,
      gradientStops: [{ color: '#111216', position: 0 }, { color: '#0B0C0F', position: 100 }],
      patternId: 'swiss-cross',
      patternOpacity: 50,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_transparent_alpha',
    name: 'Transparent Alpha Layer',
    category: 'Minimal & Print',
    description: 'True transparent background for compositing over flyers & videos',
    previewCss: 'repeating-conic-gradient(#1E293B 0% 25%, #0F172A 0% 50%) 50% / 16px 16px',
    config: {
      mode: 'transparent',
      patternId: 'none',
      vignette: 0,
      noiseIntensity: 0,
      overlayOpacity: 0,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },
  {
    id: 'preset_no_background',
    name: 'No Background (Raw Canvas)',
    category: 'Minimal & Print',
    description: 'Unstyled neutral base without background fills or overlays',
    previewCss: '#070A12',
    config: {
      mode: 'none',
      patternId: 'none',
      vignette: 0,
      noiseIntensity: 0,
      overlayOpacity: 0,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: false, radialLight: false }
    }
  },

  // High Energy (5)
  {
    id: 'preset_ctf_arena_pulse',
    name: 'CTF Arena Electric Pulse',
    category: 'High Energy',
    description: 'Dual radial neon blue & crimson glow for live tournaments',
    previewCss: 'linear-gradient(135deg, #061336 0%, #050814 50%, #300614 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [
        { color: '#061336', position: 0 },
        { color: '#050814', position: 50 },
        { color: '#300614', position: 100 }
      ],
      patternId: 'subtle-grid',
      patternOpacity: 45,
      effects: { grid: true, matrix: false, circuit: false, network: false, particles: true, geometricLines: false, glow: true, radialLight: true }
    }
  },
  {
    id: 'preset_neon_gridline',
    name: 'High-Contrast Neon Lines',
    category: 'High Energy',
    description: 'Diagonal architectural cyber beams across nocturnal teal',
    previewCss: 'linear-gradient(120deg, #02141E 0%, #052C3E 50%, #070B19 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 120,
      gradientStops: [
        { color: '#02141E', position: 0 },
        { color: '#052C3E', position: 50 },
        { color: '#070B19', position: 100 }
      ],
      patternId: 'circuit-board',
      patternOpacity: 50,
      effects: { grid: false, matrix: false, circuit: true, network: false, particles: false, geometricLines: true, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_gdg_multicolor_dark',
    name: 'GDG Prism Spectrum Dark',
    category: 'High Energy',
    description: 'Deep slate anchored with subtle blue, emerald & amber atmospheric glow',
    previewCss: 'linear-gradient(135deg, #081838 0%, #061F17 55%, #1D1205 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 135,
      gradientStops: [
        { color: '#081838', position: 0 },
        { color: '#061F17', position: 55 },
        { color: '#1D1205', position: 100 }
      ],
      patternId: 'mesh-dots',
      patternOpacity: 40,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: true, geometricLines: false, glow: true, radialLight: false }
    }
  },
  {
    id: 'preset_hyper_magenta',
    name: 'Hyper Magenta Plasma',
    category: 'High Energy',
    description: 'Fuchsia plasma core fading cleanly into dark cobalt edges',
    previewCss: 'radial-gradient(circle at 65% 35%, #4A0A4F 0%, #15092E 50%, #040712 100%)',
    config: {
      mode: 'preset',
      gradientType: 'radial',
      gradientPosition: { x: 65, y: 35 },
      gradientStops: [
        { color: '#4A0A4F', position: 0 },
        { color: '#15092E', position: 50 },
        { color: '#040712', position: 100 }
      ],
      patternId: 'radar-hud',
      patternOpacity: 35,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: true }
    }
  },
  {
    id: 'preset_terminal_amber',
    name: 'Retro Amber CRT Phosphor',
    category: 'High Energy',
    description: '1980s monochrome amber monitor glow over obsidian shell',
    previewCss: 'linear-gradient(180deg, #120B02 0%, #2B1A05 55%, #080501 100%)',
    config: {
      mode: 'preset',
      gradientType: 'linear',
      gradientAngle: 180,
      gradientStops: [
        { color: '#120B02', position: 0 },
        { color: '#2B1A05', position: 55 },
        { color: '#080501', position: 100 }
      ],
      patternId: 'terminal-scanline',
      patternOpacity: 65,
      vignette: 40,
      effects: { grid: false, matrix: false, circuit: false, network: false, particles: false, geometricLines: false, glow: true, radialLight: false }
    }
  }
];

export const PATTERN_OPTIONS: { id: BackgroundPatternId; label: string; desc: string }[] = [
  { id: 'none', label: 'None', desc: 'Zero pattern overlay' },
  { id: 'subtle-grid', label: 'Fine Tech Grid', desc: 'Clean calibrated Cartesian grid' },
  { id: 'terminal-scanline', label: 'Scanlines', desc: 'CRT monitor horizontal lines' },
  { id: 'hex-mesh', label: 'Hex Lattice', desc: 'Honeycomb perimeter mesh' },
  { id: 'radar-hud', label: 'Radar HUD', desc: 'Concentric security scanner' },
  { id: 'swiss-cross', label: 'Swiss Crosses', desc: 'Print alignment marks' },
  { id: 'circuit-board', label: 'Circuit Traces', desc: 'Microchip bus pathways' },
  { id: 'network-diagram', label: 'Network Nodes', desc: 'Connected graph edges' },
  { id: 'particles', label: 'Particles', desc: 'Atmospheric micro-dots' },
  { id: 'mesh-dots', label: 'Halftone Dots', desc: 'Uniform halftone matrix' },
  { id: 'isometric-cubes', label: 'Isometric Cubes', desc: '3D geometric tessellation' },
  { id: 'matrix-rain', label: 'Matrix Stream', desc: 'Vertical digital rainfall' }
];

// Color conversion helpers (HEX <-> RGB <-> HSL)
export function normalizeHex(hex: string): string {
  const clean = (hex || '').trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean.split('').map((c) => c + c).join('').toUpperCase()}`;
  }
  if (/^[0-9a-fA-F]{6}$/.test(clean)) {
    return `#${clean.toUpperCase()}`;
  }
  return '#050811';
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const norm = normalizeHex(hex).slice(1);
  return {
    r: parseInt(norm.slice(0, 2), 16),
    g: parseInt(norm.slice(2, 4), 16),
    b: parseInt(norm.slice(4, 6), 16)
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((n) => n.toString(16).padStart(2, '0').toUpperCase())
      .join('')
  );
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r: r255, g: g255, b: b255 } = hexToRgb(hex);
  const r = r255 / 255;
  const g = g255 / 255;
  const b = b255 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToHex(h: number, s: number, l: number): string {
  const hh = ((h % 360) + 360) % 360;
  const ss = Math.max(0, Math.min(100, s)) / 100;
  const ll = Math.max(0, Math.min(100, l)) / 100;
  const a = ss * Math.min(ll, 1 - ll);
  const f = (n: number) => {
    const k = (n + hh / 30) % 12;
    const color = ll - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return rgbToHex(f(0), f(8), f(4));
}

export const STORAGE_KEY_SAVED_COLORS = 'gdgoc_nfsu_saved_colors_v1';
export const STORAGE_KEY_CUSTOM_GRADIENTS = 'gdgoc_nfsu_custom_gradients_v1';

export interface SavedGradientPreset {
  id: string;
  name: string;
  gradientType: 'linear' | 'radial' | 'conic';
  gradientAngle: number;
  gradientStops: { color: string; position: number }[];
}
