import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, siteSettings } from "@/db/client";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

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
    const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
    if (!settings) {
      return NextResponse.json({ error: "No se encontró la configuración del sitio (ID=1)" }, { status: 404 });
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: error.message || "Error al obtener la configuración" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { phone, email, address, linkedin, metaTitle, metaDescription } = body;

    if (!phone || !email || !address || !metaTitle || !metaDescription) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    await db
      .update(siteSettings)
      .set({ phone, email, address, linkedin: linkedin || null, metaTitle, metaDescription })
      .where(eq(siteSettings.id, 1));

    revalidatePath("/");
    revalidatePath("/empresa");
    revalidatePath("/precios");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: error.message || "Error al actualizar la configuración" }, { status: 500 });
  }
}
