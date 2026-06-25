import { Property } from './types';

export function formatFrenchDate(dateValue?: string) {
  if (!dateValue) return '';

  const [year, month, day] = dateValue.split('-').map(Number);
  if (!year || !month || !day) return dateValue;

  return new Date(year, month - 1, day).toLocaleDateString('fr-FR');
}

export function getAvailabilityLabel(property: Pick<Property, 'available' | 'availableFrom'>) {
  if (property.available) {
    return 'Disponible maintenant';
  }

  if (property.availableFrom) {
    return `Réservé jusqu’au ${formatFrenchDate(property.availableFrom)}`;
  }

  return 'Réservé — date non définie';
}

export function getAvailabilityShortLabel(property: Pick<Property, 'available' | 'availableFrom'>) {
  if (property.available) {
    return 'Disponible';
  }

  if (property.availableFrom) {
    return `Réservé jusqu’au ${formatFrenchDate(property.availableFrom)}`;
  }

  return 'Réservé';
}
