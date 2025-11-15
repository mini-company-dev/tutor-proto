export interface ApiTutorSpeakEvaluation {
  pronunciation: number;
  fluency: number;
  coherence: number;
}

export interface ApiTutorResponse extends ApiTutorSpeakEvaluation {
  reply: string;
  user: string;
}