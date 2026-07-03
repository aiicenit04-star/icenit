import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { jobApplications } from "../src/db/client";

async function test() {
  // Direct connection URL
  const connectionString = "postgresql://postgres.qksigxubxkecqffdcgcu:Icenit2026!@db.qksigxubxkecqffdcgcu.supabase.co:5432/postgres";
  console.log("Testing direct database connection to port 5432...");
  try {
    const client = postgres(connectionString, {
      prepare: false, // pg-core
      max: 1,
      idle_timeout: 1,
      ssl: "require"
    });
    const database = drizzle(client);
    const result = await database.select().from(jobApplications).limit(1);
    console.log("Success! Result:", result);
    await client.end();
  } catch (error: any) {
    console.error("Direct connection failed:", error.message);
  }
}

test();
