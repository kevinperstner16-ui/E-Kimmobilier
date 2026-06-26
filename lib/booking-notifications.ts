import type { Booking, Property } from './types';
import { formatBookingReference } from './bookings';

const BOOKING_NOTIFICATION_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_BOOKING_NOTIFICATION_WEBHOOK_URL || '';

type BookingNotificationPayload = {
  booking: Booking;
  property?: Property;
  reference: string;
  createdAt: string;
};

export async function sendBookingNotification(booking: Booking, property?: Property) {
  if (!BOOKING_NOTIFICATION_WEBHOOK_URL) return;

  const payload: BookingNotificationPayload = {
    booking,
    property,
    reference: formatBookingReference(booking.id),
    createdAt: new Date().toISOString(),
  };

  await fetch(BOOKING_NOTIFICATION_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
