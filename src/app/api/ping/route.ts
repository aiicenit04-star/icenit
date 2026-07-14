import { NextResponse } from "next/server";

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qksigxubxkecqffdcgcu.supabase.co";
const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_0hf41d14bVkcmpI8brc5og_jCWm-d5Z";

export const dynamic = "force-dynamic";

/**
 * GET /api/ping
 * Lightweight Supabase health check.
 * Called daily by the Cloudflare cron worker to prevent Supabase free-tier pausing.
 */
export async function GET() {
  try {
    const res = await fetch(
      `${SUPA_URL}/rest/v1/site_settings?select=key&limit=1`,
      {
        headers: {
          apikey: SUPA_KEY,
          Authorization: `Bearer ${SUPA_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, status: res.status, ts: new Date().toISOString() },
        { status: 200 } // always 200 so cron doesn't alarm
      );
    }

    return NextResponse.json({
      ok: true,
      supabase: "alive",
      ts: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err), ts: new Date().toISOString() },
      { status: 200 }
    );
  }
}
