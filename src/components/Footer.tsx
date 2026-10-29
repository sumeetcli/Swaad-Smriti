import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, GraduationCap } from 'lucide-react';
import { COURSE_INFO } from '../data/dishes';

export const Footer: React.FC = () => {
  const [isReflectionsOpen, setIsReflectionsOpen] = useState(false);

  return (
    <footer className="mt-20 border-t border-[var(--border-warm)] bg-[var(--bg-paper)] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Course & Archive Institutional Sign-off */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--border-warm)]/60">
          <div>
            <span className="font-heading text-lg font-bold text-[var(--text-primary)] block">
              Swaad Smriti
            </span>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              A Digital Archive of Food and Homesickness
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <GraduationCap className="w-4 h-4 text-[#B3261E] dark:text-[#E25B53] shrink-0" />
            <span>
              Gastronomic Studies · IIIT Dharwad
            </span>
          </div>
        </div>

        {/* Collapsible Reflections Panel (Closed by default) */}
        <div className="mt-8">
          <div className="border border-[var(--border-warm)] rounded-lg bg-[var(--bg-card)] overflow-hidden transition-all shadow-sm">
            <button
              type="button"
              onClick={() => setIsReflectionsOpen(!isReflectionsOpen)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-amber-500/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B3261E]"
              aria-expanded={isReflectionsOpen}
              aria-controls="reflections-content"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-[#B3261E] dark:text-[#E25B53] shrink-0" />
                <div>
                  <span className="font-heading text-sm font-semibold text-[var(--text-primary)] block">
                    Course Reflections & Curatorial Note
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-handwriting text-base">
                    Drafting food, memory, and collegiate homesickness
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-medium">
                <span>{isReflectionsOpen ? 'Collapse' : 'Read reflections'}</span>
                {isReflectionsOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </button>

            {isReflectionsOpen && (
              <div
                id="reflections-content"
                className="px-5 pb-5 pt-2 border-t border-[var(--border-warm)]/60 text-sm leading-relaxed text-[var(--text-muted)]"
              >
                <p className="max-w-3xl">
                  {COURSE_INFO.reflectionsText}
                </p>
                <div className="mt-4 pt-3 border-t border-[var(--border-warm)]/40 flex items-center gap-3 text-xs text-[var(--text-muted)] italic">
                  <span>Indian Institute of Information Technology Dharwad</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottomline */}
        <div className="mt-8 text-center text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Swaad Smriti · IIIT Dharwad Gastronomic Studies Archive</p>
        </div>
      </div>
    </footer>
  );
};
