import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaSelect } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [{ data: contacts, error: e1 }, { data: demos, error: e2 }, { data: applications, error: e3 }] =
      await Promise.all([
        supaSelect("contact_submissions", { order: "id.desc" }),
        supaSelect("demo_requests", { order: "id.desc" }),
        supaSelect("job_applications", { order: "id.desc" }),
      ]);

    if (e1 ?? e2 ?? e3) {
      return NextResponse.json({ error: e1 ?? e2 ?? e3 }, { status: 500 });
    }

    return NextResponse.json({ contacts, demos, applications });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
