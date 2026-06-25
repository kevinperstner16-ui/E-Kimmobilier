import { Booking } from './types';

export function getBookingStatusLabel(status: Booking['status']) {
  if (status === 'confirmed') return 'Confirmée';
  if (status === 'cancelled') return 'Annulée';
  return 'En attente';
}

export function getBookingStatusDescription(status: Booking['status']) {
  if (status === 'confirmed') {
    return 'Bonne nouvelle : votre demande a été confirmée. E&K Immobilier vous contactera pour finaliser les détails.';
  }

  if (status === 'cancelled') {
    return 'Votre demande a été annulée. Vous pouvez refaire une demande ou contacter E&K Immobilier.';
  }

  return 'Votre demande est bien reçue et en cours de traitement.';
}

export function getBookingStatusClass(status: Booking['status']) {
  if (status === 'confirmed') return 'bg-green-100 text-green-800';
  if (status === 'cancelled') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
}

export function formatBookingReference(id: string) {
  return `EK-${id.slice(-6).toUpperCase()}`;
}
