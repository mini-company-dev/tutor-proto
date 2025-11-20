"use client";

import AiBot from "@/components/ui/aiBot";
import { motion } from "framer-motion";
import { QuestionContext } from "./QuestionContext";
import { TestType } from "@/type/test/objective-test/clientTestType";
import useChoiceTest from "./useChoiceTest";
import { useState } from "react";

interface Prop {
  type: TestType;
  label: string;
  nextStep: () => void;
  globalUpdateScore: (score: number, sentences: string[]) => void;
}

export default function QuestionSection({
  type,
  label,
  nextStep,
  globalUpdateScore,
}: Prop) {
  const [count, setCount] = useState(1);

  const nextCount = () => {
    if (count === maxCount) {
      updateScore();
      nextStep();
      return;
    }
    setCount(count + 1);
  };

  const { onSubmitAnswer, updateScore, getTest, loading, error } =
    useChoiceTest({
      count,
      type,
      nextCount,
      globalScoreUpdate: globalUpdateScore,
    });

  const test = getTest();

  const maxCount = 9;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <AiBot />
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
            {label}
          </h2>
        </div>
        <p className="text-sm text-[var(--text-light)] font-medium">
          문항 {count} / {maxCount}
        </p>
      </div>

      <div className="w-full bg-[var(--sub)] h-2 rounded-full overflow-hidden mb-8 border border-[var(--brand)]/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--brand)] to-sky-400"
          animate={{ width: `${(count / maxCount) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {loading && (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 animate-pulse"
        >
          <p className="text-center text-gray-400 mb-6">
            문제를 불러오는 중입니다…
          </p>

          <div className="h-6 bg-gray-200 rounded-md w-1/3 mx-auto" />
          <div className="h-4 bg-gray-200 rounded-md w-2/3 mx-auto" />

          <div className="mt-8 space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 rounded-xl border border-gray-200"
              />
            ))}
          </div>
        </motion.div>
      )}

      {!loading && error && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 text-center rounded-xl border border-red-200 bg-red-50 text-red-600"
        >
          <p className="font-medium">문제를 불러오는 중 오류가 발생했습니다.</p>
          <p className="text-sm opacity-80 mt-1">{error}</p>
        </motion.div>
      )}

      {!loading && !error && !test && (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 text-center rounded-xl border border-gray-200 text-gray-500 bg-gray-50"
        >
          표시할 문제가 없습니다. 잠시 후 다시 시도해 주세요.
        </motion.div>
      )}

      {!loading && !error && test && (
        <motion.div
          key="question"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionContext
            count={count}
            test={test}
            onSubmitAnswer={onSubmitAnswer}
          />
        </motion.div>
      )}
    </div>
  );
}
