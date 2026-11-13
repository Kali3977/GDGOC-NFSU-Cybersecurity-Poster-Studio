export type CyberCategory = 
  | 'ctf'
  | 'workshop'
  | 'seminar'
  | 'talk'
  | 'hackathon'
  | 'awareness'
  | 'recruitment'
  | 'bootcamp'
  | 'announcement'
  | 'multi_campus'
  | 'achievement'
  | 'countdown'
  | 'ethical_hacking'
  | 'custom';

// Backward compatibility alias
export type PosterType = CyberCategory | 'campaign' | 'showcase';

export type CyberStyle = 
  | 'editorial'          // Minimal Editorial Design
  | 'cyberpunk'          // Cyberpunk-inspired
  | 'terminal'           // Terminal and code-inspired
  | 'tech_conference'    // Modern technology conference
  | 'security_interface' // Futuristic security interface
  | 'corporate'          // Clean corporate design
  | 'bold_type';         // Bold typographic design

// Backward compatibility alias
export type PosterTheme = 'swiss' | 'cyber' | 'google' | 'riso' | 'monolith' | CyberStyle;

export type PosterFormat = '4:5' | '1:1' | '9:16' | 'whatsapp' | 'a4' | 'custom';

export type PosterImageKey = 
  | 'campus_night' 
  | 'campus_day' 
  | 'campus_aerial' 
  | 'forensics' 
  | 'monolith' 
  | 'acoustic' 
  | 'obsidian' 
  | 'waveform'
  | 'custom';

export type AccentColor = 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'titanium';
export type PosterFont = string;

export interface PosterTrack {
  title: string;
  desc: string;
}

export type QRContrastMode = 'dark_on_light' | 'electric_cyan' | 'matrix_green' | 'amber_gold';

export type BackgroundMode =
  | 'none'
  | 'transparent'
  | 'solid'
  | 'gradient'
  | 'pattern'
  | 'image'
  | 'preset';

export type BackgroundPatternId =
  | 'none'
  | 'subtle-grid'
  | 'terminal-scanline'
  | 'hex-mesh'
  | 'radar-hud'
  | 'swiss-cross'
  | 'circuit-board'
  | 'network-diagram'
  | 'particles'
  | 'mesh-dots'
  | 'isometric-cubes'
  | 'matrix-rain';

export interface GradientStop {
  color: string;
  position: number; // 0 to 100
}

export interface BackgroundEffects {
  grid: boolean;
  matrix: boolean;
  circuit: boolean;
  network: boolean;
  particles: boolean;
  geometricLines: boolean;
  glow: boolean;
  radialLight: boolean;
}

export interface BackgroundConfig {
  mode: BackgroundMode;
  presetId?: string;
  solidColor: string;
  gradientType: 'linear' | 'radial' | 'conic';
  gradientStops: GradientStop[];
  gradientAngle: number;
  gradientPosition: { x: number; y: number };
  gradientOpacity: number;
  patternId: BackgroundPatternId;
  patternOpacity: number;
  patternColor?: string;
  imageUrl?: string;
  imageFit: 'cover' | 'contain' | 'stretch' | 'custom';
  imageZoom: number;      // 50 to 250
  imageOffsetX: number;   // -50 to 50
  imageOffsetY: number;   // -50 to 50
  imageOpacity: number;   // 0 to 100
  imageBlur: number;      // 0 to 24px
  imageBrightness: number;// 40 to 160%
  imageContrast: number;  // 40 to 160%
  imageSaturation: number;// 0 to 200%
  imageHue: number;       // -180 to 180 deg
  vignette: number;       // 0 to 100%
  noiseIntensity: number; // 0 to 100%
  overlayColor: string;
  overlayOpacity: number; // 0 to 100%
  effects: BackgroundEffects;
}

export interface HeroImageConfig {
  enabled: boolean;
  src?: string;
  imageKey?: PosterImageKey;
  alt?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fit: 'cover' | 'contain' | 'fill';
  zoom: number;
  focalX: number;
  focalY: number;
  rotation: number;
  opacity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
  blur: number;
  filter: 'none' | 'duotone' | 'high_contrast' | 'matrix_green' | 'ice_cyan' | 'warm_amber' | 'invert';
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  shadow: 'none' | 'soft' | 'glow' | 'hard';
  maskShape: 'none' | 'rounded' | 'circle' | 'hex' | 'arch';
}

export type TypographyElementKey =
  | 'kicker'
  | 'headline'
  | 'subtitle'
  | 'manifesto'
  | 'description'
  | 'cycleTagline'
  | 'dateTime'
  | 'venue'
  | 'speakerName'
  | 'speakerDesignation'
  | 'tracksTitle'
  | 'registration'
  | 'cta'
  | 'campusInfo'
  | 'footer';

export interface TextElementStyle {
  fontFamily?: string;
  fontSizePx?: number;
  fontScale?: number; // 0.6 to 2.0 relative scale in template view
  fontWeight?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
  letterSpacing?: number; // em
  wordSpacing?: number;   // em
  lineHeight?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color?: string;
  opacity?: number;       // 0 to 100
  strokeWidth?: number;   // 0 to 4px
  strokeColor?: string;
  shadow?: 'none' | 'soft' | 'neon' | 'hard';
  backgroundColor?: string;
  rotation?: number;      // -45 to 45 deg
}

