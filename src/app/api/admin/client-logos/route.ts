import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaSelect, supaInsert, supaUpdate, supaDelete } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const c = await cookies();
  return c.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supaSelect("client_logos", { select: "*", order: "display_order" });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { name } = body;
  if (!name) return NextResponse.json({ error: "name requerido" }, { status: 400 });
  const { error } = await supaInsert("client_logos", { name, url: "", display_order: 99, is_visible: true });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...updates } = await request.json();
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  const { error } = await supaUpdate("client_logos", updates, "id", String(id));
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  const { error } = await supaDelete("client_logos", "id", String(id));
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
