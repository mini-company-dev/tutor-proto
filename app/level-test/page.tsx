"use client";

import Step1 from "./step/step1";
import Step2 from "./step/step2";
import useLevelTest from "./step/useLevelTest";

export default function LevelTest() {
  const { step, nextStep, progress, getTest, onSubmitAnswer } = useLevelTest();
  return (
    <div>
      {step === 0 && <Step1 nextStep={nextStep} />}

      {step >= 1 && step <= 3 && (
        <Step2
          nextStep={nextStep}
          step={step}
          test={getTest()}
          onSubmitAnswer={onSubmitAnswer}
        />
      )}
      {/*
      {step === 3 && (
        <Card className="max-w-2xl w-full bg-[var(--card)] border border-[var(--border)] p-8 shadow-lg">
          <CardContent className="space-y-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              🎤 스피킹 & 리스닝 테스트
            </h2>
            <p className="text-[var(--text-light)]">
              마이크 사용을 허용하고 조용한 환경에서 진행해주세요.
            </p>
            <div className="flex justify-center items-center mt-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="p-6 rounded-full bg-[var(--muted)]/30 border border-[var(--border)]"
              >
                <Mic className="w-12 h-12 text-[var(--brand)]" />
              </motion.div>
            </div>
            <Button
              onClick={nextStep}
              className="w-full mt-8 bg-[var(--brand)] text-white hover:opacity-90"
            >
              테스트 완료
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card className="max-w-xl w-full bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] p-8 text-center shadow-lg">
          <CardContent className="space-y-5">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-[var(--brand)]" />
            <p className="text-[var(--text-light)]">
              AI가 답변을 정밀하게 분석하고 있습니다...
            </p>
          </CardContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="space-y-6 mt-8"
          >
            <h2 className="text-3xl font-bold text-[var(--brand)]">
              당신의 영어 레벨은 B1 (중급)입니다!
            </h2>
            <p className="text-[var(--text-light)]">
              익숙한 주제에 대해 대화하고 여행 중 대부분의 상황을 처리할 수 있는
              수준입니다.
            </p>
            <Button className="w-full mt-4 bg-[var(--brand)] text-white hover:opacity-90">
              B1 레벨 향상에 효과적인 튜터 찾아보기
            </Button>
          </motion.div>
        </Card>
      )} */}
    </div>
  );
}
