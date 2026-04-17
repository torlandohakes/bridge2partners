import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Will gracefully bypass if key is missing during build time
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback_key');

export async function POST(req: Request) {
  try {
    const { name, email, phone, markdownReport } = await req.json();

    if (!name || !email || !markdownReport) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert standard markdown tokens to HTML tags for the email body roughly
    // Using a simple regex since 'marked' wasn't natively installed above to keep it minimal and dependency-free
    let htmlReport = markdownReport
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
        <h2>Gap Analysis Report for ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
        <div style="background: #fdfdfd; padding: 20px; border-radius: 8px; border: 1px solid #eaeaea;">
          ${htmlReport}
        </div>
      </div>
    `;

    // Dispatch 1: Send to the user who requested the report (Using the generic standard sender if domain not verified, but usually users use hello@)
    // To comply with Resend constraints on untrusted domains during testing, we'll send it FROM onboarding@resend.dev unless the user provides a real domain sender.
    // For now we'll route to both under the same payload to preserve credits.
    const data = await resend.emails.send({
      from: 'Bridge2Partners <onboarding@resend.dev>',
      to: [email, 'torlando.hakes@bridge2partners.com'],
      subject: `Bridge2Partners Gap Analysis Report: ${name}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('Email dispatch error:', error);
    return NextResponse.json({ error: error.message || 'Failed to send report' }, { status: 500 });
  }
}
