import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { getAllDishes, DishStory } from '../data/dishes';
import { MapPin, Compass, AlertCircle, ExternalLink } from 'lucide-react';

interface MapPageProps {
  onNavigate: (page: string) => void;
}

interface StatePinData {
  state: string;
  hub: string;
  coords: [number, number];
  dishes: DishStory[];
}

export const MapPage: React.FC<MapPageProps> = ({ onNavigate }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapError, setMapError] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const allDishes = getAllDishes();

  const statePins: StatePinData[] = [
    {
      state: "Karnataka",
      hub: "Dharwad & Mysuru",
      coords: [15.4589, 75.0078],
      dishes: allDishes.filter(d => d.state === "Karnataka")
    },
    {
      state: "Telangana",
      hub: "Hyderabad Region",
      coords: [17.3850, 78.4867],
      dishes: allDishes.filter(d => d.state === "Telangana")
    },
    {
      state: "Rajasthan",
      hub: "Jaipur & Desert Region",
      coords: [26.9124, 75.7873],
      dishes: allDishes.filter(d => d.state === "Rajasthan")
    },
    {
      state: "Tamil Nadu",
      hub: "Chennai & Kongu Region",
      coords: [13.0827, 80.2707],
      dishes: allDishes.filter(d => d.state === "Tamil Nadu")
    },
    {
      state: "Uttar Pradesh",
      hub: "Lucknow & Awadh",
      coords: [26.8467, 80.9462],
      dishes: allDishes.filter(d => d.state === "Uttar Pradesh")
    },
    {
      state: "Bihar",
      hub: "Patna & Magadh",
      coords: [25.5941, 85.1376],
      dishes: allDishes.filter(d => d.state === "Bihar")
    }
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      // Initialize Leaflet map centered on central India with appropriate bounds
      const map = L.map(mapContainerRef.current, {
        center: [21.5, 78.9],
        zoom: 5,
        minZoom: 4,
        maxZoom: 9,
        scrollWheelZoom: false
      });

      // OpenStreetMap standard tile layer
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      });

      tileLayer.on('tileerror', () => {
        // Tile error fallback
      });

      tileLayer.addTo(map);

      // Create custom Chilli Red Marker Icon using an inline SVG pin
      const createChilliIcon = (count: number) => {
        return L.divIcon({
          className: 'custom-chilli-pin',
          html: `
            <div style="
              position: relative;
              width: 34px;
              height: 44px;
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              filter: drop-shadow(0 3px 6px rgba(59, 42, 30, 0.35));
            ">
              <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 0C7.611 0 0 7.611 0 17C0 27.5 17 44 17 44C17 44 34 27.5 34 17C34 7.611 26.389 0 17 0Z" fill="#B3261E"/>
                <circle cx="17" cy="17" r="12" fill="#FBF4E4"/>
                <circle cx="17" cy="17" r="6" fill="#E0A526"/>
              </svg>
              <span style="
                position: absolute;
                top: 8px;
                font-size: 11px;
                font-weight: 700;
                font-family: 'Fraunces', serif;
                color: #3B2A1E;
              ">${count}</span>
            </div>
          `,
          iconSize: [34, 44],
          iconAnchor: [17, 44],
          popupAnchor: [0, -42]
        });
      };

      // Add pins only to the states that have dishes
      statePins.forEach((pinData) => {
        const marker = L.marker(pinData.coords, {
          icon: createChilliIcon(pinData.dishes.length),
          title: `${pinData.state} (${pinData.dishes.length} dishes)`
        }).addTo(map);

        // Construct vintage styled popup HTML
        const popupContent = document.createElement('div');
        popupContent.style.padding = '4px 2px';
        popupContent.style.minWidth = '220px';

        popupContent.innerHTML = `
          <div style="margin-bottom: 8px; border-bottom: 1px dashed var(--border-warm); padding-bottom: 6px;">
            <span class="stamp-badge">${pinData.state}</span>
            <span style="font-size: 11px; color: var(--text-muted); margin-left: 6px; font-style: italic;">
              ${pinData.hub}
            </span>
          </div>
          <div style="font-size: 12px; font-weight: 600; margin-bottom: 6px; color: var(--text-primary);">
            Archived Foods (${pinData.dishes.length}):
          </div>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px;">
            ${pinData.dishes
              .map(
                (d) => `
                <li>
                  <a href="#dish/${d.id}" data-dish-id="${d.id}" class="popup-dish-link">
                    → ${d.name}
                  </a>
                </li>
              `
              )
              .join('')}
          </ul>
        `;

        // Wire popup click event delegation
        popupContent.addEventListener('click', (e) => {
          const target = (e.target as HTMLElement).closest('.popup-dish-link');
          if (target) {
            e.preventDefault();
            const dishId = target.getAttribute('data-dish-id');
            if (dishId) {
              onNavigate(`dish/${dishId}`);
            }
          }
        });

        marker.bindPopup(popupContent);

        marker.on('click', () => {
          setSelectedState(pinData.state);
        });
      });

      mapInstanceRef.current = map;
    } catch (err) {
      console.error("Map initialization failed", err);
      setMapError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onNavigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Map Header */}
      <header className="pb-4 border-b border-[var(--border-warm)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="stamp-badge">
                Geographic Cartography
              </span>
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
                6 CONTRIBUTING STATES
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Map of Culinary Roots
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm italic font-serif">
            Click any chilli red pin to explore dishes recorded from student migrations to IIIT Dharwad.
          </p>
        </div>
      </header>

      {/* Map Interactive Container */}
      <div className="relative bg-[var(--bg-card)] border border-[var(--border-warm)] rounded-xl overflow-hidden shadow-sm recipe-card-stitch">
        {mapError ? (
          <div className="p-12 text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
              The map could not be loaded at this moment
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
              Please check your network connection or browse the state collections directly below.
            </p>
          </div>
        ) : (
          <div className="vintage-leaflet-map relative">
            <div
              ref={mapContainerRef}
              className="w-full h-[540px] z-10"
              style={{ background: 'var(--bg-card)' }}
            />

            {/* Vintage cartography overlay banner */}
            <div className="absolute top-3 right-3 z-20 pointer-events-none hidden sm:block bg-[var(--bg-paper)]/90 backdrop-blur-sm px-3 py-1.5 rounded border border-[var(--border-warm)] text-[0.7rem] font-mono text-[var(--text-muted)] shadow-sm">
              SEPIA CARTOGRAPHIC REEL · IIIT DHARWAD (15.45° N, 75.00° E)
            </div>
          </div>
        )}
      </div>

      {/* State Index Strip Below Map */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#5B7A3A]" />
          <h2 className="font-heading text-lg font-bold text-[var(--text-primary)]">
            State Clusters in the Archive
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statePins.map((item) => (
            <div
              key={item.state}
              className={`p-4 rounded-lg border transition-all bg-[var(--bg-card)] ${
                selectedState === item.state
                  ? 'border-[#B3261E] ring-1 ring-[#B3261E]/40'
                  : 'border-[var(--border-warm)] hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B3261E]" />
                  <span className="font-heading font-semibold text-[var(--text-primary)] text-base">
                    {item.state}
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-[var(--text-muted)]">
                  {item.dishes.length} {item.dishes.length === 1 ? 'dish' : 'dishes'}
                </span>
              </div>

              <p className="text-xs text-[var(--text-muted)] italic mb-3">
                Hub: {item.hub}
              </p>

              <div className="space-y-1.5">
                {item.dishes.map((dish) => (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => onNavigate(`dish/${dish.id}`)}
                    className="w-full text-left text-xs font-medium text-[var(--text-primary)] hover:text-[#B3261E] dark:hover:text-[#E25B53] py-1 px-2 rounded hover:bg-amber-500/10 flex items-center justify-between group transition-colors"
                  >
                    <span className="truncate">{dish.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 shrink-0 ml-1" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
