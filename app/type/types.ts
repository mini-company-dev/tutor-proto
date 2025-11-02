export interface TranscriptEntry {
  speaker: "user" | "ai";
  text: string;
}

export interface ReplyEntry {
  message: string;
  reply: string;
}

export interface TutorResponse extends EvaluationMetrics {
  reply: string;
}

export interface EvaluationMetrics {
  /** 문법적 정확도 (Grammar and correctness) */
  accuracy: number;

  /** 문장 구조 다양성 (Sentence structure diversity) */
  complexity: number;

  /** 자신감 및 어조 (Tone and assertiveness) */
  confidence: number;

  /** 어휘의 풍부함 (Richness of word choice) */
  vocabulary: number;

  /** 즉흥성, 대화의 자연스러움 (Natural flow and spontaneity) */
  spontaneity: number;
}

export enum ConversationStatus {
  IDLE,
  CONNECTING,
  LISTENING,
  PROCESSING_ASSESSMENT,
  ASSESSMENT_READY,
  ERROR,
}
