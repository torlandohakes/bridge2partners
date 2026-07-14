import { NextResponse } from 'next/server';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { Resend } from 'resend';
import { db } from '@/lib/firebase';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Security Check: prevent random triggers of email digests
    if (!secret || (secret !== process.env.NEWSLETTER_SECRET && secret !== process.env.RESEND_API_KEY)) {
      return NextResponse.json({ error: 'Unauthorized key.' }, { status: 401 });
    }

    if (!resend) {
      console.warn("Resend client is not configured (RESEND_API_KEY missing).");
      return NextResponse.json({ error: 'Resend API key is not configured.' }, { status: 500 });
    }

    // Fetch the newsletter config and dynamic sender email from Firestore site config
    let senderEmail = 'torlando.hakes@bridge2partners.com'; // Verified domain fallback
    let senderName = 'Bridge2Partners Insights'; // Default display name
    let frequency = '1st_15th';
    let dayOfWeek = '1st & 15th';
    let timeOfDay = '09:00';
    let customSubjectLine = '';
    let isPaused = false;
    let filterDays = 15;
    let maxPosts = 15;
    let excludedPostIds: string[] = [];

    try {
      const configSnap = await getDoc(doc(db, 'site-settings', 'newsletter_config'));
      if (configSnap.exists()) {
        const configData = configSnap.data();
        if (configData.senderEmail) {
          senderEmail = configData.senderEmail;
        }
        if (configData.senderName) {
          senderName = configData.senderName;
        }
        if (configData.frequency) {
          frequency = configData.frequency;
        }
        if (configData.dayOfWeek) {
          dayOfWeek = configData.dayOfWeek;
        }
        if (configData.timeOfDay) {
          timeOfDay = configData.timeOfDay;
        }
        if (configData.subjectLine) {
          customSubjectLine = configData.subjectLine.trim();
        }
        if (configData.paused === true) {
          isPaused = true;
        }
        if (configData.filterDays !== undefined) {
          filterDays = Number(configData.filterDays);
        }
        if (configData.maxPosts !== undefined) {
          maxPosts = Number(configData.maxPosts);
        }
        if (configData.excludedPostIds !== undefined) {
          excludedPostIds = configData.excludedPostIds;
        }
      } else {
        // Fallback to email_config if newsletter_config doesn't exist yet
        const emailConfigSnap = await getDoc(doc(db, 'site-settings', 'email_config'));
        if (emailConfigSnap.exists() && emailConfigSnap.data().senderEmail) {
          senderEmail = emailConfigSnap.data().senderEmail;
        }
        if (emailConfigSnap.exists() && emailConfigSnap.data().senderName) {
          senderName = emailConfigSnap.data().senderName;
        }
      }
    } catch (e) {
      console.error('Failed to fetch newsletter config from Firestore:', e);
    }

    const testEmail = searchParams.get('testEmail');
    const force = searchParams.get('force') === 'true';
    const bypassSchedule = force || !!testEmail;

    if (!bypassSchedule) {
      const nowInPacific = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
      
      // Validate Hour
      const [targetHourStr] = timeOfDay.split(':');
      const targetHour = parseInt(targetHourStr, 10) || 9;
      const currentHour = nowInPacific.getHours();
      
      if (currentHour !== targetHour) {
        console.log(`Schedule check failed: current hour ${currentHour} does not match target hour ${targetHour}.`);
        return NextResponse.json({ success: true, message: `Hour check failed (Current: ${currentHour}:00, Target: ${targetHour}:00). Dispatch skipped.` });
      }

      // Validate Date/Day based on frequency
      const dayOfMonth = nowInPacific.getDate();
      const currentDayOfWeek = nowInPacific.toLocaleDateString("en-US", { weekday: 'long' });

      if (frequency === '1st_15th') {
        if (dayOfMonth !== 1 && dayOfMonth !== 15) {
          console.log(`Schedule check failed: day of month is ${dayOfMonth}, target is 1st or 15th.`);
          return NextResponse.json({ success: true, message: `Date check failed (Current day of month: ${dayOfMonth}, Target: 1st or 15th). Dispatch skipped.` });
        }
      } else if (frequency === 'weekly') {
        if (currentDayOfWeek !== dayOfWeek) {
          console.log(`Schedule check failed: day of week is ${currentDayOfWeek}, target is ${dayOfWeek}.`);
          return NextResponse.json({ success: true, message: `Day check failed (Current: ${currentDayOfWeek}, Target: ${dayOfWeek}). Dispatch skipped.` });
        }
      } else if (frequency === 'biweekly') {
        const isFirstWeek = dayOfMonth >= 1 && dayOfMonth <= 7;
        const isThirdWeek = dayOfMonth >= 15 && dayOfMonth <= 21;
        if (currentDayOfWeek !== dayOfWeek || (!isFirstWeek && !isThirdWeek)) {
          console.log(`Schedule check failed: bi-weekly check (day: ${dayOfMonth}, dayOfWeek: ${currentDayOfWeek}), target is ${dayOfWeek} on 1st/3rd week.`);
          return NextResponse.json({ success: true, message: `Bi-weekly check failed. Dispatch skipped.` });
        }
      } else if (frequency === 'monthly') {
        const isFirstWeek = dayOfMonth >= 1 && dayOfMonth <= 7;
        if (currentDayOfWeek !== dayOfWeek || !isFirstWeek) {
          console.log(`Schedule check failed: monthly check (day: ${dayOfMonth}, dayOfWeek: ${currentDayOfWeek}), target is first ${dayOfWeek} of month.`);
          return NextResponse.json({ success: true, message: `Monthly check failed. Dispatch skipped.` });
        }
      }
    }

    if (isPaused && !testEmail) {
      console.log("Newsletter delivery is currently paused by admin. Execution aborted.");
      return NextResponse.json({ success: true, message: 'Campaign is paused. Dispatch skipped.' });
    }

    // Determine host dynamically from the incoming request (preview, local, prod)
    const { protocol, host } = new URL(req.url);
    const baseUrl = `${protocol}//${host}`;
    const emailBaseUrl = (host.includes('localhost') || host.includes('127.0.0.1')) 
      ? 'https://bridge2partners-production.web.app' 
      : baseUrl;

    // 1. Fetch latest LinkedIn posts from local API (cached & validated)
    const linkedinRes = await fetch(`${baseUrl}/api/linkedin?count=50`);
    if (!linkedinRes.ok) {
      throw new Error(`Failed to fetch LinkedIn feed from API. Status: ${linkedinRes.status}`);
    }
    const linkedinData = await linkedinRes.json();
    const rawPosts = linkedinData.posts || [];
    
    // Sort posts initially by timestamp descending (newest first)
    const sortedRawPosts = [...rawPosts].sort((a: any, b: any) => {
      const timeA = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime();
      const timeB = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime();
      return timeB - timeA;
    });

    const periodPosts = sortedRawPosts.filter((post: any) => {
      // Exclude explicitly deselected updates
      if (excludedPostIds.includes(post.id)) return false;

      const postTime = typeof post.timestamp === 'number' ? post.timestamp : new Date(post.timestamp).getTime();
      const rangeMs = filterDays * 24 * 60 * 60 * 1000;
      return postTime >= (Date.now() - rangeMs);
    });

    const articles = periodPosts.filter((p: any) => p.isArticle);
    const regularPosts = periodPosts.filter((p: any) => !p.isArticle);
    const posts = [...articles, ...regularPosts].slice(0, maxPosts);

    if (posts.length === 0) {
      return NextResponse.json({ success: true, message: 'No posts from the preceding period found. Digest skipped.' });
    }

    // 2. Fetch active subscribers from Firestore or target test email override
    let activeSubscribers: { email: string }[] = [];
    if (testEmail) {
      activeSubscribers = [{ email: testEmail }];
      console.log(`Test email dispatch requested for: ${testEmail}`);
    } else {
      const subscribersQuery = query(collection(db, 'subscribers'), where('active', '==', true));
      const subscribersSnap = await getDocs(subscribersQuery);
      activeSubscribers = subscribersSnap.docs.map(doc => doc.data() as { email: string });
    }

    if (activeSubscribers.length === 0) {
      return NextResponse.json({ success: true, message: 'No active subscribers found.' });
    }

    // Helper to parse post text into headline and body
    const getPostHeadlineAndBody = (text: string) => {
      if (!text) return { headline: '', body: '' };
      const parts = text.split('\n\n');
      if (parts.length > 1) {
        return { headline: parts[0].trim(), body: parts.slice(1).join('\n\n').trim() };
      }
      const lines = text.split('\n');
      if (lines.length > 1) {
        return { headline: lines[0].trim(), body: lines.slice(1).join('\n').trim() };
      }
      const match = text.match(/^([^.!?]+[.!?])\s*(.*)$/);
      if (match) {
        return { headline: match[1].trim(), body: match[2].trim() };
      }
      return { headline: '', body: text };
    };

    // 3. Compile responsive HTML digest email layout
    const articleCards = posts.filter((p: any) => p.isArticle);
    const regularCards = posts.filter((p: any) => !p.isArticle);

    const renderCard = (post: any) => {
      const imageUrl = post.imageUrl 
        ? (post.imageUrl.startsWith('/') ? `${emailBaseUrl}${post.imageUrl}` : post.imageUrl)
        : '';
        
      const { headline, body } = getPostHeadlineAndBody(post.text);
      const cleanedBody = body
        .split('\n')
        .map(line => line.trim())
        .join('\n');
      const isTruncated = cleanedBody.length > 320;
      const truncatedBody = isTruncated 
        ? `${cleanedBody.substring(0, 320)}... <a href="${post.link}" target="_blank" style="color: #98cc67; text-decoration: none; font-weight: bold; display: inline-block;">Keep reading</a>` 
        : cleanedBody;

      const authorHeaderHtml = `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
          <tr>
            <td width="44" valign="top">
              <div style="width: 40px; height: 40px; border-radius: 4px; overflow: hidden; background-color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.1);">
                <img src="${emailBaseUrl}/images/B2P_LI_LOGO_Primary.webp" alt="Bridge2Partners" width="40" height="40" style="display: block; object-fit: cover;" />
              </div>
            </td>
            <td style="padding-left: 12px;" valign="top">
              <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; color: #ffffff; line-height: 1.2;">
                Bridge2Partners <span style="display: inline-block; background-color: #0066f5; width: 10px; height: 10px; border-radius: 50%; vertical-align: middle; margin-left: 2px;"></span>
              </div>
              <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: rgba(255, 255, 255, 0.5); margin-top: 2px; line-height: 1.1;">
                Banking Transformation Advisors
              </div>
              <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; color: rgba(255, 255, 255, 0.4); margin-top: 1px;">
                ${post.date || 'Recent Update'}
              </div>
            </td>
          </tr>
        </table>
      `;

      const contentHtml = `
        <!-- Post Headline -->
        ${headline ? `
          <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; color: #ffffff; line-height: 1.4; margin-bottom: 12px;">
            ${headline}
          </div>
        ` : ''}
        
        <!-- Post Body Text -->
        <div style="font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 1.6; color: rgba(255, 255, 255, 0.75); white-space: pre-wrap; margin-bottom: 16px; text-align: left;">${truncatedBody}</div>
      `;

      const footerHtml = `
        <!-- Engagement Indicators and Call To Actions -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: rgba(255, 255, 255, 0.4); font-weight: bold; vertical-align: middle;">
              <img src="${emailBaseUrl}/images/icon_like.svg" width="12" height="12" style="display: inline-block; vertical-align: middle; margin-right: 4px; opacity: 0.4;" alt="likes" />
              <span style="vertical-align: middle; margin-right: 12px; font-weight: normal; color: rgba(255, 255, 255, 0.4);">${post.likes}</span>
              <img src="${emailBaseUrl}/images/icon_comment.svg" width="12" height="12" style="display: inline-block; vertical-align: middle; margin-right: 4px; opacity: 0.4;" alt="comments" />
              <span style="vertical-align: middle; font-weight: normal; color: rgba(255, 255, 255, 0.4);">${post.comments}</span>
            </td>
            <td align="right">
              <a href="${post.link}" target="_blank" style="display: inline-block; background-color: #98cc67; color: #001b15; text-decoration: none; padding: 8px 16px; border-radius: 50px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: bold;">
                View & Interact on LinkedIn
              </a>
            </td>
          </tr>
        </table>
      `;

      if (post.isArticle) {
        return `
          <!-- Article Card (Image on Top) -->
          <div style="background-color: #0b1a16; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; margin-bottom: 24px; text-align: left;">
            ${imageUrl ? `
              <div style="width: 100%; overflow: hidden; background-color: #050e0c; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <a href="${post.link}" target="_blank">
                  <img src="${imageUrl}" alt="Article Cover" style="width: 100%; height: auto; display: block; object-fit: cover;" />
                </a>
              </div>
            ` : ''}
            <div style="padding: 24px;">
              ${authorHeaderHtml}
              ${contentHtml}
              ${footerHtml}
            </div>
          </div>
        `;
      } else {
        return `
          <!-- Regular Post Card (Image on Bottom) -->
          <div style="background-color: #0b1a16; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px; text-align: left;">
            ${authorHeaderHtml}
            ${contentHtml}
            ${imageUrl ? `
              <div style="margin-bottom: 20px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.05); background-color: #050e0c;">
                <a href="${post.link}" target="_blank">
                  <img src="${imageUrl}" alt="LinkedIn Update Attachment" style="width: 100%; aspect-ratio: 1 / 1; display: block; object-fit: cover;" />
                </a>
              </div>
            ` : ''}
            ${footerHtml}
          </div>
        `;
      }
    };

    let compiledPostsHtml = '';
    
    if (articleCards.length > 0) {
      compiledPostsHtml += `
        <!-- Section Heading: Featured Articles -->
        <h2 style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 20px 0; border-left: 3px solid #98cc67; padding-left: 10px; line-height: 1.2; text-align: left;">
          Featured Articles
        </h2>
        ${articleCards.map(renderCard).join('')}
        <div style="height: 12px;"></div>
      `;
    }
    
    if (regularCards.length > 0) {
      compiledPostsHtml += `
        <!-- Section Heading: Latest Insights -->
        <h2 style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 20px 0; border-left: 3px solid #ffffff; padding-left: 10px; line-height: 1.2; text-align: left;">
          Latest Insights
        </h2>
        ${regularCards.map(renderCard).join('')}
      `;
    }

    // Generate a compelling subject line using Gemini based on posts contents (or use manual override)
    let subject = customSubjectLine || "Semi-Monthly Insights Digest | Bridge2Partners";
    const geminiApiKey = process.env.GEMINI_API_KEY;
    
    // Only query Gemini if there is NO manual subject line override set
    if (!customSubjectLine && geminiApiKey && posts.length > 0) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-3.1-pro-preview' });
        
        const contentSnippet = posts.map((p: any, i: number) => `Post ${i+1}: ${p.text}`).join('\n\n');
        
        const response = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: `
            You are a senior copywriting consultant writing automated campaign digests for commercial bank executives (COOs, CTOs, heads of operations).
            Review the topics in these updates:
            
            ${contentSnippet.substring(0, 3000)}
            
            Write one compelling, high-impact email subject line based on these topics.
            Rules:
            1. No emojis whatsoever.
            2. Peak the curiosity of bank leaders regarding operational risk, core modernization, legacy migration, or post-merger integration.
            3. Keep it short (under 60 characters).
            4. Do NOT wrap the subject line in quotation marks or include any markdown formatting.
            
            Return ONLY the subject line text.
          ` }] }]
        });
        
        const generatedText = response.response.text()?.trim();
        if (generatedText) {
          subject = generatedText.replace(/^["']|["']$/g, '');
          console.log(`Gemini generated subject: "${subject}"`);
        }
      } catch (err) {
        console.error('Failed to generate subject line with Gemini:', err);
      }
    }

    // Send emails in batches or parallel
    console.log(`Sending semi-monthly LinkedIn digest to ${activeSubscribers.length} subscribers...`);
    const emailPromises = activeSubscribers.map(async (sub) => {
      const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Semi-Monthly Insights Digest | Bridge2Partners</title>
        </head>
        <body style="background-color: #000d0a; color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000d0a; padding: 24px 12px;">
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; text-align: left;">
                  
                  <!-- Email Header Banner -->
                  <tr>
                    <td style="padding: 24px 0; border-bottom: 2px solid #ffffff; margin-bottom: 32px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td>
                            <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 800; color: #98cc67; text-transform: uppercase; letter-spacing: 0.25em;">
                              BRIDGE2PARTNERS &bull; INSIGHTS
                            </div>
                            <div style="font-family: 'Montserrat', 'Georgia', Times, serif; font-size: 26px; font-weight: 900; color: #ffffff; margin-top: 8px; line-height: 1.2; letter-spacing: -0.02em;">
                              Insights from the Frontlines
                            </div>
                            <div style="font-family: 'Public Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: rgba(255, 255, 255, 0.6); margin-top: 8px; line-height: 1.5; font-weight: 300;">
                              Banking modernization insights, post-merger integration strategies, and industry analysis directly from experienced practitioners.
                            </div>
                            <div style="margin-top: 16px;">
                              <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="padding-right: 12px;">
                                    <a href="https://www.linkedin.com/company/bridge-2-partners" target="_blank" style="display: inline-block; background-color: #98cc67; color: #001b15; text-decoration: none; padding: 6px 16px; border-radius: 50px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: bold; line-height: 1.2;">
                                      Follow on LinkedIn
                                    </a>
                                  </td>
                                  <td>
                                    <a href="mailto:?subject=Bridge2Partners%20Insights%20Digest&body=I%27m%20reading%20the%20Bridge2Partners%20Insights%20Digest%2C%20which%20features%20their%20latest%20banking%20modernization%20insights%2C%20post-merger%20integration%20strategies%2C%20and%20industry%20updates%20from%20practicing%20advisors.%0A%0AYou%20can%20read%20this%20full%20newsletter%20edition%20online%20here%3A%0Ahttps%3A%2F%2Fbridge2partners-production.web.app%2Finsights" target="_blank" style="display: inline-block; background-color: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); text-decoration: none; padding: 5px 15px; border-radius: 50px; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: bold; line-height: 1.2;">
                                      Share via Email
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Spacer -->
                  <tr><td style="height: 24px;"></td></tr>
                  
                  <!-- Feed List Content -->
                  <tr>
                    <td>
                      ${compiledPostsHtml}
                    </td>
                  </tr>
                  
                  <!-- Footer Disclaimers -->
                  <tr>
                    <td style="padding: 32px 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                      <p style="font-family: 'Public Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: rgba(255, 255, 255, 0.4); line-height: 1.6; margin: 0 0 16px 0;">
                        You are receiving this digest because you subscribed to insights on <a href="${emailBaseUrl}" target="_blank" style="color: #98cc67; text-decoration: none;">bridge2partners.com</a>.
                      </p>
                      <a href="${emailBaseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(sub.email)}" target="_blank" style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 11px; color: #98cc67; text-decoration: underline; font-weight: bold;">
                        Unsubscribe from this list
                      </a>
                      <p style="font-family: 'Public Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 9px; color: rgba(255, 255, 255, 0.3); margin-top: 16px; line-height: 1.4;">
                        &copy; ${new Date().getFullYear()} Bridge2Partners LLC. All rights reserved.<br/>
                        1209 N. Orange St, Wilmington, DE 19801
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;
 
      return resend.emails.send({
        from: `${senderName} <${senderEmail}>`,
        to: sub.email,
        subject: subject,
        html: emailHtml
      });
    });
 
    const sendResults = await Promise.allSettled(emailPromises);
    const succeeded = sendResults.filter(r => r.status === 'fulfilled').length;
    const failed = sendResults.filter(r => r.status === 'rejected').length;
 
    console.log(`Digest distribution finished. Successful sends: ${succeeded}, Failed: ${failed}`);
    return NextResponse.json({ 
      success: true, 
      message: `Semi-Monthly Insights Digest successfully sent to ${succeeded} subscribers (${failed} failed).` 
    });
  } catch (err: any) {
    console.error('Newsletter send digest crash:', err);
    return NextResponse.json({ error: 'Internal server error occurred.' }, { status: 500 });
  }
}
