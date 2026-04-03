import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicImagesDir = path.join(process.cwd(), "public", "images");

    // Ensure the output public/images directory exists organically
    try {
      await fs.access(publicImagesDir);
    } catch {
      await fs.mkdir(publicImagesDir, { recursive: true });
    }

    // Safely structure the filename (e.g., removing spaces)
    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(publicImagesDir, filename);

    // Write file to the public directory
    await fs.writeFile(filePath, buffer);

    // Return the absolute relative path mapped perfectly to Next.js Image src
    return NextResponse.json({
      message: "Success",
      url: `/images/${filename}`,
    });
  } catch (error) {
    console.error("Local Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to process upload locally." },
      { status: 500 }
    );
  }
}
