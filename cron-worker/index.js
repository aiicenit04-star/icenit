/**
 * icenit-cron — Cloudflare Worker
 * Fires daily at 08:00 UTC to ping icenit.ai and keep Supabase free-tier alive.
 */
export default {
  async scheduled(_event, _env, _ctx) {
    try {
      const res = await fetch("https://icenit.ai/api/ping", {
        headers: { "User-Agent": "icenit-cron/1.0" },
      });
      const body = await res.json();
      console.log("[cron] ping result:", JSON.stringify(body));
    } catch (err) {
      console.error("[cron] ping failed:", err);
    }
  },
};
