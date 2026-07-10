import { NextResponse } from 'next/server';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { escapeHtml } from '@/lib/utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new NextResponse('Invalid request parameters.', { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const safeEmail = escapeHtml(normalizedEmail);
    const docId = safeEmail.replace(/[^a-zA-Z0-9.\-_]/g, '_');

    // Unsubscribe from database
    await updateDoc(doc(db, 'subscribers', docId), {
      active: false,
      unsubscribedAt: new Date()
    });

    // Return a clean, premium HTML page informing user they have unsubscribed
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Unsubscribed | Bridge2Partners</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
        <style>
          body {
            background-color: #000d0a;
            color: #ffffff;
            font-family: 'Inter', -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px border rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            max-width: 440px;
            width: 100%;
            padding: 40px;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          }
          .logo {
            font-size: 20px;
            font-weight: 800;
            color: #98cc67;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 24px;
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #ffffff;
          }
          p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.6;
            margin-bottom: 28px;
          }
          .btn {
            display: inline-block;
            background: #98cc67;
            color: #001b15;
            text-decoration: none;
            padding: 12px 32px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
          }
          .btn:hover {
            background: #84b256;
            transform: translateY(-2px);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">Bridge2Partners</div>
          <h1>Successfully Unsubscribed</h1>
          <p>You have been unsubscribed from the weekly LinkedIn digest. We are sorry to see you go! If this was a mistake, you can always subscribe again on our insights page.</p>
          <a href="https://bridge2partners.com" class="btn">Return to Website</a>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  } catch (err: any) {
    console.error('Newsletter unsubscribe error:', err);
    return new NextResponse('Internal server error occurred.', { status: 500 });
  }
}
