"use client";

import StartStep from "./step/startStep";
import TestStep from "./step/TestStep";
import SpeakStartStep from "./step/SpeakStartStep";
import useLevelTest from "./step/useLevelTest";
import GrammarMiddleStep from "./step/GrammerMiddleStep";
import SpeakStep from "./step/SpeakStep";

export default function LevelTest() {
  const {
    step,
    nextStep,
    updateGrammar,
    updateVocabulary,
    updatePronunciation,
    updateFluency,
    updateCoherence,
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
        />
      );
    case 4:
      return <SpeakStartStep nextStep={nextStep} />;
    case 5:
      return <SpeakStep nextStep={nextStep} />;
    // case 5:
    //   return <Step5 nextStep={nextStep} />;

    // 기본값 (혹시 step이 잘못 들어온 경우)
    default:
      return null;
  }
}