export type PosterTypographyMap = Partial<Record<TypographyElementKey, TextElementStyle>>;

export interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'qr' | 'badge' | 'shape' | 'svg_graphic' | 'hero_image';
  label: string;
  x: number;          // Percentage 0-100 of canvas width
  y: number;          // Percentage 0-100 of canvas height
  width: number;      // Percentage 0-100
  height?: number;    // Percentage 0-100
  rotation: number;   // Degrees -180 to 180
  locked: boolean;
  hidden: boolean;
  zIndex: number;
  groupId?: string;
  // Text specific
  text?: string;
  fontSize?: number;   // in pt/px scale
  fontWeight?: number;
  fontFamily?: PosterFont;
  italic?: boolean;
  underline?: boolean;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color?: string;
  align?: 'left' | 'center' | 'right';
  letterSpacing?: number; // em
  wordSpacing?: number;   // em
  lineHeight?: number;    // relative
  strokeWidth?: number;
  strokeColor?: string;
  textShadow?: 'none' | 'soft' | 'neon' | 'hard';
  textBgColor?: string;
  // Image / SVG / Hero specific
  src?: string;
  svgPresetId?: string;
  svgViewBox?: string;
  svgInner?: string;
  fillColor?: string;
  opacity?: number;
  borderRadius?: number;
  maskShape?: 'none' | 'rounded' | 'circle' | 'hex' | 'arch';
  fit?: 'cover' | 'contain' | 'fill';
  imageFilter?: 'none' | 'duotone' | 'high_contrast' | 'matrix_green' | 'ice_cyan' | 'warm_amber' | 'invert';
  imageZoom?: number;
  imageFocalX?: number;
  imageFocalY?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  hue?: number;
  blur?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: boolean;
  // QR specific
  qrDestination?: string;
  qrContrast?: QRContrastMode;
}

export interface BackgroundSettings {
  type: 'image' | 'color' | 'gradient';
  color: string;
  zoom: number;       // 100 to 200%
  offsetX: number;    // -50% to 50%
  offsetY: number;    // -50% to 50%
  opacity: number;    // 0 to 100%
  filter?: string;
}

export interface SavedBrandLogo {
  id: string;
  name: string;
  role: 'gdg' | 'nfsu' | 'campus' | 'event' | 'partner';
  url: string;
}

export interface BrandPreset {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: AccentColor;
  headingFont: string;
  bodyFont: string;
  socialHandle: string;
  hashtag: string;
}

export interface BrandLogoSlots {
  gdgEnabled: boolean;
  gdgVariant: 'color' | 'white';
  nfsuEnabled: boolean;
  nfsuLogoUrl?: string;
  campusBadgeEnabled: boolean;
  eventLogoUrl?: string;
}

export interface BrandKit {
  primaryColor: string;
  secondaryColor: string;
  accentColor: AccentColor;
  headingFont: PosterFont;
  bodyFont: PosterFont;
  customLogoUrl?: string;
  eventLogoUrl?: string;
  savedLogos?: SavedBrandLogo[];
  savedPresets?: BrandPreset[];
  socialHandle: string;
  hashtag: string;
  organizerName: string;
}

export interface StudioSettings {
  units: 'px' | 'percent';
  defaultGridSnap: boolean;
  defaultSafeMargins: boolean;
  defaultJpegFallbackColor: string;
  preferredHindiFont: string;
}

