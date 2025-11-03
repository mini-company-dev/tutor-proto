import { CApiResponse } from "@/type/client/clientApiResponse";
import {
  CGrammarTest,
  CLevel,
  CTestType,
} from "@/type/client/clientGrammerTestAnswer";
import { requestApi } from "./apiFactory";

export async function getGrammerTestAnswerByLevel(
  level: CLevel,
  testType: CTestType
): Promise<CApiResponse<CGrammarTest[]>> {
  return requestApi<CGrammarTest[]>(
    "GET",
    `/api/test?level=${level}&type=${testType}`
  );
}
