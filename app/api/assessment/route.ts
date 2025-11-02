import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { marked } from "marked";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY!, // 서버에서는 NEXT_PUBLIC 필요 없음
});

export async function POST(req: NextRequest) {
  try {
    const { transcripts } = await req.json();

    const transcriptText = transcripts
      .map((t: any) => `${t.speaker === "user" ? "User" : "AI"}: ${t.text}`)
      .join("\n");

    const prompt = `Evaluate this English conversation transcript:

    ${transcriptText}
    
    Return Markdown with:
    - **Overall CEFR Level (A1–C2)**
    - **Strengths** (2–3 bullets)
    - **Areas for Improvement** (2–3 bullets)
    - **Suggestions** (practical advice)
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    const markdownText = response.text || "";
    const html = marked.parse(markdownText);

    console.log(html);

    return NextResponse.json({ html });
  } catch (error: any) {
    console.error("Error generating assessment:", error);
    return NextResponse.json(
      { error: "Could not generate assessment." },
      { status: 500 }
    );
  }
}
