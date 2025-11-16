import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReplyEntry,
  TutorResponse,
} from "@/type/test/speak-test/tutorSpeakTypes";
import { ConversationStatus } from "@/type/test/speak-test/clientAiType";
import { speakByFile } from "@/lib/geminiSpeak";
import speakText from "@/app/service/geminiSpeak";

export const useHandlerAccess = (
  updateScorePronunciation: (score: number, sentences: string[]) => void,
  updateScoreFluency: (score: number, sentences: string[]) => void,
  updateScoreCoherence: (score: number, sentences: string[]) => void
) => {
  const [status, setStatus] = useState<ConversationStatus>(
    ConversationStatus.IDLE
  );
  const [reply, setReply] = useState<ReplyEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<ReplyEntry[]>([]);

  const pronunciationScore = useRef(0);
  const fluencyScore = useRef(0);
  const coherenceScore = useRef(0);

  const count = useRef(0);

  useEffect(() => {
    replyRef.current = reply;
  }, [reply]);

  const updateEvaluation = (data: TutorResponse) => {
    pronunciationScore.current = calculatorScore(
      pronunciationScore.current,
      data.pronunciation,
      count.current
    );

    fluencyScore.current = calculatorScore(
      fluencyScore.current,
      data.pronunciation,
      count.current
    );

    coherenceScore.current = calculatorScore(
      coherenceScore.current,
      data.pronunciation,
      count.current
    );
  };

  const handleAudioInput = useCallback(async (audioBlob: Blob) => {
    setStatus(ConversationStatus.CONNECTING);
    setError(null);

    try {
      const res = await speakByFile(audioBlob, replyRef.current);
      if (!res.payload) throw Error();

      const data: TutorResponse = res.payload;
      speakText(data.reply);

      updateEvaluation(data);
      setReply((prev) => [...prev, { message: data.user, reply: data.reply }]);
      setStatus(ConversationStatus.IDLE);
    } catch (e: any) {
      setError(e.message || "AI 음성 요청 중 오류가 발생했습니다.");
      setStatus(ConversationStatus.ERROR);
    }
  }, []);

  const calculatorScore = (
    avgScore: number,
    addScore: number,
    count: number
  ): number => {
    const score = avgScore * count + addScore;
    return score / (count + 1);
  };

  const updateScore = () => {
    const messages = replyRef.current.map((r) => r.message);
    updateScorePronunciation(pronunciationScore.current, messages);
    updateScoreFluency(fluencyScore.current, messages);
    updateScoreCoherence(coherenceScore.current, messages);
  };

  return {
    status,
    setStatus,
    reply,
    error,
    transcriptEndRef,
    handleAudioInput,
    updateScore,
  };
};
