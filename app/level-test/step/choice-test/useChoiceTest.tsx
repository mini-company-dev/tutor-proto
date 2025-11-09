"use client";

import {
  getGrammerTestAnswerByLevel,
  gradingTestAnswerById,
} from "@/lib/grammerTestAnswer";
import {
  CGrammarTest,
  CTestType,
  getCLevelByNumber,
} from "@/type/test/objective-test/clientTestType";
import { useEffect, useMemo, useState } from "react";

interface Prop {
  count: number;
  nextCount: () => void;
  type: CTestType;
  globalScoreUpdate: (addScore: number, sentence: string) => void;
}

const levelMap: Record<string, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
};

export default function useChoiceTest({
  count,
  nextCount,
  type,
  globalScoreUpdate,
}: Prop) {
  const [level, setLevel] = useState(3);
  const [levelCorrectCount, setLevelCorrectCount] = useState(0);
  const [levelCount, setLevelCount] = useState(0);
  const [tests, setTests] = useState<CGrammarTest[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentTest = useMemo(() => tests[count - 1], [tests, count]);

  useEffect(() => {
    if (!type) return;
    setLoading(true);
    setError(null);

    const fetchTests = async () => {
      try {
        const res = await getGrammerTestAnswerByLevel(
          getCLevelByNumber(level),
          type
        );

        if (Array.isArray(res.payload) && res.payload.length > 0) {
          setTests((prev) => {
            const before = prev.slice(0, count + 1);
            return [...before, ...(res.payload ?? [])];
          });
          setLevelCount(0);
          setLevelCorrectCount(0);
        } else {
          setTests([]);
          console.warn("불러올 문제가 없습니다.", { level, type });
        }
      } catch (err) {
        console.error("문제 불러오기 실패:", err);
        setError("문제를 불러오지 못했습니다.");
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [level, type]);

  const onSubmitAnswer = async (answerId: string) => {
    const res = await gradingTestAnswerById(currentTest.id, answerId);
    setLevelCount(levelCount + 1);

    if(res.payload) {
      const sentence = res.payload.problem;
      const answer = res.payload.answers;
      const fullSentence = sentence.replace("___", answer)

      if (res.payload?.isGraded) {
        const score = getScoreByLevel(level);
        globalScoreUpdate(score, fullSentence);
        setLevelCorrectCount(levelCorrectCount + 1);
      } else {
        globalScoreUpdate(0, fullSentence);
      }
    }

    if (getIsUpgrade(levelCount)) {
      setLevel((prev) => calculateNextLevel(prev, levelCorrectCount));
    }

    nextCount();
  };

  const getScoreByLevel = (level: number): number => {
    const lv = getCLevelByNumber(level);
    const map: Record<string, number> = {
      A1: 1,
      A2: 2,
      B1: 3,
      B2: 4,
      C1: 5,
      C2: 6,
    };
    return map[lv] ?? 0;
  };

  return {
    onSubmitAnswer,
    getTest: () => currentTest,
    loading,
    error,
  };
}

const getIsUpgrade = (step: number): boolean => step % 3 === 0;

const calculateNextLevel = (
  prevLevel: number,
  levelCorrectCount: number
): number => {
  return levelCorrectCount >= 2
    ? prevLevel + 1
    : Math.max(1, prevLevel - 1);
};
