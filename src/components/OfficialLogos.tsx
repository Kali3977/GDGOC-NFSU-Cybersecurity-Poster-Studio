import React from 'react';

/**
 * Official Google Developer Groups on Campus Emblem
 * Authentic 4-color brackets: Red & Blue on the left, Green & Yellow on the right.
 */
export function GDGBrackets({
  className = "w-7 h-7",
  monochrome = false,
  variant = "color"
}: {
  className?: string;
  monochrome?: boolean;
  variant?: "color" | "white" | "dark";
}) {
  if (monochrome || variant === "white") {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Google Developer Groups"
      >
        {/* Left bracket */}
        <path
          d="M26 12L10 28L26 44L32 38L22 28L32 18L26 12Z"
          fill="currentColor"
        />
        {/* Right bracket */}
        <path
          d="M38 12L32 18L42 28L32 38L38 44L54 28L38 12Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // Official Google Developer Colors
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Google Developer Groups Official Logo"
    >
      {/* Left Bracket Top - Red */}
      <path
        d="M26 12L10 28L18 36L32 22L26 12Z"
        fill="#EA4335"
      />
      {/* Left Bracket Bottom - Blue */}
      <path
        d="M10 28L26 44L32 38L18 24L10 28Z"
        fill="#4285F4"
      />
      {/* Right Bracket Top - Green */}
      <path
        d="M38 12L32 18L46 32L54 28L38 12Z"
        fill="#34A853"
      />
      {/* Right Bracket Bottom - Yellow */}
      <path
        d="M46 32L32 38L38 44L54 28L46 32Z"
        fill="#FBBC04"
      />
    </svg>
  );
}

/**
 * Official NFSU Institution Emblem and Dynamic Campus Lockup
 * Directly uses the authentic official university logo image uploaded by the institution.
 * Dynamically supports any selected verified or custom campus name.
 */
export function NFSUUniversityMark({
  className = "h-9",
  lightMode = false,
  showLabel = true,
  campusName = "NFSU Gandhinagar",
  customLogoUrl
}: {
  className?: string;
  lightMode?: boolean;
  showLabel?: boolean;
  campusName?: string;
  customLogoUrl?: string;
}) {
  const rawLogo = customLogoUrl || "/assets/aistudio/National-Forensic-Sciences-University_Logo_70e28e60.jpg";
  const logoSrc = rawLogo
    .replace(/^\/public\/assets\//, "/assets/")
    .replace(/^\/src\/assets\/images\//, "/assets/images/");

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official NFSU Crest Shield Image with protective badge framing */}
      <div className="h-9 w-7 shrink-0 relative flex items-center justify-center rounded-sm bg-white p-0.5 shadow-md border border-amber-500/50 ring-1 ring-black/30 overflow-hidden">
        <img
          src={logoSrc}
          alt={`${campusName} Official Emblem`}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.fallbackApplied) {
              img.dataset.fallbackApplied = '1';
              img.src = "/assets/aistudio/National-Forensic-Sciences-University_Logo_70e28e60.jpg";
            } else {
              img.style.display = 'none';
            }
          }}
        />
      </div>

      {showLabel && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`text-[11px] font-bold tracking-wider uppercase font-sans ${lightMode ? 'text-stone-900' : 'text-stone-100'}`}>
            NFSU
          </span>
          <span className={`text-[8.5px] tracking-tight font-sans ${lightMode ? 'text-stone-600' : 'text-stone-400'}`}>
            National Forensic Sciences University
          </span>
          <span className="text-[7.5px] text-amber-500 font-serif tracking-widest uppercase truncate max-w-[170px]">
            {campusName.replace(/^NFSU\s*/i, '')} · विद्यया अमृतं अश्नुते
          </span>
        </div>
      )}
    </div>
  );
}
