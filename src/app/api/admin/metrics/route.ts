import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, contactSubmissions, demoRequests, jobApplications } from "@/db/client";
import { sql } from "drizzle-orm";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Sequential queries — avoids Cloudflare Workers subrequest limit
    const contactsResult = await db.select({ count: sql<number>`count(*)` }).from(contactSubmissions).then((r) => r[0]);
    const demosResult = await db.select({ count: sql<number>`count(*)` }).from(demoRequests).then((r) => r[0]);
    const applicationsResult = await db.select({ count: sql<number>`count(*)` }).from(jobApplications).then((r) => r[0]);

    return NextResponse.json({
      contacts: Number(contactsResult?.count ?? 0),
      demos: Number(demosResult?.count ?? 0),
      applications: Number(applicationsResult?.count ?? 0),
    });
  } catch (error: any) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      {
        error: error.message,
        pg_code: error?.code,
        pg_detail: error?.detail,
        pg_severity: error?.severity,
        pg_hint: error?.hint,
        cause: error?.cause ? String(error.cause) : undefined,
        type: error?.constructor?.name,
      },
      { status: 500 }
    );
  }
}
