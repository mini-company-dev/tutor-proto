export type SLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type STestType =
  | "Grammar"
  | "Vocabulary"
  | "Pronunciation"
  | "Fluency"
  | "Coherence";

export interface SGrammarTestAnswer {
  id: string;
  content: string;
  correct: boolean;
}

export interface SGrammarTest {
  id: string;
  problem: string;
  level: SLevel;
  type: STestType;
  answers: SGrammarTestAnswer[];
}
