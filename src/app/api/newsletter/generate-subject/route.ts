import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ subject: "Semi-Monthly Insights Digest | Bridge2Partners" });
    }

    const { posts, exclude } = await req.json();
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return NextResponse.json({ subject: "Semi-Monthly Insights Digest | Bridge2Partners" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-pro-preview' });

    const contentSnippet = posts.map((p: any, i: number) => `Post ${i+1}: ${p.text}`).join('\n\n');

    let promptText = `
      You are a senior copywriting consultant writing automated campaign digests for commercial bank executives (COOs, CTOs, heads of operations).
      Review the topics in these updates:
      
      ${contentSnippet.substring(0, 3000)}
      
      Write one compelling, high-impact email subject line based on these topics.
      Rules:
      1. No emojis whatsoever.
      2. Peak the curiosity of bank leaders regarding operational risk, core modernization, legacy migration, or post-merger integration.
      3. Keep it short (under 60 characters).
      4. Do NOT wrap the subject line in quotation marks or include any markdown formatting.
    `;

    if (exclude) {
      promptText += `\n5. Do NOT return a subject line similar to this one: "${exclude}". Generate a completely different style or focus.`;
    }

    promptText += `\n\nReturn ONLY the subject line text.`;

    const response = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: promptText
        }]
      }]
    });

    const generatedText = response.response.text()?.trim();
    const subject = generatedText ? generatedText.replace(/^["']|["']$/g, '') : "Semi-Monthly Insights Digest | Bridge2Partners";

    return NextResponse.json({ subject });
  } catch (err) {
    console.error('Failed to generate preview subject:', err);
    return NextResponse.json({ subject: "Semi-Monthly Insights Digest | Bridge2Partners" });
  }
}
