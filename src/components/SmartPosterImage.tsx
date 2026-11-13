import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, AlertTriangle, Shield, Check } from 'lucide-react';
import {
  normalizeImageUrl,
  validateImageUrl,
  getCategoryFallback,
  getExportSafeImageUrl
} from '../utils/imageValidation';

interface SmartPosterImageProps {
  src?: string;
  alt: string;
  className?: string;
  fit?: 'cover' | 'contain' | 'fill';
  filter?: 'none' | 'duotone' | 'high_contrast' | 'matrix_green' | 'ice_cyan' | 'warm_amber' | 'invert';
  zoom?: number;        // 50 to 250%
  focalX?: number;      // 0 to 100%
  focalY?: number;      // 0 to 100%
  rotation?: number;    // -180 to 180 deg
  opacity?: number;     // 0 to 100%
  brightness?: number;  // 40 to 160%
  contrast?: number;    // 40 to 160%
  saturation?: number;  // 0 to 200%
  hue?: number;         // -180 to 180 deg
  blur?: number;        // 0 to 24px
  borderWidth?: number; // 0 to 12px
  borderColor?: string;
  borderRadius?: number;
  maskShape?: 'none' | 'rounded' | 'circle' | 'hex' | 'arch';
  fallbackSrc?: string;
  onImageLoaded?: (url: string) => void;
  onImageError?: (reason: string, failedUrl: string) => void;
  styleContext?: string;
  isBackdrop?: boolean;
  preferProxy?: boolean;
}

const SECONDARY_FALLBACK_IMAGE = '/assets/images/signal_tactile_prism_1794418294380.jpg';

const MASK_CLIP_PATHS: Record<string, string | undefined> = {
  none: undefined,
  rounded: undefined,
  circle: 'circle(48% at 50% 50%)',
  hex: 'polygon(25% 3%, 75% 3%, 98% 50%, 75% 97%, 25% 97%, 2% 50%)',
  arch: 'inset(0% 0% 0% 0% round 48% 48% 4px 4px)'
};

