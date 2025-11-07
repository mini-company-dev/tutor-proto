export interface TutorSpeakEvaluation {
  pronunciation: number;
  fluency: number;
  coherence: number;
}

export interface TutorResponse extends TutorSpeakEvaluation {
  reply: string;
  user: string;
}

export interface TranscriptEntry {
  speaker: "user" | "ai";
  text: string;
}

export interface ReplyEntry {
  message: string;
  reply: string;
}