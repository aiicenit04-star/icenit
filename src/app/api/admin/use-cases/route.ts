import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, useCases } from "@/db/client";
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
    const allUseCases = await db.select().from(useCases);
    return NextResponse.json(allUseCases);
  } catch (error: any) {
    console.error("Error fetching use cases:", error);
    return NextResponse.json({ error: error.message || "Error al obtener los casos de uso" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, context, challenge, strategy, results } = body;

    if (!id || !title || !context || !challenge || !strategy || !results) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    await db
      .update(useCases)
      .set({ title, context, challenge, strategy, results })
      .where(eq(useCases.id, id));

    revalidatePath("/");
    revalidatePath(`/casos-de-uso/${id}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating use case:", error);
    return NextResponse.json({ error: error.message || "Error al actualizar el caso de uso" }, { status: 500 });
  }
}
