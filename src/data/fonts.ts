export type FontCategory =
  | 'display'
  | 'sans'
  | 'mono'
  | 'cyber'
  | 'editorial'
  | 'devanagari';

export interface FontOption {
  family: string;
  category: FontCategory;
  categoryLabel: string;
  weights: number[];
  supportsHindi: boolean;
  sample: string;
  description: string;
  isCustom?: boolean;
}

export interface FontPairingPreset {
  id: string;
  name: string;
  tagline: string;
  headingFont: string;
  subtitleFont: string;
  bodyFont: string;
  monoFont: string;
  hindiFont: string;
  headingTransform: 'none' | 'uppercase' | 'capitalize';
  letterSpacing: number;
}

export const GOOGLE_FONT_OPTIONS: FontOption[] = [
  // Cyber / Tech & Display
  { family: 'Syne', category: 'display', categoryLabel: 'Display', weights: [600, 700, 800], supportsHindi: false, sample: 'CYBERSTRIKE 2026', description: 'Geometric modernist wide display' },
  { family: 'Orbitron', category: 'cyber', categoryLabel: 'Cyber / Tech', weights: [400, 600, 700, 800, 900], supportsHindi: false, sample: 'ZERO TRUST GRID', description: 'Precision sci-fi HUD telemetry display' },
  { family: 'Rajdhani', category: 'cyber', categoryLabel: 'Cyber / Tech', weights: [400, 500, 600, 700], supportsHindi: false, sample: 'NFSU DEFENSE LAB', description: 'Squared technical terminal heading' },
  { family: 'Exo 2', category: 'cyber', categoryLabel: 'Cyber / Tech', weights: [400, 600, 700, 800], supportsHindi: false, sample: 'PACKET TELEMETRY', description: 'Futuristic geometric tech sans' },
  { family: 'Space Grotesk', category: 'cyber', categoryLabel: 'Cyber / Tech', weights: [400, 500, 600, 700], supportsHindi: false, sample: 'GDG ON CAMPUS', description: 'Proportional technical UI sans' },
  { family: 'Bebas Neue', category: 'display', categoryLabel: 'Display', weights: [400], supportsHindi: false, sample: 'CAPTURE THE FLAG', description: 'Tall high-impact condensed headline' },
  { family: 'Oswald', category: 'display', categoryLabel: 'Display', weights: [400, 500, 600, 700], supportsHindi: false, sample: 'ETHICAL HACKING', description: 'Authoritative poster display weight' },
  { family: 'Barlow Condensed', category: 'display', categoryLabel: 'Display', weights: [500, 600, 700, 800], supportsHindi: false, sample: '36H SECURITY SPRINT', description: 'Sharp condensed grid display' },
  { family: 'Bricolage Grotesque', category: 'editorial', categoryLabel: 'Editorial', weights: [400, 600, 700, 800], supportsHindi: false, sample: 'THE SIGNAL EDITION', description: 'High-contrast expressive grotesque' },
  { family: 'Sora', category: 'display', categoryLabel: 'Display', weights: [400, 600, 700, 800], supportsHindi: false, sample: 'CLOUD SECURITY', description: 'Crisp contemporary tech geometry' },
  { family: 'Archivo', category: 'display', categoryLabel: 'Display', weights: [400, 600, 700, 800, 900], supportsHindi: false, sample: 'FORENSIC ARCHIVE', description: 'Neo-grotesque headline powerhouse' },

  // Sans-Serif
  { family: 'Inter', category: 'sans', categoryLabel: 'Sans-Serif', weights: [400, 500, 600, 700, 800], supportsHindi: false, sample: 'Clean Interface Copy', description: 'Precision UI and body readability' },
  { family: 'Roboto', category: 'sans', categoryLabel: 'Sans-Serif', weights: [400, 500, 700, 900], supportsHindi: false, sample: 'Google Developer Docs', description: 'Classic Android & Google standard' },
  { family: 'Montserrat', category: 'sans', categoryLabel: 'Sans-Serif', weights: [400, 600, 700, 800, 900], supportsHindi: false, sample: 'NATIONAL SUMMIT', description: 'Geometric urban poster sans' },
  { family: 'Poppins', category: 'sans', categoryLabel: 'Sans-Serif', weights: [400, 500, 600, 700, 800], supportsHindi: true, sample: 'Campus Workshop · साइबर सुरक्षा', description: 'Geometric sans with Devanagari script' },
  { family: 'Plus Jakarta Sans', category: 'sans', categoryLabel: 'Sans-Serif', weights: [400, 500, 600, 700, 800], supportsHindi: false, sample: 'Developer Community', description: 'Modern balanced product typography' },
  { family: 'DM Sans', category: 'sans', categoryLabel: 'Sans-Serif', weights: [400, 500, 700], supportsHindi: false, sample: 'Low-contrast readable', description: 'Clean geometric body copy' },
  { family: 'Manrope', category: 'sans', categoryLabel: 'Sans-Serif', weights: [400, 500, 600, 700, 800], supportsHindi: false, sample: 'Forensic Operations', description: 'Modern semi-condensed UI sans' },

  // Monospace
  { family: 'JetBrains Mono', category: 'mono', categoryLabel: 'Monospace', weights: [400, 500, 600, 700], supportsHindi: false, sample: 'root@nfsu:~# ./exploit', description: 'Developer CLI & terminal monospace' },
  { family: 'IBM Plex Mono', category: 'mono', categoryLabel: 'Monospace', weights: [400, 500, 600, 700], supportsHindi: false, sample: 'SHA256: 8f9a..e41b', description: 'Forensic telemetry & audit mono' },

  // Editorial Serif
  { family: 'Playfair Display', category: 'editorial', categoryLabel: 'Editorial Serif', weights: [500, 600, 700, 800], supportsHindi: false, sample: 'Academic Distinction', description: 'High-contrast institutional editorial serif' },

  // Hindi / Devanagari Script
  { family: 'Noto Sans Devanagari', category: 'devanagari', categoryLabel: 'Hindi / Devanagari', weights: [400, 500, 600, 700, 800], supportsHindi: true, sample: 'राष्ट्रीय न्यायालयिक विज्ञान विश्वविद्यालय', description: 'Official Devanagari sans for crisp Hindi copy' },
  { family: 'Noto Serif Devanagari', category: 'devanagari', categoryLabel: 'Hindi / Devanagari', weights: [400, 600, 700], supportsHindi: true, sample: 'विद्यया अमृतं अश्नुते', description: 'Formal academic Devanagari serif' },
  { family: 'Hind', category: 'devanagari', categoryLabel: 'Hindi / Devanagari', weights: [400, 500, 600, 700], supportsHindi: true, sample: 'साइबर सुरक्षा कार्यशाला', description: 'UI-tuned legible Devanagari + Latin' },
  { family: 'Teko', category: 'devanagari', categoryLabel: 'Hindi / Devanagari', weights: [500, 600, 700], supportsHindi: true, sample: 'साइबर डिफेंस 2026', description: 'High-impact condensed Hindi & English display' }
];

