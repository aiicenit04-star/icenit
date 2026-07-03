import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DrizzleDBType = ReturnType<typeof drizzle<typeof schema>>;

export function getRedactedConnectionString() {
  let connectionString = process.env.DATABASE_URL || "postgresql://postgres.qksigxubxkecqffdcgcu:Icenit2026!@aws-1-us-east-2.pooler.supabase.com:6543/postgres";
  
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
    
    // Configure postgres client with aggressive idle timeout (0.2s)
    // In serverless environments (Cloudflare Workers), isolates are frozen between requests.
    // If a connection remains idle in the pool, it becomes stale. 
    // Closing it after 200ms of inactivity prevents stale connections and infinite retry loops.
    // We connect to the pooler (port 6543) which uses Supavisor warm connections for high speed.
    const client = postgres(connectionString, {
      prepare: false,
      max: 1,
      idle_timeout: 0.2, // Close connection after 200ms of inactivity
      connect_timeout: 5,
      ssl: { rejectUnauthorized: false }
    });
    globalDb = drizzle(client, { schema });
  }
  return globalDb;
}

// Export a Proxy to lazy-load the database client connection.
// This prevents Next.js edge runtime build compilation errors (e.g. node:stream missing) during static page generation.
export const db = new Proxy({} as any, {
  get(target, prop, receiver) {
    const actualDb = getDB();
    return Reflect.get(actualDb, prop, receiver);
  }
}) as unknown as DrizzleDBType;

export type DBType = typeof db;
export * from "./schema";
