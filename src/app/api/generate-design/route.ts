import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { prompt, currentSlides } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const aggressivePrompt = `You are an Expert Art Director and Layout Designer for Bridge2Partners.
You no longer write CSS. You compose slides by selecting specific design tokens from our strict Brand Dictionary.
You do not speak. You do not converse. You ONLY output raw, valid JSON.

CURRENT STATE:
${JSON.stringify(currentSlides || [])}

USER INSTRUCTION:
${prompt}

CRITICAL STATE DIRECTIVE: 
You are acting as an Editor. I am passing you the CURRENT STATE of the slide deck.
If the user asks for an edit, you MUST:
1. Start with the CURRENT STATE array. Do NOT drop any slides. The array must remain exactly its current length (usually 5).
2. If a slide is missing or empty in the CURRENT STATE, you MUST write it. 
3. Surgically apply the user's requested text or token changes to the specific slides they mention.
4. Leave all other slides EXACTLY as they are in the CURRENT STATE. 
5. Return the ENTIRE, fully merged array.

YOUR DICTIONARY:
- backgroundColorToken: 'primary', 'neutral', 'light', 'dark'
- layoutToken: 'center', 'left'
- cardVariantToken: 'solid', 'glass', 'neon-outline'
- headlineColorToken: 'text-light', 'text-dark', 'text-accent'

Analyze the requested narrative and carefully select the best combination of tokens to create a beautiful, brand-compliant composition.

CRITICAL OUTPUT SCHEMA:
You MUST output raw JSON. Your JSON MUST contain two top-level keys in this exact order:

"_execution_plan": A brief string explaining exactly which slide indexes you are keeping, which you are editing, and which you are writing from scratch based on the user's prompt.

"slides": The final 5-slide array containing the fully merged updates.

Example Format:
{
  "_execution_plan": "The user wants to fix Slide 2 and 4. I will clone slides 1, 3, and 5 from the CURRENT STATE. I will rewrite slide 2 with a light background and slide 4 with a dark background.",
  "slides": [
    {
      "id": 1684351,
      "type": "hook",
      "headline": "Main slide text",
      "subheadline": "Optional secondary text",
      "body": "Optional body paragraph text",
      "kicker": "01 / Advantage",
      "metric": "73%",
      "footnote": "Source Data",
      "backgroundColorToken": "dark",
      "layoutToken": "center",
      "cardVariantToken": "glass",
      "headlineColorToken": "text-accent"
    }
  ]
}

CRITICAL RULES:
1. Always retain the user's previously generated text/slides unless told to rewrite them.
2. If editing an existing slide, retain its exact numeric "id" from CURRENT STATE. If creating a new slide, randomly generate a unique numeric "id".
3. Use ONLY the exact token strings provided in YOUR DICTIONARY. DO NOT invent tokens.

DO NOT output conversational text. Just the JSON.`;

    const result = await model.generateContent(aggressivePrompt);
    const responseText = result.response.text();
    
    // Strip markdown formatting if the model accidentally includes it
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedJson = JSON.parse(cleanedText);

    if (!parsedJson.slides || !Array.isArray(parsedJson.slides)) {
      throw new Error("Invalid schema structure returned from model.");
    }

    return NextResponse.json(parsedJson);

  } catch (error: any) {
    console.error('Generative Route Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate design' }, { status: 500 });
  }
}
