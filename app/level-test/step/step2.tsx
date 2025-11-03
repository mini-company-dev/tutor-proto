"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CGrammarTest } from "@/type/client/clientGrammerTestAnswer";
import { MiniButton, MiniUiType } from "ministudio-ui";

interface Prop {
  nextStep: () => void;
  step: number;
  test: CGrammarTest;
  onSubmitAnswer: (id: string) => void;
}

export default function Step2({ nextStep, step, test, onSubmitAnswer }: Prop) {
  return (
    <Card className="max-w-2xl w-full bg-[var(--card)] border border-[var(--border)] p-8 shadow-lg">
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">1차 문법 / 어휘 테스트</h2>
        </div>
        <div className="rounded-xl p-6 bg-[var(--muted)]/30 text-[var(--foreground)]">
          <p className="text-lg font-medium mb-3">
            Q{step}. Choose the correct option:
          </p>
          <p className="mb-4">{test.problem}</p>
          <div className="grid gap-3">
            {test.answers.map((opt) => (
              <MiniButton
                key={opt.id}
                ui={MiniUiType.OUTLINE}
                className="border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white transition"
                onClick={() => {
                  onSubmitAnswer(opt.id);
                  // nextStep();
                }}
              >
                {opt.content}
              </MiniButton>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
