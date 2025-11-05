"use client";

import { motion } from "framer-motion";
import { BotIcon, SparklesIcon } from "../styles/icons";
import { useRouter } from "next/navigation";
import AiBot from "@/components/ui/aiBot";

export default function LevelTestSection() {
  const route = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-transparent text-[var(--text)]">
      <motion.div
        className="relative w-full max-w-2xl text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <AiBot />
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
              AI Level Test
            </h1>
          </div>

          <p className="text-lg max-w-xl mx-auto leading-relaxed text-[var(--text-light)]">
            Speak freely with our AI tutor and receive instant feedback on your
            pronunciation, fluency, and grammar accuracy.
          </p>
        </header>

        {/* Main Button */}
        <main className="flex justify-center">
          <motion.button
            onClick={() => route.push("/level-test")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl text-white transition-all duration-300 bg-gradient-to-r from-[var(--brand)] to-sky-400 shadow-md hover:shadow-lg"
          >
            <SparklesIcon className="w-6 h-6 mr-3 text-white" />
            Start Test
          </motion.button>
        </main>
      </motion.div>
    </div>
  );
}
