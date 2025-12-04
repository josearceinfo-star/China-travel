import React, { useState } from 'react';
import { FACTORIES, ROUTES } from './data';
import Map from './components/Map';
import FactoryCard from './components/FactoryCard';
import NotesInterface from './components/NotesInterface';
import RouteTimeline from './components/RouteTimeline';

const App: React.FC = () => {
  const [selectedFactoryId, setSelectedFactoryId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'factories' | 'routes'>('factories');

  const selectedFactory = selectedFactoryId ? FACTORIES.find(f => f.id === selectedFactoryId) : null;

  // Handler to switch back to factories tab when a factory is clicked in the route view
  const handleFactorySelectFromRoute = (id: number) => {
    setActiveTab('factories');
    setSelectedFactoryId(id);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
            ChinaTour
          </h1>
          <p className="text-slate-400 text-xs mt-1">Prefab Housing Planner</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('factories')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === 'factories' ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
             Fábricas & Mapa
          </button>
          <button 
             onClick={() => setActiveTab('routes')}
             className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${activeTab === 'routes' ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" /></svg>
             Itinerario Detallado
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
           <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
              <p>Total Fábricas: {FACTORIES.length}</p>
              <p>Regiones: 4</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm z-10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === 'factories' ? 'Explorador de Fábricas' : 'Planificador de Rutas'}
          </h2>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6 bg-slate-50">
          {activeTab === 'factories' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* List Column */}
                <div className="lg:col-span-1 overflow-y-auto pr-2 space-y-4 h-full scrollbar-thin scrollbar-thumb-gray-300 pb-20">
                  {FACTORIES.sort((a,b) => a.priority - b.priority).map(factory => (
                    <FactoryCard 
                      key={factory.id} 
                      factory={factory} 
                      onSelect={() => setSelectedFactoryId(factory.id)}
                      isSelected={selectedFactoryId === factory.id}
                    />
                  ))}
                </div>

                {/* Map Column */}
                <div className="lg:col-span-2 h-full flex flex-col gap-4 pb-4">
                  <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[400px]">
                    <Map 
                      factories={FACTORIES} 
                      selectedFactoryId={selectedFactoryId}
                      onSelectFactory={setSelectedFactoryId}
                    />
                    {/* Floating Info Panel */}
                    {selectedFactory && (
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur shadow-lg rounded-lg p-4 border border-gray-200 z-[400] max-w-lg animate-fade-in-up">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg text-brand-900">{selectedFactory.name}</h3>
                            <p className="text-sm text-gray-600">{selectedFactory.fullAddress}</p>
                          </div>
                          <button onClick={() => setSelectedFactoryId(null)} className="text-gray-400 hover:text-gray-600">
                            ✕
                          </button>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-blue-50 p-2 rounded text-blue-800">
                             <span className="font-semibold block text-xs uppercase tracking-wider text-blue-600">Contacto</span>
                             {selectedFactory.contact || 'N/A'}
                          </div>
                          <div className="bg-amber-50 p-2 rounded text-amber-800">
                             <span className="font-semibold block text-xs uppercase tracking-wider text-amber-600">Distancia a Hotel</span>
                             <ul className="list-none">
                                {selectedFactory.accommodation.slice(0, 1).map((acc, i) => {
                                  // Parse logic for the popup as well
                                  const match = acc.match(/(.*?)\s*\((.*?)\)/);
                                  const name = match ? match[1] : acc;
                                  const dist = match ? match[2] : '';
                                  return (
                                    <li key={i} className="flex flex-col">
                                      <span className="truncate text-[10px] leading-tight mb-1">{name}</span>
                                      <span className="font-bold text-lg">{dist}</span>
                                    </li>
                                  )
                                })}
                             </ul>
                          </div>
                        </div>
                        
                        {/* WEBSITE BUTTON */}
                        {selectedFactory.website && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <a 
                              href={selectedFactory.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2 rounded-lg transition-colors text-sm"
                            >
                              <span>Visitar Sitio Web Oficial</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                  
                  {/* Notes Interface */}
                  <div className="h-64 flex-shrink-0">
                    <NotesInterface 
                      factories={FACTORIES} 
                      selectedFactoryId={selectedFactoryId}
                    />
                  </div>
                </div>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="h-full flex justify-center">
              <div className="w-full max-w-4xl">
                 {ROUTES.map(route => (
                   <RouteTimeline 
                      key={route.id} 
                      route={route} 
                      factories={FACTORIES}
                      onSelectFactory={handleFactorySelectFromRoute}
                   />
                 ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
