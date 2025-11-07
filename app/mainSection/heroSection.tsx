"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainHeroSection({ className }: { className?: string }) {
  const route = useRouter();

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--bg)] text-[var(--text)] ${className}`}
    >
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center space-y-6 sm:space-y-8 text-center lg:text-left flex-1">
          <motion.h1
            className="text-4xl sm:text-3xl md:text-5xl xl:text-5xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text">
              마스터 튜터의 멘토링
            </span>
            <br />
            <span className="text-[var(--text)]">학습을 완성시킨다.</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-md text-[var(--text-light)] mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            나만의 맞춤형 튜터와 함께하는
            <br />
            <span className="bg-gradient-to-r from-[var(--brand)] to-sky-400 text-transparent bg-clip-text font-semibold">
              EasyFun 화상영어
            </span>
            로 실력을 완성하세요.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => route.push("/level-test")}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold bg-gradient-to-r from-[var(--brand)] to-sky-400 text-white shadow-md hover:shadow-lg transition-all duration-300 mx-auto lg:mx-0"
          >
            AI 레벨 테스트 바로가기
          </motion.button>
        </div>

        {/* Right: Tutor Image */}
        <motion.div
          className="flex justify-center flex-1 w-full mt-10 lg:mt-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Image
            src="/maintutor.png"
            alt="튜터 이미지"
            width={600}
            height={600}
            className="w-[70%] sm:w-[60%] md:w-[80%] lg:w-[100%] max-w-[480px] lg:max-w-[600px] h-auto"
          />
        </motion.div>
      </section>

      <div className="h-[60px]" />
    </div>
  );
}
