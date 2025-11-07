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
  step: number;
  nextStep: () => void;
  type: CTestType;
}

export default function useChoiceTest({ step, nextStep, type }: Prop) {
  const [level, setLevel] = useState(3);
  const [score, setScore] = useState(0);
  const [tests, setTests] = useState<CGrammarTest[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentTest = useMemo(() => tests[step - 1], [tests, step]);

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
            const before = prev.slice(0, step + 1); // step 이후부터 새로 교체
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

  const onSubmitAnswer = async (answerId: string) => {
    const res = await gradingTestAnswerById(currentTest.id, answerId);

    if (res.payload) {
      updateScore();
    }

    if (getIsUpgrade(step)) {
      setLevel((prev) => calculateNextLevel(prev, step, score));
    }

    nextStep();
  };

  const updateScore = () => {
    const lv = getCLevelByNumber(level);
    const inc =
      lv === "A1"
        ? 1
        : lv === "A2"
        ? 2
        : lv === "B1"
        ? 3
        : lv === "B2"
        ? 4
        : lv === "C1"
        ? 5
        : lv === "C2"
        ? 6
        : 0;

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