export interface PosterContent {
  id?: string;
  title?: string;
  category: CyberCategory;
  style: CyberStyle;
  campusId: string;
  headline: string;
  subtitle: string;
  description: string;
  kicker: string;
  foundingManifesto: string;
  cycleTagline: string;
  tracks: PosterTrack[];
  // Legacy pillar properties for smooth backward compatibility
  pillar1Title?: string;
  pillar1Desc?: string;
  pillar2Title?: string;
  pillar2Desc?: string;
  pillar3Title?: string;
  pillar3Desc?: string;
  pillar4Title?: string;
  pillar4Desc?: string;
  // Specific event fields
  date: string;
  time: string;
  venue: string;
  registrationLink?: string;
  registrationDeadline?: string;
  contactDetails?: string;
  organizerName?: string;
  speakerName?: string;
  speakerDesignation?: string;
  speakerPhotoUrl?: string;
  // QR Code Utility Fields
  qrDestination?: string;
  qrContrastMode?: QRContrastMode;
  qrLabel?: string;
  qrSize?: 'sm' | 'md' | 'lg';
  showQrCode: boolean;
  showSpeaker: boolean;
  showTracks: boolean;
  showCropMarks: boolean;
  showFilmGrain: boolean;
  socialHandle?: string;
  ctaText: string;
  subCtaText: string;
  hashtag?: string;
  reservedNotice?: string;
  imageKey: PosterImageKey;
  customImageUrl?: string;
  customLogoUrl?: string;
  accentColor: AccentColor;
  fontFamily: PosterFont;
  textAlign: 'left' | 'center';
  // Theme & Studio Upgrade Fields
  themeId?: string;
  imageFilter?: 'none' | 'duotone' | 'high_contrast' | 'matrix_green' | 'ice_cyan' | 'warm_amber' | 'invert';
  imageZoom?: number;        // 100 to 250%
  imageFocalX?: number;      // 0 to 100%
  imageFocalY?: number;      // 0 to 100%
  imageRotation?: number;    // -180 to 180 deg
  imageOpacity?: number;     // 0 to 100%
  imageBorderWidth?: number; // 0 to 8px
  imageBorderColor?: string;
  // Background Studio Fields (strictly decoupled from Hero Image)
  backgroundConfig?: BackgroundConfig;
  bgDarkOverlayOpacity?: number; // 0 to 100%
  bgPattern?: BackgroundPatternId;
  bgBlur?: number;           // 0 to 20px
  bgBrightness?: number;     // 50 to 150%
  bgContrast?: number;       // 50 to 150%
  bgGradientType?: 'solid' | 'linear_2' | 'mesh_multi' | 'photo' | 'pattern';
  bgGradientColor1?: string;
  bgGradientColor2?: string;
  bgGradientAngle?: number;  // 0 to 360 deg
  // Hero Image (strictly decoupled foreground image object)
  heroImage?: HeroImageConfig;
  // Per-Element Typography & Devanagari/Hindi configuration
  typographyMap?: PosterTypographyMap;
  hindiFontFamily?: string;
  // Brand Logo Slots
  brandSlots?: BrandLogoSlots;
  // Custom Dimensions
  customWidthPx?: number;
  customHeightPx?: number;
  // Interactive Elements Layer State
  elements?: CanvasElement[];
  backgroundSettings?: BackgroundSettings;
  showSafeMargins?: boolean;
  showGridSnap?: boolean;
  dateTime?: string; // Legacy helper
  type?: PosterType;  // Legacy helper
}

export interface PosterProject {
  id: string;
  name: string;
  content: PosterContent;
  lastEdited: number;
  thumbnail?: string;
  tags?: string[];
  isFavorite?: boolean;
}

export interface ExportHistoryItem {
  id: string;
  title: string;
  campusName: string;
  category: CyberCategory;
  style: CyberStyle;
  format: PosterFormat;
  timestamp: number;
  dataUrl?: string;
}

export interface PreflightIssue {
  id: string;
  level: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  fixLabel?: string;
  fieldToFix?: keyof PosterContent;
  recommendedValue?: any;
}

export const CYBER_CATEGORIES_INFO: Record<CyberCategory, { label: string; icon: string; description: string }> = {
  ctf: {
    label: 'Capture The Flag (CTF)',
    icon: '🚩',
    description: 'Timed jeopardy & attack-defense competitions in crypto, pwn, web & reverse engineering.'
  },
  workshop: {
    label: 'Cybersecurity Workshop',
    icon: '⚙️',
    description: 'Hands-on practical labs on systems, memory analysis, forensics & network defense.'
  },
  seminar: {
    label: 'Cybersecurity Seminar',
    icon: '🏛️',
    description: 'Academic symposiums, forensic policy discourses & institutional cyber briefings.'
  },
  talk: {
    label: 'Guest Speaker Event',
    icon: '🎙️',
    description: 'Fireside sessions & masterclasses with premier industry leaders and forensic researchers.'
  },
  hackathon: {
    label: 'Hackathon & Coding Sprint',
    icon: '⚡',
    description: '24-36 hour sprints creating sovereign security tools, open-source defense & automation.'
  },
  awareness: {
    label: 'Security Awareness Campaign',
    icon: '🌐',
    description: 'Public education campaigns on cyber hygiene, phishing, privacy & digital citizenship.'
  },
  recruitment: {
    label: 'Student Recruitment',
    icon: '👥',
    description: 'Annual member intake for GDG on Campus NFSU across development and security wings.'
  },
  bootcamp: {
    label: 'Training Bootcamp',
    icon: '💻',
    description: 'Multi-day intensive skill accelerators taking students from primitives to production.'
  },
  announcement: {
    label: 'Technical Announcement',
    icon: '📢',
    description: 'Security advisories, CVE alerts, patch notices and institutional community updates.'
  },
  multi_campus: {
    label: 'Multi-Campus Event',
    icon: '🔗',
    description: 'Unified coalition initiatives connecting students across all verified NFSU cyber campuses.'
  },
  achievement: {
    label: 'Community Achievement',
    icon: '🏆',
    description: 'Honoring CTF tournament victories, hall of fame recognitions and published research.'
  },
  countdown: {
    label: 'Event Countdown',
    icon: '⏱️',
    description: 'Urgent final registration push with T-Minus countdown clock and key deadlines.'
  },
  ethical_hacking: {
    label: 'Ethical Hacking Session',
    icon: '🛡️',
    description: 'Live penetration testing, vulnerability assessment, bug bounty & defensive hardening.'
  },
  custom: {
    label: 'Custom Security Event',
    icon: '✏️',
    description: 'Tailored event poster with freeform layout and configurable details.'
  }
};

