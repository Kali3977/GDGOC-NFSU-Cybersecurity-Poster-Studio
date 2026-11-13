import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeImageUrl,
  validateImageUrl,
  getCategoryFallback,
  getExportSafeImageUrl,
  inspectImageLibraryIntegrity
} from './imageValidation';

test('normalizeImageUrl fixes legacy /public/assets and /src/assets/images paths', () => {
  assert.equal(
    normalizeImageUrl('/public/assets/aistudio/OIP_72f641f4.webp'),
    '/assets/aistudio/OIP_72f641f4.webp'
  );
  assert.equal(
    normalizeImageUrl('/src/assets/images/signal_silicon_forensics_1794419167984.jpg'),
    '/assets/images/signal_silicon_forensics_1794419167984.jpg'
  );
  assert.equal(normalizeImageUrl('  https://example.com/a.jpg  '), 'https://example.com/a.jpg');
});

test('validateImageUrl rejects invalid URLs and unsafe protocols', () => {
  assert.equal(validateImageUrl('').valid, false);
  assert.equal(validateImageUrl('not-a-valid-url').valid, false);
  assert.equal(validateImageUrl('javascript:alert(1)').valid, false);
  assert.equal(validateImageUrl('ftp://example.com/img.png').valid, false);
  assert.equal(validateImageUrl('https://localhost/test.png').valid, false);

  const validExternal = validateImageUrl('https://images.unsplash.com/photo-1550751827-4bd374c3f58b');
  assert.equal(validExternal.valid, true);
  assert.equal(validExternal.isExternal, true);

  const validLocal = validateImageUrl('/public/assets/aistudio/OIP_5b55c84a.webp');
  assert.equal(validLocal.valid, true);
  assert.equal(validLocal.isExternal, false);
  assert.equal(validLocal.normalizedUrl, '/assets/aistudio/OIP_5b55c84a.webp');
});

test('getExportSafeImageUrl proxies external URLs and keeps local URLs direct', () => {
  assert.equal(getExportSafeImageUrl('/assets/aistudio/OIP_5b55c84a.webp'), '/assets/aistudio/OIP_5b55c84a.webp');
  assert.equal(
    getExportSafeImageUrl('https://images.unsplash.com/photo-1550751827-4bd374c3f58b'),
    '/api/image-proxy?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1550751827-4bd374c3f58b'
  );
});

test('getCategoryFallback returns a verified local path', () => {
  assert.match(getCategoryFallback('digital_forensics'), /^\/assets\//);
  assert.match(getCategoryFallback('unknown_cat'), /^\/assets\//);
});

import { IMAGE_LIBRARY, IMAGE_CATEGORIES } from '../data/imageLibrary';
import { POSTER_THEMES } from '../data/themesData';

test('inspectImageLibraryIntegrity flags duplicate URLs', () => {
  const report = inspectImageLibraryIntegrity([
    { id: '1', url: 'https://a.com/1.jpg', category: 'cybersecurity' },
    { id: '2', url: 'https://a.com/1.jpg', category: 'ai_ml' },
    { id: '3', url: 'https://a.com/2.jpg', category: 'ai_ml' }
  ]);
  assert.equal(report.total, 3);
  assert.equal(report.uniqueUrlCount, 2);
  assert.equal(report.duplicateUrls.length, 1);
});

test('IMAGE_LIBRARY has >= 100 unique assets with zero duplicate URLs or IDs and meets all category minimums', () => {
  const report = inspectImageLibraryIntegrity(IMAGE_LIBRARY);
  assert.ok(report.total >= 100, `Expected >= 100 images, got ${report.total}`);
  assert.equal(report.duplicateUrls.length, 0, `Duplicate URLs found: ${JSON.stringify(report.duplicateUrls)}`);
  assert.equal(report.duplicateIds.length, 0, `Duplicate IDs found: ${JSON.stringify(report.duplicateIds)}`);

  const requiredMinimums: Record<string, number> = {
    cybersecurity: 15,
    ethical_hacking: 10,
    programming: 10,
    circuit_hardware: 10,
    digital_forensics: 10,
    ai_ml: 10,
    abstract_tech: 15,
    network_servers: 10,
    conferences: 5,
    futuristic_geometric: 5
  };

  for (const [cat, minCount] of Object.entries(requiredMinimums)) {
    const actual = IMAGE_LIBRARY.filter((a) => a.category === cat).length;
    assert.ok(actual >= minCount, `Category ${cat} has ${actual}, needs >= ${minCount}`);
    const catMeta = IMAGE_CATEGORIES.find((c) => c.id === cat);
    assert.ok(catMeta, `Missing category metadata for ${cat}`);
    assert.equal(catMeta.count, actual, `Mismatch between IMAGE_CATEGORIES count and actual items for ${cat}`);
  }
});

test('POSTER_THEMES has exactly 32 distinct themes with unique IDs and names', () => {
  assert.equal(POSTER_THEMES.length, 32);
  const ids = new Set(POSTER_THEMES.map((t) => t.id));
  const names = new Set(POSTER_THEMES.map((t) => t.name));
  assert.equal(ids.size, 32);
  assert.equal(names.size, 32);
});