export const FONT_PAIRING_PRESETS: FontPairingPreset[] = [
  {
    id: 'tech_cyber',
    name: 'Tech Cyber',
    tagline: 'Orbitron display paired with Space Grotesk and JetBrains Mono telemetry',
    headingFont: 'Orbitron',
    subtitleFont: 'Space Grotesk',
    bodyFont: 'Inter',
    monoFont: 'JetBrains Mono',
    hindiFont: 'Noto Sans Devanagari',
    headingTransform: 'uppercase',
    letterSpacing: 0.04
  },
  {
    id: 'modern_developer',
    name: 'Modern Developer',
    tagline: 'Space Grotesk headlines with Inter body and IBM Plex Mono code accents',
    headingFont: 'Space Grotesk',
    subtitleFont: 'Inter',
    bodyFont: 'DM Sans',
    monoFont: 'IBM Plex Mono',
    hindiFont: 'Noto Sans Devanagari',
    headingTransform: 'none',
    letterSpacing: -0.02
  },
  {
    id: 'cybersecurity_alert',
    name: 'Cybersecurity Alert',
    tagline: 'Condensed Barlow Condensed warnings with JetBrains Mono indicators',
    headingFont: 'Barlow Condensed',
    subtitleFont: 'Rajdhani',
    bodyFont: 'Roboto',
    monoFont: 'JetBrains Mono',
    hindiFont: 'Teko',
    headingTransform: 'uppercase',
    letterSpacing: 0.03
  },
  {
    id: 'minimalist_academic',
    name: 'Minimalist Academic',
    tagline: 'Playfair Display institutional authority with Plus Jakarta Sans clarity',
    headingFont: 'Playfair Display',
    subtitleFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    monoFont: 'IBM Plex Mono',
    hindiFont: 'Noto Serif Devanagari',
    headingTransform: 'none',
    letterSpacing: -0.01
  },
  {
    id: 'bold_conference',
    name: 'Bold Conference',
    tagline: 'Room-commanding Bebas Neue banners paired with Montserrat details',
    headingFont: 'Bebas Neue',
    subtitleFont: 'Montserrat',
    bodyFont: 'Manrope',
    monoFont: 'JetBrains Mono',
    hindiFont: 'Teko',
    headingTransform: 'uppercase',
    letterSpacing: 0.04
  },
  {
    id: 'terminal_dark',
    name: 'Terminal Dark',
    tagline: 'Authentic end-to-end JetBrains Mono & IBM Plex Mono shell aesthetic',
    headingFont: 'JetBrains Mono',
    subtitleFont: 'IBM Plex Mono',
    bodyFont: 'JetBrains Mono',
    monoFont: 'JetBrains Mono',
    hindiFont: 'Noto Sans Devanagari',
    headingTransform: 'uppercase',
    letterSpacing: 0.01
  },
  {
    id: 'editorial_event',
    name: 'Editorial Event',
    tagline: 'Syne expressive headline rhythm with Bricolage Grotesque & DM Sans',
    headingFont: 'Syne',
    subtitleFont: 'Bricolage Grotesque',
    bodyFont: 'DM Sans',
    monoFont: 'IBM Plex Mono',
    hindiFont: 'Hind',
    headingTransform: 'uppercase',
    letterSpacing: -0.02
  },
  {
    id: 'bilingual_devanagari',
    name: 'Bilingual English + Hindi',
    tagline: 'Poppins & Noto Sans Devanagari unified proportions across scripts',
    headingFont: 'Poppins',
    subtitleFont: 'Noto Sans Devanagari',
    bodyFont: 'Hind',
    monoFont: 'JetBrains Mono',
    hindiFont: 'Noto Sans Devanagari',
    headingTransform: 'none',
    letterSpacing: 0
  }
];

