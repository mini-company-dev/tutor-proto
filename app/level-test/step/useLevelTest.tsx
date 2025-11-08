"use client";

import { CEvaluationMetrics } from "@/type/test/globalScore";
import { useState } from "react";

interface CEvaluationMetricDetail {
  score: number;
  count: number;
}

type CEvaluationMetricsExtended = {
  [K in keyof CEvaluationMetrics]: CEvaluationMetricDetail;
};

export default function useLevelTest() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<CEvaluationMetricsExtended>({
    grammar: { score: 0, count: 0 },
    vocabulary: { score: 0, count: 0 },
    pronunciation: { score: 0, count: 0 },
    fluency: { score: 0, count: 0 },
    coherence: { score: 0, count: 0 },
  });

  const updateScore = (data: number, score: number, count: number) => {
    let allSocre = score * count;
    allSocre += data;
    count++;
    return { score, count };
  };

  const createUpdater = <K extends keyof CEvaluationMetricsExtended>(
    key: K
  ) => {
    return (data: number) => {
      setScores((prev) => {
        const { score, count } = prev[key];
        const updated = updateScore(data, score, count);
        return { ...prev, [key]: updated };
      });
    };
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return {
    step,
    nextStep,
    scores,
    updateGrammar: createUpdater("grammar"),
    updateVocabulary: createUpdater("vocabulary"),
    updatePronunciation: createUpdater("pronunciation"),
    updateFluency: createUpdater("fluency"),
    updateCoherence: createUpdater("coherence"),
    updateMetric: createUpdater,
  };
}
