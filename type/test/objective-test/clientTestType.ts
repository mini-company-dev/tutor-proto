export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export function getCLevelByNumber(num: number): Level {
  const map: Record<number, Level> = {
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

export type TestType = "Grammar" | "Vocabulary";

export interface GrammarTestAnswer {
  id: string;
  content: string;
}

export interface GrammarTest {
  id: string;
  problem: string;
  level: Level;
  type: TestType;
  answers: GrammarTestAnswer[];
}

export interface ObjectiveTestResult {
  grammar: number;
  vocabulary: number;
}

export interface GrammarTestResult {
  id: string;
  problem: string;
  level: Level;
  answers: string;
  isGraded: boolean;
}
