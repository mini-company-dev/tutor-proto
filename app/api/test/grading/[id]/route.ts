import { NextRequest, NextResponse } from "next/server";
import { CApiResponse } from "@/type/clientApiResponse";
import { createServerApiHandler } from "@/app/api/serverApiFactory";
import { SGrammarTest } from "@/type/test/objective-test/serverTestTyoe";
import { CGrammarTestResult } from "@/type/test/objective-test/clientTestType";

const baseHandler = createServerApiHandler<SGrammarTest>(
  "GET",
  "/api/tests/:id",
  "TEST_ID_KEY"
);

export const GET = async (
  req: NextRequest,
  context: any
): Promise<NextResponse<CApiResponse<CGrammarTestResult | null>>> => {
  const apiResponse = await baseHandler(req, context);
  const response: CApiResponse<SGrammarTest> = await apiResponse.json();

  const searchParams = req.nextUrl.searchParams;
  const answerId = searchParams.get("answer");

  const data = response.payload;
  if (data) {
    for (const answer of data?.answers ?? []) {
      if (answer.id === answerId) {
        return NextResponse.json<CApiResponse<CGrammarTestResult>>({
          payload: {
            id: data.id,
            problem: data.problem,
            level: data.level,
            answers: answer.content,
            isGraded: !!answer.correct,
          },
          explanation: answer.correct ? "정답입니다" : "오답입니다",
        });
      }
    }
  }

  return NextResponse.json<CApiResponse<CGrammarTestResult | null>>({
    payload: null,
    explanation: "오류입니다",
  });
};
