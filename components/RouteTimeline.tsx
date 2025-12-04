import React, { useState } from 'react';
import { TravelRoute, Factory } from '../types';

interface RouteTimelineProps {
  route: TravelRoute;
  factories: Factory[];
  onSelectFactory: (id: number) => void;
}

const RouteTimeline: React.FC<RouteTimelineProps> = ({ route, factories, onSelectFactory }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const getTravelIcon = (mode?: string) => {
    switch (mode) {
      case 'Plane':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
      case 'Train':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
      case 'Car':
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 012-2v0m12 0a2 2 0 012 2v0m-2-2h2" /></svg>;
      default:
        return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Route Header */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-6 text-white shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">{route.name}</h2>
            <div className="flex items-center gap-4 text-sm text-blue-100">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {route.duration}
              </span>
              {route.totalDistance && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" /></svg>
                  {route.totalDistance}
                </span>
              )}
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1 text-center">
            <span className="block text-2xl font-bold">{route.steps.length}</span>
            <span className="text-[10px] uppercase tracking-wider">Etapas</span>
          </div>
        </div>
        <p className="mt-4 text-blue-50 text-sm leading-relaxed max-w-2xl opacity-90">
          {route.description}
        </p>
      </div>

      {/* Timeline Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300">
        <div className="relative pl-8 border-l-2 border-dashed border-gray-200 space-y-8">
          
          {route.steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className={`
                absolute -left-[39px] top-0 flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold shadow-sm transition-colors
                ${expandedDay === step.day 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-500 group-hover:border-blue-400 group-hover:text-blue-500'}
              `}>
                {step.day}
              </div>

              {/* Card */}
              <div 
                onClick={() => toggleDay(step.day)}
                className={`
                  rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${expandedDay === step.day 
                    ? 'bg-white border-blue-200 shadow-lg ring-1 ring-blue-100' 
                    : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md hover:border-blue-100'}
                `}
              >
                {/* Step Header */}
                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      {step.city}
                      {step.travelMode !== 'None' && (
                         <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium ${
                            step.travelMode === 'Plane' ? 'bg-purple-100 text-purple-700' :
                            step.travelMode === 'Train' ? 'bg-sky-100 text-sky-700' :
                            'bg-orange-100 text-orange-700'
                         }`}>
                           {getTravelIcon(step.travelMode)}
                           {step.travelMode === 'Plane' ? 'Vuelo' : step.travelMode === 'Train' ? 'Tren' : 'Auto'}
                         </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{step.activity}</p>
                  </div>
                  
                  {/* Factory Chips */}
                  {step.factoriesToVisit.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {step.factoriesToVisit.map(fid => {
                        const f = factories.find(x => x.id === fid);
                        return f ? (
                          <button
                            key={fid}
                            onClick={(e) => { e.stopPropagation(); onSelectFactory(fid); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 text-xs font-bold transition-colors"
                          >
                            <span>🏭</span> {f.name}
                          </button>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {expandedDay === step.day && (
                  <div className="bg-blue-50/50 border-t border-blue-100 p-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      
                      {/* Transport Detail */}
                      {step.travelDetails && (
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                          <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Logística</h4>
                          <div className="flex items-start gap-2 text-gray-700">
                             <div className="mt-0.5 text-blue-500">{getTravelIcon(step.travelMode)}</div>
                             <span>{step.travelDetails}</span>
                          </div>
                        </div>
                      )}

                      {/* Accommodation */}
                      {step.accommodationTarget && (
                         <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                           <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Alojamiento Sugerido</h4>
                           <div className="flex items-start gap-2 text-gray-700">
                              <span className="text-amber-500">🛏️</span>
                              <span>{step.accommodationTarget}</span>
                           </div>
                         </div>
                      )}

                      {/* Daily Tip */}
                      {step.dailyTip && (
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm md:col-span-1 border-l-4 border-l-yellow-400">
                           <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">Tip del Día</h4>
                           <p className="text-gray-700 italic">"{step.dailyTip}"</p>
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* End of Route */}
          <div className="relative">
             <div className="absolute -left-[39px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow-sm">
                🏁
             </div>
             <div className="text-gray-400 text-sm italic pt-1">Fin del Itinerario</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RouteTimeline;
