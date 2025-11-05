"use client";

import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

/** 🎤 음성 인식 로직 훅 */
export function useSpeechHandler(handleUserInput: (text: string) => void) {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript && !listening) {
      handleUserInput(transcript);
      resetTranscript();
    }
  }, [listening]);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: false, language: "en-US" });

  const stopListening = () => SpeechRecognition.stopListening();

  return { transcript, listening, startListening, stopListening };
}
