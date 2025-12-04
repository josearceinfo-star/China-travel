import React, { useEffect, useRef } from 'react';
import { Factory } from '../types';

interface MapProps {
  factories: Factory[];
  selectedFactoryId: number | null;
  onSelectFactory: (id: number) => void;
}

declare global {
  interface Window {
    L: any;
  }
}

const Map: React.FC<MapProps> = ({ factories, selectedFactoryId, onSelectFactory }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: number]: any }>({});
  const routeLayerRef = useRef<any>(null);

  // SECUENCIA DE RUTA SOLICITADA: Norte a Sur
  // 1. Xin Yu (Jinan) -> 2. K-Home (Xinxiang) -> 3. Wellcamp (Zhaoqing) -> 
  // 4. GS Housing -> 5. C.BOX -> 6. Konbuild -> 7. CGCH
  const TRAVEL_ROUTE_SEQUENCE = [
    { id: 12, label: '1' }, // Jinan (Xinyu)
    { id: 2, label: '2' },  // Xinxiang (K-Home)
    { id: 11, label: '3' }, // Zhaoqing (Wellcamp)
    { id: 4, label: '4' },  // Foshan (GS Housing)
    { id: 5, label: '5' },  // Foshan (C.BOX)
    { id: 1, label: '6' },  // Foshan (Konbuild)
    { id: 6, label: '7' }   // Guangzhou (CGCH)
  ];

  useEffect(() => {
    if (!mapContainerRef.current || !window.L) return;

    if (!mapInstanceRef.current) {
      // --- CAPAS DE GOOGLE MAPS ---
      // Calles (Standard)
      const googleStreets = window.L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      });

      // Híbrido (Satélite + Etiquetas)
      const googleHybrid = window.L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      });

      // Initialize Map centered roughly between North and South China
      const map = window.L.map(mapContainerRef.current, {
        center: [30.0, 114.0],
        zoom: 5,
        layers: [googleStreets], // Default layer
        zoomControl: false 
      });

      // Add Layer Control (Toggle between Map and Satellite)
      const baseMaps = {
        "Google Mapa": googleStreets,
        "Google Satélite": googleHybrid
      };
      window.L.control.layers(baseMaps).addTo(map);
      
      window.L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // --- 1. Draw Markers ---
    // Clear existing markers
    Object.values(markersRef.current).forEach((marker: any) => marker.remove());
    markersRef.current = {};

    factories.forEach(factory => {
      // Determine if factory is in the active route
      const routeIndex = TRAVEL_ROUTE_SEQUENCE.findIndex(step => step.id === factory.id);
      const isInRoute = routeIndex !== -1;
      
      // Color adjustment: Red for route to stand out on Google Maps, Gray for others
      const color = isInRoute ? '#dc2626' : '#64748b'; // Red-600 vs Slate-500
      const zIndex = isInRoute ? 1000 : 500;
      const opacity = isInRoute ? 1 : 0.7;
      // Show sequence number if in route, otherwise show priority
      const labelContent = isInRoute ? (routeIndex + 1).toString() : factory.priority;

      const iconHtml = `
        <div style="
          background-color: ${color};
          width: ${isInRoute ? '32px' : '24px'};
          height: ${isInRoute ? '32px' : '24px'};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: ${isInRoute ? '16px' : '11px'};
          color: white;
          opacity: ${opacity};
        ">${labelContent}</div>
      `;

      const icon = window.L.divIcon({
        className: 'custom-marker',
        html: iconHtml,
        iconSize: isInRoute ? [32, 32] : [24, 24],
        iconAnchor: isInRoute ? [16, 16] : [12, 12]
      });

      const marker = window.L.marker(factory.coords, { icon, zIndexOffset: zIndex })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; min-width: 150px;">
            <strong style="font-size:14px; color: #1e293b; display:block; margin-bottom:4px;">${factory.name}</strong>
            <span style="color: #64748b; font-size:12px; display:block; margin-bottom:4px;">${factory.city}</span>
            <span style="color:${isInRoute ? '#dc2626' : '#94a3b8'}; font-size:11px; font-weight: 700; text-transform: uppercase;">
              ${isInRoute ? `★ Parada #${routeIndex + 1}` : 'Fuera de ruta'}
            </span>
          </div>
        `)
        .on('click', () => onSelectFactory(factory.id));
      
      markersRef.current[factory.id] = marker;
    });

    // --- 2. Draw Travel Route Polyline ---
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
    }

    // Get coordinates in sequence
    const routeCoords = TRAVEL_ROUTE_SEQUENCE.map(step => {
      const f = factories.find(fac => fac.id === step.id);
      return f ? f.coords : null;
    }).filter(c => c !== null);

    if (routeCoords.length > 1) {
      // Create the polyline
      routeLayerRef.current = window.L.polyline(routeCoords, {
        color: '#2563eb', // Blue-600
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10', 
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(map);

      // Add tooltip
      routeLayerRef.current.bindTooltip("Ruta Sugerida", { 
        sticky: true, 
        direction: 'center', 
        className: 'bg-white text-xs font-bold px-2 py-1 shadow rounded border border-blue-100' 
      });

      // Fit bounds if no selection
      if (!selectedFactoryId) {
        map.fitBounds(window.L.latLngBounds(routeCoords), { padding: [50, 50] });
      }
    }

  }, [factories, onSelectFactory]);

  // Center map when selection changes
  useEffect(() => {
    if (selectedFactoryId && mapInstanceRef.current && markersRef.current[selectedFactoryId]) {
      const marker = markersRef.current[selectedFactoryId];
      mapInstanceRef.current.setView(marker.getLatLng(), 13); // Closer zoom for Google Maps detail
      marker.openPopup();
    }
  }, [selectedFactoryId]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full rounded-lg shadow-inner bg-gray-100" style={{ minHeight: '400px', zIndex: 0 }} />
      
      {/* Legend Overlay */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur p-3 rounded-lg shadow-lg border border-gray-200 text-xs z-[400] max-w-[200px]">
        <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">Itinerario: Norte a Sur</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-blue-600 border-t border-dashed border-white/50"></div>
            <span className="text-gray-700 font-medium">Ruta Tren/Avión</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-red-600 border border-white shadow-sm flex items-center justify-center text-white font-bold text-[10px]">1</div>
            <span className="text-gray-700 font-medium">Parada Ruta (1-7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-slate-500 border border-white shadow-sm"></div>
            <span className="text-gray-500">Otras Fábricas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;