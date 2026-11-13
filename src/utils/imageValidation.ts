// Pure URL normalization, validation, export proxy helpers, and category-matched fallback mapping

export interface ImageUrlValidationResult {
  valid: boolean;
  normalizedUrl: string;
  reason?: string;
  isExternal: boolean;
  isDataUrl: boolean;
}

export const CATEGORY_LOCAL_FALLBACKS: Record<string, string> = {
  cybersecurity: '/assets/images/signal_silicon_forensics_1794419167984.jpg',
  ethical_hacking: '/assets/images/signal_tactile_prism_1794418294380.jpg',
  programming: '/assets/images/signal_tactile_prism_1794418294380.jpg',
  circuit_hardware: '/assets/images/signal_silicon_forensics_1794419167984.jpg',
  digital_forensics: '/assets/images/signal_silicon_forensics_1794419167984.jpg',
  ai_ml: '/assets/images/signal_acoustic_mirror_1794418294212.jpg',
  abstract_tech: '/assets/images/signal_tactile_prism_1794418294380.jpg',
  network_servers: '/assets/images/signal_brutalist_monolith_1794418292586.jpg',
  conferences: '/assets/aistudio/OIP_5b55c84a.webp',
  futuristic_geometric: '/assets/images/signal_brutalist_monolith_1794418292586.jpg',
  terminal: '/assets/images/signal_tactile_prism_1794418294380.jpg',
  cyberpunk: '/assets/images/signal_silicon_forensics_1794419167984.jpg',
  editorial: '/assets/aistudio/OIP_72f641f4.webp',
  corporate: '/assets/aistudio/OIP_5b55c84a.webp',
  security_interface: '/assets/images/signal_silicon_forensics_1794419167984.jpg',
  tech_conference: '/assets/aistudio/OIP_8b72b508.webp',
  bold_type: '/assets/images/signal_brutalist_monolith_1794418292586.jpg'
};

export function normalizeImageUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let clean = rawUrl.trim();
  if (!clean) return '';
  if (clean.startsWith('/public/assets/')) {
    clean = clean.replace('/public/assets/', '/assets/');
  } else if (clean.startsWith('public/assets/')) {
    clean = '/' + clean.replace(/^public\//, '');
  }
  if (clean.startsWith('/src/assets/images/')) {
    clean = clean.replace('/src/assets/images/', '/assets/images/');
  }
  return clean;
}

export function validateImageUrl(rawUrl?: string): ImageUrlValidationResult {
  const normalizedUrl = normalizeImageUrl(rawUrl);

  if (!normalizedUrl) {
    return {
      valid: false,
      normalizedUrl: '',
      reason: 'Image URL is empty.',
      isExternal: false,
      isDataUrl: false
    };
  }

  if (/^(javascript|vbscript|data:text\/html):/i.test(normalizedUrl)) {
    return {
      valid: false,
      normalizedUrl,
      reason: 'Blocked unsafe URI scheme.',
      isExternal: false,
      isDataUrl: false
    };
  }

  if (normalizedUrl.startsWith('data:image/')) {
    const hasBase64OrData = normalizedUrl.includes(',');
    return {
      valid: hasBase64OrData,
      normalizedUrl,
      reason: hasBase64OrData ? undefined : 'Malformed data URL payload.',
      isExternal: false,
      isDataUrl: true
    };
  }

  if (normalizedUrl.startsWith('blob:')) {
    return {
      valid: true,
      normalizedUrl,
      isExternal: false,
      isDataUrl: false
    };
  }

  if (normalizedUrl.startsWith('/')) {
    const safeLocal = !normalizedUrl.includes('..');
    return {
      valid: safeLocal,
      normalizedUrl,
      reason: safeLocal ? undefined : 'Invalid relative path traversal.',
      isExternal: false,
      isDataUrl: false
    };
  }

  try {
    const parsed = new URL(normalizedUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return {
        valid: false,
        normalizedUrl,
        reason: `Unsupported protocol "${parsed.protocol}". Use https:// or a local /assets/ path.`,
        isExternal: false,
        isDataUrl: false
      };
    }
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return {
        valid: false,
        normalizedUrl,
        reason: 'External image URL must include a valid domain name.',
        isExternal: true,
        isDataUrl: false
      };
    }
    return {
      valid: true,
      normalizedUrl: parsed.toString(),
      isExternal: true,
      isDataUrl: false
    };
  } catch {
    return {
      valid: false,
      normalizedUrl,
      reason: 'Invalid image URL syntax. Provide a valid https:// URL or /assets/ path.',
      isExternal: false,
      isDataUrl: false
    };
  }
}

export function getCategoryFallback(categoryOrContext?: string): string {
  if (!categoryOrContext) return CATEGORY_LOCAL_FALLBACKS.cybersecurity;
  return CATEGORY_LOCAL_FALLBACKS[categoryOrContext] || CATEGORY_LOCAL_FALLBACKS.cybersecurity;
}

export function getExportSafeImageUrl(rawUrl: string): string {
  const normalized = normalizeImageUrl(rawUrl);
  if (!normalized) return '';
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return `/api/image-proxy?url=${encodeURIComponent(normalized)}`;
  }
  return normalized;
}

export function inspectImageLibraryIntegrity<T extends { id: string; url: string; category: string }>(assets: T[]) {
  const urlCounts = new Map<string, number>();
  const idCounts = new Map<string, number>();
  for (const item of assets) {
    urlCounts.set(item.url, (urlCounts.get(item.url) || 0) + 1);
    idCounts.set(item.id, (idCounts.get(item.id) || 0) + 1);
  }
  const duplicateUrls = [...urlCounts.entries()].filter(([, c]) => c > 1).map(([url, count]) => ({ url, count }));
  const duplicateIds = [...idCounts.entries()].filter(([, c]) => c > 1).map(([id, count]) => ({ id, count }));
  return {
    total: assets.length,
    uniqueUrlCount: urlCounts.size,
    duplicateUrls,
    duplicateIds
  };
}
