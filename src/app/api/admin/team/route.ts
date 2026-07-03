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
  const { data, error } = await supaSelect("team_members", { select: "*", order: "display_order" });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  const { error } = await supaUpdate("team_members", updates, "id", String(id));
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
