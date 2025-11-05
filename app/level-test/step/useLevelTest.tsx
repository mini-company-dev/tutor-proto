"use client";

import {
  getGrammerTestAnswerByLevel,
  gradingTestAnswerById,
} from "@/lib/grammerTestAnswer";
import {
  CGrammarTest,
  getCLevelByNumber,
} from "@/type/client/clientGrammerTestAnswer";
import { useEffect, useState } from "react";

export default function useLevelTest() {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState(3);
  const [progress, setProgress] = useState(0);
  const [test, setTest] = useState<CGrammarTest[]>([]);

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await getGrammerTestAnswerByLevel(
          getCLevelByNumber(level),
          "Grammar"
        );

        if (res.payload) {
          setTest((prev) => {
            const before = prev.slice(0, step + 1);
            return [...before, ...(res.payload ?? [])];
          });
        }
      } catch (err) {
        console.error("문제 불러오기 실패:", err);
      }
    }

    fetchTests();
  }, [level]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const onSubmitAnswer = async (id: string) => {
    const res = await gradingTestAnswerById(getTest().id, id);
    if (res.payload) {
      updateProgress();
    }
    if (getIsUpgrade(step)) {
      setLevel((prev) => calculateNextLevel(prev, step, progress));
    }
    nextStep();
  };

  const onSubmitSpeech = async () => {
    nextStep();
  };

  const updateProgress = () => {
    {
      switch (getCLevelByNumber(level)) {
        case "A1":
          setProgress(progress + 1);
          break;
        case "A2":
          setProgress(progress + 2);
          break;
        case "B1":
          setProgress(progress + 3);
          break;
        case "B2":
          setProgress(progress + 4);
          break;
        case "C1":
          setProgress(progress + 5);
          break;
        case "C2":
          setProgress(progress + 6);
          break;
        default:
          console.warn("Unknown level:", level);
          break;
      }
    }
  };

  const getTest = (): CGrammarTest => {
    return test[step - 1];
  };

  return { step, nextStep, progress, getTest, onSubmitAnswer, onSubmitSpeech };
}

const getIsUpgrade = (step: number): boolean => {
  if (step % 3 == 0) {
    return true;
  }

  return false;
};

const calculateNextLevel = (
  prevLevel: number,
  step: number,
  progress: number
): number => {
  const ratio = (progress + 1) / (step + 1);
  return ratio >= 2 ? prevLevel + 1 : Math.max(1, prevLevel - 1);
};
