'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property, Booking } from './types';
import { database } from '@/backend/supabase/repository';

interface PropertyStore {
  properties: Property[];
  bookings: Booking[];
  addProperty: (property: Property) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  setProperties: (properties: Property[]) => void;
  setBookings: (bookings: Booking[]) => void;
  loadFromDatabase: () => Promise<void>;
}

export const usePropertyStore = create<PropertyStore>()(persist((set) => {
  // Initialize with default properties
  const defaultProperties: Property[] = [
    {
      id: '1',
      name: 'Appartement Prestige - 2 Chambres',
      location: 'Centre-ville',
      price: 1200,
      bedrooms: 2,
      bathrooms: 1.5,
      area: 75,
      description: 'Bel appartement lumineux avec vue sur la ville, moderne et entièrement équipé.',
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        'https://images.unsplash.com/photo-1551621849-3debb1f4c4a1?w=800&q=80',
      ],
      amenities: ['WiFi', 'Climatisation', 'Parking', 'Cuisine équipée', 'Balcon'],
      available: true,
      availableFrom: '2024-07-01',
      features: {
        wifi: true,
        parking: true,
        heating: true,
        airConditioning: true,
        kitchen: true,
        balcony: true,
      },
    },
    {
      id: '2',
      name: 'Studio Luxe - Vue Panoramique',
      location: 'Quartier Moderne',
      price: 800,
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      description: 'Studio haut de gamme avec vue panoramique, services hôteliers inclus.',
      images: [
        'https://images.unsplash.com/photo-1535576661393-b8be8ef1db58?w=800&q=80',
        'https://images.unsplash.com/photo-1618091479409-b138e11e79b7?w=800&q=80',
        'https://images.unsplash.com/photo-1494145904049-0dca7b3fad3d?w=800&q=80',
      ],
      amenities: ['WiFi', 'Gym', 'Concierge', 'Vue panoramique', 'Service ménage'],
      available: false,
      availableFrom: '2024-08-15',
      features: {
        wifi: true,
        parking: false,
        heating: true,
        airConditioning: true,
        kitchen: true,
        balcony: true,
      },
    },
  ];

  return {
    properties: defaultProperties,
    bookings: [],
    addProperty: (property) => {
      set((state) => ({ properties: [...state.properties, property] }));
      void database.upsertProperty(property).catch(console.error);
    },
    updateProperty: (id, updatedProperty) => {
      set((state) => ({
        properties: state.properties.map((p) =>
          p.id === id ? { ...p, ...updatedProperty } : p
        ),
      }));
      void database.updateProperty(id, updatedProperty).catch(console.error);
    },
    deleteProperty: (id) => {
      set((state) => ({
        properties: state.properties.filter((p) => p.id !== id),
      }));
      void database.deleteProperty(id).catch(console.error);
    },
    addBooking: (booking) => {
      set((state) => ({ bookings: [...state.bookings, booking] }));
      void database.upsertBooking(booking).catch(console.error);
    },
    updateBooking: (id, updatedBooking) => {
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === id ? { ...b, ...updatedBooking } : b
        ),
      }));
      void database.updateBooking(id, updatedBooking).catch(console.error);
    },
    deleteBooking: (id) => {
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
      }));
      void database.deleteBooking(id).catch(console.error);
    },
    setProperties: (properties) => set({ properties }),
    setBookings: (bookings) => set({ bookings }),
    loadFromDatabase: async () => {
      if (!database.isEnabled()) return;

      const [properties, bookings] = await Promise.all([
        database.getProperties(),
        database.getBookings(),
      ]);

      if (properties?.length) {
        set({ properties });
      }

      if (bookings) {
        set({ bookings });
      }
    },
  };
}, {
  name: 'ek-properties',
}));
