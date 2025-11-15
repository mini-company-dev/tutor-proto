export type ApiLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type ApiTestType = "Grammar" | "Vocabulary";

export interface ApiGrammarTestAnswer {
  id: string;
  content: string;
  correct: boolean;
}

export interface ApiGrammarTest {
  id: string;
  problem: string;
  level: ApiLevel;
  type: ApiTestType;
  answers: ApiGrammarTestAnswer[];
}
