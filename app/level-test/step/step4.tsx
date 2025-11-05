"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { BotIcon, MicIcon, EndSessionIcon } from "@/app/styles/icons";
import { useHandlerAccess } from "@/app/level-test/step/aiTutorApi/useHandlerAccess";
import { useSpeechHandler } from "@/app/level-test/step/aiTutorApi/useSpeechHandler";
import { StatusIndicator } from "@/app/level-test/step/aiTutorApi/StatusIndicator";

interface Prop {
  onSubmitSpeech: () => void;
}

export default function Step4({ onSubmitSpeech }: Prop) {
  const { status, reply, error, handleUserInput } = useHandlerAccess();
  const { transcript, listening, startListening, stopListening } =
    useSpeechHandler(handleUserInput);

  const controls = useAnimation();

  // 🔹 AI가 말할 때 아이콘이 계속 커졌다 작아졌다 반복하도록
  useEffect(() => {
    if (Array.isArray(reply) && reply.length > 0) {
      controls.start({
        scale: [1, 1.15, 1],
        transition: {
          duration: 1.2,
          ease: "easeInOut",
          repeat: Infinity, // 반복
          repeatType: "mirror",
        },
      });
    } else {
      // 🔹 AI가 말하지 않을 때 원상복구
      controls.start({
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" },
      });
    }
  }, [reply, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center px-8 py-12 rounded-3xl border border-[var(--brand)]/10 bg-[var(--bg)] shadow-[0_4px_40px_rgba(74,144,226,0.08)] max-w-2xl mx-auto"
    >
      {/* 🔹 AI 아바타 + 상태 */}
      <div className="flex flex-col items-center justify-center mb-10">
        <motion.div
          animate={controls}
          className={`p-8 rounded-full border border-[var(--brand)]/20 shadow-[0_0_25px_rgba(74,144,226,0.15)]
            bg-gradient-to-br from-[var(--brand)]/10 to-sky-400/5 transition-all duration-500
            ${
              listening
                ? "scale-105 shadow-[0_0_30px_rgba(74,144,226,0.3)]"
                : ""
            }
          `}
        >
          <BotIcon className="w-16 h-16 text-[var(--brand)] drop-shadow-[0_0_10px_rgba(74,144,226,0.3)]" />
        </motion.div>

        <p
          className={`mt-6 text-base font-medium tracking-wide transition-colors duration-300 ${
            listening ? "text-sky-400" : "text-[var(--text-light)]"
          }`}
        >
          {listening ? "🎙️ Listening..." : "✅ Connected"}
        </p>

        <div className="mt-3">{StatusIndicator({ status, error })}</div>
      </div>

      {/* 🔹 대화 카드 영역 */}
      <div className="bg-[var(--sub)] rounded-2xl p-6 border border-[var(--brand)]/10 shadow-inner text-left max-h-72 overflow-y-auto mb-10">
        {transcript && (
          <p className="text-[var(--text)] text-lg italic mb-4">
            “{transcript}”
          </p>
        )}

        {Array.isArray(reply) &&
          reply.length > 0 &&
          reply[reply.length - 1]?.reply && (
            <p className="bg-gradient-to-r from-[var(--brand)] to-sky-400 bg-clip-text text-transparent text-lg italic font-medium">
              “{reply[reply.length - 1].reply}”
            </p>
          )}

        {!reply.length && !transcript && (
          <p className="text-[var(--text-light)] italic text-center">
            🎧 AI가 준비 중이에요. “Start” 버튼을 눌러 대화를 시작하세요.
          </p>
        )}
      </div>

      {/* 🔹 버튼 영역 */}
      <div className="flex items-center justify-center gap-12">
        {/* 🎤 녹음 버튼 */}
        <motion.button
          onClick={listening ? stopListening : startListening}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className={`flex items-center justify-center w-20 h-20 rounded-full shadow-md text-white text-lg font-medium transition-all duration-300
            ${
              listening
                ? "bg-gradient-to-br from-red-500 to-red-600 hover:brightness-110 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                : "bg-gradient-to-r from-[var(--brand)] to-sky-400 hover:brightness-110 shadow-[0_0_25px_rgba(74,144,226,0.4)]"
            }`}
        >
          <MicIcon className="w-10 h-10" />
        </motion.button>

        {/* 🔴 종료 버튼 */}
        <motion.button
          onClick={onSubmitSpeech}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--sub)] border border-[var(--brand)]/30 text-[var(--brand)] hover:bg-red-100 hover:border-red-400 hover:text-red-500 transition-all duration-300"
        >
          <EndSessionIcon className="w-9 h-9 rotate-[135deg]" />
        </motion.button>
      </div>
    </motion.div>
  );
}
