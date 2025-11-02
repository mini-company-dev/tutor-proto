"use client";

import { useCallback, useRef, useState } from "react";
import { requestEnglishTutorResponse } from "@/app/service/geminiApi";
import {
  ConversationStatus,
  ReplyEntry,
  TranscriptEntry,
} from "@/app/type/types";

export const useHandlerAccess = () => {
  const [status, setStatus] = useState<ConversationStatus>(
    ConversationStatus.IDLE
  );
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);

  const [reply, setReply] = useState<ReplyEntry[]>([]);

  const [interimTranscript, setInterimTranscript] = useState("");
  const [assessment, setAssessment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const handleUserInput = useCallback(async (userText: string) => {
    if (!userText.trim()) return;
    setStatus(ConversationStatus.CONNECTING);
    setError(null);

    try {
      // 🧠 유저의 메시지를 추가
      setTranscripts((prev) => [...prev, { speaker: "user", text: userText }]);

      // ✅ Gemini에게 요청
      const res = await requestEnglishTutorResponse(userText);

      // 🧩 Gemini 응답 추가
      setTranscripts((prev) => [...prev, { speaker: "ai", text: res.reply }]);

      setReply((prev) => [
        ...prev,
        {
          message: userText,
          reply: res.reply,
        },
      ]);

      setStatus(ConversationStatus.LISTENING);
    } catch (e: any) {
      setError(e.message || "AI 요청 중 오류가 발생했습니다.");
      setStatus(ConversationStatus.ERROR);
    }
  }, []);

  return {
    status,
    reply,
    transcripts,
    interimTranscript,
    assessment,
    error,
    transcriptEndRef,
    handleUserInput,
  };
};
