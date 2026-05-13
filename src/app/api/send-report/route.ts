import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { escapeHtml } from '@/lib/utils';

// Will gracefully bypass if key is missing during build time
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback_key');

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 requests per IP
const WINDOW_MS = 60 * 1000; // 1 minute window

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
    
    // Rate Limiting Logic
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
    const { name, email, phone, markdownReport } = await req.json();

    if (!name || !email || !markdownReport) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Security Check: ReDoS Prevention
    const MAX_REPORT_LENGTH = 50000;
    if (markdownReport.length > MAX_REPORT_LENGTH) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 400 });
    }

    // Fetch the dynamic sender email from Firestore
    let senderEmail = 'torlando.hakes@bridge2partners.com'; // Default fallback
    try {
      const configSnap = await getDoc(doc(db, 'site-settings', 'email_config'));
      if (configSnap.exists() && configSnap.data().senderEmail) {
        senderEmail = configSnap.data().senderEmail;
      }
    } catch (e) {
      console.error('Failed to fetch sender email from Firestore:', e);
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);

    // Convert standard markdown tokens to HTML tags for the email body roughly
    // Using a simple regex since 'marked' wasn't natively installed above to keep it minimal and dependency-free
    let safeMarkdownReport = escapeHtml(markdownReport);
    let htmlReport = safeMarkdownReport
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');

    const htmlTemplate = `
      <div style="font-family: sans-serif; max-w-4xl; margin: 0 auto; color: #111;">
        <h2>Gap Analysis Report for ${safeName}</h2>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
        <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
        <div style="background: #fdfdfd; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
          ${htmlReport}
        </div>
      </div>
    `;

    // Dispatch 1: Send to the user who requested the report
    const { data: userData, error: userError } = await resend.emails.send({
      from: `Bridge2Partners <${senderEmail}>`,
      to: [email],
      subject: `Bridge2Partners Gap Analysis Report: ${name}`,
      html: htmlTemplate,
    });

    if (userError) throw new Error(`Failed to send to user: ${userError.message}`);

    // 2. Send copy to Internal Team
    const { error: internalError } = await resend.emails.send({
      from: `Bridge2Partners Analysis <${senderEmail}>`,
      to: senderEmail,
      subject: `New Gap Analysis Generated for ${safeName}`,
      html: htmlTemplate,
    });

    if (internalError) throw new Error(`Failed to send to internal team: ${internalError.message}`);

    return NextResponse.json({ success: true, data: userData });

  } catch (error: any) {
    console.error('Email dispatch error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send report' }, { status: 500 });
  }
}
