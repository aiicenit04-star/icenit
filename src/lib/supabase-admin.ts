import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy initialization — createClient is NOT called at module level.
// During Cloudflare Pages build, env vars are undefined; this factory
// is only called at request time when env vars are available.
export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? "https://qksigxubxkecqffdcgcu.supabase.co";
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!key) {
    throw new Error("SUPABASE_SECRET_KEY env var is not set");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
