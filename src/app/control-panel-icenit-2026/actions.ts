"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, siteSettings, modules, moduleFeatures, useCases } from "@/db/client";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Authentication
export async function login(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;
  if (password === "admin1234" || password === "Icenit2026!") {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Contraseña incorrecta" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/control-panel-icenit-2026");
}

// Site Settings
export async function updateSiteSettings(
  phone: string,
  email: string,
  address: string,
  linkedin: string,
  metaTitle: string,
  metaDescription: string
) {
  try {
    await db
      .update(siteSettings)
      .set({
        phone,
        email,
        address,
        linkedin,
        metaTitle,
        metaDescription,
      })
      .where(eq(siteSettings.id, 1));

    revalidatePath("/");
    revalidatePath("/empresa");
    revalidatePath("/empresa/contacto");
    revalidatePath("/precios");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating site settings:", error);
    return { success: false, error: error.message || "Error al actualizar la configuración" };
  }
}

// Modules
export async function updateModule(
  id: string,
  title: string,
  subtitle: string,
  metaDescription: string,
  description: string,
  featuresList: string[]
) {
  try {
    // 1. Update module table
    await db
      .update(modules)
      .set({
        title,
        subtitle,
        metaDescription,
        description,
      })
      .where(eq(modules.id, id));

    // 2. Delete existing features
    await db
      .delete(moduleFeatures)
      .where(eq(moduleFeatures.moduleId, id));

    // 3. Insert new features
    for (const feat of featuresList) {
      if (feat.trim()) {
        await db.insert(moduleFeatures).values({
          moduleId: id,
          feature: feat.trim(),
        });
      }
    }

    revalidatePath("/modulos");
    revalidatePath(`/modulos/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating module:", error);
    return { success: false, error: error.message || "Error al actualizar el módulo" };
  }
}

// Use Cases
export async function updateUseCase(
  id: string,
  title: string,
  context: string,
  challenge: string,
  strategy: string,
  results: string
) {
  try {
    await db
      .update(useCases)
      .set({
        title,
        context,
        challenge,
        strategy,
        results,
      })
      .where(eq(useCases.id, id));

    revalidatePath("/");
    revalidatePath(`/casos-de-uso/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating use case:", error);
    return { success: false, error: error.message || "Error al actualizar el caso de uso" };
  }
}
