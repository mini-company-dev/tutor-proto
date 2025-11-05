"use client";

import { SparklesIcon } from "@/app/styles/icons";
import { motion } from "framer-motion";
import AiBot from "@/components/ui/aiBot";

interface Prop {
  nextStep: () => void;
}

export default function Step3({ nextStep }: Prop) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center px-8 py-12 rounded-3xl border border-[var(--brand)]/10 bg-[var(--bg)] shadow-[0_4px_40px_rgba(74,144,226,0.08)]"
    >
      {/* 🔹 헤더 */}
      <div className="inline-flex items-center justify-center gap-4 mb-6">
        <AiBot />
        <h1 className="text-4xl font-bold tracking-tight leading-snug bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
          다음 단계로 넘어갈 <br />
          준비가 되었어요
        </h1>
      </div>

      {/* 🔹 설명 */}
      <p className="text-[var(--text-light)] leading-relaxed text-base mb-8">
        문법 및 어휘 테스트가 완료되었습니다. <br />
        이제{" "}
        <span className="bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text font-semibold">
          스피킹 & 리스닝
        </span>{" "}
        테스트로 넘어가세요. <br />
        AI가 실제 대화를 통해 발음, 억양, 문법을 평가합니다.
      </p>

      {/* 🔹 단계 안내 */}
      <div className="text-sm text-[var(--text-light)] mb-10 space-y-1">
        <p>✅ 문법 & 어휘 테스트 완료</p>
        <p>🎤 스피킹 & 리스닝 테스트 준비</p>
        <p>📊 결과 리포트 자동 제공 예정</p>
      </div>

      {/* 🔹 버튼 */}
      <motion.button
        onClick={nextStep}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center px-8 py-5 text-lg font-semibold rounded-2xl text-white transition-all duration-300 bg-gradient-to-r from-[var(--brand)] to-sky-400 shadow-md hover:shadow-lg"
      >
        <SparklesIcon className="w-6 h-6 mr-3 text-white" />
        스피킹 & 리스닝 테스트 시작하기
      </motion.button>
    </motion.div>
  );
}
