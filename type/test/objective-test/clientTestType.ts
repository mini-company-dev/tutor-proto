export type CLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export function getCLevelByNumber(num: number): CLevel {
  const map: Record<number, CLevel> = {
    1: "A1",
    2: "A2",
    3: "B1",
    4: "B2",
    5: "C1",
    6: "C2",
  };

  const level = map[num];
  if (!level) {
    throw new Error(`Invalid CLevel number: ${num}`);
  }
  return level;
}

export type CTestType = "Grammar" | "Vocabulary";

export interface CGrammarTestAnswer {
  id: string;
  content: string;
}

export interface CGrammarTest {
  id: string;
  problem: string;
  level: CLevel;
  type: CTestType;
  answers: CGrammarTestAnswer[];
}

export interface ObjectiveTestResult {
  grammar: number;
  vocabulary: number;
}

export interface CGrammarTestResult {
  id: string;
  problem: string;
  level: CLevel;
  answers: string;
  isGraded: boolean;
}
