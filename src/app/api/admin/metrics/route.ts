import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [{ count: contacts }, { count: demos }, { count: applications }] = await Promise.all([
      supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("demo_requests").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("job_applications").select("*", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      contacts: contacts ?? 0,
      demos: demos ?? 0,
      applications: applications ?? 0,
    });
  } catch (error: any) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json({ error: error.message ?? "Error al obtener métricas" }, { status: 500 });
  }
}
