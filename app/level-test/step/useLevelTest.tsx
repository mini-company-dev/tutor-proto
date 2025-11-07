"use client";

import { useState } from "react";

export default function useLevelTest() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  return { step, nextStep};
}
