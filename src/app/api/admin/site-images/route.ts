import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaSelect, supaUpdate } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const c = await cookies();
  return c.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supaSelect("site_images", { select: "id,label,url", order: "id" });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, url } = await request.json();
  if (!id || url === undefined) return NextResponse.json({ error: "id and url required" }, { status: 400 });
  const { error } = await supaUpdate("site_images", { url, updated_at: new Date().toISOString() }, "id", id);
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
