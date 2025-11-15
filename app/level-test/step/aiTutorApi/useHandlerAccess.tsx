import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReplyEntry,
  TutorResponse,
} from "@/type/test/speak-test/tutorSpeakTypes";
import { ConversationStatus } from "@/type/test/speak-test/clientAiType";
import { speakByFile } from "@/lib/geminiSpeak";
import speakText from "@/app/service/geminiSpeak";

export const useHandlerAccess = (
  updateScorePronunciation: (addScore: number, sentence: string) => void,
  updateScoreFluency: (addScore: number, sentence: string) => void,
  updateScoreCoherence: (addScore: number, sentence: string) => void
) => {
  const [status, setStatus] = useState<ConversationStatus>(
    ConversationStatus.IDLE
  );
  const [reply, setReply] = useState<ReplyEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<ReplyEntry[]>([]);

  useEffect(() => {
    replyRef.current = reply;
  }, [reply]);

  const updateEvaluation = (res: TutorResponse) => {
    updateScorePronunciation(res.pronunciation, res.user);
    updateScoreFluency(res.fluency, res.user);
    updateScoreCoherence(res.coherence, res.user);
  };

  const handleAudioInput = useCallback(async (audioBlob: Blob) => {
    setStatus(ConversationStatus.CONNECTING);
    setError(null);

    try {
      const res = await speakByFile(audioBlob, replyRef.current);
      const data = res.payload;
      if (!data) throw Error();
      updateEvaluation(data);
      speakText(data.reply);

      setReply((prev) => [...prev, { message: data.user, reply: data.reply }]);
      setStatus(ConversationStatus.IDLE);
    } catch (e: any) {
      setError(e.message || "AI 음성 요청 중 오류가 발생했습니다.");
      setStatus(ConversationStatus.ERROR);
    }
  }, []);

  return {
    status,
    setStatus,
    reply,
    error,
    transcriptEndRef,
    handleAudioInput,
  };
};
