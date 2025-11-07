import { CApiResponse } from "@/type/clientApiResponse";
import { requestApi } from "./apiFactory";
import {
  CGrammarTest,
  CLevel,
  CTestType,
} from "@/type/test/objective-test/clientTestType";

export async function getGrammerTestAnswerByLevel(
  level: CLevel,
  testType: CTestType
): Promise<CApiResponse<CGrammarTest[]>> {
  return requestApi<CGrammarTest[]>(
    "GET",
    `/api/test?level=${level}&type=${testType}`
  );
}

export async function getGrammerTestAnswerById(
  id: string
): Promise<CApiResponse<CGrammarTest>> {
  return requestApi<CGrammarTest>("GET", `/api/test/${id}`);
}

export async function gradingTestAnswerById(
  id: string,
  answerId: string
): Promise<CApiResponse<boolean>> {
  return requestApi<boolean>(
    "GET",
    `/api/test/grading/${id}?answer=${answerId}`
  );
}
