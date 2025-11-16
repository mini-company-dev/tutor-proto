"use client";

import StartStep from "./step/startStep";
import TestStep from "./step/TestStep";
import SpeakStartStep from "./step/SpeakStartStep";
import useLevelTest from "./step/useLevelTest";
import GrammarMiddleStep from "./step/GrammerMiddleStep";
import SpeakStep from "./step/SpeakStep";
import Step5 from "./step/step5";

export default function LevelTest() {
  const {
    step,
    scores,
    nextStep,
    updateScoreGrammar,
    updateScoreVocabulary,
    updateScorePronunciation,
    updateScoreFluency,
    updateScoreCoherence,
  } = useLevelTest();

  switch (step) {
    case 0:
      return <StartStep nextStep={nextStep} />;
    case 1:
      return (
        <TestStep
          nextStep={nextStep}
          type={"Grammar"}
          label="1차 문법 테스트"
          globalUpdateScore={updateScoreGrammar}
        />
      );
    case 2:
      return <GrammarMiddleStep nextStep={nextStep} />;
    case 3:
      return (
        <TestStep
          nextStep={nextStep}
          type={"Vocabulary"}
          label="2차 문법 테스트"
          globalUpdateScore={updateScoreVocabulary}
        />
      );
    case 4:
      return <SpeakStartStep nextStep={nextStep} />;
    case 5:
      return (
        <SpeakStep
          nextStep={nextStep}
          updateScorePronunciation={updateScorePronunciation}
          updateScoreFluency={updateScoreFluency}
          updateScoreCoherence={updateScoreCoherence}
        />
      );
    case 6:
      return <Step5 score={scores} nextStep={nextStep} />;

    // 기본값 (혹시 step이 잘못 들어온 경우)
    default:
      return null;
  }
}
