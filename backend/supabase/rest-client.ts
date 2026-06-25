import { getSupabaseConfig } from './config';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  query?: string;
  body?: unknown;
  prefer?: string;
};

export async function supabaseRest<T>(table: string, options: RequestOptions = {}): Promise<T> {
  const config = getSupabaseConfig();

  if (!config.enabled || !config.url || !config.key) {
    throw new Error('Supabase is not configured');
  }

  const endpoint = `${config.url.replace(/\/$/, '')}/rest/v1/${table}${options.query || ''}`;
  const response = await fetch(endpoint, {
    method: options.method || 'GET',
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Supabase ${response.status}: ${message}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
