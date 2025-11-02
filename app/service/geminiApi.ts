import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;
const ai = new GoogleGenAI({ apiKey: API_KEY });

interface TutorResponse {
  reply: string;
  feedback: string;
  level: string;
}

/** 텍스트를 음성으로 출력 */
function speakText(text: string, lang = "en-US") {
  if (!("speechSynthesis" in window)) {
    console.warn("Browser does not support SpeechSynthesis");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

/** 영어 문장을 Gemini에게 보내 JSON + 음성으로 응답 받기 */
export async function requestEnglishTutorResponse(
  userText: string
): Promise<TutorResponse> {
  const prompt = `
        You are a kind and patient English tutor.
        Always respond strictly in JSON:

        {
        "reply": string,
        "feedback": string,
        "level": string
        }

        If you cannot respond in JSON, output "{}".
        User: "${userText}"
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = (response.text || "").trim();

    try {
      const cleanText = text.replace(/```json|```/g, "").trim();
      const parsed: TutorResponse = JSON.parse(cleanText);
      speakText(parsed.reply);

      return {
        reply: parsed.reply || "",
        feedback: parsed.feedback || "",
        level: parsed.level || "",
      };
    } catch {
      console.warn("⚠️ JSON 파싱 실패:", text);
      speakText(text);
      return { reply: text, feedback: "", level: "" };
    }
  } catch (error) {
    console.error("Gemini 요청 오류:", error);
    throw new Error("AI 응답을 가져오지 못했습니다.");
  }
}
