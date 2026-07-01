import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let _db: any = null;

function getDB() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";
    // Initialize postgres client inside the function to defer socket connection
    const client = postgres(connectionString, { prepare: false });
    _db = drizzle(client, { schema });
  }
  return _db;
}

// Export a Proxy that forwards all operations to the lazy-loaded db instance.
// This prevents module-level initialization errors in Cloudflare Workers.
export const db = new Proxy({} as any, {
  get(target, prop, receiver) {
    const actualDb = getDB();
    return Reflect.get(actualDb, prop, receiver);
  }
});

export type DBType = typeof db;
export * from "./schema";
