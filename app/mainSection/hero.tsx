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
    <div className={`bg-[var(--brand)]/30 ${className}`}>
      <MiniSpacer size={100} />
      <section>
        <div className="relative z-10 col-start-5 col-end-10 flex flex-col justify-center">
          <MiniBox uiMotion={[fadeInUp()]}>
            <h1 className="text-5xl font-bold">
              마스터 튜터의 멘토링,
              <br />
              <strong>학습을 완성</strong>시킨다.
            </h1>
          </MiniBox>
          <MiniSpacer size={10} />
          <MiniBox uiMotion={[fadeIn(0.7)]}>
            <p className="text-lg text-[var(--text-light)]">
              나만의 맞춤형 튜터와
              <strong>EasyFun</strong>
              화상영어
            </p>
          </MiniBox>
          <MiniSpacer size={20} />
          <MiniButton
            ui={MiniUiType.BRAND}
            uiSize={MiniUiSize.MEDIUM}
            className="w-40 rounded-2xl font-semibold"
            uiHover={[hoverScale()]}
          >
            체험해보기
          </MiniButton>
        </div>
        <MiniImage className="col-start-10 col-end-19" src="./maintutor.png" />
      </section>
      <MiniSpacer size={100} />
    </div>
  );
}
