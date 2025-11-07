"use client";

import { BotIcon, SparklesIcon } from "@/app/styles/icons";
import AiBot from "@/components/ui/aiBot";
import { motion } from "framer-motion";

interface Prop {
  nextStep: () => void;
}

export default function StartStep({ nextStep }: Prop) {
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
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
          AI English Level Test
        </h1>
      </div>

      {/* 설명 */}
      <p className="text-[var(--text-light)] leading-relaxed text-base mb-8">
        AI가 당신의 영어 실력을 정밀하게 진단해 드려요. <br />약 15~20분 동안{" "}
        <span className="bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text font-semibold">
          문법 / 어휘 → 스피킹 / 리스닝
        </span>{" "}
        순으로 진행됩니다.
      </p>

      {/* 순서 안내 */}
      <div className="text-sm text-[var(--text-light)] mb-10 space-y-1">
        <p>① 문법 & 어휘 테스트</p>
        <p>② 스피킹 & 리스닝 테스트</p>
        <p>③ AI 분석 결과 리포트 제공</p>
      </div>

      {/* 시작 버튼 */}
      <motion.button
        onClick={nextStep}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center justify-center px-8 py-5 text-lg font-semibold rounded-2xl text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-[var(--brand)] to-sky-400"
      >
        <SparklesIcon className="w-6 h-6 mr-3 text-white" />
        무료 AI 레벨테스트 시작하기
      </motion.button>
    </motion.div>
  );
}
