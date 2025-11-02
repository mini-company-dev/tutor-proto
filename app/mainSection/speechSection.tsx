"use client";

import React, { useState } from "react";
import { BotIcon, SparklesIcon } from "./icons";
import SpeechDefault from "./aiTutorApi/ui/speechDefault";
import SpeechCall from "./aiTutorApi/ui/speechCall";

export default function ApiSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <header className="mb-8">
          <div className="inline-flex items-center gap-4 mb-4">
            <BotIcon className="w-16 h-16 text-cyan-400" />
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">
              Api Section
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Practice your English with a friendly AI. Get instant feedback on
            your fluency, pronunciation, and grammar.
          </p>
        </header>

        <main className="mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 hover:bg-gray-700"
          >
            <span className="absolute -inset-full top-0 block -translate-y-full rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-20 blur-3xl transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"></span>
            <SparklesIcon className="w-6 h-6 mr-3 text-cyan-400 group-hover:text-fuchsia-400 transition-colors" />
            Start Your Assessment
          </button>
        </main>

        <footer className="text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} AI English Tutor. All rights
            reserved.
          </p>
          <p className="mt-1">Powered by Google Gemini</p>
        </footer>
      </div>

      {isModalOpen && <SpeechCall onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
