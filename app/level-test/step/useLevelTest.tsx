"use client";

import { EvaluationMetricsExtended } from "@/type/test/globalScore";
import { useState } from "react";

export default function useLevelTest() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<EvaluationMetricsExtended>({
    grammar: { score: 0, sentences: [] },
    vocabulary: { score: 0, sentences: [] },
    pronunciation: { score: 0, sentences: [] },
    fluency: { score: 0, sentences: [] },
    coherence: { score: 0, sentences: [] },
  });

  const createUpdater = <K extends keyof EvaluationMetricsExtended>(key: K) => {
    return (score: number, sentences: string[]) => {
      console.log(score);
      setScores((prev) => ({
        ...prev,
        [key]: {
          score,
          sentences,
        },
      }));
    };
  };

  const nextStep = () => setStep((prev) => prev + 1);

  return {
    step,
    nextStep,
    scores,
    updateScoreGrammar: createUpdater("grammar"),
    updateScoreVocabulary: createUpdater("vocabulary"),
    updateScorePronunciation: createUpdater("pronunciation"),
    updateScoreFluency: createUpdater("fluency"),
    updateScoreCoherence: createUpdater("coherence"),
    updateScoreMetric: createUpdater,
  };
}
