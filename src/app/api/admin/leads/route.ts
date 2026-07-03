import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, contactSubmissions, demoRequests, jobApplications } from "@/db/client";
import { desc } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [contacts, demos, applications] = await Promise.all([
      db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.id)),
      db.select().from(demoRequests).orderBy(desc(demoRequests.id)),
      db.select().from(jobApplications).orderBy(desc(jobApplications.id)),
    ]);

    return NextResponse.json({ contacts, demos, applications });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: error.message || "Error al obtener los leads" },
      { status: 500 }
    );
  }
}
