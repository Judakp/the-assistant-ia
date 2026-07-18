import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasSupabaseConfig = Boolean(
  supabaseUrl && supabaseAnonKey
);

if (!hasSupabaseConfig) {
  console.warn(
    'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable lesson creation.',
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://supabase.localhost',
  supabaseAnonKey || 'missing-supabase-anon-key',
);
