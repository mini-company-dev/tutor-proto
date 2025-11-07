"use client";

import StartStep from "./step/startStep";
import TestStep from "./step/TestStep";
import Step3 from "./step/step3";
import Step4 from "./step/step4";
import Step5 from "./step/step5";
import useLevelTest from "./step/useLevelTest";

export default function LevelTest() {
  const { step, nextStep } = useLevelTest();

  switch (true) {
    case step === 0:
      return <StartStep nextStep={nextStep} />;
    case step >= 1 && step <= 10:
      return (
        <TestStep
          step={step}
          nextStep={nextStep}
          type={"Grammar"}
          label="1차 문법 테스트"
        />
      );
    case step >= 11 && step <= 20:
      return
        <TestStep
          step={step}
          nextStep={nextStep}
          type={"Vocabulary"}
          label="2차 문법 테스트"
        />
    case step === 21:
      return <Step3 nextStep={nextStep} />;
    case step === 22:
      return <Step4 step={step} nextStep={nextStep} />;
    case step > 22:
      return <Step5 nextStep={nextStep} />;

    // 기본값 (혹시 step이 잘못 들어온 경우)
    default:
      return null;
  }
}
