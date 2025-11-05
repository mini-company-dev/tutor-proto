"use client";

import { motion } from "framer-motion";

export default function LevelTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 bg-[var(--bg)] text-[var(--text)] font-sans antialiased">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl bg-[radial-gradient(circle_at_center,var(--brand)_0%,transparent_70%)]" />
      <div className="relative z-10 w-full max-w-2xl">{children}</div>
    </div>
  );
}
