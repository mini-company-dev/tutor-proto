"use client";

import {
  fadeIn,
  fadeInUp,
  hoverScale,
  MiniBox,
  MiniButton,
  MiniImage,
  MiniSpacer,
  MiniUiSize,
  MiniUiType,
} from "ministudio-ui";

export default function MainHeroSection({ className }: { className?: string }) {
  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100 ${className}`}
    >
      {/* 🔹 Glow Background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 blur-3xl rounded-full" />

      {/* 🔹 Hero Content */}
      <section className="relative z-10 grid grid-cols-18 gap-6 items-center max-w-7xl mx-auto px-8">
        {/* Left: Text */}
        <div className="col-span-8 flex flex-col justify-center space-y-6">
          <MiniBox uiMotion={[fadeInUp()]}>
            <h1 className="text-5xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                마스터 튜터의 멘토링
              </span>
              <br />
              <span className="text-gray-200">학습을 완성시킨다.</span>
            </h1>
          </MiniBox>

          <MiniBox uiMotion={[fadeIn(0.4)]}>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              나만의 맞춤형 튜터와 함께하는
              <br />
              <span className="text-cyan-300 font-semibold">
                EasyFun 화상영어
              </span>
              로 실력을 완성하세요.
            </p>
          </MiniBox>

          <MiniBox uiMotion={[fadeIn(0.6)]}>
            <MiniButton
              ui={MiniUiType.OUTLINE}
              uiSize={MiniUiSize.MEDIUM}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-white text-lg font-semibold backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.1)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300"
              uiHover={[hoverScale()]}
            >
              지금 시작하기 🚀
            </MiniButton>
          </MiniBox>
        </div>

        {/* Right: Image */}
        <MiniBox
          uiMotion={[fadeInUp(0.5)]}
          className="col-span-10 flex justify-center"
        >
          <MiniImage
            src="./maintutor.png"
            alt="튜터 이미지"
            className="w-[85%] max-w-[550px] drop-shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          />
        </MiniBox>
      </section>

      {/* Footer-like subtle note */}
      <MiniBox
        uiMotion={[fadeIn(0.8)]}
        className="absolute bottom-10 text-gray-500 text-sm text-center"
      >
        <p>© {new Date().getFullYear()} Mini Studio. All rights reserved.</p>
      </MiniBox>

      <MiniSpacer size={60} />
    </div>
  );
}
