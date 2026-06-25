import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyList from '@/components/PropertyList';

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-primary to-gray-800 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Nos Propriétés</h1>
            <p className="text-gray-200 text-lg">
              Découvrez l'intégralité de notre catalogue d'appartements disponibles
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto">
          <PropertyList />
        </section>
      </main>
      <Footer />
    </>
  );
}
