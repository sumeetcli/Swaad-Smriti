import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  useMotionValueEvent
} from 'motion/react';
import { DISHES } from '../data/dishes';
import { DishCard } from '../components/DishCard';
import { Sparkles, MapPin, ArrowRight, Compass } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  // Featured row: pick 4 representative dishes from different regions
  const featuredDishes = [
    DISHES.find((d) => d.id === 'dharwad-pedha') || DISHES[3],
    DISHES.find((d) => d.id === 'hyderabadi-biryani') || DISHES[0],
    DISHES.find((d) => d.id === 'dal-baati-churma') || DISHES[4],
    DISHES.find((d) => d.id === 'pongal') || DISHES[5]
  ];

  const handleTasteMemory = () => {
    const randomIndex = Math.floor(Math.random() * DISHES.length);
    const randomDish = DISHES[randomIndex];
    if (randomDish) {
      onNavigate(`dish/${randomDish.id}`);
    }
  };

  // Hero scroll parallax: gentle scale down and fade out
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.85], [1, 0.2]);

  // Pinned storytelling section scroll controller: strictly controls the active quote
  const storyContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyContainerRef,
    offset: ["start start", "end end"]
  });

  // Track active quote index strictly: 0 -> "A dish from home.", 1 -> "A hostel room far away.", 2 -> "A memory that tastes the same."
  const [activeQuote, setActiveQuote] = useState(0);

  useMotionValueEvent(storyProgress, "change", (latest) => {
    if (latest < 0.34) {
      setActiveQuote(0);
    } else if (latest < 0.67) {
      setActiveQuote(1);
    } else {
      setActiveQuote(2);
    }
  });

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-8 sm:pt-14 pb-8 max-w-4xl mx-auto text-center px-4"
      >
        <motion.div
          style={
            shouldReduceMotion
              ? undefined
              : { scale: heroScale, opacity: heroOpacity }
          }
          className="will-change-transform"
        >
          {/* Archival marker */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <span className="stamp-badge">
              Oral History Collection
            </span>
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
              IIIT DHARWAD
            </span>
          </motion.div>

          {/* Site Title with soft fade-in and small upward slide */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.15] mb-4"
          >
            Swaad Smriti
          </motion.h1>

          {/* Subtitle fade in */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading italic text-xl sm:text-2xl text-[#B3261E] dark:text-[#E25B53] mb-6 font-medium"
          >
            A Digital Archive of Food and Homesickness
          </motion.p>

          {/* Simple introductory paragraph fade in */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto mb-10"
          >
            When students leave home for college, the food they grew up with becomes something special. In hostel rooms and late night canteen visits, simple everyday meals remind students of family and home. Swaad Smriti collects these short stories and photos, showing how being away at college changes what we crave and how we remember home.
          </motion.p>

          {/* Buttons fade in */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.98, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={handleTasteMemory}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-[#B3261E] hover:bg-[#961F18] dark:bg-[#D83B32] dark:hover:bg-[#BF2D25] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Taste a memory</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('map')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-card)] hover:bg-stone-200/60 dark:hover:bg-stone-800/60 border border-[var(--border-warm)] rounded-xl transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#5B7A3A]" />
              <span>View India Culinary Map</span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Dishes Section with staggered reveal */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[var(--border-warm)]"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-handwriting text-lg text-[#B3261E] dark:text-[#E25B53]">
                curated selections
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Featured Memories
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('archive')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#B3261E] dark:text-[#E25B53] hover:underline cursor-pointer"
          >
            <span>Browse all 10 archive dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Row of Featured Dish Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.12,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <DishCard
                dish={dish}
                index={idx}
                onSelectDish={(id) => onNavigate(`dish/${id}`)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pinned Storytelling Section (Non-overlapping quotes with strict AnimatePresence) */}
      {shouldReduceMotion ? (
        // Clean static version for users with prefers-reduced-motion
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-2xl recipe-card-stitch p-8 sm:p-12 text-center shadow-sm">
            <span className="stamp-badge mb-4">
              Fragments of Memory
            </span>
            <div className="space-y-4 my-6 font-handwriting text-2xl sm:text-4xl text-[var(--text-primary)]">
              <p>A dish from home.</p>
              <p className="text-[#B3261E] dark:text-[#E25B53]">A hostel room far away.</p>
              <p>A memory that tastes the same.</p>
            </div>
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
              Voices from the Student Archive
            </p>
          </div>
        </section>
      ) : (
        // Pinned storytelling section: Quotes switch independently with zero visual overlap
        <div ref={storyContainerRef} className="relative h-[240vh] w-full">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 pointer-events-none">
            <div className="w-full max-w-4xl mx-auto p-8 sm:p-14 bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-2xl recipe-card-stitch shadow-md text-center relative pointer-events-auto overflow-hidden min-h-[340px] sm:min-h-[400px] flex flex-col items-center justify-center">
              {/* Header stamp */}
              <div className="mb-6">
                <span className="stamp-badge">
                  Fragments of Memory
                </span>
              </div>

              {/* Center text container where only ONE quote renders at a time */}
              <div className="relative w-full h-32 sm:h-36 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeQuote === 0 && (
                    <motion.p
                      key="quote-home"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="font-handwriting text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] leading-snug px-4 italic text-center"
                    >
                      "A dish from home."
                    </motion.p>
                  )}

                  {activeQuote === 1 && (
                    <motion.p
                      key="quote-hostel"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="font-handwriting text-3xl sm:text-5xl md:text-6xl text-[#B3261E] dark:text-[#E25B53] leading-snug px-4 italic text-center"
                    >
                      "A hostel room far away."
                    </motion.p>
                  )}

                  {activeQuote === 2 && (
                    <motion.p
                      key="quote-memory"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="font-handwriting text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] leading-snug px-4 italic text-center"
                    >
                      "A memory that tastes the same."
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress indicator dots */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setActiveQuote(0)}
                  aria-label="View: A dish from home."
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeQuote === 0
                      ? 'bg-[#B3261E] dark:bg-[#E25B53] scale-125'
                      : 'bg-stone-400/40 dark:bg-stone-600/40'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setActiveQuote(1)}
                  aria-label="View: A hostel room far away."
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeQuote === 1
                      ? 'bg-[#B3261E] dark:bg-[#E25B53] scale-125'
                      : 'bg-stone-400/40 dark:bg-stone-600/40'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setActiveQuote(2)}
                  aria-label="View: A memory that tastes the same."
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeQuote === 2
                      ? 'bg-[#B3261E] dark:bg-[#E25B53] scale-125'
                      : 'bg-stone-400/40 dark:bg-stone-600/40'
                  }`}
                />
              </div>

              <span className="text-[0.7rem] uppercase tracking-widest text-[var(--text-muted)] font-mono mt-3">
                Scroll through memories
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Context banner connecting to Dharwad / Campus */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-xl p-6 sm:p-8 recipe-card-stitch"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--curry-leaf)] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Student Project at IIIT Dharwad</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                About the Gastronomic Studies Project
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed font-serif">
                As part of the Gastronomic Studies course, our student team archives culinary oral histories from students who have moved from across India to study in Dharwad, Karnataka.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('contribute')}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#B3261E] hover:bg-[#961F18] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                Contribute a Memory &rarr;
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] border border-[var(--border-warm)] rounded-lg hover:bg-amber-500/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                Meet the Team
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
