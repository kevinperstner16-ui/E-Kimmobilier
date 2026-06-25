import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingTrackingClient from '@/components/BookingTrackingClient';

export default function TrackingPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main className="flex min-h-screen items-center justify-center">
            <p className="text-gray-600">Chargement du suivi...</p>
          </main>
          <Footer />
        </>
      }
    >
      <BookingTrackingClient />
    </Suspense>
  );
}
