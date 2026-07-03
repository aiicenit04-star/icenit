import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supaUploadFile, supaUpdate } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const BUCKET = "site-images";
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

async function checkAuth() {
  const c = await cookies();
  return c.get("admin_session")?.value === "authenticated";
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const caseId = form.get("caseId") as string | null;
    const file = form.get("file") as File | null;
    if (!caseId || !file) return NextResponse.json({ error: "caseId y file requeridos" }, { status: 400 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Solo JPG, PNG o WEBP" }, { status: 400 });
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `casos/${caseId}.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const publicUrl = await supaUploadFile(BUCKET, path, arrayBuffer, file.type);
    const { error } = await supaUpdate("use_cases", { image_url: publicUrl }, "id", caseId);
    if (error) return NextResponse.json({ error: `DB update failed: ${error}` }, { status: 500 });
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
