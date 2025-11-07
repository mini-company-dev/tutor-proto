import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { TutorSpeakEvaluation } from "@/type/test/speak-test/tutorSpeakTypes";

interface History {
  user: string;
  assistant: string;
}

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY!,
});

export async function POST(
  req: NextRequest
): Promise<
  NextResponse<TutorSpeakEvaluation> | NextResponse<{ error: string }>
> {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const historyJson = form.get("history") as string | null;
    const history: History[] = historyJson ? JSON.parse(historyJson) : [];

    if (!file) {
      return NextResponse.json(
        { error: "음성 파일이 필요합니다." },
        { status: 400 }
      );
    }

    const arrayBuf = await file.arrayBuffer();
    const base64 = bufferToBase64(arrayBuf);
    const mimeType = file.type || "audio/webm";

    const prompt = buildPrompt(history);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: { data: base64, mimeType },
            },
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        response_mime_type: "application/json",
      },
    } as any);

    const text = (response.text || "").trim();
    const clean = text.replace(/```json|```/g, "").trim();

    try {
      const parsed: TutorSpeakEvaluation = JSON.parse(clean);
      return NextResponse.json(parsed);
    } catch {
      console.warn("⚠️ JSON 파싱 실패:", text);
      return NextResponse.json(
        { error: "JSON 파싱 실패", raw: text },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("AI 요청 오류:", err);
    return NextResponse.json(
      { error: "AI 응답을 가져오지 못했습니다." },
      { status: 500 }
    );
  }
}

function bufferToBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const buildPrompt = (history: History[]): string => {
  const formattedHistory = history
    .map(
      (entry, i) =>
        `User (${i + 1}): ${entry.user}\nAssistant (${i + 1}): ${
          entry.assistant
        }`
    )
    .join("\n");

  return `
        You are Ken, a friendly English conversation partner.
        You will receive the user's voice input (not text). Listen carefully,
        understand what they said, and respond naturally in English (1–3 sentences).

        After replying, objectively evaluate their spoken English on the following five metrics (1–100):

        
        {
            "user": string,            // The exact English transcription of what the user said
            "reply": string,           // The AI's natural English response to the user's speech (1–3 sentences)
            "pronunciation": number,   // Pronunciation quality score (1–100) — clarity and correctness of spoken sounds
            "fluency": number,         // Fluency score (1–100) — smoothness, rhythm, and natural speed of speech
            "coherence": number        // Coherence score (1–100) — how logically and clearly the ideas are connected
        }


        Guidelines:
        - Reply naturally like a human, not a teacher or AI.
        - Avoid grammar explanations or corrections.
        - Keep the tone friendly and conversational.
        - Maintain consistency with the past conversation:
        ${formattedHistory || "(no previous messages)"}

        Respond strictly in valid JSON format only — no extra text, markdown, or code fences.
  `.trim();
};
