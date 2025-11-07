import { CGrammarTest } from "@/type/test/objective-test/clientTestType";
import { motion } from "framer-motion";

interface Prop {
  count: number;
  test: CGrammarTest;
  onSubmitAnswer: (id: string) => void;
}

export const QuestionContext = ({ count, test, onSubmitAnswer }: Prop) => {
  return (
    <div className="rounded-2xl p-6 bg-[var(--sub)] border border-[var(--brand)]/10 shadow-inner">
      <p className="text-lg font-semibold mb-4 bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
        Q{count}. Choose the correct option:
      </p>

      <p className="text-[1.05rem] leading-relaxed mb-6 text-[var(--text)]">
        {test.problem}
      </p>

      <div className="grid gap-3">
        {test.answers.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onSubmitAnswer(opt.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="w-full py-3 px-4 rounded-xl border border-[var(--brand)]/40 
                         text-[var(--brand)] font-medium text-base
                         hover:bg-gradient-to-r hover:from-[var(--brand)] hover:to-sky-400 
                         hover:text-white transition-all duration-200
                         shadow-sm hover:shadow-[0_0_15px_rgba(74,144,226,0.3)]"
          >
            {opt.content}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
