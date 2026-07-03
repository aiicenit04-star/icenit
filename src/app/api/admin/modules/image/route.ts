import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaUploadFile, supaDeleteFile, supaUpdate } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const BUCKET = "module-images";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

/** POST /api/admin/modules/image
 *  Body: multipart/form-data  { moduleId: string, file: File }
 *  Uploads the file to Supabase Storage and updates modules.image_url
 */
export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const moduleId = formData.get("moduleId") as string | null;
    const file = formData.get("file") as File | null;

    if (!moduleId || !file) {
      return NextResponse.json({ error: "moduleId y file son requeridos" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo de archivo no permitido. Use: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "El archivo supera el límite de 5 MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const storagePath = `${moduleId}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const publicUrl = await supaUploadFile(BUCKET, storagePath, arrayBuffer, file.type);

    // Persist the URL in the modules table
    const { error } = await supaUpdate("modules", { image_url: publicUrl }, "id", moduleId);
    if (error) {
      return NextResponse.json({ error: `DB update failed: ${error}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/** DELETE /api/admin/modules/image
 *  Body: JSON { moduleId: string }
 *  Deletes the file from Supabase Storage and clears modules.image_url
 */
export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { moduleId, currentUrl } = await request.json() as {
      moduleId: string;
      currentUrl?: string;
    };

    if (!moduleId) {
      return NextResponse.json({ error: "moduleId es requerido" }, { status: 400 });
    }

    // Extract storage path from URL if available
    if (currentUrl) {
      const pathMatch = currentUrl.match(/module-images\/(.+)$/);
      if (pathMatch) {
        try {
          await supaDeleteFile(BUCKET, pathMatch[1]);
        } catch {
          // Ignore if file doesn't exist in storage
        }
      }
    }

    // Clear image_url in DB
    const { error } = await supaUpdate("modules", { image_url: null }, "id", moduleId);
    if (error) {
      return NextResponse.json({ error: `DB update failed: ${error}` }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
