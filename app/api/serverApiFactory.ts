import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosRequestConfig, Method } from "axios";
import { SApiResponse } from "@/type/server/serverApiResponse";
import { CApiResponse } from "@/type/client/clientApiResponse";
import { getCached, setCached } from "@/lib/cache";

export function createServerApiHandler<T>(
  method: Method,
  path: string,
  cache: boolean
) {
  return async (req: NextRequest): Promise<NextResponse<CApiResponse<T>>> => {
    try {
      const token = req.headers.get("token");
      const dto = req.method === "GET" ? undefined : await req.json();

      const queryString = req.nextUrl.search;
      const fullUrl = `${process.env.API_URL}${path}${queryString || ""}`;

      const cached = getCached(method, path);
      if (cached) {
        return NextResponse.json<CApiResponse<T>>(
          {
            req: cached.data as T,
            explanation: cached.message ?? "요청 성공",
          },
          { status: cached.status }
        );
      }

      const config: AxiosRequestConfig = {
        method,
        url: fullUrl,
        data: dto,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `${token}` } : {}),
        },
        validateStatus: () => true,
      };

      const res = await axios.request<SApiResponse<T>>(config);
      const response = res.data;
      if (cache) setCached(method, path, response);

      return NextResponse.json<CApiResponse<T>>(
        {
          req: response.data as T,
          explanation: response.message ?? "요청 성공",
        },
        { status: res.status }
      );
    } catch (err: any) {
      console.error("Server API Error:", err.message);
      return NextResponse.json(
        {
          data: undefined,
          explanation:
            err.response?.data?.message || err.message || "서버 오류",
        },
        { status: err.response?.status || 500 }
      );
    }
  };
}
