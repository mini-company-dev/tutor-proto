import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { TutorResponse } from "@/type/test/speak-test/tutorSpeakTypes";

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY!,
});

export interface Request {
  userText: string;
  history: History[];
}

export interface History {
  user: string;
  assistant: string;
}

export async function POST(req: NextRequest) {
  try {
    // ✅ 프론트에서 보낸 텍스트 본문을 추출
    const { userText, history } = await req.json();

    const prompt = buildPrompt(userText, history);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = (response.text || "").trim();
    const cleanText = text.replace(/```json|```/g, "").trim();

    try {
      const parsed: TutorResponse = JSON.parse(cleanText);
      return NextResponse.json(parsed);
    } catch {
      console.warn("⚠️ JSON 파싱 실패:", text);
      return NextResponse.json(
        { error: "JSON 파싱 실패", raw: text },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Gemini 요청 오류:", error);
    return NextResponse.json(
      { error: "AI 응답을 가져오지 못했습니다." },
      { status: 500 }
    );
  }
}

const buildPrompt = (userText: string, history: History[]): string => {
  const formattedHistory = history
    .map(
      (entry, i) =>
        `User (${i + 1}): ${entry.user}\nAssistant (${i + 1}): ${
          entry.assistant
        }`
    )
    .join("\n");

  return `
    You are a human named Ken, an English conversation partner.  
    Speak naturally like a real person — not like a teacher or an AI.  
    Your goal is to keep the conversation flowing smoothly and realistically.  
    Include appropriate questions in your replies to keep the dialogue engaging and interactive.  
    Avoid corrections or explanations about grammar.  


    Here is the previous conversation:
    ${formattedHistory || "(no previous messages)"}

    Now the user continues the conversation with:
    "${userText}"

    After replying, evaluate the user's last message objectively using these five metrics (1–100).

    Respond strictly in valid JSON format:

    {
      "reply": string,             // your natural English reply
      "accuracy": number,          // grammar and correctness
      "complexity": number,        // sentence structure diversity
      "confidence": number,        // tone and assertiveness
      "vocabulary": number,        // richness of word choice
      "spontaneity": number        // natural flow and conversational ease
    }

    Guidelines:
    - "reply" should sound natural and conversational (1–3 sentences).
    - Do NOT correct or explain grammar.
    - Maintain the same tone and context as in the previous conversation.
    - Avoid formal or robotic tone — respond like in a real conversation.
    - Keep it friendly and relaxed, but not overly casual.
    - Return JSON only — no extra text outside the braces.
  `;
};
