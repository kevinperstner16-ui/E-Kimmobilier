'use client';

import { usePropertyStore } from '@/lib/store';
import PropertyCard from './PropertyCard';

export default function PropertyList() {
  const properties = usePropertyStore((state) => state.properties);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
