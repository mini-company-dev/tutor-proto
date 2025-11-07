import { useCallback, useEffect, useRef, useState } from "react";
import { geminiByText } from "@/app/service/geminiByText";
import { geminiByFile } from "@/app/service/geminiByFile";
import {
  ReplyEntry,
  TutorSpeakEvaluation,
} from "@/type/test/speak-test/tutorSpeakTypes";
import { CConversationStatus } from "@/type/test/speak-test/clientAiType";

export const useHandlerAccess = () => {
  const [status, setStatus] = useState<CConversationStatus>(
    CConversationStatus.IDLE
  );
  const [reply, setReply] = useState<ReplyEntry[]>([]);
  const [evaluation, setEvaluation] = useState<TutorSpeakEvaluation>({
    pronunciation: 0,
    fluency: 0,
    coherence: 0,
  });

  const [error, setError] = useState<string | null>(null);

  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<ReplyEntry[]>([]);
  const evaluationCount = useRef(0);

  useEffect(() => {
    replyRef.current = reply;
  }, [reply]);

  const updateEvaluation = (newEval: TutorSpeakEvaluation) => {
    evaluationCount.current += 1;
    const n = evaluationCount.current;

    setEvaluation((prev) => ({
      pronunciation:
        newEval.pronunciation !== 0
          ? (prev.pronunciation * (n - 1) + newEval.pronunciation) / n
          : prev.pronunciation,

      fluency:
        newEval.fluency !== 0
          ? (prev.fluency * (n - 1) + newEval.fluency) / n
          : prev.fluency,

      coherence:
        newEval.coherence !== 0
          ? (prev.coherence * (n - 1) + newEval.coherence) / n
          : prev.coherence,
    }));
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
    evaluation,
    error,
    transcriptEndRef,
    handleUserInput,
    handleAudioInput,
  };
};
