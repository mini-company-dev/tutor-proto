"use client";

import { SparklesIcon } from "@/app/styles/icons";
import AiBot from "@/components/ui/aiBot";
import { motion } from "framer-motion";

interface Prop {
  nextStep: () => void;
}

export default function GrammarMiddleStep({ nextStep }: Prop) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center px-8 py-12 rounded-3xl border border-[var(--brand)]/10 bg-[var(--bg)] shadow-[0_8px_40px_rgba(74,144,226,0.08)]"
    >
      {/* 헤더 */}
      <div className="inline-flex items-center justify-center gap-4 mb-6">
        <AiBot />
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
          Great job so far!
        </h1>
      </div>

      {/* 설명 */}
      <p className="text-[var(--text-light)] leading-relaxed text-base mb-8">
        지금까지 정말 잘 해내고 있어요<br />
        잠깐 숨 고르고 다음 테스트로 넘어가 볼까요?
      </p>

      {/* 순서 안내 */}
      <div className="text-sm text-[var(--text-light)] mb-10 space-y-1">
        <p>✔ 문법 파트 완료</p>
        <p>▶ 다음은 어휘 테스트 단계예요</p>
      </div>

      {/* 버튼 */}
      <motion.button
        onClick={nextStep}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center px-8 py-5 text-lg font-semibold rounded-2xl text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-[var(--brand)] to-sky-400"
      >
        <SparklesIcon className="w-6 h-6 mr-3 text-white" />
        다음 단계로 이동하기
      </motion.button>
    </motion.div>
  );
}
