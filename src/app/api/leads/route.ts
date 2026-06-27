import { NextResponse } from "next/server";
import { db, contactSubmissions, demoRequests, jobApplications } from "@/db/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

        // Save file to public/uploads
        const bytes = await cvFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${cvFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        const cvUrl = `/uploads/${fileName}`;

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
