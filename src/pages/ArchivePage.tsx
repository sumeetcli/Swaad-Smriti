import React from 'react';
import { getAllDishes } from '../data/dishes';
import { DishCard } from '../components/DishCard';
import { PlusCircle } from 'lucide-react';

interface ArchivePageProps {
  onNavigate: (page: string) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ onNavigate }) => {
  const allDishes = getAllDishes();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Archive Header */}
      <header className="pb-6 border-b border-[var(--border-warm)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="stamp-badge">
                Archive Catalogue
              </span>
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
                VOL. I · {allDishes.length} ENTRIES
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Index of Flavours & Longing
            </h1>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm italic font-serif">
              Recipe cards assembled from hostel dormitory interviews, recorded throughout the academic year.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('contribute')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#B3261E] hover:bg-[#961F18] text-white transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Contribute Oral History (Demo)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Grid of Dish Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allDishes.map((dish, index) => (
          <DishCard
            key={dish.id}
            dish={dish}
            index={index}
            onSelectDish={(id) => onNavigate(`dish/${id}`)}
          />
        ))}
      </div>
    </div>
  );
};
