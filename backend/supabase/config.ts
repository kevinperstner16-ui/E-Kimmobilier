const DEFAULT_SUPABASE_URL = 'https://yyncgzyowuizjwjakznx.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_h2p6zLIbE_Qg0uCC_ns9Bw_b5oPLVc2';

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    DEFAULT_SUPABASE_PUBLISHABLE_KEY;

  return {
    enabled: Boolean(url && key),
    url,
    key,
  };
}

export function isSupabaseEnabled() {
  return getSupabaseConfig().enabled;
}
