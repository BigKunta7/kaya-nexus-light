/**
 * Utilitaire Supabase côté client (singleton)
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Variables Supabase manquantes côté client.');
    }

    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabase;
}
