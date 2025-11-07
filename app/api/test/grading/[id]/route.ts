import { NextRequest, NextResponse } from "next/server";
import { CApiResponse } from "@/type/clientApiResponse";
import { createServerApiHandler } from "@/app/api/serverApiFactory";
import { SGrammarTest } from "@/type/test/objective-test/serverTestTyoe";

const baseHandler = createServerApiHandler<SGrammarTest>(
  "GET",
  "/api/tests/:id",
  "TEST_ID_KEY"
);

export const GET = async (
  req: NextRequest,
  context: any
): Promise<NextResponse<CApiResponse<boolean>>> => {
  const apiResponse = await baseHandler(req, context);
  const response: CApiResponse<SGrammarTest> = await apiResponse.json();

  const searchParams = req.nextUrl.searchParams;
  const answerId = searchParams.get("answer");

  for (const answer of response.payload?.answers ?? []) {
    if (answer.correct && answer.id === answerId) {
      return NextResponse.json<CApiResponse<boolean>>({
        payload: true,
        explanation: "정답",
      });
    }
  }

  return NextResponse.json<CApiResponse<boolean>>({
    payload: false,
    explanation: "오답",
  });
};
