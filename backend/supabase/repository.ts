import { Booking, Property } from '@/lib/types';
import { isSupabaseEnabled } from './config';
import {
  BookingRow,
  PropertyRow,
  bookingFromRow,
  bookingToRow,
  propertyFromRow,
  propertyToRow,
} from './mappers';
import { supabaseRest } from './rest-client';

function eq(column: string, value: string) {
  return `${column}=eq.${encodeURIComponent(value)}`;
}

export const database = {
  isEnabled: isSupabaseEnabled,

  async getProperties() {
    if (!isSupabaseEnabled()) return null;
    const rows = await supabaseRest<PropertyRow[]>('properties', {
      query: '?select=*&order=created_at.asc',
    });
    return rows.map(propertyFromRow);
  },

  async upsertProperty(property: Property) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<PropertyRow[]>('properties', {
      method: 'POST',
      query: '?on_conflict=id',
      body: propertyToRow(property),
      prefer: 'resolution=merge-duplicates,return=representation',
    });
  },

  async updateProperty(id: string, property: Partial<Property>) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<PropertyRow[]>('properties', {
      method: 'PATCH',
      query: `?${eq('id', id)}`,
      body: propertyToRow(property),
    });
  },

  async deleteProperty(id: string) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<void>('properties', {
      method: 'DELETE',
      query: `?${eq('id', id)}`,
      prefer: 'return=minimal',
    });
  },

  async getBookings() {
    if (!isSupabaseEnabled()) return null;
    const rows = await supabaseRest<BookingRow[]>('bookings', {
      query: '?select=*&order=created_at.desc',
    });
    return rows.map(bookingFromRow);
  },

  async upsertBooking(booking: Booking) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<BookingRow[]>('bookings', {
      method: 'POST',
      query: '?on_conflict=id',
      body: bookingToRow(booking),
      prefer: 'resolution=merge-duplicates,return=representation',
    });
  },

  async updateBooking(id: string, booking: Partial<Booking>) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<BookingRow[]>('bookings', {
      method: 'PATCH',
      query: `?${eq('id', id)}`,
      body: bookingToRow(booking),
    });
  },

  async deleteBooking(id: string) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<void>('bookings', {
      method: 'DELETE',
      query: `?${eq('id', id)}`,
      prefer: 'return=minimal',
    });
  },
};
