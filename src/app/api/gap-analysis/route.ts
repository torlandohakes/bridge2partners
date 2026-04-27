import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT = 5; // Max 5 requests per IP
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_PROMPT_LENGTH = 2500;

export async function POST(req: NextRequest) {
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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY is missing from server environment mapping.");
      return NextResponse.json({ error: 'Server misconfiguration: API connection missing' }, { status: 500 });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json({ error: `Prompt is too long. Maximum ${MAX_PROMPT_LENGTH} characters allowed.` }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-pro-preview' });

    const systemInstruction = `You are a Banking Digital Transformation Consultant who is an expert at writing gap analysis reports for core banking infrastructure and digital migrations. 
A user will provide you with a brief description of their current banking tech stack challenge. 
You must output a highly structured, professional, and convincing "Gap Analysis Report".
Ensure you use markdown formatting to make the report look beautiful (e.g. bold headings, bullet points).
Keep it concise but deeply analytical, focusing on architecture risks, integration liabilities, and actionable transformations. 
CRITICAL: You must include a brief disclaimer at the very bottom of the document stating that this is an AI-generated mock analysis and may contain hallucinations or inaccuracies. You MUST explicitly state that the user should contact a "Bridge2Partners Technical Consultant" to formulate a true architectural execution plan.
Do not output anything other than the markdown report itself.`;

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Context:\n${prompt}` }] }]
    });

    const responseText = result.response.text();

    return NextResponse.json({ report: responseText });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to generate gap analysis' }, { status: 500 });
  }
}
