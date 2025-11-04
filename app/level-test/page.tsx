"use client";

import { motion } from "framer-motion";
import Step1 from "./step/step1";
import Step2 from "./step/step2";
import useLevelTest from "./step/useLevelTest";

export default function LevelTest() {
  const { step, nextStep, getTest, onSubmitAnswer } = useLevelTest();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100 overflow-hidden px-6">
      {/* 공통 배경 */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-3xl rounded-full" />

      {/* 단계별 콘텐츠 */}
      <div className="relative z-10 w-full max-w-2xl">
        {step === 0 && <Step1 nextStep={nextStep} />}
        {step >= 1 && step <= 15 && (
          <Step2 step={step} test={getTest()} onSubmitAnswer={onSubmitAnswer} />
        )}
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-gray-500 text-sm text-center"
      >
        <p>
          &copy; {new Date().getFullYear()} AI English Tutor. All rights
          reserved.
        </p>
      </motion.footer>
    </div>
  );
}
