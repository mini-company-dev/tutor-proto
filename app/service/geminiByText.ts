import axios from "axios";
import speakText from "./geminiSpeak";
import {
  ReplyEntry,
  TutorResponse,
} from "@/type/test/speak-test/tutorSpeakTypes";

export async function geminiByText(
  userText: string,
  reply: ReplyEntry[]
): Promise<TutorResponse> {
  const history = reply.map((data) => ({
    user: data.message,
    assistant: data.reply,
  }));

  try {
    const req = await axios.post("/api/aiTutorText", {
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
