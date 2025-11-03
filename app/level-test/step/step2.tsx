import { Card, CardContent } from "@/components/ui/card";
import { getGrammerTestAnswerById } from "@/lib/grammerTestAnswer";
import { CGrammarTest } from "@/type/client/clientGrammerTestAnswer";
import { MiniButton, MiniUiType } from "ministudio-ui";
import { useEffect } from "react";

interface Prop {
  nextStep: () => void;
  test: CGrammarTest;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}
export default function Step2({ nextStep, test, setProgress, step }: Prop) {
  useEffect(() => {
    async function fetchTests() {
      const data = await getGrammerTestAnswerById(test.id);
      if (data.req) {
        console.log(data);
      }
    }
    fetchTests();
  }, []);
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
                key={opt.content}
                ui={MiniUiType.OUTLINE}
                className="border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white transition"
                onClick={() => {
                  setProgress((p) => Math.min(p + 7, 100));
                  nextStep();
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
