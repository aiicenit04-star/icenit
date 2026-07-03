import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

import { cache } from "react";

type DrizzleDBType = ReturnType<typeof drizzle<typeof schema>>;

// Use React's cache to scope the database client connection to the current request lifecycle.
// This prevents reusing stale/closed TCP connections across requests in frozen Cloudflare Workers isolates.
export function getRedactedConnectionString() {
  let connectionString = process.env.DATABASE_URL || "postgresql://postgres.qksigxubxkecqffdcgcu:Icenit2026!@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
  
  // Under Cloudflare Workers (production), rewrite the pooler connection string to use the direct host/port 5432
  // Cloudflare Workers natively supports IPv6 direct connection, which avoids all pooler limits and TLS renegotiation bugs
  const isCloudflareProduction = typeof process !== "undefined" && process.env.NEXT_RUNTIME === "edge";
  if (isCloudflareProduction) {
    if (connectionString.includes("pooler.supabase.com:6543")) {
      connectionString = connectionString
        .replace("aws-1-us-east-2.pooler.supabase.com:6543", "db.qksigxubxkecqffdcgcu.supabase.co:5432")
        .replace("://postgres.qksigxubxkecqffdcgcu:", "://postgres:");
    }
  }
  
  // Auto-correct the database username to include the project tenant identifier if connecting to the Supabase pooler
  if (connectionString.includes("pooler.supabase.com") && connectionString.includes("://postgres:")) {
    connectionString = connectionString.replace("://postgres:", "://postgres.qksigxubxkecqffdcgcu:");
  }

  // Ensure sslmode=require is appended for Cloudflare Workers compatibility
  if (!connectionString.includes("sslmode=")) {
    connectionString += connectionString.includes("?") ? "&sslmode=require" : "?sslmode=require";
  }
  return connectionString;
}

let globalDb: DrizzleDBType | null = null;

export function getDB(): DrizzleDBType {
  if (!globalDb) {
    const connectionString = getRedactedConnectionString();
    const client = postgres(connectionString, {
      prepare: false,
      max: 1,
      idle_timeout: 15, // Keep connection alive for 15s of inactivity
      connect_timeout: 5,
      ssl: { rejectUnauthorized: false }
    });
    globalDb = drizzle(client, { schema });
  }
  return globalDb;
}

// Export a Proxy that forwards all operations to the cached db instance.
export const db = new Proxy({} as any, {
  get(target, prop, receiver) {
    const actualDb = getDB();
    return Reflect.get(actualDb, prop, receiver);
  }
}) as unknown as DrizzleDBType;

export type DBType = typeof db;
export * from "./schema";
