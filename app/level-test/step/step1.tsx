"use client";

import { BotIcon, SparklesIcon } from "@/app/mainSection/icons";
import { motion } from "framer-motion";

interface Prop {
  nextStep: () => void;
}

export default function Step1({ nextStep }: Prop) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center px-8 py-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,0.1)]"
    >
      <div className="inline-flex items-center justify-center gap-4 mb-6">
        <BotIcon className="w-14 h-14 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent tracking-tight">
          AI English Level Test
        </h1>
      </div>

      <p className="text-gray-400 leading-relaxed text-base mb-8">
        AI가 당신의 영어 실력을 정밀하게 진단해 드려요. <br />약 15~20분 동안{" "}
        <span className="text-cyan-300 font-semibold">
          문법 / 어휘 → 스피킹 / 리스닝
        </span>{" "}
        순으로 진행됩니다.
      </p>

      <div className="text-sm text-gray-400 mb-10">
        <p>① 문법 & 어휘 테스트</p>
        <p>② 스피킹 & 리스닝 테스트</p>
        <p>③ AI 분석 결과 리포트 제공</p>
      </div>

      <motion.button
        onClick={nextStep}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="relative inline-flex items-center justify-center px-8 py-5 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 backdrop-blur-lg border border-white/10 shadow-[0_0_25px_rgba(236,72,153,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300"
      >
        <SparklesIcon className="w-6 h-6 mr-3 text-cyan-400" />
        무료 AI 레벨테스트 시작하기
      </motion.button>
    </motion.div>
  );
}
