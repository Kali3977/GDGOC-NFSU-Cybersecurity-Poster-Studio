import {
  BackgroundConfig,
  BackgroundMode,
  CanvasElement,
  HeroImageConfig,
  PosterContent,
  PosterFormat,
  PosterImageKey,
  PosterTypographyMap,
  PreflightIssue,
  TextElementStyle,
  TypographyElementKey
} from '../types/poster';
import { BackgroundPreset } from '../data/backgroundPresets';
import { PosterThemeDefinition } from '../data/themesData';
import { FontPairingPreset, containsDevanagari } from '../data/fonts';
import { DecorativeSvgAsset } from '../data/elementsLibrary';
import { CampusInfo } from '../data/campuses';
import { normalizeImageUrl, validateImageUrl } from './imageValidation';

export const IMAGE_KEY_TO_LOCAL_PATH: Record<Exclude<PosterImageKey, 'custom'>, string> = {
  forensics: '/assets/images/signal_silicon_forensics_1794419167984.jpg',
  campus_night: '/assets/aistudio/OIP_72f641f4.webp',
  campus_day: '/assets/aistudio/OIP_5b55c84a.webp',
  campus_aerial: '/assets/aistudio/OIP_8b72b508.webp',
  monolith: '/assets/images/signal_brutalist_monolith_1794418292586.jpg',
  acoustic: '/assets/images/signal_acoustic_mirror_1794418294212.jpg',
  obsidian: '/assets/images/signal_tactile_prism_1794418294380.jpg',
  waveform: '/assets/images/signal_acoustic_mirror_1794418294212.jpg'
};

export const DEFAULT_BACKGROUND_EFFECTS = {
  grid: false,
  matrix: false,
  circuit: false,
  network: false,
  particles: false,
  geometricLines: false,
  glow: false,
  radialLight: false
};

export function createDefaultBackgroundConfig(content?: Partial<PosterContent>): BackgroundConfig {
  const legacyType = content?.bgGradientType;
  let mode: BackgroundMode = 'gradient';
  if (legacyType === 'solid') mode = 'solid';
  else if (legacyType === 'pattern') mode = 'pattern';
  else if (legacyType === 'photo') mode = 'image';
  else if (legacyType === 'linear_2' || legacyType === 'mesh_multi') mode = 'gradient';

  return {
    mode,
    presetId: undefined,
    solidColor: content?.backgroundSettings?.color || content?.bgGradientColor1 || '#050814',
    gradientType: 'linear',
    gradientStops: [
      { color: content?.bgGradientColor1 || '#050814', position: 0 },
      { color: content?.bgGradientColor2 || '#0B1A3A', position: 100 }
    ],
    gradientAngle: content?.bgGradientAngle ?? 135,
    gradientPosition: { x: 50, y: 50 },
    gradientOpacity: 100,
    patternId: content?.bgPattern || 'subtle-grid',
    patternOpacity: 50,
    patternColor: '#38BDF8',
    imageUrl: undefined, // Strictly empty unless user sets an explicit Background Image!
    imageFit: 'cover',
    imageZoom: content?.backgroundSettings?.zoom ?? 100,
    imageOffsetX: content?.backgroundSettings?.offsetX ?? 0,
    imageOffsetY: content?.backgroundSettings?.offsetY ?? 0,
    imageOpacity: content?.backgroundSettings?.opacity ?? 100,
    imageBlur: content?.bgBlur ?? 0,
    imageBrightness: content?.bgBrightness ?? 95,
    imageContrast: content?.bgContrast ?? 105,
    imageSaturation: 100,
    imageHue: 0,
    vignette: 25,
    noiseIntensity: content?.showFilmGrain ? 15 : 0,
    overlayColor: '#050814',
    overlayOpacity: content?.bgDarkOverlayOpacity ?? 55,
    effects: {
      ...DEFAULT_BACKGROUND_EFFECTS,
      grid: content?.bgPattern === 'subtle-grid'
    }
  };
}

