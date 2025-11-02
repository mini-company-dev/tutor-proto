export interface TranscriptEntry {
  speaker: "user" | "ai";
  text: string;
}

export interface ReplyEntry {
  message: string;
  reply: string;
}

export enum ConversationStatus {
  IDLE,
  CONNECTING,
  LISTENING,
  PROCESSING_ASSESSMENT,
  ASSESSMENT_READY,
  ERROR,
}
