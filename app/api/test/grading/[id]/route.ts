import { NextRequest, NextResponse } from "next/server";
import { serverApiHandler } from "@/app/api/serverApiFactory";
import { GrammarTestResult } from "@/type/test/objective-test/clientTestType";
import { ApiGrammarTest } from "@/app/api/response/apiGrammerTestResponse";
import {
  apiErrorHandler,
  apiSuccessHandler,
} from "@/app/api/apiResponseHandler";
import { ClientResponse } from "@/type/clientResponse";
import { ApiResponse } from "@/app/api/response/apiResponse";

const baseHandler = serverApiHandler<ApiGrammarTest>(
  "GET",
  "/api/tests/:id",
  "TEST_ID_KEY"
);

export const GET = async (
  req: NextRequest,
  context: any
): Promise<NextResponse<ClientResponse<GrammarTestResult>>> => {
  const apiResponse = await baseHandler(req, context);
  const response: ApiResponse<ApiGrammarTest> = await apiResponse.json();
  const data = response.data;

  const searchParams = req.nextUrl.searchParams;
  const answerId = searchParams.get("answer");

  if (data) {
    for (const answer of data?.answers ?? []) {
      if (answer.id === answerId) {
        return apiSuccessHandler<GrammarTestResult>({
          id: data.id,
          problem: data.problem,
          level: data.level,
          answers: answer.content,
          isGraded: answer.correct,
        });
      }
    }
  }

  return apiErrorHandler();
};
