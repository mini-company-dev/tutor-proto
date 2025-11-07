export default function speakText(text: string, lang = "en-US") {
  if (!("speechSynthesis" in window)) {
    console.warn("Browser does not support SpeechSynthesis");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}