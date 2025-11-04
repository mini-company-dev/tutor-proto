"use client";

import { motion } from "framer-motion";
import { CGrammarTest } from "@/type/client/clientGrammerTestAnswer";
import { MiniButton, MiniUiType } from "ministudio-ui";
import { BotIcon } from "@/app/mainSection/icons";

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
      className="px-8 py-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(34,211,238,0.1)]"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <BotIcon className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-white">
            1차 문법 / 어휘 테스트
          </h2>
        </div>
        <p className="text-sm text-gray-400 font-medium">문항 {step} / 15</p>
      </div>

      <div className="w-full bg-gray-700/40 h-2 rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
          animate={{ width: `${(step / 15) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
        <p className="text-lg font-medium mb-4 text-cyan-300">
          Q{step}. Choose the correct option:
        </p>

        <p className="text-[1.05rem] leading-relaxed mb-6 text-gray-100">
          {test.problem}
        </p>

        <div className="grid gap-3">
          {test.answers.map((opt) => (
            <motion.div
              key={opt.id}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.1 }}
            >
              <MiniButton
                ui={MiniUiType.OUTLINE}
                className="w-full py-3 border border-cyan-400 text-cyan-300 font-medium hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-500 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                onClick={() => onSubmitAnswer(opt.id)}
              >
                {opt.content}
              </MiniButton>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
