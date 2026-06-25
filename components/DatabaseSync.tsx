'use client';

import { usePropertyStore } from '@/lib/store';
import { useEffect } from 'react';

export default function DatabaseSync() {
  const loadFromDatabase = usePropertyStore((state) => state.loadFromDatabase);

  useEffect(() => {
    void loadFromDatabase().catch(console.error);
  }, [loadFromDatabase]);

  return null;
}
