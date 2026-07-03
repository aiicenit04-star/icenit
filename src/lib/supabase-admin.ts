import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://qksigxubxkecqffdcgcu.supabase.co";
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? "";

// Admin client uses the secret key — bypasses RLS, only use in server-side API routes.
// Uses HTTP fetch() under the hood — fully compatible with Cloudflare Workers Edge Runtime.
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});
