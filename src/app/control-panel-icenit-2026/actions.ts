"use server";

// DB mutations have been moved to API Routes (/api/admin/*) which run on Node.js runtime,
// avoiding Cloudflare Workers' subrequest limit that caused the panel to fail.
// This file is kept for future server-side utilities if needed.
