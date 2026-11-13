import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QRContrastMode } from '../types/poster';

interface QRCodeDisplayProps {
  value?: string;
  size?: number;
  contrastMode?: QRContrastMode;
  fgColor?: string;
  bgColor?: string;
  className?: string;
  showPlaceholderIfEmpty?: boolean;
  label?: string;
}

export function QRCodeDisplay({
  value,
  size = 120,
  contrastMode = 'dark_on_light',
  fgColor,
  bgColor,
  className = '',
  showPlaceholderIfEmpty = true,
  label
}: QRCodeDisplayProps) {
  const [dataUrl, setDataUrl] = useState<string>('');

  // Determine colors based on contrast mode unless explicitly overridden
  let resolvedFg = fgColor;
  let resolvedBg = bgColor;

  if (!resolvedFg || !resolvedBg) {
    switch (contrastMode) {
      case 'electric_cyan':
        resolvedFg = resolvedFg || '#38BDF8';
        resolvedBg = resolvedBg || '#070E1A';
        break;
      case 'matrix_green':
        resolvedFg = resolvedFg || '#10B981';
        resolvedBg = resolvedBg || '#04100A';
        break;
      case 'amber_gold':
        resolvedFg = resolvedFg || '#F59E0B';
        resolvedBg = resolvedBg || '#130D04';
        break;
      case 'dark_on_light':
      default:
        resolvedFg = resolvedFg || '#05070A';
        resolvedBg = resolvedBg || '#FFFFFF';
        break;
    }
  }

  useEffect(() => {
    if (!value || !value.trim()) {
      setDataUrl('');
      return;
    }

    QRCode.toDataURL(value.trim(), {
      width: Math.max(size * 2, 240), // 2x density for crisp print
      margin: 1,
      color: {
        dark: resolvedFg,
        light: resolvedBg
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => {
        setDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
        setDataUrl('');
      });
  }, [value, size, resolvedFg, resolvedBg]);

  if (!value || !value.trim()) {
    if (!showPlaceholderIfEmpty) return null;
    return (
      <div 
        style={{ width: size, height: size }}
        className={`border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center p-2 text-center bg-slate-950/80 ${className}`}
      >
        <span className="text-[9px] font-mono font-bold text-sky-400 uppercase tracking-widest">[ QR CODE ]</span>
        <span className="text-[7.5px] text-slate-400 mt-1 leading-tight">Enter URL to generate overlay</span>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div 
        style={{ width: size, height: size }}
        className={`bg-slate-800 animate-pulse rounded-lg ${className}`}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div 
        style={{ width: size, height: size, backgroundColor: resolvedBg }}
        className={`rounded-lg p-1.5 shadow-lg flex items-center justify-center border border-white/10 ${className}`}
      >
        <img
          src={dataUrl}
          alt="Event Registration QR Code"
          style={{ width: size - 12, height: size - 12 }}
          className="object-contain block"
        />
      </div>
      {label && (
        <span className="text-[8px] font-mono text-slate-300 font-semibold tracking-wider text-center uppercase max-w-[130px] truncate">
          {label}
        </span>
      )}
    </div>
  );
}
