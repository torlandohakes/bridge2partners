import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
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
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    const linkedin = formData.get('linkedin') as string;
    const resume = formData.get('resume') as File | null;

    if (!name || !email || !linkedin || !resume) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Sanitize user inputs to prevent HTML injection
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeLocation = escapeHtml(location);
    const safeLinkedin = escapeHtml(linkedin);

    // Backend Validation for Resume upload (Security Check)
    const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedMimeTypes.includes(resume.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF and Word documents are allowed.' }, { status: 400 });
    }
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size too large. Maximum size is 10MB.' }, { status: 400 });
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

    // Convert the File object into a Buffer for the Resend attachment
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Store the application in Firestore backend
    try {
      await addDoc(collection(db, 'career_applications'), {
        name,
        email,
        phone: phone || '',
        location: location || '',
        linkedin,
        resumeName: resume.name,
        status: 'new',
        submittedAt: serverTimestamp(),
      });
    } catch (dbError) {
      console.error('Failed to save to Firestore:', dbError);
      // We will still proceed to send the email even if DB logging fails so we don't drop the lead
    }

    // 2. Build the Email Template
    const htmlTemplate = `
      <div style="font-family: sans-serif; max-w-2xl; margin: 0 auto; color: #111;">
        <h2 style="color: #00573f;">New Career Application</h2>
        <div style="background: #fdfdfd; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
          <p><strong>Location (City/State):</strong> ${safeLocation || 'Not provided'}</p>
          <p><strong>LinkedIn:</strong> <a href="${safeLinkedin}">${safeLinkedin}</a></p>
        </div>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">
          The applicant's resume is attached to this email.
        </p>
      </div>
    `;

    // 3. Dispatch the email
    const { data, error } = await resend.emails.send({
      from: `Bridge2Partners Careers <${senderEmail}>`,
      to: [senderEmail],
      subject: `New Application: ${safeName}`,
      html: htmlTemplate,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        }
      ]
    });

    if (error) throw new Error(\`Failed to send application: \${error.message}\`);

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Application dispatch error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send application' }, { status: 500 });
  }
}
