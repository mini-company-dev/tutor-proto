"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { EndSessionIcon } from "@/app/styles/icons";
import AiBot from "@/components/ui/aiBot"; // 🔹 재사용 (AI 아이콘)
import { EvaluationMetrics } from "@/type/test/tutorTypes";

interface Prop {
  evaluation?: EvaluationMetrics;
  nextStep: () => void;
}

export default function Step5({ evaluation, nextStep }: Prop) {
  if (!evaluation) return null;

  const data = [
    { metric: "Accuracy", value: evaluation.accuracy },
    { metric: "Complexity", value: evaluation.complexity },
    { metric: "Confidence", value: evaluation.confidence },
    { metric: "Vocabulary", value: evaluation.vocabulary },
    { metric: "Spontaneity", value: evaluation.spontaneity },
  ];

  const average =
    (evaluation.accuracy +
      evaluation.complexity +
      evaluation.confidence +
      evaluation.vocabulary +
      evaluation.spontaneity) /
    5;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center px-8 py-12 rounded-3xl border border-[var(--brand)]/10 bg-[var(--bg)] shadow-[0_4px_40px_rgba(74,144,226,0.08)] max-w-2xl mx-auto select-none"
      >
        {/* 🔹 Header with AI icon */}
        <div className="inline-flex items-center justify-center gap-4 mb-8">
          <AiBot />
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text tracking-tight"
          >
            Conversation Evaluation
          </motion.h2>
        </div>

        {/* 🔹 그래프 카드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-[var(--sub)] border border-[var(--brand)]/10 shadow-[0_4px_25px_rgba(74,144,226,0.08)] rounded-3xl p-8 flex flex-col items-center"
        >
          <div className="w-[380px] h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="rgba(74,144,226,0.3)" />
                <PolarAngleAxis
                  dataKey="metric"
                  stroke="var(--text-light)"
                  fontSize={12}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="rgba(74,144,226,0.3)"
                />
                <Radar
                  name="Evaluation"
                  dataKey="value"
                  stroke="url(#gradientStroke)"
                  fill="url(#gradientFill)"
                  fillOpacity={0.6}
                />
                {/* 🔹 Gradient definitions */}
                <defs>
                  <linearGradient
                    id="gradientStroke"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="var(--brand)" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="gradientFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(74,144,226,0.5)" />
                    <stop offset="100%" stopColor="rgba(56,189,248,0.4)" />
                  </linearGradient>
                </defs>
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 🔹 평균 점수 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-5 bg-[var(--brand)]/10 border border-[var(--brand)]/30 text-[var(--brand)] px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm shadow-sm"
          >
            Overall Average: {average.toFixed(1)} / 100
          </motion.div>
        </motion.div>

        {/* 🔹 평가 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 text-[var(--text-light)] leading-relaxed text-sm max-w-md"
        >
          AI analyzed your conversation and evaluated multiple skills including{" "}
          <span className="bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text font-semibold">
            fluency, vocabulary, and confidence.
          </span>{" "}
          Keep practicing for even better results next time!
        </motion.p>

        {/* 🔹 종료 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            onClick={nextStep}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[var(--brand)] to-sky-400 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <EndSessionIcon className="w-9 h-9 rotate-[135deg]" />
          </motion.button>
          <p className="text-sm text-[var(--text-light)] mt-3">Close</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
