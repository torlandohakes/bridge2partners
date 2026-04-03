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
