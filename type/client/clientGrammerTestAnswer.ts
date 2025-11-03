export type CLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type CTestType =
  | "Grammar"
  | "Vocabulary"
  | "Pronunciation"
  | "Fluency"
  | "Coherence";

export interface CGrammarTestAnswer {
  id: string;
  content: string;
  correct: boolean;
}

export interface CGrammarTest {
  id: string;
  problem: string;
  level: CLevel;
  type: CTestType;
  answers: CGrammarTestAnswer[];
}
