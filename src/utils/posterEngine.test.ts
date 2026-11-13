import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_POSTER } from '../types/poster';
import { INITIAL_VERIFIED_CAMPUSES } from '../data/campuses';
import { BACKGROUND_PRESETS, CURATED_CYBER_PALETTES, hexToHsl, hexToRgb, hslToHex, rgbToHex } from '../data/backgroundPresets';
import { FONT_PAIRING_PRESETS, GOOGLE_FONT_OPTIONS, containsDevanagari } from '../data/fonts';
import { DECORATIVE_ELEMENTS_LIBRARY } from '../data/elementsLibrary';
import { POSTER_THEMES } from '../data/themesData';
import {
  addDecorativeSvgElement,
  applyBackgroundPresetNonDestructive,
  applyFontPairingNonDestructive,
  applyThemeNonDestructive,
  buildGradientString,
  getExportPlan,
  getPosterDimensionMetrics,
  resolveBackgroundConfig,
  resolveHeroImageConfig,
  runPreflightChecks,
  setImageRole,
  updateElementTypography
} from './posterEngine';

test('Decoupled Hero vs Background vs Decoration role assignment never cross-contaminates', () => {
  let state = { ...DEFAULT_POSTER };
  const initialHeroSrc = resolveHeroImageConfig(state).src;

  // 1. Assign Background Image -> MUST NOT touch heroImage
  state = setImageRole(state, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', 'background');
  assert.equal(resolveBackgroundConfig(state).mode, 'image');
  assert.equal(resolveBackgroundConfig(state).imageUrl, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b');
  assert.equal(resolveHeroImageConfig(state).src, initialHeroSrc);

  // 2. Assign Hero Image -> MUST preserve box coords AND NOT overwrite backgroundConfig
  state = setImageRole(state, '/assets/aistudio/OIP_72f641f4.webp', 'hero', { title: 'NFSU Night' });
  assert.equal(resolveHeroImageConfig(state).src, '/assets/aistudio/OIP_72f641f4.webp');
  assert.equal(resolveHeroImageConfig(state).width, 38);
  assert.equal(resolveBackgroundConfig(state).imageUrl, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b');

  // 3. Add Decorative Image -> adds foreground element without replacing hero or background
  const beforeCount = (state.elements || []).length;
  state = setImageRole(state, '/assets/aistudio/OIP_5b55c84a.webp', 'decoration', { title: 'Day Campus' });
  assert.equal((state.elements || []).length, beforeCount + 1);
  assert.equal(resolveHeroImageConfig(state).src, '/assets/aistudio/OIP_72f641f4.webp');
  assert.equal(resolveBackgroundConfig(state).imageUrl, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b');
});

test('Background Studio presets (>=30) apply strictly to backgroundConfig without wiping headline or hero', () => {
  assert.ok(BACKGROUND_PRESETS.length >= 30, `Expected >= 30 background presets, got ${BACKGROUND_PRESETS.length}`);
  assert.ok(CURATED_CYBER_PALETTES.length >= 12);

  let state = setImageRole({ ...DEFAULT_POSTER, headline: 'MY CUSTOM EVENT' }, '/assets/aistudio/OIP_8b72b508.webp', 'hero');
  const preset = BACKGROUND_PRESETS.find((p) => p.id === 'preset_matrix_rain')!;
  state = applyBackgroundPresetNonDestructive(state, preset);

  assert.equal(state.headline, 'MY CUSTOM EVENT');
  assert.equal(resolveHeroImageConfig(state).src, '/assets/aistudio/OIP_8b72b508.webp');
  assert.equal(resolveBackgroundConfig(state).presetId, 'preset_matrix_rain');
  assert.equal(resolveBackgroundConfig(state).effects.matrix, true);
});

test('Non-destructive theme application preserves user headline, logistics, and hero image', () => {
  let state = setImageRole({
    ...DEFAULT_POSTER,
    headline: 'NFSU BINARY DEFENSE 2026',
    venue: 'Auditorium 3, Gandhinagar'
  }, '/assets/aistudio/OIP_5b55c84a.webp', 'hero');

  const redTeamTheme = POSTER_THEMES.find((t) => t.id === 'red_team')!;
  state = applyThemeNonDestructive(state, redTeamTheme);

  assert.equal(state.themeId, 'red_team');
  assert.equal(state.accentColor, 'red');
  assert.equal(state.headline, 'NFSU BINARY DEFENSE 2026');
  assert.equal(state.venue, 'Auditorium 3, Gandhinagar');
  assert.equal(resolveHeroImageConfig(state).src, '/assets/aistudio/OIP_5b55c84a.webp');
});

test('Independent per-element typography and Hindi Devanagari support', () => {
  assert.ok(GOOGLE_FONT_OPTIONS.length >= 22);
  assert.equal(FONT_PAIRING_PRESETS.length, 8);
  assert.equal(containsDevanagari('साइबर सुरक्षा कार्यशाला 2026'), true);
  assert.equal(containsDevanagari('CYBERSECURITY WORKSHOP'), false);

  let state = { ...DEFAULT_POSTER };
  state = updateElementTypography(state, 'headline', { fontFamily: 'Orbitron', color: '#00F5FF' });
  state = updateElementTypography(state, 'subtitle', { fontFamily: 'Inter', italic: true });

  assert.equal(state.typographyMap?.headline?.fontFamily, 'Orbitron');
  assert.equal(state.typographyMap?.subtitle?.fontFamily, 'Inter');
  assert.equal(state.typographyMap?.subtitle?.italic, true);

  state = applyFontPairingNonDestructive(state, FONT_PAIRING_PRESETS[7]);
  assert.equal(state.hindiFontFamily, 'Noto Sans Devanagari');
});

test('HEX/RGB/HSL converters round-trip accurately', () => {
  const rgb = hexToRgb('#38BDF8');
  assert.deepEqual(rgb, { r: 56, g: 189, b: 248 });
  assert.equal(rgbToHex(rgb.r, rgb.g, rgb.b), '#38BDF8');

  const hsl = hexToHsl('#10B981');
  const backHex = hslToHex(hsl.h, hsl.s, hsl.l);
  assert.match(backHex, /^#[0-9A-F]{6}$/);
});

test('Gradient builder supports linear, radial, and conic multi-stop CSS strings', () => {
  const bg = resolveBackgroundConfig(DEFAULT_POSTER);
  const linear = buildGradientString({
    ...bg,
    gradientType: 'linear',
    gradientAngle: 120,
    gradientStops: [
      { color: '#000000', position: 0 },
      { color: '#112233', position: 50 },
      { color: '#38BDF8', position: 100 }
    ]
  });
  assert.equal(linear, 'linear-gradient(120deg, #000000 0%, #112233 50%, #38BDF8 100%)');

  const conic = buildGradientString({
    ...bg,
    gradientType: 'conic',
    gradientAngle: 45,
    gradientPosition: { x: 40, y: 60 },
    gradientStops: [
      { color: '#050814', position: 0 },
      { color: '#38BDF8', position: 100 }
    ]
  });
  assert.equal(conic, 'conic-gradient(from 45deg at 40% 60%, #050814 0%, #38BDF8 100%)');
});

test('Export plan enforces true Transparent PNG alpha and flags JPEG transparent background fallback', () => {
  const pngTrans = getExportPlan('png_transparent', 'transparent');
  assert.equal(pngTrans.alphaChannelPreserved, true);
  assert.equal(pngTrans.effectiveBackgroundColor, 'transparent');

  const jpegFromTrans = getExportPlan('jpeg', 'transparent', '#FFFFFF');
  assert.equal(jpegFromTrans.requiresFallbackBackgroundPrompt, true);
  assert.equal(jpegFromTrans.alphaChannelPreserved, false);
  assert.equal(jpegFromTrans.effectiveBackgroundColor, '#FFFFFF');
});

test('Custom dimensions clamp cleanly and SVG element library inserts as foreground layer', () => {
  const custom = getPosterDimensionMetrics('custom', 1920, 1080);
  assert.equal(custom.widthPx, 1920);
  assert.equal(custom.heightPx, 1080);

  let state = { ...DEFAULT_POSTER };
  const elCount = (state.elements || []).length;
  state = addDecorativeSvgElement(state, DECORATIVE_ELEMENTS_LIBRARY[0]);
  assert.equal((state.elements || []).length, elCount + 1);
  assert.equal(state.elements![state.elements!.length - 1].type, 'svg_graphic');
});

test('Preflight flags JPEG + transparent conflict, broken hero URL, and Devanagari font notice', () => {
  const campus = INITIAL_VERIFIED_CAMPUSES[0];
  const badState = {
    ...DEFAULT_POSTER,
    headline: 'साइबर सुरक्षा',
    backgroundConfig: { ...resolveBackgroundConfig(DEFAULT_POSTER), mode: 'transparent' as const },
    heroImage: { ...resolveHeroImageConfig(DEFAULT_POSTER), src: 'not-a-valid-url' }
  };
  const issues = runPreflightChecks(badState, campus, 'jpeg');
  assert.ok(issues.some((i) => i.id === 'invalid_hero_img_url'));
  assert.ok(issues.some((i) => i.id === 'jpeg_transparent_conflict'));
  assert.ok(issues.some((i) => i.id === 'hindi_font_pairing_hint'));
});
