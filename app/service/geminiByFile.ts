import axios from "axios";
import speakText from "./geminiSpeak";
import {
  ReplyEntry,
  TutorResponse,
} from "@/type/test/speak-test/tutorSpeakTypes";

export async function geminiByFile(
  audioBlob: Blob,
  reply: ReplyEntry[]
): Promise<TutorResponse> {
  const history = reply.map((data) => ({
    user: data.message,
    assistant: data.reply,
  }));

  const formData = new FormData();
  formData.append("file", audioBlob, "voice.webm");
  formData.append("history", JSON.stringify(history));

  try {
    const res = await axios.post("/api/aiTutorFile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data: TutorResponse = res.data;
    speakText(data.reply);
    return data;
  } catch (error) {
    console.error("🎧 Gemini 음성 요청 오류:", error);
    throw new Error("AI 음성 응답을 가져오지 못했습니다.");
  }
}