export const CYBER_STYLES_INFO: Record<CyberStyle, { label: string; description: string; tag: string }> = {
  editorial: {
    label: 'Minimal Editorial',
    description: 'Swiss modernist typography, strict grid rules, unboxed metadata and print crop marks.',
    tag: 'SWISS · MODERN'
  },
  cyberpunk: {
    label: 'Cyberpunk Wireframe',
    description: 'High-contrast nocturnal palette with electric cyan wireframes, glowing glyphs and telemetry.',
    tag: 'NEON · HIGH-TECH'
  },
  terminal: {
    label: 'Terminal & Code Monospace',
    description: 'Authentic Linux bash prompt, memory offset borders, raw ASCII elements and courier aesthetics.',
    tag: 'CLI · MONO'
  },
  tech_conference: {
    label: 'Tech Summit Conference',
    description: 'Polished international cybersecurity summit layout with keynote speaker highlight card.',
    tag: 'SUMMIT · GLOBAL'
  },
  security_interface: {
    label: 'Futuristic SOC Interface',
    description: 'Defense radar brackets, threat telemetry levels, sovereign security badge and crosshairs.',
    tag: 'SOC · DEFENSE'
  },
  corporate: {
    label: 'Clean Institutional Corporate',
    description: 'Executive briefing aesthetic combining authoritative serif/sans, gold and navy heraldry.',
    tag: 'EXECUTIVE · CREST'
  },
  bold_type: {
    label: 'Bold Typographic Impact',
    description: 'Brutalist oversized display headlines with rhythmic staggered letterforms.',
    tag: 'DISPLAY · IMPACT'
  }
};

export const DEFAULT_POSTER: PosterContent = {
  category: 'ctf',
  style: 'cyberpunk',
  campusId: 'gandhinagar',
  kicker: 'FLAGSHIP SECURITY SPRINT // 36-HOUR CHALLENGE',
  headline: 'CYBERSTRIKE 2026: DECOMPILE · EXPLOIT · DEFEND',
  subtitle: 'National Capture The Flag competition and binary exploitation tournament at NFSU.',
  description: 'Join top student cyber defenders across India for 36 hours of intensive jeopardy-style and attack-defense challenges in reverse engineering, post-quantum ciphers, and memory corruption.',
  foundingManifesto: 'In security, theory is an assumption. Code is proof.',
  cycleTagline: 'Decompile · Exploit · Patch · Defend',
  tracks: [
    { title: 'Binary Exploitation', desc: 'Kernel mitigation, heap exploitation & shellcoding' },
    { title: 'Digital Forensics', desc: 'Memory dumps, network packet captures & malware triage' },
    { title: 'Reverse Engineering', desc: 'Ghidra & IDA Pro static/dynamic binary analysis' },
    { title: 'Web & Cloud Security', desc: 'Zero-day vectors, container breakout & API auditing' }
  ],
  date: 'OCTOBER 24–26, 2026',
  time: '36 HOURS NON-STOP (09:00 IST)',
  venue: 'Cyber Defense Lab & Main Auditorium, NFSU Gandhinagar Campus',
  registrationLink: 'https://gdg.community.dev/nfsu-cyberstrike',
  registrationDeadline: 'October 20, 2026 · 23:59 IST',
  contactDetails: 'ctf@nfsu.ac.in · GDG Security Wing',
  organizerName: 'Google Developer Groups on Campus · NFSU Gandhinagar',
  speakerName: 'Dr. Vikramaditya Rawat',
  speakerDesignation: 'Chief Cyber Intelligence Advisor & Forensic Researcher',
  qrDestination: 'https://gdg.community.dev/nfsu-cyberstrike',
  qrContrastMode: 'dark_on_light',
  qrLabel: 'Scan to Register & Get Pass',
  qrSize: 'md',
  socialHandle: '#GDGonNFSU · #CyberStrike2026 · @gdgnfsu',
  ctaText: 'Assemble your team. Claim root access.',
  subCtaText: 'Register for CyberStrike CTF at NFSU',
  hashtag: '#GDGonNFSU',
  reservedNotice: 'Scan QR code to access team registration portal and verify college ID',
  imageKey: 'forensics',
  accentColor: 'blue',
  fontFamily: 'Syne',
  textAlign: 'left',
  showQrCode: true,
  showSpeaker: true,
  showTracks: true,
  showCropMarks: true,
  showFilmGrain: true,
  showSafeMargins: false,
  showGridSnap: false,
  backgroundSettings: {
    type: 'image',
    color: '#080D1A',
    zoom: 100,
    offsetX: 0,
    offsetY: 0,
    opacity: 100
  }
};

