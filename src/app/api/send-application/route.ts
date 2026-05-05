import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Will gracefully bypass if key is missing during build time
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback_key');

export async function POST(req: Request) {
  try {
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
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Location (City/State):</strong> ${location || 'Not provided'}</p>
          <p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>
        </div>
        <p style="margin-top: 20px; font-size: 14px; color: #555;">
          The applicant's resume is attached to this email.
        </p>
      </div>
    `;

    // 3. Dispatch the email
    const data = await resend.emails.send({
      from: 'Bridge2Partners Careers <onboarding@resend.dev>',
      to: ['torlando.hakes@bridge2partners.com'],
      subject: `New Application: ${name}`,
      html: htmlTemplate,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        }
      ]
    });

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Application dispatch error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send application' }, { status: 500 });
  }
}
