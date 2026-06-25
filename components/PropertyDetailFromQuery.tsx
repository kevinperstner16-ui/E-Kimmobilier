'use client';

import { useSearchParams } from 'next/navigation';
import PropertyDetailClient from '@/components/PropertyDetailClient';

export default function PropertyDetailFromQuery() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  return <PropertyDetailClient id={id} />;
}
