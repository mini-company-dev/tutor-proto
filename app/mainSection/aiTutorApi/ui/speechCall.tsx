"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ConversationStatus } from "../../../type/types";
import { BotIcon, MicIcon, PhoneOffIcon } from "../../icons";
import { StatusIndicator } from "../StatusIndicator";
import { useHandlerAccess } from "../useHandlerAccess";
import { useSpeechHandler } from "../useSpeechHandler";
import { bounce, hoverScale, MiniBox, MiniButton, popIn } from "ministudio-ui";

export default function SpeechCallMinimal({
  onClose,
}: {
  onClose: () => void;
}) {
  const {
    status,
    reply,
    transcripts,
    interimTranscript,
    assessment,
    error,
    transcriptEndRef,
    handleUserInput,
  } = useHandlerAccess();

  const { transcript, listening, startListening, stopListening } =
    useSpeechHandler(handleUserInput);

  const controls = useAnimation(); // 👈 애니메이션 컨트롤

  // reply가 바뀔 때마다 아이콘 튕김
  useEffect(() => {
    if (Array.isArray(reply) && reply.length > 0) {
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    }
  }, [reply]);

  // 스크롤 자동 이동
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts, interimTranscript, assessment]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black flex flex-col items-center justify-center text-gray-100 z-50 select-none">
      {/* AI Avatar + Status */}
      <div className="relative flex flex-col items-center justify-center mb-24">
        <MiniBox
          animate={controls}
          className="relative z-10 bg-cyan-600/20 p-8 rounded-full border border-cyan-500/40"
        >
          <BotIcon className="w-16 h-16 text-cyan-400" />
        </MiniBox>
        <p className="mt-6 text-lg font-medium text-gray-300 tracking-wide">
          {listening ? "Listening..." : "Connected"}
        </p>
        <div className="mt-3">{StatusIndicator({ status, error })}</div>
      </div>

      {/* 대화 표시 영역 */}
      <div className="absolute bottom-32 text-center px-8">
        {transcript && (
          <p className="text-cyan-400 text-lg italic animate-pulse">
            “{transcript}”
          </p>
        )}

        {Array.isArray(reply) &&
          reply.length > 0 &&
          reply[reply.length - 1]?.reply && (
            <p className="text-cyan-400 text-lg italic animate-pulse">
              “{reply[reply.length - 1].reply}”
            </p>
          )}

        {status === ConversationStatus.ASSESSMENT_READY && (
          <div
            className="prose prose-invert bg-gray-900/50 p-6 rounded-lg border border-gray-700 mt-6 text-left max-h-64 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: assessment }}
          />
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-16 mt-10">
        <MiniButton
          onClick={listening ? stopListening : startListening}
          className={`flex items-center justify-center w-20 h-20 rounded-full shadow-lg transition ${
            listening
              ? "bg-red-600 hover:bg-red-700"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
          uiHover={[hoverScale(1.1)]}
        >
          <MicIcon className="w-10 h-10" />
        </MiniButton>

        <MiniButton
          onClick={onClose}
          uiHover={[hoverScale(1.1)]}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 hover:bg-red-800 border border-gray-600"
        >
          <PhoneOffIcon className="w-9 h-9 rotate-[135deg]" />
        </MiniButton>
      </div>
    </div>
  );
}
