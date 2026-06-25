'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatFrenchDate } from '@/lib/availability';
import {
  formatBookingReference,
  getBookingStatusClass,
  getBookingStatusDescription,
  getBookingStatusLabel,
} from '@/lib/bookings';
import { usePropertyStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export default function BookingTrackingClient() {
  const searchParams = useSearchParams();
  const bookings = usePropertyStore((state) => state.bookings);
  const properties = usePropertyStore((state) => state.properties);
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [reference, setReference] = useState(searchParams.get('ref') || '');
  const [hasSearched, setHasSearched] = useState(Boolean(searchParams.get('email') || searchParams.get('ref')));

  const filteredBookings = useMemo(() => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedReference = reference.trim().toLowerCase().replace(/^ek-/, '');

    return bookings.filter((booking) => {
      const matchesEmail = normalizedEmail
        ? booking.email.toLowerCase() === normalizedEmail
        : true;
      const matchesReference = normalizedReference
        ? booking.id.toLowerCase().endsWith(normalizedReference) ||
          booking.id.toLowerCase() === normalizedReference
        : true;

      return matchesEmail && matchesReference;
    });
  }, [bookings, email, reference]);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-primary">Suivi de demande</h1>
          <p className="text-gray-600">
            Entrez votre email ou votre référence pour voir l’évolution de votre demande.
          </p>
        </div>

        <section className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label>
              <span className="mb-1 block text-sm font-semibold text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="votre@email.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </label>
            <label>
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                Référence
              </span>
              <input
                type="text"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                placeholder="EK-123456"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </label>
          </div>
          <button
            onClick={() => setHasSearched(true)}
            className="mt-4 rounded-lg bg-secondary px-6 py-2 font-bold text-white hover:bg-opacity-90"
          >
            Voir le statut
          </button>
        </section>

        {hasSearched && filteredBookings.length === 0 && (
          <div className="rounded-lg bg-gray-50 p-8 text-center text-gray-600">
            Aucune demande trouvée sur cet appareil avec ces informations.
          </div>
        )}

        <div className="space-y-4">
          {hasSearched &&
            filteredBookings.map((booking) => {
              const property = properties.find((item) => item.id === booking.propertyId);

              return (
                <article key={booking.id} className="rounded-lg bg-white p-6 shadow-md">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-secondary">
                        Référence : {formatBookingReference(booking.id)}
                      </p>
                      <h2 className="text-2xl font-bold text-primary">
                        {property?.name || `Annonce #${booking.propertyId}`}
                      </h2>
                      <p className="text-gray-600">
                        Date souhaitée : {formatFrenchDate(booking.checkInDate)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${getBookingStatusClass(
                        booking.status
                      )}`}
                    >
                      {getBookingStatusLabel(booking.status)}
                    </span>
                  </div>
                  <p className="rounded-lg bg-gray-50 p-4 text-gray-700">
                    {getBookingStatusDescription(booking.status)}
                  </p>
                </article>
              );
            })}
        </div>

        <p className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          Note : sur cette version GitHub Pages, le suivi est local à l’appareil/navigateur utilisé.
          Pour un suivi partagé partout, il faudra connecter une vraie base de données.
        </p>
      </main>
      <Footer />
    </>
  );
}
