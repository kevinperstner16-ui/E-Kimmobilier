import {
  AirVent,
  Bath,
  Bike,
  Cctv,
  ChefHat,
  Dumbbell,
  Flower2,
  KeyRound,
  ParkingCircle,
  PawPrint,
  Sofa,
  Sparkles,
  ThermometerSun,
  Trees,
  Tv,
  WashingMachine,
  Wifi,
} from 'lucide-react';
import { PropertyFeatures } from './types';

export type PropertyFeatureKey = keyof PropertyFeatures;

export const PROPERTY_FEATURE_OPTIONS: Array<{
  key: PropertyFeatureKey;
  label: string;
  shortLabel: string;
  colorClass: string;
  icon: typeof Wifi;
}> = [
  { key: 'wifi', label: 'WiFi haut débit', shortLabel: 'WiFi', colorClass: 'bg-blue-50 text-blue-700', icon: Wifi },
  { key: 'parking', label: 'Parking', shortLabel: 'Parking', colorClass: 'bg-purple-50 text-purple-700', icon: ParkingCircle },
  { key: 'heating', label: 'Chauffage', shortLabel: 'Chauffage', colorClass: 'bg-orange-50 text-orange-700', icon: ThermometerSun },
  { key: 'airConditioning', label: 'Climatisation', shortLabel: 'Clim', colorClass: 'bg-cyan-50 text-cyan-700', icon: AirVent },
  { key: 'kitchen', label: 'Cuisine équipée', shortLabel: 'Cuisine', colorClass: 'bg-red-50 text-red-700', icon: ChefHat },
  { key: 'balcony', label: 'Balcon', shortLabel: 'Balcon', colorClass: 'bg-green-50 text-green-700', icon: Trees },
  { key: 'terrace', label: 'Terrasse', shortLabel: 'Terrasse', colorClass: 'bg-lime-50 text-lime-700', icon: Flower2 },
  { key: 'garden', label: 'Jardin', shortLabel: 'Jardin', colorClass: 'bg-emerald-50 text-emerald-700', icon: Trees },
  { key: 'elevator', label: 'Ascenseur', shortLabel: 'Ascenseur', colorClass: 'bg-slate-50 text-slate-700', icon: KeyRound },
  { key: 'furnished', label: 'Meublé', shortLabel: 'Meublé', colorClass: 'bg-amber-50 text-amber-700', icon: Sofa },
  { key: 'washingMachine', label: 'Machine à laver', shortLabel: 'Lave-linge', colorClass: 'bg-indigo-50 text-indigo-700', icon: WashingMachine },
  { key: 'dishwasher', label: 'Lave-vaisselle', shortLabel: 'Lave-vaisselle', colorClass: 'bg-sky-50 text-sky-700', icon: Bath },
  { key: 'tv', label: 'Télévision', shortLabel: 'TV', colorClass: 'bg-zinc-50 text-zinc-700', icon: Tv },
  { key: 'pool', label: 'Piscine', shortLabel: 'Piscine', colorClass: 'bg-teal-50 text-teal-700', icon: Sparkles },
  { key: 'gym', label: 'Salle de sport', shortLabel: 'Gym', colorClass: 'bg-rose-50 text-rose-700', icon: Dumbbell },
  { key: 'security', label: 'Sécurité / caméra', shortLabel: 'Sécurité', colorClass: 'bg-stone-50 text-stone-700', icon: Cctv },
  { key: 'concierge', label: 'Conciergerie', shortLabel: 'Concierge', colorClass: 'bg-yellow-50 text-yellow-700', icon: KeyRound },
  { key: 'petsAllowed', label: 'Animaux acceptés', shortLabel: 'Animaux', colorClass: 'bg-pink-50 text-pink-700', icon: PawPrint },
  { key: 'storage', label: 'Cave / rangement', shortLabel: 'Rangement', colorClass: 'bg-gray-50 text-gray-700', icon: Bike },
];

export const DEFAULT_PROPERTY_FEATURES: PropertyFeatures = {
  wifi: true,
  parking: false,
  heating: true,
  airConditioning: true,
  kitchen: true,
  balcony: false,
  elevator: false,
  furnished: false,
  washingMachine: false,
  dishwasher: false,
  tv: false,
  terrace: false,
  garden: false,
  pool: false,
  gym: false,
  security: false,
  concierge: false,
  petsAllowed: false,
  storage: false,
};

export function getSelectedFeatureOptions(features: PropertyFeatures = {}) {
  return PROPERTY_FEATURE_OPTIONS.filter((option) => features[option.key]);
}
