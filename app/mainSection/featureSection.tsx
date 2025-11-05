"use client";

import { motion } from "framer-motion";
import { Brain, Mic, Globe } from "lucide-react"; // 아이콘 예시

export default function FeatureSection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-[var(--brand)]" />,
      title: "AI 맞춤 학습 분석",
      desc: "AI가 당신의 학습 패턴을 분석하여, 최적의 피드백을 제공합니다.",
    },
    {
      icon: <Mic className="w-8 h-8 text-[var(--brand)]" />,
      title: "실시간 발음 교정",
      desc: "음성 인식 기술로 발음과 억양을 실시간으로 교정받을 수 있습니다.",
    },
    {
      icon: <Globe className="w-8 h-8 text-[var(--brand)]" />,
      title: "글로벌 튜터 네트워크",
      desc: "전 세계 원어민 튜터와 함께하는 몰입형 영어 환경을 제공합니다.",
    },
  ];

  return (
    <section className="relative py-24 bg-[var(--sub)] text-center text-[var(--text)]">
      <motion.h2
        className="text-4xl font-bold mb-12 bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        당신의 영어 실력을 완성시키는 3가지 핵심
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto px-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="flex flex-col items-center bg-[var(--bg)] border border-[var(--brand)]/10 rounded-2xl shadow-[0_6px_30px_rgba(74,144,226,0.08)] p-8"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-[var(--brand)]">
              {f.title}
            </h3>
            <p className="text-[var(--text-light)] leading-relaxed text-sm">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
