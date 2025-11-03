"use client";

import React, { useEffect } from "react";
import { ConversationStatus } from "../../../../type/types";
import { BotIcon, MicIcon, StopCircleIcon, UserIcon, XIcon } from "../../icons";
import { StatusIndicator } from "../StatusIndicator";
import { useHandlerAccess } from "../useHandlerAccess";
import { MessageList } from "../messageList";
import { useSpeechHandler } from "../useSpeechHandler";

export default function SpeechDefault({ onClose }: { onClose: () => void }) {
  const {
    status,
    transcripts,
    interimTranscript,
    assessment,
    error,
    transcriptEndRef,
    handleUserInput,
  } = useHandlerAccess();

  const { transcript, listening, startListening, stopListening } =
    useSpeechHandler(handleUserInput);

  // 자동 스크롤
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcripts, interimTranscript, assessment]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col border border-gray-700">
        {/* HEADER */}
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">AI English Tutor</h2>
          <div className="flex-grow text-center">
            {StatusIndicator({ status, error })}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        {/* MAIN */}
        <main className="flex-grow p-6 overflow-y-auto">
          <MessageList
            transcripts={transcripts}
            interimTranscript={listening ? transcript : interimTranscript}
            transcriptEndRef={transcriptEndRef}
          />

          {/* 평가 결과 */}
          {status === ConversationStatus.ASSESSMENT_READY && (
            <div
              className="prose prose-invert bg-gray-900/50 p-6 rounded-lg border border-gray-700 mt-6"
              dangerouslySetInnerHTML={{ __html: assessment }}
            />
          )}
        </main>

        {/* FOOTER */}
        <footer className="p-4 border-t border-gray-700 flex items-center justify-center">
          <button
            onClick={listening ? stopListening : startListening}
            className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition ${
              listening
                ? "bg-red-600 hover:bg-red-700"
                : "bg-cyan-600 hover:bg-cyan-700"
            }`}
          >
            {listening ? (
              <>
                <StopCircleIcon className="w-6 h-6" /> Stop Listening
              </>
            ) : (
              <>
                <MicIcon className="w-6 h-6" /> Start Speaking
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}
