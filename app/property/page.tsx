import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyDetailFromQuery from '@/components/PropertyDetailFromQuery';

export default function PropertyPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600">Chargement de l&apos;annonce...</p>
          </main>
          <Footer />
        </>
      }
    >
      <PropertyDetailFromQuery />
    </Suspense>
  );
}
