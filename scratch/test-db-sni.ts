import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { getRedactedConnectionString, jobApplications } from "../src/db/client";

async function test() {
  const connectionString = getRedactedConnectionString();
  const url = new URL(connectionString);
  const hostname = url.hostname;
  console.log(`Connecting to database at ${hostname}...`);

  try {
    const client = postgres(connectionString, {
      prepare: false,
      max: 1,
      idle_timeout: 1,
      ssl: {
        servername: hostname
      }
    });
    const database = drizzle(client);
    const result = await database.select().from(jobApplications).limit(1);
    console.log("Success! Result:", result);
    await client.end();
  } catch (error: any) {
    console.error("Connection failed:", error.message);
  }
}

test();
