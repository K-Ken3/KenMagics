
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for KARASIRA Ken.
Ken combines skills in full-stack software development, CapCut & Premiere Pro video editing, Photoshop graphic design, and video audio arrangement (arranging sound FX, background tracks, and beat syncs in video edits).

Key Facts about Ken:
- Experience: 3+ years in technology, video editing, design, and web development.
- Skills: React 19, TypeScript, Next.js, Node.js, CapCut Pro, Premiere Pro, Adobe Photoshop, Adobe Audition, Video Sound FX & Beat Placement.
- Video Audio Role: Not a traditional sound engineer, but an expert at arranging sounds, voiceovers, ambient FX, and music tracks precisely in video edits.
- Current Role: Social manager & designer at Icyeza One Coffee Shop in Kigali, Rwanda.
- Location: Kigali, Rwanda.
- Email: karasiraken5@gmail.com

Your goal is to answer questions about Ken's portfolio, video/design capabilities, and web apps.
Keep answers concise, friendly, and professional.
`;

export async function chatWithAI(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again or use the contact form below.";
  }
}
