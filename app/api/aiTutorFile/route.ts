import { NextRequest, NextResponse } from "next/server";
import { serverApiFileHandler } from "../serverApiFileFactory";
import { TutorResponse } from "@/type/test/speak-test/tutorSpeakTypes";
import { ApiTutorResponse } from "../response/apiTutorResponse";
import { ClientResponse } from "@/type/clientResponse";
import { ApiResponse } from "../response/apiResponse";
import { apiSuccessHandler } from "../apiResponseHandler";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ClientResponse<TutorResponse>>> {
  const form = await req.formData();
  const apiResponse = await serverApiFileHandler<ApiTutorResponse>(
    req,
    "/aiTest",
    form
  );
  const response: ApiResponse<ApiTutorResponse> = await apiResponse.json();
  const data = response.data;

  return apiSuccessHandler(data as TutorResponse);
}
