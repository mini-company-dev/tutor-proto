"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > lastY && y > 100) {
      setIsVisible(false); // 아래로 스크롤 → 숨김
    } else {
      setIsVisible(true); // 위로 스크롤 → 나타남
    }
    setLastY(y);
  });

  const navItems = [
    { label: "홈", href: "/" },
    { label: "AI 레벨테스트", href: "/level-test" },
  ];

  return (
    <>
      {/* 🔹 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div
          className="
            mx-auto flex items-center justify-between max-w-7xl px-6 py-4
            mt-4 rounded-2xl backdrop-blur-md
            bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)]
            transition-all duration-500 border border-transparent
          "
        >
          {/* ✅ 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-[var(--brand)] to-sky-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              EasyFun
            </motion.span>
          </Link>

          {/* ✅ 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[var(--text-light)] hover:text-[var(--brand)] transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ✅ CTA 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex px-6 py-2 rounded-xl bg-gradient-to-r from-[var(--brand)] to-sky-400 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300"
          >
            로그인
          </motion.button>

          {/* ✅ 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 text-[var(--text-light)]"
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ✅ 모바일 드롭다운 메뉴 */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[rgba(20,20,30,0.9)] backdrop-blur-xl border-t border-[var(--brand)]/20 px-6 pb-6"
          >
            <ul className="flex flex-col gap-5 mt-4 text-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-2 text-[var(--text-light)] hover:text-[var(--brand)] font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--brand)] to-sky-400 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                >
                  로그인
                </motion.button>
              </li>
            </ul>
          </motion.nav>
        )}
      </motion.header>

      {/* 🔹 본문과 겹치지 않도록 상단 여백 확보 */}
      <div className="h-[100px]" />
    </>
  );
}
