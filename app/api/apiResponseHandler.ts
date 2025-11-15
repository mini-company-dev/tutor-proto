import { ClientResponse } from "@/type/clientResponse";
import { NextResponse } from "next/server";

export const apiSuccessHandler = <T>(
  response: T
): NextResponse<ClientResponse<T>> => {
  return NextResponse.json<ClientResponse<T>>(
    {
      payload: response,
      explanation: "요청 성공",
    },
    { status: 200 }
  );
};

export const apiErrorHandler = <T>(): NextResponse<ClientResponse<T>> => {
  return NextResponse.json(
    {
      payload: undefined,
      explanation: "서버 오류",
    },
    { status: 500 }
  );
};
