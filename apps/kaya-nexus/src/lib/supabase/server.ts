/**
 * Utilitaire Supabase côté serveur (singleton)
 */
import { createClient as createClientOrig, SupabaseClient } from '@supabase/supabase-js';

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
  if (!supabaseAdmin) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Variables Supabase manquantes côté serveur.');
    }

    supabaseAdmin = createClientOrig(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        // Pour utiliser les fonctions admin
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseAdmin;
}

export function createClient() {
  if (!supabaseAdmin) {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase URL ou Service Role Key manquant');
    }
    supabaseAdmin = createClientOrig(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }
  return supabaseAdmin;
}
