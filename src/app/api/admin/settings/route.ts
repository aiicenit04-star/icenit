import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaSelect, supaUpdate } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supaSelect("site_settings", {
      order: "id.asc",
      limit: 1,
      single: true,
    });
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data?.[0] ?? null);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { phone, email, address, linkedin, meta_title, meta_description } = body;

    const { data, error } = await supaUpdate(
      "site_settings",
      { phone, email, address, linkedin, meta_title, meta_description },
      "id",
      1
    );

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
