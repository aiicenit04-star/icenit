import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaCount } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [contacts, demos, applications] = await Promise.all([
      supaCount("contact_submissions"),
      supaCount("demo_requests"),
      supaCount("job_applications"),
    ]);
    return NextResponse.json({ contacts, demos, applications });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
