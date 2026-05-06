import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with fallback for local dev if key is missing
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, notes, date, time } = data;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Parse the requested date and time
    const meetingDate = new Date(date);
    const dateString = meetingDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    
    // Generate a simple .ics file content
    // We create a 45 minute event based on the requested time
    const generateICS = () => {
      // Very basic ICS generation. A robust solution would use a library like `ics`.
      // Formatting date for ICS (YYYYMMDDTHHMMSSZ)
      // Since we only have a mock time like "09:00 AM", we'll just set it for noon UTC for the MVP
      // to avoid complex timezone math, but clearly state it's tentative.
      const now = new Date();
      const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      
      // Use the selected date, but set time to 12:00 UTC
      const eventStart = new Date(meetingDate);
      eventStart.setUTCHours(12, 0, 0, 0);
      const dtstart = eventStart.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      
      const eventEnd = new Date(eventStart);
      eventEnd.setUTCHours(12, 45, 0, 0);
      const dtend = eventEnd.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Bridge2Partners//Strategy Call//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:REQUEST',
        'BEGIN:VEVENT',
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${dtstart}`,
        `DTEND:${dtend}`,
        `SUMMARY:Tentative: B2P Strategy Call - ${name} (${company})`,
        `DESCRIPTION:This is a tentative hold for your strategy call on ${dateString} at ${time}. A Bridge2Partners Managing Partner will review this request and reach out to confirm or propose a new time.\\n\\nNotes: ${notes}`,
        `ORGANIZER;CN=Bridge2Partners:mailto:hello@bridge2partners.com`,
        `ATTENDEE;RSVP=TRUE;CN=${name}:mailto:${email}`,
        'STATUS:TENTATIVE',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
    };

    const icsContent = generateICS();
    const buffer = Buffer.from(icsContent, 'utf-8');

    // Email content
    const clientEmailHtml = `
      <h2>Strategy Call Requested</h2>
      <p>Hi ${name},</p>
      <p>Thank you for requesting a Strategy Call with Bridge2Partners.</p>
      <p>We have placed a <strong>tentative hold</strong> on our calendar for <strong>${dateString} at ${time}</strong>.</p>
      <p>One of our Managing Partners will review your request and reach out shortly to either confirm this time and provide a Microsoft Teams link, or propose an alternative time that works for everyone.</p>
      <p>An .ics calendar invite is attached for your convenience.</p>
      <br/>
      <p>Best regards,<br/>The Bridge2Partners Team</p>
    `;

    const internalEmailHtml = `
      <h2>New Strategy Call Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Requested Time:</strong> ${dateString} at ${time}</p>
      <p><strong>Notes:</strong> ${notes || 'None provided'}</p>
      <br/>
      <p><em>Action Required: Please review and reach out to the client to confirm or reschedule.</em></p>
    `;

    if (resend) {
      // Send to Client (TESTING MODE)
      const { error: clientError, data: clientData } = await resend.emails.send({
        from: 'Bridge2Partners Web <onboarding@resend.dev>', // Sandbox domain
        to: 'torlando@craftsmanpainter.com', // Force to owner address for testing
        subject: `[TEST CLIENT EMAIL] Tentative: Strategy Call (${email})`,
        html: clientEmailHtml,
        attachments: [
          {
            filename: 'invite.ics',
            content: buffer,
            contentType: 'text/calendar'
          }
        ]
      });

      if (clientError) {
        console.error("Failed to send client email via Resend.", clientError.message);
      } else {
        console.log("Client email sent successfully.", clientData);
      }

      // Send to Internal Team
      const { error: internalError, data: internalData } = await resend.emails.send({
        // Fallback to onboarding@resend.dev if your custom domain isn't verified yet
        from: 'Bridge2Partners Web <onboarding@resend.dev>', 
        to: 'torlando@craftsmanpainter.com', // Internal address
        subject: `New Call Request: ${name} (${company})`,
        html: internalEmailHtml,
      });

      if (internalError) {
        console.error("Failed to send internal notification via Resend.", internalError.message);
      } else {
        console.log("Internal notification email sent successfully.", internalData);
      }
    } else {
      console.log("Mocking email send because RESEND_API_KEY is not configured.");
      console.log("Client Email:", clientEmailHtml);
      console.log("Internal Email:", internalEmailHtml);
      console.log("ICS Attachment length:", buffer.length);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error scheduling call:', error);
    return NextResponse.json({ error: 'Failed to schedule call' }, { status: 500 });
  }
}
