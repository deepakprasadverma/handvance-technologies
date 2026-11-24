import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser / Public Client
 * Utilizes public anonymous key. Safe for browser usage.
 * Subject to Supabase Row Level Security (RLS) policies.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Server-Side Admin Client
 * Utilizes the private SUPABASE_SERVICE_ROLE_KEY.
 * ⚠️ NEVER expose this client or its key to client-side code.
 * Bypasses RLS for administrative background jobs, migrations, and secure storage uploads.
 */
export function getSupabaseAdminClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error(
      "SECURITY VIOLATION: getSupabaseAdminClient() can only be called from server-side environments."
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Supabase server configuration missing: Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in environment variables."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
