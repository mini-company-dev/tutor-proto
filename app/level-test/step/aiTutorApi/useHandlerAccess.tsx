import { useCallback, useEffect, useRef, useState } from "react";
import { geminiByText } from "@/app/service/geminiByText";
import { geminiByFile } from "@/app/service/geminiByFile";
import {
  ReplyEntry,
  TutorResponse,
} from "@/type/test/speak-test/tutorSpeakTypes";
import { CConversationStatus } from "@/type/test/speak-test/clientAiType";

export const useHandlerAccess = (
  updateScorePronunciation: (addScore: number, sentence: string) => void,
  updateScoreFluency: (addScore: number, sentence: string) => void,
  updateScoreCoherence: (addScore: number, sentence: string) => void
) => {
  const [status, setStatus] = useState<CConversationStatus>(
    CConversationStatus.IDLE
  );
  const [reply, setReply] = useState<ReplyEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<ReplyEntry[]>([]);

  useEffect(() => {
    replyRef.current = reply;
  }, [reply]);

  const updateEvaluation = (res: TutorResponse) => {
    console.log(res);
    updateScorePronunciation(res.pronunciation, res.user);
    updateScoreFluency(res.fluency, res.user);
    updateScoreCoherence(res.coherence, res.user);
  };

  const handleUserInput = useCallback(async (userText: string) => {
    if (!userText.trim()) return;
    setStatus(CConversationStatus.CONNECTING);
    setError(null);

    try {
      const res = await geminiByText(userText, replyRef.current);
      updateEvaluation(res);

      setReply((prev) => [...prev, { message: userText, reply: res.reply }]);
      setStatus(CConversationStatus.IDLE);
    } catch (e: any) {
      setError(e.message || "AI 요청 중 오류가 발생했습니다.");
      setStatus(CConversationStatus.ERROR);
    }
  }, []);

  const handleAudioInput = useCallback(async (audioBlob: Blob) => {
    setStatus(CConversationStatus.CONNECTING);
    setError(null);

    try {
      const res = await geminiByFile(audioBlob, replyRef.current);
      updateEvaluation(res);

      setReply((prev) => [...prev, { message: res.user, reply: res.reply }]);
      setStatus(CConversationStatus.IDLE);
    } catch (e: any) {
      setError(e.message || "AI 음성 요청 중 오류가 발생했습니다.");
      setStatus(CConversationStatus.ERROR);
    }
  }, []);

  return {
    status,
    setStatus,
    reply,
    error,
    transcriptEndRef,
    handleUserInput,
    handleAudioInput,
  };
};
