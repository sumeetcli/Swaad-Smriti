import React from 'react';
import { DishStory } from '../data/dishes';
import { DishImage } from './DishImage';

interface DishCardProps {
  dish: DishStory;
  index: number;
  onSelectDish: (dishId: string) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, index, onSelectDish }) => {
  // Alternate subtle tilt angles for vintage album feel
  const isTiltLeft = index % 2 === 0;
  const tiltClass = isTiltLeft ? 'polaroid-tilt-left' : 'polaroid-tilt-right';

  const firstPhoto = dish.photos[0] || {
    url: '',
    alt: dish.name,
    caption: 'Archival memory photograph'
  };

  return (
    <article
      onClick={() => onSelectDish(dish.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectDish(dish.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View archive entry for ${dish.name} from ${dish.state}`}
      className="group cursor-pointer bg-[var(--bg-card)] rounded-lg p-5 recipe-card-stitch shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B3261E]"
    >
      <div>
        {/* Polaroid Framed Photo with slight tilt that straightens on hover */}
        <div
          className={`polaroid-frame p-3 pb-4 rounded-sm mb-4 transition-transform duration-300 ease-out ${tiltClass} border border-amber-900/10 dark:border-stone-800`}
        >
          <DishImage
            src={firstPhoto.url}
            fallbackSrc={[
              `/images/dishes/${dish.id}/cover.jpg`,
              dish.photos[1]?.url || '',
              `/images/${dish.id.replace(/-/g, '_')}_cover.jpg`
            ].filter(Boolean)}
            alt={firstPhoto.alt}
            dishName={dish.name}
            state={dish.state}
            aspectRatio="square"
            className="rounded-[2px]"
          />
          {/* Handwritten caption below polaroid photo */}
          <p className="font-handwriting text-base text-[var(--text-muted)] text-center mt-2.5 px-1 line-clamp-1 italic">
            "{firstPhoto.caption}"
          </p>
        </div>

        {/* State rubber stamp badge and dish header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="stamp-badge">
            {dish.state}
          </span>
          <span className="text-[0.7rem] uppercase tracking-wider text-[var(--text-muted)] font-mono">
            REC. 0{index + 1}
          </span>
        </div>

        <h3 className="font-heading text-xl font-semibold text-[var(--text-primary)] group-hover:text-[#B3261E] dark:group-hover:text-[#E25B53] transition-colors leading-tight mb-2">
          {dish.name}
        </h3>

        {/* One line description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
          {dish.tagline}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-warm)]/60 flex items-center justify-between text-xs text-[var(--text-muted)]">
        <span className="font-handwriting text-sm text-[var(--curry-leaf)] font-medium">
          Read oral history &rarr;
        </span>
        <span className="text-[0.75rem] italic truncate max-w-[150px] text-right" title={`Story told by: ${dish.storyteller}`}>
          {dish.storyteller}
        </span>
      </div>
    </article>
  );
};
