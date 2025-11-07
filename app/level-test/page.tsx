"use client";

import StartStep from "./step/startStep";
import TestStep from "./step/TestStep";
import Step3 from "./step/step3";
import Step4 from "./step/step4";
import useLevelTest from "./step/useLevelTest";

export default function LevelTest() {
  const { step, nextStep } = useLevelTest();

  switch (step) {
    case 0:
      return <StartStep nextStep={nextStep} />;
    case 1:
      return (
        <TestStep
          step={step}
          nextStep={nextStep}
          type={"Grammar"}
          label="1차 문법 테스트"
        />
      );
    case 2:
      return (
        <TestStep
          step={step}
          nextStep={nextStep}
          type={"Vocabulary"}
          label="2차 문법 테스트"
        />
      );
    case 3:
      return <Step3 nextStep={nextStep} />;
    // case 4:
    // return <Step4 step={step} nextStep={nextStep} />;
    // case 5:
    //   return <Step5 nextStep={nextStep} />;

    // 기본값 (혹시 step이 잘못 들어온 경우)
    default:
      return null;
  }
}
