"use client";

import { motion } from "framer-motion";
import { BotIcon, SparklesIcon } from "./icons";
import { useRouter } from "next/navigation";

export default function LevelTestSection() {
  const route = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100 flex flex-col items-center justify-center overflow-hidden">
      {/* 반투명 원형 장식 */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-3xl rounded-full"></div>

      <motion.div
        className="relative w-full max-w-2xl text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-4 mb-4">
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BotIcon className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </motion.div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
              AI Level Test
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Speak freely with our AI tutor. Receive instant feedback on your
            pronunciation, fluency, and grammar.
          </p>
        </header>

        {/* Main */}
        <main className="mb-12 flex justify-center">
          <motion.button
            onClick={() => route.push("/level-test")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 backdrop-blur-lg border border-white/10 shadow-[0_0_25px_rgba(236,72,153,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300"
          >
            <SparklesIcon className="w-6 h-6 mr-3 text-cyan-400 group-hover:text-fuchsia-400 transition-colors" />
            Start Test
          </motion.button>
        </main>

        {/* Footer */}
        <footer className="text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} AI English Tutor. All rights
            reserved.
          </p>
          <p className="mt-1">Powered by Google Gemini</p>
        </footer>
      </motion.div>
    </div>
  );
}
