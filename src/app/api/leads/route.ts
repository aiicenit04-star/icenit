import { NextResponse } from "next/server";
import { supaInsert, supaSelect } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const type = formData.get("type") as string;

      if (type === "career") {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const position = formData.get("position") as string;
        const message = formData.get("message") as string;
        const cvFile = formData.get("cv") as File | null;

        if (!name || !email || !phone || !position || !cvFile) {
          return NextResponse.json(
            { error: "Faltan campos requeridos en la postulación" },
            { status: 400 }
          );
        }

        // Convert file to Base64 Data URL for edge compatibility (no local disk)
        const bytes = await cvFile.arrayBuffer();
        const base64Arr = new Uint8Array(bytes);
        let binary = "";
        for (let i = 0; i < base64Arr.byteLength; i++) {
          binary += String.fromCharCode(base64Arr[i]);
        }
        const base64String = btoa(binary);
        const cvUrl = `data:${cvFile.type || "application/pdf"};base64,${base64String}`;

        const { error } = await supaInsert("job_applications", {
          name, email, phone, position, message, cv_url: cvUrl,
        });

        if (error) return NextResponse.json({ error }, { status: 500 });
        return NextResponse.json({ success: true });
      }
    } else {
      const body = await req.json();
      const { type } = body;

      if (type === "demo") {
        const { name, company, email, phone, message } = body;
        if (!name || !company || !email) {
          return NextResponse.json(
            { error: "Faltan campos obligatorios (Nombre, Empresa o Email)" },
            { status: 400 }
          );
        }
        const { error } = await supaInsert("demo_requests", {
          name, company, email, phone, message,
        });
        if (error) return NextResponse.json({ error }, { status: 500 });
        return NextResponse.json({ success: true });
      }

      if (type === "contact") {
        const { name, company, email, phone, subject, message } = body;
        if (!name || !email || !message) {
          return NextResponse.json(
            { error: "Faltan campos obligatorios (Nombre, Email o Mensaje)" },
            { status: 400 }
          );
        }
        const { error } = await supaInsert("contact_submissions", {
          name, company, email, phone, subject, message,
        });
        if (error) return NextResponse.json({ error }, { status: 500 });
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: "Tipo de solicitud no válida" }, { status: 400 });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple health check using Supabase REST (edge-compatible)
  const { data, error } = await supaSelect("contact_submissions", {
    select: "id",
    limit: 1,
  });
  if (error) return NextResponse.json({ success: false, error }, { status: 500 });
  return NextResponse.json({ success: true, rows: data?.length ?? 0 });
}
