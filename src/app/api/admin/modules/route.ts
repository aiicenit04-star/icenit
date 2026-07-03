import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, modules, moduleFeatures } from "@/db/client";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allModules = await db.select().from(modules);
    const allFeatures = await db.select().from(moduleFeatures);

    const modulesWithFeatures = allModules.map((mod) => ({
      ...mod,
      features: allFeatures
        .filter((f) => f.moduleId === mod.id)
        .map((f) => f.feature),
    }));

    return NextResponse.json(modulesWithFeatures);
  } catch (error: any) {
    console.error("Error fetching modules:", error);
    return NextResponse.json({ error: error.message || "Error al obtener los módulos" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, subtitle, metaDescription, description, features } = body;

    if (!id || !title || !subtitle || !metaDescription || !description) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // 1. Update module
    await db
      .update(modules)
      .set({ title, subtitle, metaDescription, description })
      .where(eq(modules.id, id));

    // 2. Delete existing features
    await db.delete(moduleFeatures).where(eq(moduleFeatures.moduleId, id));

    // 3. Insert new features one by one
    const featuresList: string[] = Array.isArray(features) ? features : [];
    for (const feat of featuresList) {
      if (feat.trim()) {
        await db.insert(moduleFeatures).values({ moduleId: id, feature: feat.trim() });
      }
    }

    revalidatePath("/modulos");
    revalidatePath(`/modulos/${id}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating module:", error);
    return NextResponse.json({ error: error.message || "Error al actualizar el módulo" }, { status: 500 });
  }
}
