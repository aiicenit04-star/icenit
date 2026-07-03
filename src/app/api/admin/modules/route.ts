import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

  const { data: modulesList, error: e1 } = await supabaseAdmin
    .from("modules")
    .select("*")
    .order("id", { ascending: true });

  if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

  const { data: features, error: e2 } = await supabaseAdmin
    .from("module_features")
    .select("*")
    .order("id", { ascending: true });

  if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });

  const modulesWithFeatures = (modulesList ?? []).map((mod) => ({
    ...mod,
    features: (features ?? []).filter((f) => f.module_id === mod.id).map((f) => f.feature),
  }));

  return NextResponse.json(modulesWithFeatures);
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, title, subtitle, description, meta_description, category, features } = body;

  // Update module fields
  const { error: e1 } = await supabaseAdmin
    .from("modules")
    .update({ title, subtitle, description, meta_description, category })
    .eq("id", id);

  if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

  // Replace features: delete existing then insert new
  if (Array.isArray(features)) {
    const { error: e2 } = await supabaseAdmin
      .from("module_features")
      .delete()
      .eq("module_id", id);

    if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });

    if (features.length > 0) {
      const { error: e3 } = await supabaseAdmin
        .from("module_features")
        .insert(features.map((feature: string) => ({ module_id: id, feature })));

      if (e3) return NextResponse.json({ error: e3.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
