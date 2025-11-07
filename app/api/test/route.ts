import { buildCacheKey, createServerApiHandler } from "../serverApiFactory";
import { NextRequest, NextResponse } from "next/server";
import { CApiResponse } from "@/type/clientApiResponse";
import { getCached, setCached } from "@/lib/cache";
import { SGrammarTest } from "@/type/test/objective-test/serverTestTyoe";

const baseHandler = createServerApiHandler<SGrammarTest[]>("GET", "/api/tests");

export const GET = async (
  req: NextRequest,
  context: any
): Promise<NextResponse<CApiResponse<SGrammarTest[]>>> => {
  const apiResponse = await baseHandler(req, context);

  const clone = apiResponse.clone();
  const response = await clone.json();

  response.req?.forEach((data: SGrammarTest) => {
    const key = buildCacheKey("TEST_ID_KEY", data.id);
    if (!getCached(key)) setCached(buildCacheKey("TEST_ID_KEY", data.id), data);
    data.answers.forEach((answer) => {
      answer.correct = undefined;
    });
  });

  return apiResponse;
};
