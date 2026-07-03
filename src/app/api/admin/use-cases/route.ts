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
    const { data, error } = await supaSelect("use_cases", { order: "id.asc" });
    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);
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
    const { id, title, context, challenge, strategy, results, image_url } = body;

    const { error } = await supaUpdate(
      "use_cases",
      { title, context, challenge, strategy, results, ...(image_url !== undefined && { image_url }) },
      "id",
      id
    );

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
