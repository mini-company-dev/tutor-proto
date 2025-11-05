"use client";

import { BotIcon } from "@/app/styles/icons";
import { motion } from "framer-motion";

export default function AiBot() {
  return (
    <motion.div
      animate={{
        rotate: [0, -10, 8, -6, 4, 0],
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      <BotIcon className="w-16 h-16 text-[var(--brand)] drop-shadow-[0_0_10px_rgba(74,144,226,0.3)]" />
    </motion.div>
  );
}
