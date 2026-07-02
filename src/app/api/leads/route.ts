import { NextResponse } from "next/server";
import { db, contactSubmissions, demoRequests, jobApplications } from "@/db/client";

export const dynamic = "force-dynamic";
export const runtime = "edge";

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

        // Convert file to Base64 Data URL for serverless/edge compatibility (no local disk)
        const bytes = await cvFile.arrayBuffer();
        const base64String = Buffer.from(bytes).toString("base64");
        const cvUrl = `data:${cvFile.type || "application/pdf"};base64,${base64String}`;

        // Insert into database
        await db.insert(jobApplications).values({
          name,
          email,
          phone,
          position,
          message,
          cvUrl,
        });

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

        await db.insert(demoRequests).values({
          name,
          company,
          email,
          phone,
          message,
        });

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

        await db.insert(contactSubmissions).values({
          name,
          company,
          email,
          phone,
          subject,
          message,
        });

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
  try {
    const start = Date.now();
    const result = await db.select().from(contactSubmissions).limit(1);
    return NextResponse.json({ success: true, count: result.length, durationMs: Date.now() - start });
  } catch (error: any) {
    // Extract host and port from process.env.DATABASE_URL to see if it is overriding
    let activeDbUrl = process.env.DATABASE_URL || "default_not_set";
    let redactedUrl = "not_set";
    let passwordDiagnostics = "not_set";
    if (activeDbUrl !== "default_not_set") {
      try {
        const urlObj = new URL(activeDbUrl.replace("postgresql://", "http://"));
        redactedUrl = `${urlObj.username.split(".")[0]}@${urlObj.hostname}:${urlObj.port}`;
        
        const pwd = urlObj.password;
        const isIcenitPwd = pwd === "Icenit2026!";
        const isSu0Pwd = pwd === "su0JgthMHXm1lHyL";
        passwordDiagnostics = `len: ${pwd.length}, isIcenit: ${isIcenitPwd}, isSu0: ${isSu0Pwd}, start: ${pwd.substring(0, 3)}...${pwd.substring(pwd.length - 3)}`;
      } catch (e) {
        redactedUrl = "parse_failed";
        passwordDiagnostics = "parse_failed";
      }
    }
    return NextResponse.json({
      success: false,
      message: error.message,
      activeDatabaseEnv: redactedUrl,
      passwordDiagnostics,
      stack: error.stack,
      rawError: String(error),
      keys: Object.getOwnPropertyNames(error),
      cause: error.cause ? {
        message: error.cause.message,
        stack: error.cause.stack,
        raw: String(error.cause)
      } : null
    }, { status: 500 });
  }
}
