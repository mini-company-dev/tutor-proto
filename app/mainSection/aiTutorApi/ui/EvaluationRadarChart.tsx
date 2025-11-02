"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { EvaluationMetrics } from "@/app/type/types";
import { hoverScale, MiniButton, MiniBox } from "ministudio-ui";
import { PhoneOffIcon } from "../../icons";
import { motion } from "framer-motion";

interface Prop {
  evaluation: EvaluationMetrics;
  onClose: () => void;
}

export default function EvaluationRadarChart({ evaluation, onClose }: Prop) {
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
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 select-none">
      {/* 제목 */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-10 text-cyan-400 tracking-wide"
      >
        Conversation Evaluation Summary
      </motion.h2>

      {/* 그래프 카드 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gray-900/50 border border-gray-700 shadow-lg rounded-3xl p-8 flex flex-col items-center"
      >
        <div className="w-[380px] h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#333" />
              <PolarAngleAxis dataKey="metric" stroke="#aaa" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#666" />
              <Radar
                name="Evaluation"
                dataKey="value"
                stroke="#22d3ee"
                fill="rgba(34,211,238,0.4)"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 평균 점수 강조 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
        >
          Overall Average: {average.toFixed(1)} / 100
        </motion.div>
      </motion.div>

      {/* 종료 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10"
      >
        <MiniButton
          onClick={onClose}
          uiHover={[hoverScale(1.1)]}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 hover:bg-red-700 border border-gray-600 shadow-lg transition-all duration-300"
        >
          <PhoneOffIcon className="w-9 h-9 rotate-[135deg] text-gray-300 group-hover:text-white" />
        </MiniButton>
        <p className="text-sm text-gray-500 mt-3">Close</p>
      </motion.div>
    </div>
  );
}
