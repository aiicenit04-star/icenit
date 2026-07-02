import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

import { cache } from "react";

type DrizzleDBType = ReturnType<typeof drizzle<typeof schema>>;

// Use React's cache to scope the database client connection to the current request lifecycle.
// This prevents reusing stale/closed TCP connections across requests in frozen Cloudflare Workers isolates.
export const getDB = cache((): DrizzleDBType => {
  let connectionString = process.env.DATABASE_URL || "postgresql://postgres:Icenit2026!@db.qksigxubxkecqffdcgcu.supabase.co:5432/postgres";
  // Ensure sslmode=require is appended for Cloudflare Workers compatibility
  if (!connectionString.includes("sslmode=")) {
    connectionString += connectionString.includes("?") ? "&sslmode=require" : "?sslmode=require";
  }
  // Initialize postgres client inside the function to defer socket connection
  const client = postgres(connectionString, {
    prepare: false,
    max: 1,
    idle_timeout: 1
  });
  return drizzle(client, { schema });
});

// Export a Proxy that forwards all operations to the request-scoped db instance.
export const db = new Proxy({} as any, {
  get(target, prop, receiver) {
    const actualDb = getDB();
    return Reflect.get(actualDb, prop, receiver);
  }
}) as unknown as DrizzleDBType;

export type DBType = typeof db;
export * from "./schema";
