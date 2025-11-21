import { NextRequest, NextResponse } from "next/server";
import axios, { Method } from "axios";
import { ApiResponse } from "@/app/api/response/apiResponse";
import { getCached, setCached } from "@/lib/cache";

/**
 * ApiResponse<ApiData> -> ClientResponse<ApiData>로 변환하는 로직이 포함 됨
 * 이를 사용하는 로직에서 ClientResposne<ApiData> -> ClientResponse<Data>로 변환하는 로직을 작성
 */
export function serverApiHandler<T>(
  method: Method,
  path: string,
  cacheKey?: string
) {
  return async (
    req: NextRequest,
    context?: { params?: { id?: string } }
  ): Promise<NextResponse<ApiResponse<T | null>>> => {
    try {
      const isPrefetch = req.headers.get("next-router-prefetch") === "1";
      if (isPrefetch) {
        console.log("Prefetch request ignored");
        return NextResponse.json(
          { data: null, code: 0, message: "Prefetch request ignored" },
          { status: 204 }
        );
      }

      const token = req.headers.get("authorization");

      console.log("TOKEN: ", token);

      let dto: any;
      if (req.method !== "GET") {
        try {
          dto = await req.json();
        } catch {
          dto = undefined;
        }
      }

      const params = context?.params ? await context.params : undefined;
      const id = params?.id;
      const fullPath = buildFullUrl(id, req, path);

      if (cacheKey) {
        const key = buildCacheKey(cacheKey, id);
        const cached = getCached(key);
        if (cached) {
          return NextResponse.json(cached);
        }
      }

      const serverResponse = await axios.request<ApiResponse<T>>({
        method,
        url: fullPath,
        data: dto,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        validateStatus: () => true,
      });

      if (cacheKey) {
        const key = buildCacheKey(cacheKey, id);
        setCached(key, serverResponse.data);
      }

      return NextResponse.json(serverResponse.data);
    } catch (err: any) {
      console.error("Server API Error:", err.message);
      return NextResponse.json(
        { data: null, code: 999, message: "Server Response Error" },
        { status: 500 }
      );
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
