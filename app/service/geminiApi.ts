import { ReplyEntry, TutorResponse } from "../../type/types";
import axios from "axios";
import { History } from "../api/aiTutor/route";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

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
  userText: string,
  reply: ReplyEntry[]
): Promise<TutorResponse> {
  const history = reply.map((data) => ({
    user: data.message,
    assistant: data.reply,
  }));

  try {
    const req = await axios.post("/api/aiTutor", {
      userText,
      history: history,
    });
    const data: TutorResponse = req.data;
    speakText(data.reply);
    return data;
  } catch (error) {
    console.error("Gemini 요청 오류:", error);
    throw new Error("AI 응답을 가져오지 못했습니다.");
  }
}