export function createDefaultHeroImageConfig(content?: Partial<PosterContent>): HeroImageConfig {
  const imageKey = content?.imageKey || 'forensics';
  const rawSrc =
    content?.customImageUrl && normalizeImageUrl(content.customImageUrl)
      ? normalizeImageUrl(content.customImageUrl)
      : imageKey !== 'custom'
      ? IMAGE_KEY_TO_LOCAL_PATH[imageKey]
      : IMAGE_KEY_TO_LOCAL_PATH.forensics;

  return {
    enabled: true,
    src: rawSrc,
    imageKey,
    alt: content?.headline || 'Cybersecurity Visual',
    x: 56,
    y: 18,
    width: 38,
    height: 44,
    fit: 'cover',
    zoom: content?.imageZoom ?? 100,
    focalX: content?.imageFocalX ?? 50,
    focalY: content?.imageFocalY ?? 50,
    rotation: content?.imageRotation ?? 0,
    opacity: content?.imageOpacity ?? 100,
    brightness: 100,
    contrast: 105,
    saturation: 105,
    hue: 0,
    blur: 0,
    filter: content?.imageFilter ?? 'none',
    borderWidth: content?.imageBorderWidth ?? 1,
    borderColor: content?.imageBorderColor || 'rgba(56, 189, 248, 0.35)',
    borderRadius: 12,
    shadow: 'glow',
    maskShape: 'rounded'
  };
}

export function resolveHeroImageConfig(content: PosterContent): HeroImageConfig {
  const base = createDefaultHeroImageConfig(content);
  if (!content.heroImage) return base;
  return {
    ...base,
    ...content.heroImage,
    src: content.heroImage.src ? normalizeImageUrl(content.heroImage.src) : base.src
  };
}

export function resolveBackgroundConfig(content: PosterContent): BackgroundConfig {
  const base = createDefaultBackgroundConfig(content);
  if (!content.backgroundConfig) return base;
  return {
    ...base,
    ...content.backgroundConfig,
    effects: {
      ...DEFAULT_BACKGROUND_EFFECTS,
      ...(content.backgroundConfig.effects || {})
    }
  };
}

/**
 * Strictly assigns an image to ONE independent role:
 * - 'hero': updates heroImage slot (preserving box position/dimensions!) without touching backgroundConfig.
 * - 'background': updates backgroundConfig.imageUrl & mode='image' without touching heroImage.
 * - 'decoration': inserts a brand-new foreground decorative image layer into content.elements.
 */
