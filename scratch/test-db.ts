import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { getRedactedConnectionString, jobApplications } from "../src/db/client";

async function test(sslOption: any) {
  console.log(`Testing with ssl option:`, sslOption);
  const connectionString = getRedactedConnectionString();
  try {
    const client = postgres(connectionString, {
      prepare: false,
      max: 1,
      idle_timeout: 1,
      ssl: sslOption
    });
    const database = drizzle(client);
    const result = await database.select().from(jobApplications).limit(1);
    console.log(`Success! Result:`, result);
    await client.end();
  } catch (error: any) {
    console.error(`Failed:`, error.message);
  }
}

async function run() {
  await test("require");
  await test(true);
  await test({ rejectUnauthorized: false });
}

run();
