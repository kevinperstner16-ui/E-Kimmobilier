'use client';

import { usePropertyStore } from '@/lib/store';
import { useAuthStore } from '@/lib/auth-store';
import { useEffect } from 'react';

export default function DatabaseSync() {
  const loadPropertiesFromDatabase = usePropertyStore((state) => state.loadFromDatabase);
  const loadAuthFromDatabase = useAuthStore((state) => state.loadFromDatabase);

  useEffect(() => {
    const sync = () => {
      void Promise.all([
        loadPropertiesFromDatabase(),
        loadAuthFromDatabase(),
      ]).catch(console.error);
    };

    sync();
    const intervalId = window.setInterval(sync, 15000);

    return () => window.clearInterval(intervalId);
  }, [loadPropertiesFromDatabase, loadAuthFromDatabase]);

  return null;
}
