declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition | undefined;
    webkitSpeechRecognition: typeof SpeechRecognition | undefined;
  }

  /** Chrome / Edge 브라우저에서만 존재하는 전역 SpeechRecognition */
  var webkitSpeechRecognition: {
    new (): SpeechRecognition;
  };
}

export {};
