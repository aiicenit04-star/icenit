import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["cloudflare:sockets"],
  turbopack: {
    resolveAlias: {
      postgres: "./src/db/postgres-edge-wrapper.js",
    },
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
