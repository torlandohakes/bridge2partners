import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
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

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

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
