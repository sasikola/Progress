import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import { createAuthStorage } from '@/lib/supabase-auth-storage';
import type { Database } from '@/types/database';

function readPublicSupabaseConfig(): { url: string; anonKey: string } {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY. Copy .env.example to .env.',
    );
  }

  if (anonKey.includes('service_role')) {
    throw new Error(
      'The Supabase service-role key must never be used in the Expo client.',
    );
  }

  return { url, anonKey };
}

const { url, anonKey } = readPublicSupabaseConfig();

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    storage: createAuthStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});
