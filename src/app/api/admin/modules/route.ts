import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaSelect, supaUpdate, supaDelete, supaInsert } from "@/lib/supabase-admin";

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
    const { data: modulesList, error: e1 } = await supaSelect("modules", { order: "id.asc" });
    if (e1) return NextResponse.json({ error: e1 }, { status: 500 });

    const { data: features, error: e2 } = await supaSelect("module_features", { order: "id.asc" });
    if (e2) return NextResponse.json({ error: e2 }, { status: 500 });

    const modulesWithFeatures = (modulesList ?? []).map((mod: any) => ({
      ...mod,
      features: (features ?? [])
        .filter((f: any) => f.module_id === mod.id)
        .map((f: any) => f.feature),
    }));

    return NextResponse.json(modulesWithFeatures);
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
    const { id, title, subtitle, description, meta_description, category, features } = body;

    const { error: e1 } = await supaUpdate(
      "modules",
      { title, subtitle, description, meta_description, category },
      "id",
      id
    );
    if (e1) return NextResponse.json({ error: e1 }, { status: 500 });

    if (Array.isArray(features)) {
      const { error: e2 } = await supaDelete("module_features", "module_id", id);
      if (e2) return NextResponse.json({ error: e2 }, { status: 500 });

      if (features.length > 0) {
        const { error: e3 } = await supaInsert(
          "module_features",
          features.map((feature: string) => ({ module_id: id, feature }))
        );
        if (e3) return NextResponse.json({ error: e3 }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
