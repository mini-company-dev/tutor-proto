import { buildCacheKey, serverApiHandler } from "../serverApiFactory";
import { NextRequest, NextResponse } from "next/server";
import { ClientResponse } from "@/type/clientResponse";
import { getCached, setCached } from "@/lib/cache";
import { ApiGrammarTest } from "../response/apiGrammerTestResponse";
import { ApiResponse } from "../response/apiResponse";
import { apiSuccessHandler } from "../apiResponseHandler";
import { GrammarTest } from "@/type/test/objective-test/clientTestType";

const baseHandler = serverApiHandler<ApiGrammarTest[]>("GET", "/api/tests");

export const GET = async (
  req: NextRequest,
  context: any
): Promise<NextResponse<ClientResponse<GrammarTest[]>>> => {
  const apiResponse = await baseHandler(req, context);
  const response: ApiResponse<ApiGrammarTest[]> = await apiResponse.json();
  const data = response.data;

  const tests: GrammarTest[] = data?.map(convertApiToClientTest) ?? [];
  return apiSuccessHandler(tests);
};

function convertApiToClientTest(api: ApiGrammarTest): GrammarTest {
  return {
    id: api.id,
    problem: api.problem,
    level: api.level,
    type: api.type,
    answers: api.answers.map((a) => ({
      id: a.id,
      content: a.content,
    })),
  };
}
