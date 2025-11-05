"use client";

import Step1 from "./step/step1";
import Step2 from "./step/step2";
import Step3 from "./step/step3";
import Step4 from "./step/step4";
import Step5 from "./step/step5";
import useLevelTest from "./step/useLevelTest";

export default function LevelTest() {
  const { step, nextStep, getTest, onSubmitAnswer, onSubmitSpeech } =
    useLevelTest();

  return (
    <>
      {step === 0 && <Step1 nextStep={nextStep} />}
      {step >= 1 && step <= 10 && (
        <Step2 step={step} test={getTest()} onSubmitAnswer={onSubmitAnswer} />
      )}
      {step === 11 && <Step3 nextStep={nextStep} />}
      {step === 12 && <Step4 onSubmitSpeech={onSubmitSpeech} />}
      {step === 13 && <Step5 nextStep={nextStep} />}
    </>
  );
}
