'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePropertyStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/auth-store';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Home,
  Calendar,
  Users,
} from 'lucide-react';
import { Property } from '@/lib/types';
import {
  DEFAULT_PROPERTY_FEATURES,
  PROPERTY_FEATURE_OPTIONS,
  getSelectedFeatureOptions,
} from '@/lib/property-options';
import { getAvailabilityLabel } from '@/lib/availability';

export default function AdminPage() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);
  const [authChecked, setAuthChecked] = useState(false);
  const {
    properties,
    bookings,
    addProperty,
    updateProperty,
    deleteProperty,
    deleteBooking,
  } = usePropertyStore();

  const [activeTab, setActiveTab] = useState<'properties' | 'bookings'>('properties');
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Property>>({
    name: '',
    location: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    description: '',
    images: [],
    amenities: [],
    available: true,
    availableFrom: '',
    features: DEFAULT_PROPERTY_FEATURES,
  });

  useEffect(() => {
    setAuthChecked(true);
    if (!currentUser || currentUser.role !== 'admin') {
      router.replace('/login?redirect=/admin');
    }
  }, [currentUser, router]);

  const resetPropertyForm = () => {
    setFormData({
      name: '',
      location: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      description: '',
      images: [],
      amenities: [],
      available: true,
      availableFrom: '',
      features: DEFAULT_PROPERTY_FEATURES,
    });
    setEditingProperty(null);
    setShowAddPropertyForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'number' ? parseFloat(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedFormData = {
      ...formData,
      availableFrom: formData.available ? undefined : formData.availableFrom || undefined,
    };

    if (editingProperty) {
      updateProperty(editingProperty, normalizedFormData);
      resetPropertyForm();
      return;
    }

    const newProperty: Property = {
      id: Date.now().toString(),
      name: formData.name || '',
      location: formData.location || '',
      price: formData.price || 0,
      bedrooms: formData.bedrooms || 0,
      bathrooms: formData.bathrooms || 0,
      area: formData.area || 0,
      description: formData.description || '',
      images: formData.images?.length
        ? formData.images
        : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'],
      amenities: formData.amenities || [],
      available: formData.available ?? true,
      availableFrom: formData.available ? undefined : formData.availableFrom || undefined,
      features: { ...DEFAULT_PROPERTY_FEATURES, ...formData.features },
    };
    addProperty(newProperty);
    resetPropertyForm();
  };

  const startEditingProperty = (property: Property) => {
    setEditingProperty(property.id);
    setFormData({
      ...property,
      images: [...property.images],
      amenities: [...property.amenities],
      availableFrom: property.availableFrom || '',
      features: { ...DEFAULT_PROPERTY_FEATURES, ...property.features },
    });
    setShowAddPropertyForm(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleFeatureChange = (key: keyof Property['features'], checked: boolean) => {
    setFormData({
      ...formData,
      features: {
        ...DEFAULT_PROPERTY_FEATURES,
        ...formData.features,
        [key]: checked,
      },
    });
  };

  if (!authChecked || currentUser?.role !== 'admin') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="font-semibold text-primary">Vérification de l’accès administrateur…</p>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Tableau de Bord Admin</h1>
          <p className="text-gray-600">Gérez vos propriétés et vos réservations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-secondary"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center">
                <Home size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Propriétés</p>
                <p className="text-3xl font-bold text-primary">{properties.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent bg-opacity-10 rounded-full flex items-center justify-center">
                <Calendar size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Réservations</p>
                <p className="text-3xl font-bold text-primary">{bookings.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Disponibles</p>
                <p className="text-3xl font-bold text-primary">
                  {properties.filter((p) => p.available).length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'properties'
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Propriétés
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === 'bookings'
                ? 'text-secondary border-b-2 border-secondary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Réservations
          </button>
        </div>

        {/* Properties Section */}
        {activeTab === 'properties' && (
          <div>
            <div className="mb-6">
              <button
                onClick={() => {
                  if (showAddPropertyForm) {
                    resetPropertyForm();
                  } else {
                    setEditingProperty(null);
                    setShowAddPropertyForm(true);
                  }
                }}
                className="bg-secondary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
              >
                <Plus size={20} />
                Ajouter une propriété
              </button>
            </div>

            {/* Add Property Form */}
            {showAddPropertyForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-lg shadow-md mb-8"
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  {editingProperty ? 'Modifier la propriété' : 'Nouvelle propriété'}
                </h3>
                <form onSubmit={handlePropertySubmit} className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom de la propriété"
                    value={formData.name || ''}
                    onChange={handleFormChange}
                    required
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="text"
                    name="location"
                    placeholder="Localisation"
                    value={formData.location || ''}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Prix (€/mois)"
                    value={formData.price || ''}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="number"
                    name="bedrooms"
                    placeholder="Chambres"
                    value={formData.bedrooms || ''}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="Salles d'eau"
                    value={formData.bathrooms || ''}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <input
                    type="number"
                    name="area"
                    placeholder="Surface (m²)"
                    value={formData.area || ''}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description || ''}
                    onChange={handleFormChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    rows={3}
                  />
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="URL de l’image principale"
                    value={formData.images?.[0] || ''}
                    onChange={(event) =>
                      setFormData({ ...formData, images: event.target.value ? [event.target.value] : [] })
                    }
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <label className="flex items-center gap-2 col-span-2">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available || false}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          available: event.target.checked,
                          availableFrom: event.target.checked ? '' : formData.availableFrom || '',
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span>Disponible</span>
                  </label>
                  {!formData.available && (
                    <div className="col-span-2 rounded-lg border border-orange-200 bg-orange-50 p-4">
                      <h4 className="mb-3 font-bold text-primary">Fin de réservation</h4>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <label className="block">
                          <span className="mb-1 block text-sm font-semibold text-gray-700">
                            Disponible à partir du
                          </span>
                          <input
                            type="date"
                            name="availableFrom"
                            value={formData.availableFrom || ''}
                            onChange={handleFormChange}
                            disabled={!formData.availableFrom}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-100 disabled:text-gray-400"
                          />
                        </label>
                        <label className="flex items-center gap-2 rounded-lg bg-white p-3">
                          <input
                            type="checkbox"
                            checked={!formData.availableFrom}
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                availableFrom: event.target.checked
                                  ? ''
                                  : new Date().toISOString().slice(0, 10),
                              })
                            }
                            className="h-4 w-4"
                          />
                          <span className="text-sm font-semibold text-gray-800">
                            Pas de date définie
                          </span>
                        </label>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Si tu coches “pas de date définie”, l’annonce affichera juste que le bien est réservé.
                      </p>
                    </div>
                  )}
                  <div className="col-span-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-3">
                      <h4 className="font-bold text-primary">Options / équipements</h4>
                      <p className="text-sm text-gray-600">
                        Coche tout ce que tu veux afficher sur l&apos;annonce.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {PROPERTY_FEATURE_OPTIONS.map((option) => {
                        const Icon = option.icon;

                        return (
                          <label
                            key={option.key}
                            className="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-3 shadow-sm hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              checked={Boolean(formData.features?.[option.key])}
                              onChange={(event) => handleFeatureChange(option.key, event.target.checked)}
                              className="h-4 w-4"
                            />
                            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${option.colorClass}`}>
                              <Icon size={18} />
                            </span>
                            <span className="text-sm font-semibold text-gray-800">{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-span-2 flex gap-3">
                    <button type="submit" className="flex-1 bg-secondary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all">
                      {editingProperty ? 'Enregistrer les modifications' : 'Créer la propriété'}
                    </button>
                    <button type="button" onClick={resetPropertyForm} className="rounded-lg border border-gray-300 px-5 py-2 font-bold text-gray-700 hover:bg-gray-50">
                      Annuler
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Properties List */}
            <div className="space-y-4">
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <div
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() =>
                      setExpandedProperty(expandedProperty === property.id ? null : property.id)
                    }
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary">{property.name}</h3>
                      <p className="text-gray-600">
                        {property.bedrooms} chambre(s) • {property.area}m² • {property.price}€/mois
                      </p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          property.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {getAvailabilityLabel(property)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingProperty(property);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProperty(property.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedProperty(expandedProperty === property.id ? null : property.id);
                        }}
                        className="p-2 text-gray-600"
                      >
                        {expandedProperty === property.id ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                  </div>

                  {expandedProperty === property.id && (
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-gray-700 mb-4">{property.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Localisation</p>
                          <p className="text-primary">{property.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Disponibilité</p>
                          <p className="text-primary">{getAvailabilityLabel(property)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-600">Équipements</p>
                          <div className="flex gap-2 flex-wrap">
                            {getSelectedFeatureOptions(property.features).map((feature) => (
                              <span
                                key={feature.key}
                                className={`text-xs px-2 py-1 rounded ${feature.colorClass}`}
                              >
                                {feature.shortLabel}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Section */}
        {activeTab === 'bookings' && (
          <div>
            {bookings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">Aucune réservation pour le moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary">{booking.name}</h3>
                        <p className="text-gray-600">{booking.email}</p>
                        <p className="text-gray-600">{booking.phone}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {booking.checkInDate} → {booking.checkOutDate}
                        </p>
                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