// 12 GENUINELY DIFFERENT LAYOUT TEMPLATES WITH DISTINCT COMPOSITION & TYPOGRAPHY
export const CYBER_TEMPLATES: Record<CyberCategory, PosterContent> = {
  // 1. CTF Competition (High-tech cyber grid, terminal offsets, radar scores)
  ctf: {
    ...DEFAULT_POSTER,
    category: 'ctf',
    style: 'cyberpunk',
    kicker: 'NATIONAL CTF TOURNAMENT // 36-HOUR CHALLENGE',
    headline: 'CYBERSTRIKE — NATIONAL CTF INVITATIONAL',
    subtitle: 'High-stakes binary exploitation, memory forensics and cryptographic ciphers.',
    description: 'Solve real-world sovereign cyber defense challenges designed by leading forensics researchers.',
    accentColor: 'blue',
    imageKey: 'forensics'
  },

  // 2. Ethical Hacking Workshop (Monospace CLI prompt, code blocks, terminal layout)
  workshop: {
    ...DEFAULT_POSTER,
    category: 'workshop',
    style: 'terminal',
    kicker: 'INTENSIVE TECHNICAL MASTERCLASS',
    headline: 'KERNEL TO CLOUD: LOW-LEVEL SYSTEMS & MEMORY DEFENSE',
    subtitle: 'From bare-metal memory safety in Rust to eBPF kernel tracing and runtime protection.',
    description: 'A 6-hour hands-on terminal laboratory where students write kernel instrumentation and exploit mitigations.',
    tracks: [
      { title: 'Rust Systems Internals', desc: 'Zero-cost abstractions & borrow checker invariants' },
      { title: 'eBPF Kernel Probes', desc: 'Real-time syscall inspection and socket filtering' },
      { title: 'Exploit Mitigation', desc: 'ASLR, stack canaries, ROP chain defenses' },
      { title: 'Live Lab Terminal', desc: 'Dedicated cloud sandbox instances for all participants' }
    ],
    foundingManifesto: 'Real software is measured in throughput, safety, and precision.',
    cycleTagline: 'Inspect · Compile · Exploit · Harden',
    date: 'SATURDAY, NOVEMBER 14, 2026',
    time: '13:00 – 19:00 IST',
    venue: 'HPC & Forensics Computing Complex, NFSU Campus',
    speakerName: 'Arjun Mehta',
    speakerDesignation: 'Senior Systems Engineer & Linux Kernel Contributor',
    accentColor: 'green',
    imageKey: 'campus_day'
  },

  // 3. Cybersecurity Seminar (Institutional heraldic layout, academic crest header)
  seminar: {
    ...DEFAULT_POSTER,
    category: 'seminar',
    style: 'corporate',
    kicker: 'NATIONAL FORENSIC POLICY & CYBER DEFENSE SYMPOSIUM',
    headline: 'SOVEREIGN ENCLAVES: SECURING CRITICAL INFRASTRUCTURE',
    subtitle: 'High-level discourse on post-quantum cryptography, air-gapped system isolation, and SCADA defense.',
    description: 'An executive symposium convening forensic scientists, government security liaisons, and researchers to assess national cyber resilience.',
    tracks: [
      { title: 'Post-Quantum Transition', desc: 'NIST algorithm migration for enterprise systems' },
      { title: 'SCADA & Industrial IoT', desc: 'Securing power grids and nuclear forensic telemetry' },
      { title: 'Evidence Admissibility', desc: 'Section 65B Indian Evidence Act digital forensics compliance' },
      { title: 'Sovereign Cloud Policy', desc: 'Data localization and air-gapped computing enclaves' }
    ],
    foundingManifesto: 'Defense of national infrastructure begins with uncompromised integrity.',
    cycleTagline: 'Policy · Forensics · Resilience · Sovereignty',
    date: 'DECEMBER 02, 2026',
    time: '09:30 – 16:30 IST',
    venue: 'Senate Hall & Executive Auditorium, NFSU Campus',
    speakerName: 'Prof. (Dr.) Harish Chandra',
    speakerDesignation: 'Dean, School of Cyber Security & Forensics',
    accentColor: 'titanium',
    imageKey: 'monolith'
  },

  // 4. Guest Speaker Event (Keynote speaker spotlight card with avatar frame)
  talk: {
    ...DEFAULT_POSTER,
    category: 'talk',
    style: 'tech_conference',
    kicker: 'DISTINGUISHED SPEAKER & FIRESIDE SERIES',
    headline: 'THE CYBER DEFENDER ODYSSEY: FROM NFSU TO GLOBAL LABS',
    subtitle: 'An intimate fireside dialogue on international cyber warfare, AI agents in security, and career trajectories.',
    description: 'Join distinguished NFSU alumni and Google security engineers sharing unscripted lessons from defending global cloud infrastructure.',
    tracks: [
      { title: 'Cloud-Scale War Stories', desc: 'Incident response during coordinated state-level attacks' },
      { title: 'Autonomous AI in SOCs', desc: 'LLM agents triage, automated patch generation & limits' },
      { title: 'Career Blueprint', desc: 'Transitioning from campus student projects to premier labs' },
      { title: 'Unmoderated Q&A', desc: 'Open mic direct conversation with industry leads' }
    ],
    foundingManifesto: 'The most pivotal career leaps happen when practitioners exchange truth.',
    cycleTagline: 'Listen · Inquire · Network · Ascend',
    date: 'FRIDAY, NOVEMBER 20, 2026',
    time: '17:30 IST · DOORS OPEN 17:00',
    venue: 'Central University Auditorium, NFSU Campus',
    speakerName: 'Kabir Singhania',
    speakerDesignation: 'Principal Security Architect & Ex-Google Cloud Security Lead',
    accentColor: 'blue',
    imageKey: 'monolith'
  },

  // 5. Hackathon (Kinetic diagonal header, massive prize pool telemetry chip)
  hackathon: {
    ...DEFAULT_POSTER,
    category: 'hackathon',
    style: 'bold_type',
    kicker: '36-HOUR SOVEREIGN SECURITY HACKATHON',
    headline: 'SOVEREIGN HACK 2026: BUILD OPEN DEFENSE TOOLS',
    subtitle: 'Build open-source security tools, telemetry probes, and automated forensic utilities.',
    description: '₹2,50,000 in seed grants, compute credits, and mentorship from senior forensic investigators.',
    tracks: [
      { title: 'Forensic Automation', desc: 'High-throughput parsing of artifact registries' },
      { title: 'AI Vulnerability Scanners', desc: 'Local LLM audit agents for smart contracts and microservices' },
      { title: 'Public Safety Tech', desc: 'Emergency response and evidence integrity verification' },
      { title: 'Hardware Security', desc: 'Side-channel analyzers and hardware cryptographic tokens' }
    ],
    foundingManifesto: 'Build in the open. Test against reality. Let the code speak.',
    cycleTagline: 'Architect · Code · Benchmark · Deploy',
    date: 'NOVEMBER 27–29, 2026',
    time: '36 HOURS INTENSIVE',
    venue: 'Innovation & Incubation Hub, NFSU Campus',
    accentColor: 'purple',
    imageKey: 'campus_aerial'
  },

  // 6. Security Awareness Campaign (Swiss modernist brutalism, bold warning sign symbol)
  awareness: {
    ...DEFAULT_POSTER,
    category: 'awareness',
    style: 'editorial',
    kicker: 'CAMPUS CYBER HYGIENE & DIGITAL SOVEREIGNTY INITIATIVE',
    headline: 'THE SAFE PERIMETER: DIGITAL DEFENSE FOR CITIZENS',
    subtitle: 'Essential security hygiene, deepfake awareness, and financial fraud prevention for modern university life.',
    description: 'An open campus briefing breaking down how modern social engineering, deepfake scams, and credential harvesting work—and how to protect yourself and your peers.',
    tracks: [
      { title: 'Identity & Auth Hygiene', desc: 'Passkeys, hardware FIDO2 tokens, password managers' },
      { title: 'AI & Deepfake Scams', desc: 'Audio voice synthesis & visual forgery detection' },
      { title: 'UPI & Banking Defense', desc: 'Common UPI scam vectors & instantaneous grievance redressal' },
      { title: 'Privacy Sovereignty', desc: 'Managing digital footprints and mobile telemetry' }
    ],
    foundingManifesto: 'Security is not a product. It is a shared institutional culture.',
    cycleTagline: 'Awareness · Verification · Vigilance · Defense',
    date: 'NATIONAL CYBER SECURITY MONTH · WEDNESDAY',
    time: '15:30 – 17:30 IST',
    venue: 'NFSU Main University Auditorium & Live Stream',
    speakerName: 'Dr. Sunita V. Rao',
    speakerDesignation: 'Associate Professor of Cyber Law & Forensics Policy',
    accentColor: 'amber',
    imageKey: 'campus_night'
  },

  // 7. Student Recruitment (Magazine editorial spread, builder manifesto, multi-wing roadmap)
  recruitment: {
    ...DEFAULT_POSTER,
    category: 'recruitment',
    style: 'editorial',
    kicker: 'ANNUAL RECRUITMENT & BUILDER INDUCTION // 2026',
    headline: 'THE SIGNAL: NFSU’S NEXT GENERATION OF BUILDERS',
    subtitle: 'Google Developer Groups on Campus is recruiting developers, security researchers, and designers.',
    description: 'We build real systems, organize CTFs, conduct deep-dive technical workshops, and collaborate directly with industry engineers.',
    tracks: [
      { title: 'Cyber & CTF Wing', desc: 'Reverse engineering, forensics and tournament teams' },
      { title: 'Full-Stack & Cloud Wing', desc: 'Go, Rust, TypeScript, Cloud Run & microservices' },
      { title: 'Machine Learning & AI', desc: 'Gemini API, local LLMs and multimodal systems' },
      { title: 'Design & Editorial Wing', desc: 'Brand identity, typography, UX and event production' }
    ],
    foundingManifesto: 'Ideas don’t build themselves. People do.',
    cycleTagline: 'Learn · Experiment · Collaborate · Create',
    date: 'APPLICATIONS OPEN NOW',
    time: 'COHORT 2026–2027',
    venue: 'NFSU Gandhinagar & Virtual Orientation',
    accentColor: 'titanium',
    imageKey: 'campus_night'
  },

  // 8. Training Bootcamp (Day-by-day vertical milestone roadmap, syllabus cards)
  bootcamp: {
    ...DEFAULT_POSTER,
    category: 'bootcamp',
    style: 'terminal',
    kicker: '7-DAY INTENSIVE SKILL ACCELERATOR',
    headline: 'BINARY CRUCIBLE: 0-TO-1 EXPLOIT DEVELOPMENT BOOTCAMP',
    subtitle: 'From assembly language primitives to writing custom fuzzer targets and heap exploits.',
    description: 'Seven evening masterclasses designed for forensic science and computer science students ready for serious low-level engineering.',
    tracks: [
      { title: 'Day 01–02: x86_64 Assembly', desc: 'Registers, calling conventions, stack layout' },
      { title: 'Day 03–04: Debuggers & Triage', desc: 'GDB GEF/PEDA, dynamic tracing & breakpoints' },
      { title: 'Day 05–06: Fuzzing & AFL++', desc: 'Coverage-guided instrumentation & crash triage' },
      { title: 'Day 07: Capstone CTF', desc: 'Live multi-target vulnerable server tournament' }
    ],
    foundingManifesto: 'Master the primitives. The abstractions will follow.',
    cycleTagline: 'Decompile · Trace · Fuzz · Mitigate',
    date: 'DECEMBER 14–20, 2026',
    time: 'DAILY 18:00 – 21:00 IST',
    venue: 'Virtual CTF Range & NFSU Lab 03',
    accentColor: 'green',
    imageKey: 'forensics'
  },

  // 9. Technical Announcement (CVE-style security advisory bulletin framing)
  announcement: {
    ...DEFAULT_POSTER,
    category: 'announcement',
    style: 'security_interface',
    kicker: 'SECURITY ADVISORY // CVE-ALERT BULLETIN 2026-09',
    headline: 'ZERO-DAY MITIGATION NOTICE: SECURING CAMPUS WORKSTATIONS',
    subtitle: 'Urgent advisory regarding memory safety patches and authenticated boundary verification.',
    description: 'The GDG on Campus Cyber Wing and NFSU Digital Investigation Enclave have issued mitigation playbooks for all campus research clusters.',
    tracks: [
      { title: 'Action 01: Audit SSH Keys', desc: 'Revoke deprecated RSA 2048 keys and transition to ED25519' },
      { title: 'Action 02: Kernel Update', desc: 'Apply upstream Linux 6.12+ mitigation for speculative execution' },
      { title: 'Action 03: MFA Enforcement', desc: 'Activate FIDO2 hardware authentication tokens across portals' },
      { title: 'Action 04: Log Shipping', desc: 'Ensure all authentication audit events route to central SIEM' }
    ],
    foundingManifesto: 'Vigilance is continuous. Complacency is the vulnerability.',
    cycleTagline: 'Detect · Isolate · Patch · Validate',
    date: 'EFFECTIVE IMMEDIATELY · MANDATORY',
    time: 'SECURITY DIRECTIVE // PRIORITY 1',
    venue: 'All Connected NFSU Campus Research Networks',
    accentColor: 'red',
    imageKey: 'obsidian'
  },

  // 10. Multi-Campus Event (Synchronized nationwide cyber coalition, campus nodes map)
  multi_campus: {
    ...DEFAULT_POSTER,
    category: 'multi_campus',
    style: 'tech_conference',
    kicker: 'PAN-INDIA SYNCHRONIZED CYBER COALITION',
    headline: 'CYBER ENCLAVE 2026: 10 CAMPUSES, ONE DEFENSE GRID',
    subtitle: 'Simultaneous cross-campus hackathon, forensic tournament, and defense workshops.',
    description: 'Connecting Gandhinagar, Delhi, Goa, Tripura, Bhopal, Dharwad, Guwahati, Chennai, Bhubaneswar and Jaipur in a shared national security exercise.',
    tracks: [
      { title: 'Synchronized CTF Nodes', desc: 'Inter-campus attack-defense cyber range tournament' },
      { title: 'Cross-Campus Research Teams', desc: 'Collaborative development of forensic telemetry tools' },
      { title: 'Unified Faculty Masterclasses', desc: 'Simulcast sessions by senior forensic science chairs' },
      { title: 'All-India Leaderboard', desc: 'Live scoring matrix displayed across all 10 campus auditoriums' }
    ],
    foundingManifesto: 'A distributed university is an unbreachable defense perimeter.',
    cycleTagline: 'Unite · Connect · Defend · Excel',
    date: 'JANUARY 23–25, 2027',
    time: 'SYNCHRONIZED KICKOFF 10:00 IST',
    venue: 'Simulcast across all 10 Verified NFSU Cyber Campuses',
    accentColor: 'blue',
    imageKey: 'campus_aerial'
  },

  // 11. Community Achievement (Honor roll frame, trophy / laurel badge, rankings)
  achievement: {
    ...DEFAULT_POSTER,
    category: 'achievement',
    style: 'bold_type',
    kicker: 'NATIONAL CYBER EXCELLENCE // HALL OF FAME',
    headline: 'VICTORY IN CYBER RANGE: NFSU TEAM RANKS #1 NATIONWIDE',
    subtitle: 'Celebrating our student ethical hackers triumphing at the National Cyber Defense Challenge.',
    description: 'Competing against 240+ institutions, GDG on Campus NFSU students swept the binary exploitation and memory forensics championship.',
    tracks: [
      { title: '1st Place: Overall Trophy', desc: 'Scored 14,850 points across 48 non-stop tournament hours' },
      { title: 'Fastest Pwn Award', desc: 'Zero-day heap exploitation challenge solved in 34 minutes' },
      { title: 'Best Forensic Writeup', desc: 'Published comprehensive memory artifact triage methodology' },
      { title: 'Recruitment Honors', desc: 'Direct research fellowship offers extended to all 4 finalists' }
    ],
    foundingManifesto: 'Excellence is not an accident. It is disciplined engineering.',
    cycleTagline: 'Compete · Triumph · Inspire · Mentor',
    date: 'ACADEMIC YEAR 2026 HONORS',
    time: 'CEREMONY 16:00 IST',
    venue: 'University Convocational Amphitheatre, NFSU Gandhinagar',
    speakerName: 'National Cyber Security Coordinator',
    speakerDesignation: 'Chief Guest & Conferring Dignitary',
    accentColor: 'amber',
    imageKey: 'campus_day'
  },

  // 12. Event Countdown (T-minus timer display, bold kinetic numerals, urgent CTA)
  countdown: {
    ...DEFAULT_POSTER,
    category: 'countdown',
    style: 'cyberpunk',
    kicker: 'FINAL 48 HOURS BEFORE REGISTRATION LOCKS',
    headline: 'T-MINUS 48:00:00 // SECURE YOUR SEAT AT THE TERMINAL',
    subtitle: 'Limited access badges remaining for the National Capture The Flag Tournament.',
    description: 'Hardware tokens and team access credentials will be distributed only to verified pre-registered students. Do not wait for the deadline.',
    tracks: [
      { title: 'Step 01: Form Your Quad', desc: 'Teams of up to 4 students from accredited institutions' },
      { title: 'Step 02: Verify Student ID', desc: 'Instant student credential clearance via registration link' },
      { title: 'Step 03: Claim VPN Keys', desc: 'Secure OpenVPN access profiles deployed to team captains' },
      { title: 'Step 04: Enter the Arena', desc: 'Initial challenge flags unlock promptly at 09:00 IST' }
    ],
    foundingManifesto: 'Opportunities favor the prepared. Claim your place.',
    cycleTagline: '48 Hours · 100 Seats · 36 Hours of Cyber Warfare',
    date: 'FINAL REGISTRATION CUTOFF',
    time: 'THURSDAY · 23:59:59 IST SHARP',
    venue: 'Virtual Registration Portal (Scan QR Code Now)',
    ctaText: 'Clock is ticking. Verify your team now.',
    subCtaText: 'Immediate pass generation on completion',
    accentColor: 'red',
    imageKey: 'obsidian'
  },

  // Legacy Ethical Hacking Preset
  ethical_hacking: {
    ...DEFAULT_POSTER,
    category: 'ethical_hacking',
    style: 'security_interface',
    kicker: 'OFFENSIVE SECURITY & DEFENSIVE COUNTERMEASURES',
    headline: 'RED TEAM OPS: ZERO-DAY ANALYSIS & PENETRATION LAB',
    subtitle: 'Learn the exact methodologies ethical hackers and security consultants use to uncover critical flaws.',
    description: 'Hands-on session exploring modern web application exploitation, active directory attacks, and lateral movement evasion.',
    tracks: [
      { title: 'Reconnaissance & OSINT', desc: 'Advanced asset discovery & attack surface mapping' },
      { title: 'Web App Exploitation', desc: 'SSRF, GraphQL vulnerabilities, JWT bypasses' },
      { title: 'Active Directory Attacks', desc: 'Kerberoasting, BloodHound paths, ticket forging' },
      { title: 'Purple Teaming', desc: 'Translating offensive findings into sovereign defenses' }
    ],
    foundingManifesto: 'To defend a perimeter, you must understand how adversaries breach it.',
    cycleTagline: 'Recon · Infiltrate · Escalate · Report',
    date: 'DECEMBER 05, 2026',
    time: '10:00 – 16:30 IST',
    speakerName: 'Pooja Kashyap',
    speakerDesignation: 'Head of Offensive Research & CREST Certified Tester',
    accentColor: 'red',
    imageKey: 'obsidian'
  },

  // Custom Preset
  custom: {
    ...DEFAULT_POSTER,
    category: 'custom',
    style: 'editorial',
    kicker: 'CUSTOM GDG ON CAMPUS NFSU EVENT',
    headline: 'YOUR CYBERSECURITY EVENT HEADLINE',
    subtitle: 'Enter a concise, compelling subtitle for your event, workshop or meetup.',
    description: 'Describe what participants will learn, build, or experience during this cybersecurity initiative.',
    accentColor: 'blue',
    imageKey: 'campus_night'
  }
};
