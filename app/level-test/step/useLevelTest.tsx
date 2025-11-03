"use client";

import {
  getGrammerTestAnswerByLevel,
  gradingTestAnswerById,
} from "@/lib/grammerTestAnswer";
import { CGrammarTest, CLevel } from "@/type/client/clientGrammerTestAnswer";
import { useEffect, useState } from "react";

export default function useLevelTest() {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState<CLevel>("B1");
  const [progress, setProgress] = useState(0);
  const [test, setTest] = useState<CGrammarTest[]>([]);

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await getGrammerTestAnswerByLevel(level, "Grammar");
        if (res.payload) {
          setTest(res.payload);
          console.log(res.payload);
        }
      } catch (err) {
        console.error("문제 불러오기 실패:", err);
      }
    }

    fetchTests();
  }, [level]);

  useEffect(() => {
    console.log(progress);
  }, [progress]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const onSubmitAnswer = async (id: string) => {
    const res = await gradingTestAnswerById(getTest().id, id);
    if (res.payload) updateProgress();
    nextStep();
  };

  const updateProgress = () => {
    {
      switch (level) {
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
    return test[step];
  };

  return { step, nextStep, progress, getTest, onSubmitAnswer };
}