export function setImageRole(
  content: PosterContent,
  rawUrl: string,
  role: 'hero' | 'background' | 'decoration',
  meta?: { title?: string; category?: string }
): PosterContent {
  const cleanUrl = normalizeImageUrl(rawUrl);
  if (!cleanUrl) return content;

  if (role === 'hero') {
    const currentHero = resolveHeroImageConfig(content);
    return {
      ...content,
      imageKey: 'custom',
      customImageUrl: cleanUrl,
      heroImage: {
        ...currentHero,
        enabled: true,
        src: cleanUrl,
        imageKey: 'custom',
        alt: meta?.title || currentHero.alt || content.headline
      }
    };
  }

  if (role === 'background') {
    const currentBg = resolveBackgroundConfig(content);
    return {
      ...content,
      backgroundConfig: {
        ...currentBg,
        mode: 'image',
        imageUrl: cleanUrl
      }
    };
  }

  // 'decoration': add independent foreground element
  const existingElements = content.elements || [];
  const maxZ = existingElements.reduce((m, el) => Math.max(m, el.zIndex || 0), 10);
  const newEl: CanvasElement = {
    id: `el_decor_img_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    type: 'image',
    label: meta?.title ? `Decor: ${meta.title.slice(0, 24)}` : 'Decorative Image',
    x: 58,
    y: 52,
    width: 30,
    height: 24,
    rotation: 0,
    locked: false,
    hidden: false,
    zIndex: maxZ + 5,
    src: cleanUrl,
    opacity: 92,
    borderRadius: 10,
    fit: 'cover',
    maskShape: 'rounded',
    shadow: true,
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.45)'
  };

  return {
    ...content,
    elements: [...existingElements, newEl]
  };
}

/**
 * Inserts a decorative SVG graphic strictly as a foreground element (never modifies background).
 */
export function addDecorativeSvgElement(
  content: PosterContent,
  asset: DecorativeSvgAsset
): PosterContent {
  const existingElements = content.elements || [];
  const maxZ = existingElements.reduce((m, el) => Math.max(m, el.zIndex || 0), 20);
  const newEl: CanvasElement = {
    id: `el_svg_${asset.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    type: 'svg_graphic',
    label: asset.name,
    x: 64,
    y: 18,
    width: asset.defaultWidthPct,
    height: asset.defaultHeightPct,
    rotation: 0,
    locked: false,
    hidden: false,
    zIndex: maxZ + 4,
    svgPresetId: asset.id,
    svgViewBox: asset.viewBox,
    svgInner: asset.svgInner,
    fillColor: asset.defaultColor,
    opacity: 90
  };
  return {
    ...content,
    elements: [...existingElements, newEl]
  };
}

/**
 * Applies a Background Preset strictly to backgroundConfig (never touches heroImage, copy, or elements).
 */
export function applyBackgroundPresetNonDestructive(
  content: PosterContent,
  preset: BackgroundPreset
): PosterContent {
  const currentBg = resolveBackgroundConfig(content);
  const nextBg: BackgroundConfig = {
    ...currentBg,
    ...preset.config,
    presetId: preset.id,
    effects: {
      ...DEFAULT_BACKGROUND_EFFECTS,
      ...(preset.config.effects || {})
    }
  };
  return {
    ...content,
    backgroundConfig: nextBg
  };
}

/**
 * Applies a Visual Theme non-destructively:
 * Updates theme styling, accent color, theme decorative style, and typography without wiping
 * user event details or user uploaded/selected hero or background images.
 */
export function applyThemeNonDestructive(
  content: PosterContent,
  theme: PosterThemeDefinition
): PosterContent {
  const currentBg = resolveBackgroundConfig(content);
  const preserveImageBg = currentBg.mode === 'image' && Boolean(currentBg.imageUrl);
  const preserveTransparentBg = currentBg.mode === 'transparent' || currentBg.mode === 'none';

  const nextBg: BackgroundConfig = preserveImageBg || preserveTransparentBg
    ? currentBg
    : {
        ...currentBg,
        mode: 'gradient',
        gradientType: 'linear',
        gradientAngle: 135,
        gradientStops: [
          { color: '#050814', position: 0 },
          { color: theme.palette.accentHex || '#38BDF8', position: 100 }
        ],
        gradientOpacity: 35,
        patternId: theme.decorative.pattern || 'subtle-grid'
      };

  const currentTypo = content.typographyMap || {};
  const nextTypo: PosterTypographyMap = {
    ...currentTypo,
    headline: {
      ...(currentTypo.headline || {}),
      fontFamily: theme.typography.fontFamily,
      textTransform: theme.typography.isUppercase ? 'uppercase' : 'none'
    }
  };

  return {
    ...content,
    themeId: theme.id,
    style: theme.cyberStyle,
    accentColor: theme.accentColor,
    fontFamily: theme.typography.fontFamily,
    bgPattern: theme.decorative.pattern,
    backgroundConfig: nextBg,
    typographyMap: nextTypo
  };
}

export function applyFontPairingNonDestructive(
  content: PosterContent,
  pairing: FontPairingPreset
): PosterContent {
  const map = content.typographyMap || {};
  return {
    ...content,
    fontFamily: pairing.headingFont,
    hindiFontFamily: pairing.hindiFont,
    typographyMap: {
      ...map,
      headline: {
        ...(map.headline || {}),
        fontFamily: pairing.headingFont,
        textTransform: pairing.headingTransform,
        letterSpacing: pairing.letterSpacing
      },
      subtitle: {
        ...(map.subtitle || {}),
        fontFamily: pairing.subtitleFont
      },
      description: {
        ...(map.description || {}),
        fontFamily: pairing.bodyFont
      },
      manifesto: {
        ...(map.manifesto || {}),
        fontFamily: pairing.subtitleFont
      },
      kicker: {
        ...(map.kicker || {}),
        fontFamily: pairing.monoFont
      },
      dateTime: {
        ...(map.dateTime || {}),
        fontFamily: pairing.monoFont
      },
      venue: {
        ...(map.venue || {}),
        fontFamily: pairing.bodyFont
      },
      speakerName: {
        ...(map.speakerName || {}),
        fontFamily: pairing.headingFont
      },
      speakerDesignation: {
        ...(map.speakerDesignation || {}),
        fontFamily: pairing.bodyFont
      }
    }
  };
}

export function updateElementTypography(
  content: PosterContent,
  key: TypographyElementKey,
  updates: Partial<TextElementStyle>
): PosterContent {
  const map = content.typographyMap || {};
  return {
    ...content,
    typographyMap: {
      ...map,
      [key]: {
        ...(map[key] || {}),
        ...updates
      }
    }
  };
}

export function buildGradientString(bg: BackgroundConfig): string {
  const stops = (bg.gradientStops && bg.gradientStops.length >= 2
    ? bg.gradientStops
    : [
        { color: '#050814', position: 0 },
        { color: '#0D2D66', position: 100 }
      ]
  )
    .map((s) => `${s.color} ${s.position}%`)
    .join(', ');

  if (bg.gradientType === 'radial') {
    const pos = bg.gradientPosition || { x: 50, y: 50 };
    return `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${stops})`;
  }
  if (bg.gradientType === 'conic') {
    const pos = bg.gradientPosition || { x: 50, y: 50 };
    return `conic-gradient(from ${bg.gradientAngle ?? 45}deg at ${pos.x}% ${pos.y}%, ${stops})`;
  }
  return `linear-gradient(${bg.gradientAngle ?? 135}deg, ${stops})`;
}

export function getPosterDimensionMetrics(
  format: PosterFormat,
  customWidthPx = 1080,
  customHeightPx = 1350
): {
  widthPx: number;
  heightPx: number;
  label: string;
  aspectRatio: string;
} {
  switch (format) {
    case '1:1':
      return { widthPx: 1080, heightPx: 1080, label: 'Instagram Square (1:1)', aspectRatio: '1 / 1' };
    case '9:16':
      return { widthPx: 1080, heightPx: 1920, label: 'Instagram Story / Reel (9:16)', aspectRatio: '9 / 16' };
    case 'whatsapp':
      return { widthPx: 1080, heightPx: 1350, label: 'WhatsApp Flyer (1080×1350)', aspectRatio: '4 / 5' };
    case 'a4':
      return { widthPx: 2480, heightPx: 3508, label: 'A4 Print Poster (300 DPI)', aspectRatio: '210 / 297' };
    case 'custom': {
      const w = Math.max(320, Math.min(4096, Math.round(customWidthPx || 1080)));
      const h = Math.max(320, Math.min(4096, Math.round(customHeightPx || 1350)));
      return { widthPx: w, heightPx: h, label: `Custom (${w}×${h})`, aspectRatio: `${w} / ${h}` };
    }
    case '4:5':
    default:
      return { widthPx: 1080, heightPx: 1350, label: 'Instagram Portrait (4:5)', aspectRatio: '4 / 5' };
  }
}

export type ExportFormatType = 'png' | 'png_transparent' | 'jpeg' | 'svg';

export function getExportPlan(
  exportFormat: ExportFormatType,
  backgroundMode: BackgroundMode,
  jpegFallbackColor = '#FFFFFF'
): {
  requiresFallbackBackgroundPrompt: boolean;
  effectiveBackgroundColor: string | undefined;
  alphaChannelPreserved: boolean;
  note: string;
} {
  const isTransparentMode = backgroundMode === 'transparent' || backgroundMode === 'none';

  if (exportFormat === 'png_transparent') {
    return {
      requiresFallbackBackgroundPrompt: false,
      effectiveBackgroundColor: 'transparent',
      alphaChannelPreserved: true,
      note: isTransparentMode
        ? 'Genuine PNG alpha transparency active.'
        : 'Alpha channel active. Switch Background Studio to "Transparent" for full transparent canvas.'
    };
  }

  if (exportFormat === 'png' || exportFormat === 'svg') {
    return {
      requiresFallbackBackgroundPrompt: false,
      effectiveBackgroundColor: isTransparentMode ? 'transparent' : undefined,
      alphaChannelPreserved: isTransparentMode,
      note: isTransparentMode
        ? 'Transparent background preserved in alpha-capable output.'
        : 'Full background layer included in export.'
    };
  }

  // JPEG does not support alpha channel
  if (isTransparentMode) {
    return {
      requiresFallbackBackgroundPrompt: true,
      effectiveBackgroundColor: jpegFallbackColor || '#FFFFFF',
      alphaChannelPreserved: false,
      note: `JPEG does not support transparency. Fallback solid fill (${jpegFallbackColor || '#FFFFFF'}) will be applied.`
    };
  }

  return {
    requiresFallbackBackgroundPrompt: false,
    effectiveBackgroundColor: '#050811',
    alphaChannelPreserved: false,
    note: 'Standard opaque JPEG render.'
  };
}

export function runPreflightChecks(
  content: PosterContent,
  campus: CampusInfo,
  exportFormat?: ExportFormatType
): PreflightIssue[] {
  const issues: PreflightIssue[] = [];
  const bg = resolveBackgroundConfig(content);
  const hero = resolveHeroImageConfig(content);

  // 1. Missing Registration URL when QR is active
  if (content.showQrCode && (!content.qrDestination || !content.qrDestination.trim())) {
    issues.push({
      id: 'missing_qr_url',
      level: 'error',
      category: 'Registration & QR',
      message: 'QR Code is active on the poster canvas, but no registration destination URL has been specified.',
      fixLabel: 'Set Official GDG Portal URL',
      fieldToFix: 'qrDestination',
      recommendedValue: 'https://gdg.community.dev/events/details/developer-groups-nfsu/'
    });
  }

  // 2. Hero Image Validation
  if (hero.enabled && hero.src) {
    const heroCheck = validateImageUrl(hero.src);
    if (!heroCheck.valid) {
      issues.push({
        id: 'invalid_hero_img_url',
        level: 'error',
        category: 'Hero Image & Media',
        message: `Hero image failed URL validation: ${heroCheck.reason}`,
        fixLabel: 'Restore Verified Silicon Hero Asset',
        fieldToFix: 'heroImage',
        recommendedValue: { ...hero, src: IMAGE_KEY_TO_LOCAL_PATH.forensics, imageKey: 'forensics' }
      });
    }
  }

  // 3. Background Image Validation
  if (bg.mode === 'image') {
    if (!bg.imageUrl) {
      issues.push({
        id: 'missing_bg_img',
        level: 'error',
        category: 'Background Studio',
        message: 'Background Image mode is active, but no background image URL has been assigned.',
        fixLabel: 'Switch Background to Nebula Preset',
        fieldToFix: 'backgroundConfig',
        recommendedValue: { ...bg, mode: 'gradient' }
      });
    } else {
      const bgCheck = validateImageUrl(bg.imageUrl);
      if (!bgCheck.valid) {
        issues.push({
          id: 'invalid_bg_img_url',
          level: 'error',
          category: 'Background Studio',
          message: `Background image URL is invalid: ${bgCheck.reason}`,
          fixLabel: 'Reset Background to Deep Gradient',
          fieldToFix: 'backgroundConfig',
          recommendedValue: { ...bg, mode: 'gradient', imageUrl: undefined }
        });
      }
    }
  }

  // 4. Transparent background + JPEG conflict check
  if ((bg.mode === 'transparent' || bg.mode === 'none') && exportFormat === 'jpeg') {
    issues.push({
      id: 'jpeg_transparent_conflict',
      level: 'warning',
      category: 'Export Compatibility',
      message: 'Background is Transparent, which JPEG does not support. Choose Transparent PNG or pick a JPEG fallback color in Export Studio.',
    });
  }

  // 5. Text Overflow in Headline
  if (content.headline && content.headline.length > 68) {
    issues.push({
      id: 'headline_overflow',
      level: 'warning',
      category: 'Typography & Layout',
      message: `Headline is ${content.headline.length} characters long. On compact 1:1 square exports, lines may wrap densely.`,
      fixLabel: 'Condense Headline',
      fieldToFix: 'headline',
      recommendedValue: content.headline.split(':')[0] || content.headline.slice(0, 52)
    });
  }

  // 6. Missing Venue
  if (!content.venue || content.venue.trim() === '' || content.venue.toLowerCase().includes('tbd')) {
    issues.push({
      id: 'missing_venue',
      level: 'warning',
      category: 'Event Logistics',
      message: 'Event venue is blank or marked TBD. Attendees need a confirmed campus hall or lab.',
      fixLabel: `Set Venue to ${campus.defaultVenue.split(',')[0]}`,
      fieldToFix: 'venue',
      recommendedValue: campus.defaultVenue
    });
  }

  // 7. Missing Event Date
  if (!content.date || content.date.trim() === '' || content.date.toLowerCase().includes('tbd')) {
    issues.push({
      id: 'missing_date',
      level: 'warning',
      category: 'Event Logistics',
      message: 'Event date is unspecified or marked as TBD.',
      fixLabel: 'Set Confirmed Date Placeholder',
      fieldToFix: 'date',
      recommendedValue: 'OCTOBER 24–26, 2026'
    });
  }

  // 8. Low overlay contrast check on background image
  if (bg.mode === 'image' && bg.overlayOpacity < 35) {
    issues.push({
      id: 'low_text_contrast_overlay',
      level: 'warning',
      category: 'Color & Contrast',
      message: 'Background image scrim overlay is below 35%. Typography legibility may suffer over bright areas.',
      fixLabel: 'Boost Background Scrim to 65%',
      fieldToFix: 'backgroundConfig',
      recommendedValue: { ...bg, overlayOpacity: 65 }
    });
  }

  // 9. Hindi Devanagari detection advisory
  const allCopy = `${content.headline} ${content.subtitle} ${content.description} ${content.venue}`;
  if (containsDevanagari(allCopy) && !content.hindiFontFamily) {
    issues.push({
      id: 'hindi_font_pairing_hint',
      level: 'info',
      category: 'Multilingual Typography',
      message: 'Devanagari (Hindi) script detected. Select a dedicated Hindi font in Typography Studio for crisp rendering.',
      fixLabel: 'Enable Noto Sans Devanagari',
      fieldToFix: 'hindiFontFamily',
      recommendedValue: 'Noto Sans Devanagari'
    });
  }

  // 10. Out-of-bounds & Overlapping interactive elements
  const visibleElements = (content.elements || []).filter((el) => !el.hidden);
  const outOfBounds = visibleElements.filter(
    (el) => el.x < 0 || el.y < 0 || el.x + el.width > 102 || el.y > 96
  );
  if (outOfBounds.length > 0) {
    issues.push({
      id: 'elements_out_of_bounds',
      level: 'warning',
      category: 'Interactive Layout',
      message: `${outOfBounds.length} layer(s) extend outside safe canvas bounds and may clip on export.`,
      fixLabel: 'Clamp Layers Inside Canvas',
      fieldToFix: 'elements',
      recommendedValue: (content.elements || []).map((el) => ({
        ...el,
        x: Math.max(2, Math.min(98 - el.width, el.x)),
        y: Math.max(2, Math.min(90, el.y))
      }))
    });
  }

  // Simple bounding overlap check between text/image layers
  let overlapPairs = 0;
  for (let i = 0; i < visibleElements.length; i++) {
    for (let j = i + 1; j < visibleElements.length; j++) {
      const a = visibleElements[i];
      const b = visibleElements[j];
      if (a.type === 'svg_graphic' || b.type === 'svg_graphic') continue;
      const aH = a.height || 8;
      const bH = b.height || 8;
      const overlapX = a.x < b.x + b.width - 2 && a.x + a.width - 2 > b.x;
      const overlapY = a.y < b.y + bH - 1 && a.y + aH - 1 > b.y;
      if (overlapX && overlapY) {
        overlapPairs++;
      }
    }
  }
  if (overlapPairs > 0) {
    issues.push({
      id: 'overlapping_elements_notice',
      level: 'info',
      category: 'Interactive Layout',
      message: `${overlapPairs} interactive layer pair(s) share overlapping bounding coordinates. Inspect Layer Order if unintended.`
    });
  }

  // 11. Unverified campus advisory
  if (!campus.isVerified) {
    issues.push({
      id: 'unverified_campus_notice',
      level: 'info',
      category: 'Institutional Governance',
      message: `${campus.name} is a custom/unverified campus entry. Verify official cybersecurity programme listing before institutional distribution.`
    });
  }

  return issues;
}
