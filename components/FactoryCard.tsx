import React from 'react';
import { Factory } from '../types';

interface FactoryCardProps {
  factory: Factory;
  onSelect: () => void;
  isSelected: boolean;
}

const FactoryCard: React.FC<FactoryCardProps> = ({ factory, onSelect, isSelected }) => {
  
  // Helper to extract name and distance from string like "Hotel Name (1.5 km)"
  const parseAccommodation = (acc: string) => {
    const match = acc.match(/(.*?)\s*\((.*?)\)/);
    if (match) {
      return { name: match[1], distance: match[2] };
    }
    return { name: acc, distance: '?' };
  };

  return (
    <div 
      onClick={onSelect}
      className={`
        relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer group
        ${isSelected ? 'border-brand-500 shadow-lg ring-2 ring-brand-200' : 'border-gray-200 hover:shadow-md bg-white'}
      `}
    >
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-brand-600 transition-colors">
            {factory.name}
          </h3>
          <div className="flex gap-2 items-center">
            {factory.website && (
              <a 
                href={factory.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-brand-500 transition-colors p-1"
                title="Visitar sitio web"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
            <div className={`
              px-2 py-1 rounded text-xs font-bold border shrink-0
              ${factory.priority <= 3 ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-gray-100 text-gray-700 border-gray-200'}
            `}>
               Rank #{factory.priority}
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-brand-600 font-medium mb-3">
          <span className="bg-brand-50 px-2 py-1 rounded border border-brand-100">{factory.region}</span>
          <span className="mx-2">•</span>
          <span>{factory.city}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">{factory.notes}</p>

        <div className="pt-3 border-t border-gray-100 mt-auto">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Alojamiento & Distancia</p>
          <div className="space-y-2">
            {factory.accommodation.slice(0, 2).map((acc, idx) => {
              const { name, distance } = parseAccommodation(acc);
              return (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="flex items-center text-gray-700 truncate mr-2">
                    <span className="mr-1.5">🛏️</span>
                    <span className="truncate" title={name}>{name}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded font-bold whitespace-nowrap ${
                    distance.includes('km') && parseFloat(distance) < 5 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {distance}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryCard;