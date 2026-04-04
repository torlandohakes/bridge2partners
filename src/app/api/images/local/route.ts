import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Check if directory exists
    try {
      await fs.access(imagesDir);
    } catch {
      return NextResponse.json({ images: [] });
    }

    const files = await fs.readdir(imagesDir);
    
    // Filter for actual image files
    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext);
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to read local images directory:", error);
    return NextResponse.json({ error: "Failed to read local directory." }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  try {
    const { filename } = await request.json();
    if (!filename) return NextResponse.json({ error: "Filename required" }, { status: 400 });

    const safeFilename = path.basename(filename);
    const filepath = path.join(process.cwd(), 'public', 'images', safeFilename);
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Safety check to ensure we only delete from images dir
    if (!filepath.startsWith(imagesDir)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    }

    try {
      await fs.access(filepath);
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    await fs.unlink(filepath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete local image:", error);
    return NextResponse.json({ error: "Failed to delete image." }, { status: 500 });
  }
}
