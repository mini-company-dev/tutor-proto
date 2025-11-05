"use client";

import { motion } from "framer-motion";
import { CGrammarTest } from "@/type/client/clientGrammerTestAnswer";
import { SparklesIcon } from "@/app/styles/icons";
import AiBot from "@/components/ui/aiBot";

interface Prop {
  step: number;
  test: CGrammarTest;
  onSubmitAnswer: (id: string) => void;
}

export default function Step2({ step, test, onSubmitAnswer }: Prop) {
  if (!test) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-8 py-10 rounded-3xl border border-[var(--brand)]/10 bg-[var(--bg)] shadow-[0_4px_40px_rgba(74,144,226,0.08)] max-w-2xl mx-auto"
    >
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <AiBot /> {/* 🔹 통일된 애니메이션 Bot */}
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
            1차 문법 / 어휘 테스트
          </h2>
        </div>
        <p className="text-sm text-[var(--text-light)] font-medium">
          문항 {step} / 15
        </p>
      </div>

      {/* 🔹 Progress Bar */}
      <div className="w-full bg-[var(--sub)] h-2 rounded-full overflow-hidden mb-8 border border-[var(--brand)]/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--brand)] to-sky-400"
          animate={{ width: `${(step / 15) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* 🔹 Question Card */}
      <div className="rounded-2xl p-6 bg-[var(--sub)] border border-[var(--brand)]/10 shadow-inner">
        <p className="text-lg font-semibold mb-4 bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
          Q{step}. Choose the correct option:
        </p>

        <p className="text-[1.05rem] leading-relaxed mb-6 text-[var(--text)]">
          {test.problem}
        </p>

        {/* 🔹 Answer Buttons */}
        <div className="grid gap-3">
          {test.answers.map((opt) => (
            <motion.button
              key={opt.id}
              onClick={() => onSubmitAnswer(opt.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="w-full py-3 px-4 rounded-xl border border-[var(--brand)]/40 
                         text-[var(--brand)] font-medium text-base
                         hover:bg-gradient-to-r hover:from-[var(--brand)] hover:to-sky-400 
                         hover:text-white transition-all duration-200
                         shadow-sm hover:shadow-[0_0_15px_rgba(74,144,226,0.3)]"
            >
              {opt.content}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 🔹 Subtle Footer Icon */}
      <div className="mt-10 flex justify-center text-[var(--brand)]/70">
        <SparklesIcon className="w-5 h-5 animate-pulse" />
      </div>
    </motion.div>
  );
}
