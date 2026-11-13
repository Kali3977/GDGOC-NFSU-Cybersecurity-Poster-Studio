import React, { useEffect, useRef, useState } from 'react';

interface ScaledPosterPreviewProps {
  baseWidth?: number;
  maxDisplayWidth?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Renders PosterCanvas at canonical desktop layout width (`baseWidth`, default 560px)
 * and proportionally scales it to fit narrower containers (Dashboard, Templates,
 * Background Studio sidebar, Export Studio, Mobile) without vertical clipping.
 */
export function ScaledPosterPreview({
  baseWidth = 560,
  maxDisplayWidth,
  children,
  className = ''
}: ScaledPosterPreviewProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState(700);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const available = outer.clientWidth;
      const targetMax = maxDisplayWidth ? Math.min(available, maxDisplayWidth) : available;
      const nextScale = targetMax > 0 ? Math.min(1, targetMax / baseWidth) : 1;
      const measuredH = inner.offsetHeight || 700;
      setScale(nextScale);
      setInnerHeight(measuredH);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [baseWidth, maxDisplayWidth]);

  const effectiveWidth = Math.round(baseWidth * scale);
  const effectiveHeight = Math.round(innerHeight * scale);

  return (
    <div
      ref={outerRef}
      className={`w-full flex justify-center ${className}`}
    >
      <div
        style={{
          width: `${effectiveWidth}px`,
          height: `${effectiveHeight}px`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          ref={innerRef}
          data-poster-scale-wrapper="true"
          style={{
            width: `${baseWidth}px`,
            transform: scale < 0.999 ? `scale(${scale})` : 'none',
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
