import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { getAllDishes, DishStory } from '../data/dishes';
import { DishImage } from '../components/DishImage';
import { AudioPlayer } from '../components/AudioPlayer';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Home,
  Building2,
  BookOpen,
  FileText,
  Quote,
  Sparkles,
  Images,
  ExternalLink,
  Camera,
  Info
} from 'lucide-react';

interface DishPageProps {
  dishId: string;
  onNavigate: (page: string) => void;
}

export const DishPage: React.FC<DishPageProps> = ({ dishId, onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const allDishes = getAllDishes();
  const currentIndex = allDishes.findIndex((d) => d.id === dishId);
  const dish: DishStory = allDishes[currentIndex] || allDishes[0];

  // Previous and next dish navigation calculation
  const prevIndex = (currentIndex - 1 + allDishes.length) % allDishes.length;
  const nextIndex = (currentIndex + 1) % allDishes.length;
  const prevDish = allDishes[prevIndex];
  const nextDish = allDishes[nextIndex];

  // Photo selection state for multi-plate viewing
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Reset to plate 0 when dish changes
  useEffect(() => {
    setSelectedPhotoIndex(0);
  }, [dishId]);

  // Active primary photograph
  const mainPhoto = dish.photos[selectedPhotoIndex] || dish.photos[0] || {
    url: '',
    alt: dish.name,
    caption: 'Archival memory photograph',
    sourceCredit: 'Archival Plate Collection'
  };

  // Subtle parallax effect on the main photo as user scrolls
  const photoContainerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: photoScrollProgress } = useScroll({
    target: photoContainerRef,
    offset: ["start end", "end start"]
  });

  const photoParallaxY = useTransform(photoScrollProgress, [0, 1], [-18, 18]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
      {/* Navigation Breadcrumb & Previous / Next Controls */}
      <nav aria-label="Archive pagination" className="flex items-center justify-between pb-4 border-b border-[var(--border-warm)]">
        <button
          type="button"
          onClick={() => onNavigate('archive')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[var(--text-muted)] hover:text-[#B3261E] dark:hover:text-[#E25B53] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Archive</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate(`dish/${prevDish.id}`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded border border-[var(--border-warm)] bg-[var(--bg-card)] hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-[var(--text-primary)] transition-colors cursor-pointer"
            title={`Previous: ${prevDish.name}`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{prevDish.name}</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <span className="text-xs font-mono text-[var(--text-muted)]">
            {currentIndex + 1} / {allDishes.length}
          </span>

          <button
            type="button"
            onClick={() => onNavigate(`dish/${nextDish.id}`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded border border-[var(--border-warm)] bg-[var(--bg-card)] hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-[var(--text-primary)] transition-colors cursor-pointer"
            title={`Next: ${nextDish.name}`}
          >
            <span className="hidden sm:inline">{nextDish.name}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Header: Dish Title, Origin, and Storyteller Tag */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="stamp-badge">
            {dish.state}
          </span>
          <span className="text-xs tracking-wider uppercase text-[var(--text-muted)] font-mono">
            Archival Record #{String(currentIndex + 1).padStart(2, '0')}
          </span>
          {dish.isCustomSubmission && (
            <span className="text-[0.7rem] uppercase tracking-wider font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
              Live Contributed Record
            </span>
          )}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
          {dish.name}
        </h1>

        <p className="font-heading italic text-lg sm:text-xl text-[#B3261E] dark:text-[#E25B53] max-w-2xl">
          "{dish.tagline}"
        </p>

        {/* Storyteller attribution section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1 text-sm text-[var(--text-muted)] border-t border-[var(--border-warm)]/60">
          <div className="inline-flex items-center gap-2">
            <Quote className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-serif italic text-base">
              Story told by:{' '}
              <strong className="font-semibold text-[var(--text-primary)] not-italic bg-amber-500/10 px-2 py-0.5 rounded border border-amber-600/20">
                {dish.storyteller}
              </strong>
            </span>
          </div>

          {dish.storytellerNote && (
            <span className="text-xs text-[var(--text-muted)] font-mono sm:border-l sm:border-[var(--border-warm)] sm:pl-3">
              {dish.storytellerNote}
            </span>
          )}
        </div>
      </header>

      {/* Prominent Featured Photo Display with subtle parallax effect */}
      <section
        ref={photoContainerRef}
        aria-labelledby="photo-heading"
        className="space-y-4 overflow-hidden py-2"
      >
        <div className="flex items-center justify-between">
          <h2 id="photo-heading" className="text-xs uppercase tracking-widest font-semibold text-[var(--text-muted)] font-mono flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-[#B3261E] dark:text-[#E25B53]" />
            Archival Photograph
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            Record #{String(currentIndex + 1).padStart(2, '0')} · {dish.name}
          </span>
        </div>

        <motion.figure
          style={shouldReduceMotion ? undefined : { y: photoParallaxY }}
          className="polaroid-frame p-5 sm:p-7 pb-6 rounded-md border border-amber-900/10 dark:border-stone-800 max-w-3xl mx-auto shadow-md will-change-transform"
        >
          <div className="w-full overflow-hidden rounded-sm bg-stone-100 dark:bg-stone-900">
            <DishImage
              src={mainPhoto.url}
              alt={mainPhoto.alt}
              dishName={dish.name}
              state={dish.state}
              aspectRatio="video"
              className="w-full h-auto max-h-[520px] object-cover"
            />
          </div>
          <figcaption className="font-handwriting text-xl sm:text-2xl text-[var(--text-primary)] text-center mt-5 px-3 italic">
            "{mainPhoto.caption}"
          </figcaption>

          {/* Genuine photo credit directly below image */}
          <div className="mt-4 pt-3 border-t border-[var(--border-warm)]/60 flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--text-muted)] text-center">
            {mainPhoto.sourceUrl ? (
              <a
                href={mainPhoto.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#B3261E] dark:hover:text-[#E25B53] font-medium transition-colors"
                title="View original image source"
              >
                <span>{mainPhoto.sourceCredit}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="font-medium tracking-wide">
                {mainPhoto.sourceCredit}
              </span>
            )}
          </div>

          {/* Multi-plate gallery selector */}
          {dish.photos.length > 1 && (
            <div className="mt-4 pt-3 border-t border-[var(--border-warm)]/60 flex items-center justify-center gap-2 flex-wrap">
              <span className="text-[0.7rem] uppercase font-mono tracking-wider text-[var(--text-muted)] mr-1">
                View Plate:
              </span>
              {dish.photos.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`px-3 py-1 text-xs rounded-full font-mono transition-all cursor-pointer ${
                    selectedPhotoIndex === idx
                      ? 'bg-[#B3261E] text-white shadow-xs font-semibold scale-105'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-[var(--text-primary)] border border-[var(--border-warm)]'
                  }`}
                >
                  Plate {idx + 1} of {dish.photos.length}
                </button>
              ))}
            </div>
          )}
        </motion.figure>
      </section>

      {/* Audio Player Component */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-labelledby="audio-heading"
        className="space-y-3"
      >
        <h2 id="audio-heading" className="text-xs uppercase tracking-widest font-semibold text-[var(--text-muted)] font-mono">
          Oral Recording
        </h2>
        <AudioPlayer
          audioUrl={dish.audioUrl}
          dishName={dish.name}
          duration={dish.audioDuration}
        />
      </motion.section>

      {/* Story Summary Box (Clearly styled box, editable in code) */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-6 sm:p-7 recipe-card-stitch space-y-3 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-warm)]/70 pb-3">
          <div className="flex items-center gap-2.5 text-[#B3261E] dark:text-[#E25B53]">
            <BookOpen className="w-4 h-4" />
            <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">
              Story Summary
            </h2>
          </div>
          <span className="text-[0.7rem] uppercase tracking-wider font-mono text-[var(--text-muted)] bg-amber-500/10 px-2 py-0.5 rounded">
            Student Oral History Narrative
          </span>
        </div>
        <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed italic font-serif pt-1">
          {dish.storySummary}
        </p>
      </motion.section>

      {/* Transcript Box with matching color scheme on badge */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-6 sm:p-7 recipe-card-stitch space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-warm)]/70 pb-3">
          <div className="flex items-center gap-2.5 text-[#5B7A3A] dark:text-[#799F4E]">
            <FileText className="w-4 h-4" />
            <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">
              Oral History Transcript
            </h2>
          </div>
          {/* Matched color scheme to 'Student Oral History Narrative' in story summary */}
          <span className="text-[0.7rem] uppercase tracking-wider font-mono text-[var(--text-muted)] bg-amber-500/10 px-2 py-0.5 rounded">
            Full Audio Transcript
          </span>
        </div>

        {/* Formatted transcript with paragraph spacing */}
        <div className="space-y-4 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-serif pt-1">
          {dish.transcript ? (
            dish.transcript
              .split(/\n\s*\n/)
              .filter((p) => p.trim().length > 0)
              .map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))
          ) : (
            <p className="italic text-[var(--text-muted)]">
              [Transcript text will appear here once entered in src/data/dishes.ts]
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-[var(--border-warm)]/50 text-[0.75rem] font-mono text-[var(--text-muted)] flex items-center justify-between">
          <span>Archival document · IIIT Dharwad Gastronomic Studies</span>
          <span className="italic">Narrated by: {dish.storyteller}</span>
        </div>
      </motion.section>

      {/* "Did You Know?" Food Facts Section */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-amber-500/10 dark:bg-amber-950/25 border border-amber-600/30 rounded-lg p-6 sm:p-7 space-y-3 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Did You Know?
          </h2>
          <span className="ml-auto text-[0.7rem] uppercase tracking-widest font-mono text-[#5B7A3A] dark:text-[#799F4E] font-semibold border border-[#5B7A3A]/30 px-2 py-0.5 rounded">
            Gastronomic Fact
          </span>
        </div>
        <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-serif">
          {dish.didYouKnow}
        </p>
      </motion.section>

      {/* "Why this food matters" Note */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-6 space-y-2"
      >
        <span className="text-xs uppercase tracking-wider font-semibold text-[#5B7A3A] dark:text-[#799F4E] block">
          Curatorial Background
        </span>
        <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">
          Why this food matters
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-serif">
          {dish.whyItMatters}
        </p>
      </motion.section>

      {/* "From home to hostel" Section */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="border-b border-[var(--border-warm)] pb-2">
          <h2 className="font-heading text-xl font-bold text-[var(--text-primary)]">
            From Home to Hostel
          </h2>
          <p className="font-handwriting text-base text-[var(--text-muted)]">
            How living away from home alters the daily routine of meals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: At Home */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-6 recipe-card-stitch space-y-3">
            <div className="flex items-center gap-2.5 text-[#5B7A3A] dark:text-[#799F4E]">
              <Home className="w-4 h-4" />
              <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">
                At Home
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)] font-serif">
              {dish.atHome}
            </p>
          </div>

          {/* Column 2: In the Hostel */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-lg p-6 recipe-card-stitch space-y-3">
            <div className="flex items-center gap-2.5 text-[#B3261E] dark:text-[#E25B53]">
              <Building2 className="w-4 h-4" />
              <h3 className="font-heading text-base font-bold text-[var(--text-primary)]">
                In the Hostel
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-muted)] font-serif">
              {dish.inHostel}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Photo Gallery Section for this food item */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 pt-4 border-t border-[var(--border-warm)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[var(--border-warm)] pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Images className="w-4 h-4 text-[#B3261E] dark:text-[#E25B53]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--text-muted)] font-mono">
                Visual Documentation
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              Archival Photo Gallery
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            {dish.photos.length} {dish.photos.length === 1 ? 'Photograph' : 'Photographs'} in Collection
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dish.photos.map((item, photoIndex) => {
            const isFeatured = selectedPhotoIndex === photoIndex;
            return (
              <figure
                key={photoIndex}
                className={`polaroid-frame p-4 pb-5 rounded-md border flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
                  isFeatured
                    ? 'ring-2 ring-[#B3261E] border-[#B3261E]/40 dark:border-[#E25B53]/50'
                    : 'border-amber-900/10 dark:border-stone-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[0.7rem] uppercase font-mono tracking-wider text-[var(--text-muted)] font-semibold">
                      Plate 0{photoIndex + 1}
                    </span>
                    {isFeatured ? (
                      <span className="text-[0.68rem] font-mono px-2 py-0.5 rounded-full bg-[#B3261E]/10 text-[#B3261E] dark:text-[#E25B53] font-semibold">
                        Featured Above
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPhotoIndex(photoIndex);
                          photoContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="text-[0.68rem] font-mono text-[var(--curry-leaf)] hover:underline cursor-pointer"
                      >
                        Feature at Top &uarr;
                      </button>
                    )}
                  </div>

                  <div className="w-full overflow-hidden rounded-sm bg-stone-100 dark:bg-stone-900">
                    <DishImage
                      src={item.url}
                      alt={item.alt}
                      dishName={dish.name}
                      state={dish.state}
                      aspectRatio="video"
                      className="w-full h-auto max-h-[340px] object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <figcaption className="font-handwriting text-lg sm:text-xl text-[var(--text-primary)] text-center mt-4 px-2 italic">
                    "{item.caption}"
                  </figcaption>
                </div>

                {/* Exact source and credit directly below each image with AI Tag where applicable */}
                <div className="mt-4 pt-3 border-t border-[var(--border-warm)]/60 text-xs text-[var(--text-muted)] text-center space-y-1.5">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {item.sourceCredit.includes('Source: Team Archive') ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-[var(--text-primary)] font-medium font-mono text-[0.72rem] border border-amber-500/20">
                        {item.sourceCredit}
                      </span>
                    ) : item.sourceUrl ? (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#B3261E] dark:hover:text-[#E25B53] font-medium transition-colors"
                      >
                        <span>{item.sourceCredit}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="font-medium font-mono text-[0.72rem]">
                        {item.sourceCredit}
                      </span>
                    )}

                    {item.isAI && (
                      <div className="relative group/ai-item inline-block">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-600/30 text-[#B3261E] dark:text-amber-400 font-mono text-[0.65rem] font-semibold cursor-help">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                          <span>AI</span>
                        </span>
                        <div className="invisible group-hover/ai-item:visible opacity-0 group-hover/ai-item:opacity-100 transition-all duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[var(--bg-paper)] text-[var(--text-primary)] border border-amber-600/40 rounded-lg shadow-xl text-left z-30 pointer-events-none">
                          <p className="font-heading font-bold text-xs text-[#B3261E] dark:text-amber-400 mb-1">
                            Curatorial Ambience
                          </p>
                          <p className="text-[0.7rem] text-[var(--text-muted)] leading-relaxed font-serif">
                            Recreates the ambience of ancient rural houses and historical dining settings where camera documentation was unavailable.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {item.isAI && (
                    <p className="text-[0.7rem] text-[var(--text-muted)] font-serif italic max-w-sm mx-auto">
                      Evokes traditional rural house ambience for gastronomic contextualization.
                    </p>
                  )}
                </div>
              </figure>
            );
          })}
        </div>
      </motion.section>

      {/* Bottom Traversal Actions */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="pt-8 border-t border-[var(--border-warm)] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <button
          type="button"
          onClick={() => onNavigate(`dish/${prevDish.id}`)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium border border-[var(--border-warm)] rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous: {prevDish.name}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('archive')}
          className="text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[#B3261E] dark:hover:text-[#E25B53] font-semibold cursor-pointer"
        >
          Catalogue Index
        </button>

        <button
          type="button"
          onClick={() => onNavigate(`dish/${nextDish.id}`)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium border border-[var(--border-warm)] rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
        >
          <span>Next: {nextDish.name}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    </article>
  );
};
