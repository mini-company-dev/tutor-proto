"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@/app/styles/icons";
import { CTestType } from "@/type/test/objective-test/clientTestType";
import QuestionSection from "./choice-test/QuestionSection";

interface Prop {
  nextStep: () => void;
  type: CTestType;
  label: string;
}

export default function TestStep({ nextStep, type, label }: Prop) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-8 py-10 rounded-3xl border border-[var(--brand)]/10 bg-[var(--bg)] shadow-[0_4px_40px_rgba(74,144,226,0.08)] max-w-2xl mx-auto"
    >
      <QuestionSection type={type} label={label} nextStep={nextStep}/>
      <div className="mt-10 flex justify-center text-[var(--brand)]/70">
        <SparklesIcon className="w-5 h-5 animate-pulse" />
      </div>
    </motion.div>
  );
}
