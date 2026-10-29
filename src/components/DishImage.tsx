import React, { useState, useEffect, useMemo } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface DishImageProps {
  src: string;
  alt: string;
  dishName: string;
  state?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  fallbackSrc?: string | string[];
}

export const DishImage: React.FC<DishImageProps> = ({
  src,
  alt,
  dishName,
  state,
  className = '',
  aspectRatio = 'square',
  fallbackSrc
}) => {
  // Build an ordered list of candidate URLs to try
  const candidateUrls = useMemo(() => {
    const list: string[] = [];
    if (src) list.push(src);

    // If fallbackSrc provided, add candidates
    if (fallbackSrc) {
      if (Array.isArray(fallbackSrc)) {
        list.push(...fallbackSrc.filter(Boolean));
      } else if (typeof fallbackSrc === 'string' && fallbackSrc) {
        list.push(fallbackSrc);
      }
    }

    // Auto-generate resilient fallbacks based on src
    if (src) {
      const filename = src.split('/').pop() || '';
      if (filename) {
        // Flat path in /images/
        const flatPath = `/images/${filename}`;
        if (!list.includes(flatPath)) list.push(flatPath);

        // Extension toggles (.jpeg <-> .jpg)
        if (filename.endsWith('.jpeg')) {
          const jpgVariant = src.replace(/\.jpeg$/, '.jpg');
          if (!list.includes(jpgVariant)) list.push(jpgVariant);
          const flatJpg = `/images/${filename.replace(/\.jpeg$/, '.jpg')}`;
          if (!list.includes(flatJpg)) list.push(flatJpg);
        } else if (filename.endsWith('.jpg')) {
          const jpegVariant = src.replace(/\.jpg$/, '.jpeg');
          if (!list.includes(jpegVariant)) list.push(jpegVariant);
          const flatJpeg = `/images/${filename.replace(/\.jpg$/, '.jpeg')}`;
          if (!list.includes(flatJpeg)) list.push(flatJpeg);
        }
      }

      // Relative path without leading slash (supports relative base URLs)
      if (src.startsWith('/')) {
        const relativeSrc = src.substring(1);
        if (!list.includes(relativeSrc)) list.push(relativeSrc);
      }
    }

    return list.filter((url, idx, arr) => url && arr.indexOf(url) === idx);
  }, [src, fallbackSrc]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  // Reset when src changes
  useEffect(() => {
    setCandidateIndex(0);
    setAllFailed(false);
  }, [src]);

  const currentUrl = candidateUrls[candidateIndex];

  const handleImageError = () => {
    if (candidateIndex + 1 < candidateUrls.length) {
      // Try next fallback candidate
      setCandidateIndex((prev) => prev + 1);
    } else {
      // All candidates exhausted
      setAllFailed(true);
    }
  };

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-[16/10]'
      : aspectRatio === 'portrait'
      ? 'aspect-[4/5]'
      : 'aspect-[4/3]';

  if (allFailed || !currentUrl) {
    return (
      <div
        className={`w-full ${aspectClass} rounded-sm flex flex-col items-center justify-center p-6 text-center relative overflow-hidden transition-colors border border-amber-900/10 dark:border-amber-100/10 ${className}`}
        style={{
          background: 'radial-gradient(circle at center, rgba(224, 165, 38, 0.12) 0%, rgba(179, 38, 30, 0.05) 100%), var(--bg-card)'
        }}
        role="img"
        aria-label={`${dishName} archival plate`}
      >
        {/* Subtle decorative recipe card pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59,42,30,0.15) 1px, transparent 0)',
            backgroundSize: '16px 16px'
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-[85%]">
          <div className="w-12 h-12 rounded-full border border-amber-700/20 dark:border-amber-400/20 flex items-center justify-center mb-3 text-[#B3261E] dark:text-[#E25B53] bg-amber-500/10">
            <UtensilsCrossed className="w-5 h-5 stroke-[1.5]" />
          </div>

          <span className="font-heading text-base md:text-lg font-medium text-[var(--text-primary)] leading-snug line-clamp-2">
            {dishName}
          </span>

          {state && (
            <span className="stamp-badge mt-2 text-[0.68rem]">
              {state}
            </span>
          )}

          <p className="font-handwriting text-sm text-[var(--text-muted)] mt-2 italic">
            Archival gastronomic memory
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full ${aspectClass} ${className} bg-stone-100 dark:bg-stone-900`}>
      <img
        src={currentUrl}
        alt={alt}
        onError={handleImageError}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
      />
    </div>
  );
};
