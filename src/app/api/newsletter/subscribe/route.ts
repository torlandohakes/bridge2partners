import { NextResponse } from 'next/server';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { escapeHtml } from '@/lib/utils';

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 subscribe requests per IP per minute
const WINDOW_MS = 60 * 1000;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
    
    // Rate Limiting
    const now = Date.now();
    const clientRecord = rateLimitMap.get(ip);
    if (clientRecord && now < clientRecord.resetTime) {
      if (clientRecord.count >= RATE_LIMIT) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }
      clientRecord.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    }

    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const safeEmail = escapeHtml(normalizedEmail);

    // Save subscriber in Firestore using email hash/slug as document ID to prevent duplicate records
    const docId = safeEmail.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    await setDoc(doc(db, 'subscribers', docId), {
      email: safeEmail,
      subscribedAt: serverTimestamp(),
      active: true
    }, { merge: true });

    return NextResponse.json({ success: true, message: 'Successfully subscribed to insights!' });
  } catch (err: any) {
    console.error('Newsletter subscribe error:', err);
    return NextResponse.json({ error: 'Internal server error occurred.' }, { status: 500 });
  }
}