export const GOOGLE_FONTS_CSS2_QUERY =
  'family=Archivo:wght@400;600;700;800&family=Barlow+Condensed:wght@500;600;700;800&family=Bebas+Neue&family=Bricolage+Grotesque:opsz,wght@12..96,400;600;700;800&family=DM+Sans:wght@400;500;700&family=Exo+2:wght@400;600;700;800&family=Hind:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Montserrat:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@400;600;700&family=Orbitron:wght@400;600;700;800;900&family=Oswald:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&family=Rajdhani:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&family=Sora:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&family=Teko:wght@500;600;700&display=swap';

export function getGoogleFontsStylesheetUrl(): string {
  return `https://fonts.googleapis.com/css2?${GOOGLE_FONTS_CSS2_QUERY}`;
}

export function containsDevanagari(text?: string): boolean {
  if (!text) return false;
  return /[\u0900-\u097F]/.test(text);
}

export function buildFontFamilyStack(primaryFont?: string, hindiFont = 'Noto Sans Devanagari'): string {
  const safePrimary = primaryFont ? `"${primaryFont.replace(/"/g, '')}"` : '"Syne"';
  const safeHindi = `"${hindiFont.replace(/"/g, '')}"`;
  return `${safePrimary}, ${safeHindi}, "Noto Sans Devanagari", "Plus Jakarta Sans", sans-serif`;
}

export async function verifyAndLoadFont(fontFamily: string, sampleText = 'CYBERSECURITY 2026'): Promise<{
  family: string;
  loaded: boolean;
  reason?: string;
}> {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return { family: fontFamily, loaded: true };
  }
  try {
    await document.fonts.load(`700 16px "${fontFamily}"`, sampleText);
    const loaded = document.fonts.check(`16px "${fontFamily}"`, sampleText);
    return {
      family: fontFamily,
      loaded,
      reason: loaded ? undefined : `Font "${fontFamily}" has not finished loading; fallback stack will be used.`
    };
  } catch (err: any) {
    return {
      family: fontFamily,
      loaded: false,
      reason: err?.message || `Unable to load "${fontFamily}".`
    };
  }
}

export interface CustomFontRecord {
  id: string;
  family: string;
  fileName: string;
  format: string;
  dataUrl: string;
  uploadedAt: number;
}

export const STORAGE_KEY_CUSTOM_FONTS = 'gdgoc_nfsu_custom_fonts_v1';

export function loadStoredCustomFonts(): CustomFontRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_FONTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredCustomFonts(fonts: CustomFontRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_FONTS, JSON.stringify(fonts));
  } catch (e) {
    console.error('Custom font storage limit reached', e);
  }
}

export async function registerCustomFontFace(record: CustomFontRecord): Promise<boolean> {
  if (typeof window === 'undefined' || typeof FontFace === 'undefined') return false;
  try {
    const face = new FontFace(record.family, `url(${record.dataUrl})`);
    const loaded = await face.load();
    document.fonts.add(loaded);
    return true;
  } catch (e) {
    console.error('Failed to register custom FontFace', record.family, e);
    return false;
  }
}
