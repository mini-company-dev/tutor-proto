"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScroll } from "framer-motion"; // ← 이거도 빼고 싶다면 말해줘

export default function Header() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  // 🔹 useScroll 안 쓰고 window.scrollY로 교체하고 싶으면 말해줘
  const { scrollY } = useScroll();

  scrollY.on("change", (y) => {
    if (y > lastY && y > 100) setIsVisible(false);
    else setIsVisible(true);
    setLastY(y);
  });

  const navItems = [
    { label: "홈", href: "/" },
    { label: "AI 레벨테스트", href: "/level-test" },
  ];

  return (
    <>
      <header
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
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[var(--brand)] to-sky-400 bg-clip-text text-transparent">
              EasyFun
            </span>
          </Link>

          {/* 데스크탑 메뉴 */}
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

          {/* CTA: 로그인 */}
          <button
            onClick={() => router.push("/auth")}
            className="hidden md:inline-flex px-6 py-2 rounded-xl bg-gradient-to-r from-[var(--brand)] to-sky-400 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300"
          >
            로그인
          </button>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden p-2 text-[var(--text-light)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isOpen && (
          <nav className="md:hidden bg-[rgba(20,20,30,0.9)] backdrop-blur-xl border-t border-[var(--brand)]/20 px-6 pb-6">
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
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/auth");
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--brand)] to-sky-400 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300"
                >
                  로그인
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* 본문 offset */}
      <div className="h-[100px]" />
    </>
  );
}
