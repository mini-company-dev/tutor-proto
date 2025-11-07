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
}

const levelMap: Record<string, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
};

export default function useChoiceTest({ count, nextCount, type }: Prop) {
  const [level, setLevel] = useState(3);
  const [score, setScore] = useState(0);
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

  useEffect(() => {
    console.log(tests);
  }, [tests]);

  const onSubmitAnswer = async (answerId: string) => {
    const res = await gradingTestAnswerById(currentTest.id, answerId);

    if (res.payload) {
      updateScore(level);
    }

    if (getIsUpgrade(count)) {
      setLevel((prev) => calculateNextLevel(prev, count, score));
    }

    nextCount();
  };

  const updateScore = (level: number) => {
    const lv = getCLevelByNumber(level);
    let inc = 0;
    switch (lv) {
      case "A1":
        inc = 1;
        break;
      case "A2":
        inc = 2;
        break;
      case "B1":
        inc = 3;
        break;
      case "B2":
        inc = 4;
        break;
      case "C1":
        inc = 5;
        break;
      case "C2":
        inc = 6;
        break;
    }

    setScore((prev) => prev + inc);
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
  step: number,
  score: number
): number => {
  const ratio = (score + 1) / (step + 1);
  return ratio >= 2 ? prevLevel + 1 : Math.max(1, prevLevel - 1);
};