export function SmartPosterImage({
  src,
  alt,
  className = '',
  fit = 'cover',
  filter = 'none',
  zoom = 100,
  focalX = 50,
  focalY = 50,
  rotation = 0,
  opacity = 100,
  brightness = 100,
  contrast = 100,
  saturation = 100,
  hue = 0,
  blur = 0,
  borderWidth = 0,
  borderColor = 'rgba(255,255,255,0.2)',
  borderRadius,
  maskShape = 'none',
  fallbackSrc,
  onImageLoaded,
  onImageError,
  styleContext = 'cybersecurity',
  isBackdrop = false,
  preferProxy = false
}: SmartPosterImageProps) {
  const categoryFallback = fallbackSrc || getCategoryFallback(styleContext);

  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string>('');
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  const [fallbackAccepted, setFallbackAccepted] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const rawNormalized = normalizeImageUrl(src);
    const targetUrl = rawNormalized || categoryFallback;

    setIsUsingFallback(false);
    setFallbackAccepted(false);
    setErrorDetails('');
    setHasError(false);

    const validation = validateImageUrl(targetUrl);
    if (!validation.valid) {
      const msg = validation.reason || 'Invalid image URL provided.';
      setIsLoading(false);
      setHasError(true);
      setErrorDetails(msg);
      setCurrentSrc('');
      onImageError?.(msg, targetUrl);
      return;
    }

    const resolvedSrc = preferProxy && validation.isExternal
      ? getExportSafeImageUrl(validation.normalizedUrl)
      : validation.normalizedUrl;

    setCurrentSrc(resolvedSrc);
    setIsLoading(true);

    let isCancelled = false;
    const probe = new Image();
    if (validation.isExternal && resolvedSrc.includes('images.unsplash.com')) {
      probe.crossOrigin = 'anonymous';
    }

    probe.onload = () => {
      if (!isCancelled) {
        setIsLoading(false);
        setHasError(false);
        setErrorDetails('');
        setCurrentSrc(resolvedSrc);
        onImageLoaded?.(resolvedSrc);
      }
    };

    probe.onerror = () => {
      if (!isCancelled) {
        const errMsg = `Failed to load image from "${validation.normalizedUrl.slice(0, 56)}${validation.normalizedUrl.length > 56 ? '...' : ''}".`;
        setIsLoading(false);
        setHasError(true);
        setErrorDetails(errMsg);
        onImageError?.(errMsg, validation.normalizedUrl);
      }
    };

    probe.src = resolvedSrc;

    return () => {
      isCancelled = true;
    };
  }, [src, categoryFallback, attemptCount, preferProxy]);

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAttemptCount((prev) => prev + 1);
  };

  const handleApplyCategoryFallback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const safeBackup = categoryFallback || SECONDARY_FALLBACK_IMAGE;
    setCurrentSrc(safeBackup);
    setHasError(false);
    setIsUsingFallback(true);
    setFallbackAccepted(true);
    onImageLoaded?.(safeBackup);
  };

  const filterPresetString = {
    none: '',
    duotone: 'contrast(1.25) brightness(0.95) hue-rotate(15deg)',
    high_contrast: 'grayscale(1) contrast(1.5) brightness(0.9)',
    matrix_green: 'grayscale(1) contrast(1.3) brightness(0.9) sepia(0.7) hue-rotate(90deg)',
    ice_cyan: 'contrast(1.2) brightness(1.05) hue-rotate(160deg)',
    warm_amber: 'contrast(1.15) brightness(0.95) sepia(0.5) hue-rotate(15deg)',
    invert: 'invert(1) contrast(1.25)'
  }[filter];

  const manualFilterParts: string[] = [];
  if (brightness !== 100) manualFilterParts.push(`brightness(${brightness / 100})`);
  if (contrast !== 100) manualFilterParts.push(`contrast(${contrast / 100})`);
  if (saturation !== 100) manualFilterParts.push(`saturate(${saturation / 100})`);
  if (hue !== 0) manualFilterParts.push(`hue-rotate(${hue}deg)`);
  if (blur > 0) manualFilterParts.push(`blur(${blur}px)`);
  const combinedFilter = [filterPresetString, ...manualFilterParts].filter(Boolean).join(' ') || undefined;

  const fitClass = fit === 'contain' ? 'object-contain' : fit === 'fill' ? 'object-fill' : 'object-cover';
  const clipPath = MASK_CLIP_PATHS[maskShape];
  const resolvedRadius = maskShape === 'circle' ? '9999px' : borderRadius !== undefined ? `${borderRadius}px` : undefined;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${isBackdrop ? '' : 'bg-black/30'} ${className}`}
      data-image-status={isLoading ? 'loading' : hasError ? 'error' : isUsingFallback ? 'fallback' : 'loaded'}
      style={{
        borderWidth: borderWidth ? `${borderWidth}px` : undefined,
        borderColor: borderWidth ? borderColor : undefined,
        borderStyle: borderWidth ? 'solid' : undefined,
        borderRadius: resolvedRadius,
        clipPath
      }}
    >
      {/* 1. LOADING SKELETON WITH SHIMMER */}
      {isLoading && !isBackdrop && (
        <div
          data-export-hide="true"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070B16] text-sky-400"
        >
          <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
          <div className="flex flex-col items-center gap-2 p-3 text-center">
            <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
            <span className="text-[10px] font-mono tracking-wider text-slate-300 uppercase">
              Loading Image Asset...
            </span>
          </div>
        </div>
      )}

      {/* 2. LOADED IMAGE (Never shows broken image icon) */}
      {!hasError && currentSrc && (
        <div className="w-full h-full overflow-hidden">
          <img
            ref={imageRef}
            src={currentSrc}
            alt={alt}
            crossOrigin={currentSrc.includes('images.unsplash.com') ? 'anonymous' : undefined}
            className={`w-full h-full ${fitClass} transition-transform duration-200`}
            style={{
              objectPosition: `${focalX}% ${focalY}%`,
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              opacity: opacity / 100,
              filter: combinedFilter
            }}
            onLoad={() => {
              setIsLoading(false);
              setHasError(false);
            }}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
              setErrorDetails(`Image host rejected or dropped connection for "${currentSrc.slice(0, 48)}".`);
            }}
          />

          {isUsingFallback && fallbackAccepted && (
            <div
              data-export-hide="true"
              title={errorDetails || 'Using verified category fallback image'}
              className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1 bg-black/85 border border-cyan-500/50 px-1.5 py-0.5 rounded text-[8px] font-mono text-cyan-300"
            >
              <Shield className="w-2.5 h-2.5 text-cyan-400" />
              <span>CATEGORY BACKUP ACTIVE</span>
            </div>
          )}
        </div>
      )}

      {/* 3. CLEAR ERROR RECOVERY + VECTOR SAFEGUARD */}
      {hasError && isBackdrop && (
        <div
          aria-hidden="true"
          className="w-full h-full bg-gradient-to-br from-[#060A16] via-[#091024] to-[#040710]"
        />
      )}

      {hasError && !isBackdrop && (
        <div
          role="alert"
          className="relative z-30 w-full h-full flex flex-col justify-between p-3 sm:p-4 bg-[#070B16] border border-amber-500/40 text-white"
        >
          <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-cyan-400" /> NFSU_CYBER_VECTOR_SAFEGUARD
            </span>
            <span className="text-amber-300">ASSET_ERROR</span>
          </div>

          <div className="my-auto py-2 text-center space-y-1.5">
            <div className="w-7 h-7 mx-auto rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <p className="text-[10.5px] font-mono text-amber-200 font-bold tracking-wide uppercase">
              Image Unable to Load
            </p>
            <p className="text-[9px] font-mono text-slate-300 max-w-[92%] mx-auto line-clamp-2">
              {errorDetails || 'Verify the URL is publicly accessible or apply a verified category asset.'}
            </p>
          </div>

          <div
            data-export-hide="true"
            className="flex flex-wrap justify-between items-center gap-1.5 pt-2 border-t border-white/10 text-[8.5px] font-mono"
          >
            <button
              type="button"
              onClick={handleRetry}
              className="px-2 py-1 rounded bg-sky-500/20 border border-sky-400/50 hover:bg-sky-500/30 text-sky-200 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-2.5 h-2.5" /> Retry URL
            </button>
            <button
              type="button"
              onClick={handleApplyCategoryFallback}
              className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-400/50 hover:bg-emerald-500/30 text-emerald-200 transition-colors flex items-center gap-1"
            >
              <Check className="w-2.5 h-2.5" /> Use Category Fallback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
