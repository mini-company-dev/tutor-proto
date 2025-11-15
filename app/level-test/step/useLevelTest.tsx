"use client";

import { EvaluationMetricsExtended } from "@/type/test/globalScore";
import { useState } from "react";

export default function useLevelTest() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<EvaluationMetricsExtended>({
    grammar: { score: 0, count: 0, sentence: [] },
    vocabulary: { score: 0, count: 0, sentence: [] },
    pronunciation: { score: 0, count: 0, sentence: [] },
    fluency: { score: 0, count: 0, sentence: [] },
    coherence: { score: 0, count: 0, sentence: [] },
  });

  const updateScore = (addScore: number, score: number, count: number) => {
    const total = score * count + addScore;
    const newCount = count + 1;
    const newScore = total / newCount;

    return { score: newScore, count: newCount };
  };

  const createUpdater = <K extends keyof EvaluationMetricsExtended>(key: K) => {
    return (addScore: number, sentence: string) => {
      setScores((prev) => {
        const { score, count, sentence: prevSentences } = prev[key];
        const { score: newScore, count: newCount } = updateScore(
          addScore,
          score,
          count
        );
        return {
          ...prev,
          [key]: {
            score: newScore,
            count: newCount,
            sentence: [...prevSentences, sentence],
          },
        };
      });
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
