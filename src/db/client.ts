import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Use the DATABASE_URL environment variable.
// We fallback to a dummy connection string during build time if the variable is not set.
const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";

// Disable prepared statements (prepare: false) which is required for Supabase connection pooling (session mode)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
export type DBType = typeof db;
export * from "./schema";
