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
import AiBot from "@/components/ui/aiBot";
import { EvaluationMetricsExtended } from "@/type/test/globalScore";

interface Prop {
  score: EvaluationMetricsExtended;
  nextStep: () => void;
}

const getLevelByScore = (avg: number): string => {
  const rounded = Math.round(avg);

  if (rounded <= 20) return "A1";
  if (rounded <= 40) return "A2";
  if (rounded <= 60) return "B1";
  if (rounded <= 80) return "B2";
  return "C1";
};

export default function Step5({ score, nextStep }: Prop) {
  const data = Object.entries(score).map(([metric, { score }]) => ({
    metric,
    value: Number(score.toFixed(2)), // 이미 평균 0~100
  }));

  const avg =
    data.reduce((acc, cur) => acc + cur.value, 0) / (data.length || 1);
  const level = getLevelByScore(avg);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl bg-[var(--sub)] border border-[var(--brand)]/10 shadow-[0_4px_25px_rgba(74,144,226,0.08)] rounded-3xl p-10 text-center"
    >
      {/* 🔹 헤더 */}
      <div className="inline-flex items-center justify-center gap-3 mb-6">
        <AiBot />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
          평가 결과
        </h2>
      </div>

      {/* 🔹 그래프 */}
      <div className="w-[380px] h-[380px] mx-auto my-6">
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
              domain={[0, 5]}
              tickCount={6}
              stroke="rgba(74,144,226,0.3)"
            />
            <Radar
              name="평가 점수"
              dataKey="value"
              stroke="url(#gradientStroke)"
              fill="url(#gradientFill)"
              fillOpacity={0.6}
            />
            <defs>
              <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="1">
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

      {/* 🔹 평균 점수 + 레벨 */}
      <div className="bg-[var(--brand)]/10 border border-[var(--brand)]/30 text-[var(--brand)] px-4 py-2 rounded-full text-sm font-semibold inline-block backdrop-blur-sm shadow-sm">
        종합 평균: {avg.toFixed(2)} / 100 →{" "}
        <span className="font-bold">{level}</span> 레벨
      </div>

      {/* 🔹 평가 설명 */}
      <p className="mt-8 text-[var(--text-light)] leading-relaxed text-sm">
        AI가 당신의 대화를 분석하여{" "}
        <span className="bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text font-semibold">
          유창성, 어휘력, 발음, 일관성
        </span>
        등을 종합적으로 평가했습니다. 현재 수준은{" "}
        <span className="font-bold text-[var(--brand)]">{level}</span> 단계로
        판단됩니다.
      </p>

      {/* 🔹 버튼 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={nextStep}
        className="mt-10 flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[var(--brand)] to-sky-400 text-white shadow-md hover:shadow-lg"
      >
        <EndSessionIcon className="w-8 h-8 rotate-[135deg]" />
      </motion.button>
      <p className="text-sm text-[var(--text-light)] mt-3">닫기</p>
    </motion.div>
  );
}
