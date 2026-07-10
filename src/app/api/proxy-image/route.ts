import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  // SSRF Protection: Restrict allowed domains
  const ALLOWED_DOMAINS = [
    'firebasestorage.googleapis.com',
    'cdn.prod.website-files.com',
    'lh3.googleusercontent.com'
  ];

  try {
    const parsedUrl = new URL(url);
    const isAllowed = ALLOWED_DOMAINS.includes(parsedUrl.hostname) || 
                      parsedUrl.hostname.endsWith('.licdn.com') || 
                      parsedUrl.hostname === 'licdn.com';
                      
    if (!isAllowed) {
      console.warn(`Blocked SSRF attempt to fetch from unauthorized domain: ${parsedUrl.hostname}`);
      return new NextResponse('Forbidden: Domain not allowed', { status: 403 });
    }
  } catch (error) {
    return new NextResponse('Invalid url parameter', { status: 400 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    
    const buffer = await res.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': res.headers.get('content-type') || 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*'
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}
