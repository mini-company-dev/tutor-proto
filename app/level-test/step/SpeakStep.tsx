"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotIcon, MicIcon, EndSessionIcon } from "@/app/styles/icons";
import { useHandlerAccess } from "@/app/level-test/step/aiTutorApi/useHandlerAccess";
import { useAudioRecorder } from "@/app/level-test/step/aiTutorApi/useAudioRecorder";
import { StatusIndicator } from "@/app/level-test/step/aiTutorApi/StatusIndicator";
import { ConversationStatus } from "@/type/test/speak-test/clientAiType";

interface Prop {
  nextStep: () => void;
  updateScorePronunciation: (addScore: number, sentence: string) => void;
  updateScoreFluency: (addScore: number, sentence: string) => void;
  updateScoreCoherence: (addScore: number, sentence: string) => void;
}

export default function SpeakStep({
  nextStep,
  updateScorePronunciation,
  updateScoreFluency,
  updateScoreCoherence,
}: Prop) {
  const { status, setStatus, reply, error, handleAudioInput } =
    useHandlerAccess(
      updateScorePronunciation,
      updateScoreFluency,
      updateScoreCoherence
    );
  const { recording, startRecording, stopRecording, audioBlob, setAudioBlob } =
    useAudioRecorder();

  useEffect(() => {
    if (audioBlob) {
      handleAudioInput(audioBlob);
      setAudioBlob(null);
    }
  }, [audioBlob, handleAudioInput, setAudioBlob]);

  useEffect(() => {
    if (recording) setStatus(ConversationStatus.LISTENING);
  }, [recording]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center px-8 py-10 rounded-3xl border border-[var(--brand)]/10 bg-[var(--bg)] shadow-[0_4px_40px_rgba(74,144,226,0.08)] max-w-2xl mx-auto"
    >
      <p className="text-sm text-[var(--text-light)] mb-6 leading-relaxed">
        {recording
          ? "지금 말씀하세요! 완료되면 ‘정지’ 버튼을 눌러주세요."
          : "‘시작’ 버튼을 누르고 말한 후, 완료되면 ‘정지’ 버튼을 눌러주세요."}
      </p>

      <div className="flex flex-col items-center justify-center mb-10">
        <motion.div
          className={`p-8 rounded-full border border-[var(--brand)]/20 shadow-[0_0_25px_rgba(74,144,226,0.15)]
            bg-gradient-to-br from-[var(--brand)]/10 to-sky-400/5 transition-all duration-500
            ${
              recording
                ? "scale-105 shadow-[0_0_40px_rgba(74,144,226,0.4)]"
                : ""
            }
          `}
        >
          <BotIcon className="w-16 h-16 text-[var(--brand)] drop-shadow-[0_0_10px_rgba(74,144,226,0.3)]" />
        </motion.div>

        <div
          className={`mt-6 text-base font-medium tracking-wide transition-colors duration-300 ${
            recording ? "text-sky-400" : "text-[var(--text-light)]"
          }`}
        >
          {StatusIndicator({ status, error })}
        </div>
      </div>

      <div className="bg-[var(--sub)] rounded-2xl p-6 border border-[var(--brand)]/10 shadow-inner text-left max-h-72 overflow-y-auto mb-10">
        <AnimatePresence mode="wait">
          {reply.length > 0 ? (
            <motion.div
              key={reply[reply.length - 1].reply}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 mt-1">
                <BotIcon className="w-7 h-7 text-[var(--brand)] opacity-80" />
              </div>
              <div className="bg-gradient-to-r from-[var(--brand)]/10 to-sky-400/10 text-[var(--text)] border border-[var(--brand)]/10 px-4 py-3 rounded-2xl shadow-sm">
                <p className="text-base leading-relaxed">
                  “{reply[reply.length - 1].reply}”
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[var(--text-light)] italic text-center"
            >
              아직 대화가 없습니다. ‘시작’ 버튼을 눌러 말을 시작하세요.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-12">
        <motion.button
          onClick={recording ? stopRecording : startRecording}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`flex flex-col items-center justify-center w-24 h-24 rounded-full shadow-lg text-white font-semibold transition-all duration-300
            ${
              recording
                ? "bg-gradient-to-br from-red-500 to-red-600 hover:brightness-110 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                : "bg-gradient-to-r from-[var(--brand)] to-sky-400 hover:brightness-110 shadow-[0_0_25px_rgba(74,144,226,0.4)]"
            }`}
        >
          <MicIcon className="w-8 h-8 mb-1" />
          {recording ? "정지" : "시작"}
        </motion.button>

        <motion.button
          onClick={nextStep}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[var(--sub)] border border-[var(--brand)]/30 text-[var(--brand)] hover:bg-red-50 hover:border-red-400 hover:text-red-500 transition-all duration-300"
        >
          <EndSessionIcon className="w-7 h-7 rotate-[135deg]" />
          <span className="text-xs mt-1">종료</span>
        </motion.button>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        TIP: 주변이 조용한 곳에서 참여하면 더 좋습니다.
      </p>
    </motion.div>
  );
}
