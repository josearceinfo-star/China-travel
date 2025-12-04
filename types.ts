export enum Region {
  Guangdong = "Guangdong (Sur)",
  Jiangsu = "Jiangsu (Este)",
  Henan = "Henan (Centro)",
  Shandong = "Shandong (Norte)"
}

export interface Factory {
  id: number;
  name: string;
  region: Region;
  city: string;
  fullAddress: string;
  coords: [number, number]; // Lat, Lng
  contact?: string;
  accommodation: string[];
  notes: string;
  priority: number; // 1-10, where 1 is highest priority
  distanceInfo: string;
  website?: string;
  type: 'Factory' | 'Office';
  imageUrl?: string;
}

export interface RouteStep {
  day: number;
  city: string;
  activity: string;
  factoriesToVisit: number[]; // Factory IDs
  // Nuevos campos para el itinerario detallado
  travelMode?: 'Train' | 'Plane' | 'Car' | 'None';
  travelDetails?: string; // Ej: "Tren G123 - 4h 30m"
  accommodationTarget?: string; // Ej: "Dormir en Xinxiang"
  dailyTip?: string; // Consejo práctico
}

export interface TravelRoute {
  id: string;
  name: string;
  duration: string;
  description: string;
  totalDistance?: string;
  steps: RouteStep[];
}
