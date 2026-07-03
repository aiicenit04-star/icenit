import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaUploadFile, supaDeleteFile, supaUpdate } from "@/lib/supabase-admin";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const BUCKET = "site-images";
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

async function checkAuth() {
  const c = await cookies();
  return c.get("admin_session")?.value === "authenticated";
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const imageId = form.get("imageId") as string | null;
    const file = form.get("file") as File | null;
    if (!imageId || !file) return NextResponse.json({ error: "imageId y file requeridos" }, { status: 400 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Tipo de archivo no permitido" }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ error: "Archivo supera 10 MB" }, { status: 400 });
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${imageId}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const publicUrl = await supaUploadFile(BUCKET, path, arrayBuffer, file.type);
    const { error } = await supaUpdate("site_images", { url: publicUrl, updated_at: new Date().toISOString() }, "id", imageId);
    if (error) return NextResponse.json({ error: `DB update failed: ${error}` }, { status: 500 });
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { imageId, currentUrl } = await request.json() as { imageId: string; currentUrl?: string };
    if (!imageId) return NextResponse.json({ error: "imageId requerido" }, { status: 400 });
    if (currentUrl && currentUrl.includes("supabase")) {
      const match = currentUrl.match(/site-images\/(.+)$/);
      if (match) { try { await supaDeleteFile(BUCKET, match[1]); } catch { /* ignore */ } }
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
