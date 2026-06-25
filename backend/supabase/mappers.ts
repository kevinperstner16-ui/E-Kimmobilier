import { Booking, Property } from '@/lib/types';

export type PropertyRow = {
  id: string;
  name: string;
  location: string | null;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  description: string | null;
  images: string[] | null;
  amenities: string[] | null;
  available: boolean;
  available_from: string | null;
  features: Property['features'] | null;
};

export type BookingRow = {
  id: string;
  property_id: string;
  name: string;
  email: string;
  phone: string | null;
  check_in_date: string;
  check_out_date: string;
  message: string | null;
  status: Booking['status'];
  created_at: string;
};

export function propertyFromRow(row: PropertyRow): Property {
  return {
    id: row.id,
    name: row.name,
    location: row.location || '',
    price: Number(row.price || 0),
    bedrooms: Number(row.bedrooms || 0),
    bathrooms: Number(row.bathrooms || 0),
    area: Number(row.area || 0),
    description: row.description || '',
    images: row.images || [],
    amenities: row.amenities || [],
    available: row.available,
    availableFrom: row.available_from || undefined,
    features: row.features || {},
  };
}

export function propertyToRow(property: Property | Partial<Property>) {
  return {
    id: property.id,
    name: property.name,
    location: property.location,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    description: property.description,
    images: property.images,
    amenities: property.amenities,
    available: property.available,
    available_from: property.availableFrom || null,
    features: property.features,
  };
}

export function bookingFromRow(row: BookingRow): Booking {
  return {
    id: row.id,
    propertyId: row.property_id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    checkInDate: row.check_in_date,
    checkOutDate: row.check_out_date,
    message: row.message || '',
    status: row.status,
    createdAt: row.created_at,
  };
}

export function bookingToRow(booking: Booking | Partial<Booking>) {
  return {
    id: booking.id,
    property_id: booking.propertyId,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    check_in_date: booking.checkInDate,
    check_out_date: booking.checkOutDate,
    message: booking.message,
    status: booking.status,
    created_at: booking.createdAt,
  };
}
