import React, { useState } from 'react';
import { Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import { DISHES } from '../data/dishes';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTasteMemory = () => {
    // Pick a random dish
    const randomIndex = Math.floor(Math.random() * DISHES.length);
    const randomDish = DISHES[randomIndex];
    if (randomDish) {
      onNavigate(`dish/${randomDish.id}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'archive', label: 'Archive' },
    { id: 'map', label: 'Map' },
    { id: 'about', label: 'About' },
    { id: 'contribute', label: 'Contribute' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-paper)]/95 backdrop-blur-sm border-b border-[var(--border-warm)] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 hover:text-[#B3261E] dark:hover:text-[#E25B53] transition-colors"
        >
          Swaad Smriti
        </a>

        {/* Zone 2: Navigation Links (single line, no pills) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--text-muted)]">
          {navLinks.map((link) => {
            const isActive =
              currentPage === link.id ||
              (link.id === 'archive' && currentPage.startsWith('dish/'));
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                }}
                className={`transition-colors whitespace-nowrap relative py-1 hover:text-[var(--text-primary)] ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#B3261E]'
                    : ''
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B3261E]"
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
          </button>

          {/* Taste a memory button (Primary CTA) */}
          <button
            type="button"
            onClick={handleTasteMemory}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#B3261E] hover:bg-[#961F18] dark:bg-[#D83B32] dark:hover:bg-[#BF2D25] rounded-lg shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Taste a memory</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-warm)] bg-[var(--bg-paper)] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link.id
                    ? 'bg-amber-500/10 text-[#B3261E] dark:text-[#E25B53] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[var(--border-warm)]">
            <button
              type="button"
              onClick={handleTasteMemory}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#B3261E] rounded-md shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Taste a memory (Random)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
