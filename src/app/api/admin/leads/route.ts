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
    const [{ data: contacts, error: e1 }, { data: demos, error: e2 }, { data: applications, error: e3 }] =
      await Promise.all([
        supabaseAdmin.from("contact_submissions").select("*").order("id", { ascending: false }),
        supabaseAdmin.from("demo_requests").select("*").order("id", { ascending: false }),
        supabaseAdmin.from("job_applications").select("*").order("id", { ascending: false }),
      ]);

    if (e1 ?? e2 ?? e3) {
      throw new Error((e1 ?? e2 ?? e3)?.message);
    }

    return NextResponse.json({ contacts, demos, applications });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: error.message ?? "Error al obtener leads" }, { status: 500 });
  }
}
