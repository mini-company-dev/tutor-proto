import {
  ReplyEntry,
  TutorResponse,
} from "@/type/test/speak-test/tutorSpeakTypes";
import speakText from "@/app/service/geminiSpeak";
import { ClientResponse } from "@/type/clientResponse";
import { requestApi } from "./apiFactory";

export async function speakByFile(
  audioBlob: Blob,
  reply: ReplyEntry[]
): Promise<ClientResponse<TutorResponse>> {
  const history = reply.map((data) => ({
    user: data.message,
    assistant: data.reply,
  }));

  const formData = new FormData();
  formData.append("file", audioBlob, "voice.webm");
  formData.append("history", JSON.stringify(history));

  const response = await requestApi<TutorResponse>(
    "POST",
    "/api/aiTutorFile",
    formData
  );

  if (!response.payload) {
    return {
      payload: undefined,
      explanation: response.explanation ?? "AI 음성 응답 실패",
    };
  }
  return response;
}
