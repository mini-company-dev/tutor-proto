"use client";

import {
  getGrammerTestAnswerByLevel,
  gradingTestAnswerById,
} from "@/lib/grammerTestAnswer";
import {
  GrammarTest,
  TestType,
  getCLevelByNumber,
} from "@/type/test/objective-test/clientTestType";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAnimation } from "framer-motion";

interface Prop {
  count: number;
  nextCount: () => void;
  type: TestType;
  globalScoreUpdate: (score: number, sentences: string[]) => void;
}

const scoreMap: Record<string, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
};

export default function useChoiceTest({
  count,
  nextCount,
  type,
  globalScoreUpdate,
}: Prop) {
  const [level, setLevel] = useState(4);
  const [tests, setTests] = useState<GrammarTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userScore = useRef(0);
  const maxScore = useRef(0);
  const levelCountRef = useRef(1);
  const sentences = useRef<string[]>([]);

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

  const onSubmitAnswer = async (answerId: string) => {
    const res = await gradingTestAnswerById(currentTest.id, answerId);
    if (!res.payload) throw Error("서버 호출 오류");

    levelCountRef.current += 1;

    maxScore.current += getScoreByLevel(level);
    if (res.payload.isGraded) {
      userScore.current += getScoreByLevel(level);
    }

    const sentence = res.payload.problem;
    const answer = res.payload.answers;
    const fullSentence = sentence.replace("___", answer);

    sentences.current.push(fullSentence);

    if (levelCountRef.current % 4 === 0) {
      setLevel(() =>
        calculateLevelFromRatio((userScore.current / maxScore.current) * 100)
      );
      levelCountRef.current = 1;
    }

    nextCount();
  };

  const getScoreByLevel = (level: number): number => {
    const lv = getCLevelByNumber(level);
    return scoreMap[lv] ?? 0;
  };

  const updateScore = () => {
    globalScoreUpdate(((userScore.current / maxScore.current) * 100), sentences.current);
  }

  return {
    onSubmitAnswer,
    updateScore,
    getTest: () => currentTest,
    loading,
    error,
  };
}

const calculateLevelFromRatio = (ratio: number): number => {
  if (ratio < 20) return 1;
  if (ratio < 40) return 2;
  if (ratio < 60) return 3;
  if (ratio < 80) return 4;
  return 5;
};
