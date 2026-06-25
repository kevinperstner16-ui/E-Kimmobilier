'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyList from '@/components/PropertyList';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Clock, Users } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-gray-800 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">E&K</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Trouvez votre <span className="text-secondary">Chez-vous</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Découvrez nos appartements d&apos;exception avec un service professionnel et une
                disponibilité en temps réel. E&K Immobilier, votre partenaire de confiance.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-opacity-90 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 text-lg"
              >
                Voir nos propriétés <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              Pourquoi choisir E&K Immobilier ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Propriétés Premium',
                  description: 'Sélection rigoureuse de propriétés haut de gamme',
                },
                {
                  icon: Clock,
                  title: 'Disponibilité en Temps Réel',
                  description: 'Consultez la disponibilité instantanée de nos appartements',
                },
                {
                  icon: Users,
                  title: 'Service Professionnel',
                  description: 'Une équipe dévouée pour répondre à vos besoins',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon size={32} className="text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Properties Preview Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-4">Nos Propriétés</h2>
          <p className="text-gray-600 mb-12 text-lg">
            Explorez notre sélection exclusive d&apos;appartements disponibles
          </p>
          <PropertyList />
          <div className="mt-12 text-center">
            <Link
              href="/properties"
              className="inline-block bg-secondary hover:bg-opacity-90 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300"
            >
              Voir toutes les propriétés
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-secondary to-accent text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Prêt à trouver votre prochain chez-vous ?</h2>
            <p className="text-lg mb-8 opacity-95">
              Contactez-nous dès aujourd&apos;hui pour plus d&apos;informations ou pour visiter l&apos;une de
              nos propriétés.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-secondary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300"
            >
              Nous Contacter
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
