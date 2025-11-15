import { ClientResponse } from "@/type/clientResponse";
import { requestApi } from "./apiFactory";
import {
  GrammarTest,
  GrammarTestResult,
  Level,
  TestType,
} from "@/type/test/objective-test/clientTestType";

export async function getGrammerTestAnswerByLevel(
  level: Level,
  testType: TestType
): Promise<ClientResponse<GrammarTest[]>> {
  return requestApi<GrammarTest[]>(
    "GET",
    `/api/test?level=${level}&type=${testType}`
  );
}

export async function getGrammerTestAnswerById(
  id: string
): Promise<ClientResponse<GrammarTest>> {
  return requestApi<GrammarTest>("GET", `/api/test/${id}`);
}

export async function gradingTestAnswerById(
  id: string,
  answerId: string
): Promise<ClientResponse<GrammarTestResult>> {
  return requestApi<GrammarTestResult>(
    "GET",
    `/api/test/grading/${id}?answer=${answerId}`
  );
}
