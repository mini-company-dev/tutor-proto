import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Prop {
  nextStep: () => void;
}
export default function Step1({ nextStep }: Prop) {
  return (
    <Card className="max-w-xl w-full bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)] shadow-lg p-8 backdrop-blur-xl">
      <CardContent className="space-y-6 text-center">
        <h1 className="text-3xl font-bold text-[var(--brand)]">
          AI English Level Test
        </h1>
        <p className="text-[var(--text-light)] leading-relaxed">
          AI가 당신의 진짜 영어 실력을 정밀하게 진단해 드려요! <br />약 15~20분
          정도 소요되며, 문법/어휘 테스트 후 스피킹/리스닝 테스트가 진행됩니다.
        </p>
        <Button
          onClick={nextStep}
          className="w-full text-lg py-6 bg-[var(--brand)] text-white hover:opacity-90 transition"
        >
          무료 AI 레벨테스트 시작하기
        </Button>
      </CardContent>
    </Card>
  );
}
