import { CApiResponse } from "@/type/client/clientApiResponse";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export async function requestApi<T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<CApiResponse<T>> {
  try {
    const res: AxiosResponse<CApiResponse<T>> = await axios.request({
      method,
      url,
      data,
      headers: { "Content-Type": "application/json" },
      ...config,
    });

    if (res && res.data) {
      return res.data;
    }
    return {
      req: undefined,
      explanation: "요청 실패",
    };
  } catch (error: any) {
    return {
      req: undefined,
      explanation: "요청 실패",
    };
  }
}
