'use client';

import { usePropertyStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Check,
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { getSelectedFeatureOptions } from '@/lib/property-options';

interface PropertyDetailClientProps {
  id: string;
}

export default function PropertyDetailClient({ id }: PropertyDetailClientProps) {
  const properties = usePropertyStore((state) => state.properties);
  const property = properties.find((p) => p.id === id);
  const selectedFeatures = property ? getSelectedFeatureOptions(property.features) : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (!property) {
    return (
      <>
        <Header />
        <main className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Propriété non trouvée
            </h1>
            <Link href="/properties" className="text-secondary hover:underline">
              Retour aux propriétés
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Merci ! Votre demande a été envoyée.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setShowContactForm(false);
  };

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-secondary">
            Accueil
          </Link>
          {' / '}
          <Link href="/properties" className="hover:text-secondary">
            Propriétés
          </Link>
          {' / '}
          <span className="text-primary font-semibold">{property.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={`${property.name} - Image ${currentImageIndex + 1}`}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 text-primary p-2 rounded-full transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 text-primary p-2 rounded-full transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {property.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold text-primary mb-4">{property.name}</h1>

              <div className="flex items-center gap-2 text-gray-600 mb-6 text-lg">
                <MapPin size={24} className="text-secondary" />
                <span>{property.location}</span>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-bold text-secondary mb-2">
                  {property.price}€<span className="text-lg text-gray-600 font-normal">/mois</span>
                </p>
                {!property.available && property.availableFrom && (
                  <p className="text-sm text-orange-600">
                    Disponible à partir du {new Date(property.availableFrom).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="mb-6">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                    property.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {property.available ? (
                    <>
                      <Check size={20} />
                      Disponible maintenant
                    </>
                  ) : (
                    <>
                      <Clock size={20} />
                      Actuellement réservé
                    </>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-6 rounded-lg">
                <div className="text-center">
                  <Bed size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">{property.bedrooms}</p>
                  <p className="text-xs text-gray-600">Chambres</p>
                </div>
                <div className="text-center">
                  <Bath size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">{property.bathrooms}</p>
                  <p className="text-xs text-gray-600">Salles d&apos;eau</p>
                </div>
                <div className="text-center">
                  <Maximize2 size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-800">{property.area}m²</p>
                  <p className="text-xs text-gray-600">Surface</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">À propos</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">Équipements</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedFeatures.length ? (
                    selectedFeatures.map((feature) => {
                      const Icon = feature.icon;

                      return (
                        <div
                          key={feature.key}
                          className={`flex items-center gap-3 p-3 rounded-lg ${feature.colorClass}`}
                        >
                          <Icon size={24} />
                          <span className="font-semibold">{feature.label}</span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-600">Aucun équipement renseigné.</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 bg-white rounded-lg shadow-lg p-8 border-2 border-secondary border-opacity-20">
              <h3 className="text-2xl font-bold text-primary mb-6">Intéressé ?</h3>

              {!showContactForm ? (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Demander une visite
                </button>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre numéro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Votre message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Envoyer
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="w-full border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Annuler
                  </button>
                </form>
              )}

              <div className="mt-8 pt-8 border-t">
                <h4 className="font-bold text-primary mb-4">Informations supplémentaires</h4>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    <strong>Référence :</strong> {property.id}
                  </p>
                  <p>
                    <strong>Type :</strong> Appartement {property.bedrooms} chambre(s)
                  </p>
                  <p>
                    <strong>Surface :</strong> {property.area} m²
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Properties */}
        <section className="mt-20 pt-12 border-t">
          <h2 className="text-3xl font-bold text-primary mb-8">Autres propriétés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {properties
              .filter((p) => p.id !== property.id)
              .map((relatedProperty) => (
                <Link
                  key={relatedProperty.id}
                  href={`/property?id=${encodeURIComponent(relatedProperty.id)}`}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={relatedProperty.images[0]}
                        alt={relatedProperty.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-primary group-hover:text-secondary transition-colors">
                        {relatedProperty.name}
                      </h3>
                      <p className="text-secondary font-bold mt-2">
                        {relatedProperty.price}€/mois
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
