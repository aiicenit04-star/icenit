import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase admin client — uses HTTP fetch(), fully Edge Runtime compatible.
// The sb_publishable_* key maps to the PostgreSQL anon role via PostgREST.
// Tables have RLS disabled and full GRANT to anon role.
// Security is provided by the admin session cookie check in each API route.
export function getSupabaseAdmin(): SupabaseClient {
  const url =
    process.env.SUPABASE_URL ?? "https://qksigxubxkecqffdcgcu.supabase.co";
  // Prefer secret key from env vars; fall back to publishable (anon) key.
  // The publishable key is safe to include in source — it is designed to be public.
  const key =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    "sb_publishable_0hf41d14bVkcmpI8brc5og_jCWm-d5Z";

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
