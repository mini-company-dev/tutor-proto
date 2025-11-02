import { useCallback, useEffect, useRef, useState } from "react";
import { requestEnglishTutorResponse } from "@/app/service/geminiApi";
import {
  ConversationStatus,
  EvaluationMetrics,
  ReplyEntry,
  TranscriptEntry,
} from "@/app/type/types";

export const useHandlerAccess = () => {
  const [status, setStatus] = useState<ConversationStatus>(
    ConversationStatus.IDLE
  );
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [assessment, setAssessment] = useState("");

  const [reply, setReply] = useState<ReplyEntry[]>([]);
  const [evaluation, setEvaluation] = useState<EvaluationMetrics>({
    accuracy: 0,
    complexity: 0,
    confidence: 0,
    vocabulary: 0,
    spontaneity: 0,
  });

  const evaluationCount = useRef(0);

  const updateEvaluation = (newEval: EvaluationMetrics) => {
    evaluationCount.current += 1;
    const n = evaluationCount.current;

    // 평균 업데이트
    setEvaluation((prev) => ({
      accuracy: (prev.accuracy * (n - 1) + newEval.accuracy) / n,
      complexity: (prev.complexity * (n - 1) + newEval.complexity) / n,
      confidence: (prev.confidence * (n - 1) + newEval.confidence) / n,
      vocabulary: (prev.vocabulary * (n - 1) + newEval.vocabulary) / n,
      spontaneity: (prev.spontaneity * (n - 1) + newEval.spontaneity) / n,
    }));
  };

  const [error, setError] = useState<string | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const replyRef = useRef<ReplyEntry[]>([]);
  useEffect(() => {
    replyRef.current = reply;
  }, [reply]);

  useEffect(() => {
    console.log(evaluation);
  }, [evaluation]);

  const handleUserInput = useCallback(async (userText: string) => {
    if (!userText.trim()) return;
    setStatus(ConversationStatus.CONNECTING);
    setError(null);

    try {
      // 지우고 싶음
      setTranscripts((prev) => [...prev, { speaker: "user", text: userText }]);
      const res = await requestEnglishTutorResponse(userText, replyRef.current);
      updateEvaluation(res);

      // 지우고 싶음
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
    evaluation,
    transcripts,
    interimTranscript,
    assessment,
    error,
    transcriptEndRef,
    handleUserInput,
  };
};
