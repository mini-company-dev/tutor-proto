import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosRequestConfig, Method } from "axios";
import { SApiResponse } from "@/type/server/serverApiResponse";
import { CApiResponse } from "@/type/client/clientApiResponse";
import { getCached, setCached } from "@/lib/cache";

export function createServerApiHandler<T>(
  method: Method,
  path: string,
  cacheKey?: string
) {
  return async (
    req: NextRequest,
    context?: { params?: { id?: string } }
  ): Promise<NextResponse<CApiResponse<T>>> => {
    try {
      const token = req.headers.get("token");
      const dto = req.method === "GET" ? undefined : await req.json();

      const params = context ? await context.params : undefined;
      const id = params?.id;
      const fullPath = buildFullUrl(id, req, path);

      if (cacheKey) {
        const cached = getCached(buildCacheKey(cacheKey, id));
        if (cached) {
          console.log("CACHE");
          return apiSuccessHandler<T>(cached);
        }
      }

      const config: AxiosRequestConfig = {
        method,
        url: fullPath,
        data: dto,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `${token}` } : {}),
        },
        validateStatus: () => true,
      };

      const serverResponse = await axios.request<SApiResponse<T>>(config);
      const response = serverResponse.data;
      if (cacheKey) setCached(buildCacheKey(cacheKey, id), response);
      return apiSuccessHandler<T>(response);
    } catch (err: any) {
      console.error("Server API Error:", err.message);
      return apiErrorHandler(err);
    }
  };
}

export const buildCacheKey = (cacheKey: string, id?: string) => {
  return `${cacheKey}:${id}`;
};

const buildFullUrl = (
  id: string | undefined,
  req: NextRequest,
  path: string
) => {
  const queryString = req.nextUrl.search;
  const replacedPath = id ? path.replace(":id", id) : path;
  return `${process.env.API_URL}${replacedPath}${queryString || ""}`;
};

const apiSuccessHandler = <T>(
  response: SApiResponse<T>
): NextResponse<CApiResponse<T>> => {
  return NextResponse.json<CApiResponse<T>>(
    {
      payload: response.data,
      explanation: response.message ?? "요청 성공",
    },
    { status: 200 }
  );
};

const apiErrorHandler = <T>(err: any): NextResponse<CApiResponse<T>> => {
  return NextResponse.json(
    {
      payload: undefined,
      explanation: err.response?.data?.message || err.message || "서버 오류",
    },
    { status: err.response?.status || 500 }
  );
};
