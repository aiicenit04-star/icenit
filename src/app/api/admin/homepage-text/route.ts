import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaSelect, supaUpdate } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function checkAuth() {
  const c = await cookies();
  return c.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supaSelect("homepage_text", { select: "id,label,value", order: "id" });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { items } = await request.json() as { items: Array<{ id: string; value: string }> };
  if (!Array.isArray(items)) return NextResponse.json({ error: "items array requerido" }, { status: 400 });
  const errors: string[] = [];
  for (const item of items) {
    const { error } = await supaUpdate("homepage_text", { value: item.value }, "id", item.id);
    if (error) errors.push(`${item.id}: ${error}`);
  }
  if (errors.length > 0) return NextResponse.json({ error: errors.join(", ") }, { status: 500 });
  return NextResponse.json({ success: true });
}
