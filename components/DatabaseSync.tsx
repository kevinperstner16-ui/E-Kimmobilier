'use client';

import { usePropertyStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { useEffect } from 'react';

export default function DatabaseSync() {
  const loadPropertiesFromDatabase = usePropertyStore((state) => state.loadFromDatabase);
  const loadAuthFromDatabase = useAuthStore((state) => state.loadFromDatabase);

  useEffect(() => {
    void Promise.all([
      loadPropertiesFromDatabase(),
      loadAuthFromDatabase(),
    ]).catch(console.error);
  }, [loadPropertiesFromDatabase, loadAuthFromDatabase]);

  return null;
}
