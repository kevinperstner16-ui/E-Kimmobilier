'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/types';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Check,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getSelectedFeatureOptions } from '@/lib/property-options';
import { getAvailabilityShortLabel } from '@/lib/availability';
import { FALLBACK_PROPERTY_IMAGE, getPropertyImage } from '@/lib/images';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const selectedFeatures = getSelectedFeatureOptions(property.features);
  const previewFeatures = selectedFeatures.slice(0, 5);
  const remainingFeaturesCount = selectedFeatures.length - previewFeatures.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Gallery */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <Image
          src={getPropertyImage(property.images)}
          alt={property.name}
          width={500}
          height={300}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
          }}
        />
        <div className="absolute top-4 right-4">
          <div
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              property.available
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {property.available ? (
              <div className="flex items-center gap-1">
                <Check size={16} />
                {getAvailabilityShortLabel(property)}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Clock size={16} />
                {getAvailabilityShortLabel(property)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.name}</h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin size={18} className="text-secondary" />
          <span>{property.location}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-secondary">
            {property.price}€
            <span className="text-lg text-gray-600 font-normal">/mois</span>
          </div>
          {!property.available && (
            <p className="mt-1 text-sm font-semibold text-red-600">
              {getAvailabilityShortLabel(property)}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Bed size={20} className="text-primary mb-1" />
            <span className="text-sm font-semibold text-gray-800">
              {property.bedrooms}
            </span>
            <span className="text-xs text-gray-600">Chambres</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Bath size={20} className="text-primary mb-1" />
            <span className="text-sm font-semibold text-gray-800">
              {property.bathrooms}
            </span>
            <span className="text-xs text-gray-600">Salles d&apos;eau</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <Maximize2 size={20} className="text-primary mb-1" />
            <span className="text-sm font-semibold text-gray-800">
              {property.area}m²
            </span>
            <span className="text-xs text-gray-600">Surface</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Équipements
          </h4>
          <div className="flex flex-wrap gap-2">
            {previewFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.key}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${feature.colorClass}`}
                >
                  <Icon size={14} />
                  <span>{feature.shortLabel}</span>
                </div>
              );
            })}
            {remainingFeaturesCount > 0 && (
              <div className="flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                +{remainingFeaturesCount}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/property?id=${encodeURIComponent(property.id)}`}
          className="w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 block text-center"
        >
          Voir les détails
        </Link>
      </div>
    </motion.div>
  );
}
