import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArchivePage } from './pages/ArchivePage';
import { DishPage } from './pages/DishPage';
import { MapPage } from './pages/MapPage';
import { AboutPage } from './pages/AboutPage';
import { ContributePage } from './pages/ContributePage';

export default function App() {
  // Theme state: defaults to light, remembers user choice via localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('swaad-smriti-theme');
      if (stored) {
        return stored === 'dark';
      }
    }
    return false; // Default to light
  });

  // Simple Hash Routing: 'home', 'archive', 'dish/<id>', 'map', 'about'
  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#\/?/, '');
      return hash || 'home';
    }
    return 'home';
  });

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('swaad-smriti-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('swaad-smriti-theme', 'light');
    }
  }, [isDark]);

  // Handle browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      setCurrentPage(hash || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Determine current page view
  const renderCurrentView = () => {
    if (currentPage.startsWith('dish/')) {
      const dishId = currentPage.replace('dish/', '');
      return <DishPage dishId={dishId} onNavigate={navigateTo} />;
    }

    switch (currentPage) {
      case 'archive':
        return <ArchivePage onNavigate={navigateTo} />;
      case 'map':
        return <MapPage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage />;
      case 'contribute':
        return <ContributePage onNavigate={navigateTo} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-texture transition-colors">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 py-6">
        {renderCurrentView()}
      </main>

      <Footer />
    </div>
  );
}
