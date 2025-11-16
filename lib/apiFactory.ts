import { apiSuccessHandler } from "@/app/api/apiResponseHandler";
import { ApiResponse } from "@/app/api/response/apiResponse";
import { ClientResponse } from "@/type/clientResponse";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export async function callNextApi<T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ClientResponse<T>> {
  try {
    const isFormData = data instanceof FormData;

    const headers: Record<string, any> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(config?.headers || {}),
    };

    const res: AxiosResponse<ClientResponse<T>> = await axios.request({
      method,
      url,
      data,
      headers,
      validateStatus: () => true,
      ...config,
    });

    if (res && res.data) {
      return res.data;
    }

    return {
      payload: undefined,
      explanation: "요청 실패",
    };
  } catch (err: any) {
    console.error("requestApi Error:", err);

    const explanation =
      err?.response?.data?.message ?? err?.message ?? "서버 요청 오류";

    return {
      payload: undefined,
      explanation,
    };
  }
}

export async function callSererApi<T>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ClientResponse<T>> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    if (!baseURL) {
      throw new Error("NEXT_PUBLIC_API_URL is missing");
    }

    const isFormData = data instanceof FormData;

    const headers: Record<string, any> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(config?.headers || {}),
    };

    const res: AxiosResponse<ApiResponse<T>> = await axios.request({
      method,
      url: `${baseURL}${url}`,
      data,
      headers,
      validateStatus: () => true,
      ...config,
    });

    console.log(`${baseURL}${url}`);
    if (res && res.data) {
      return {
        payload: res.data.data,
        explanation: res.data.message || "",
      };
    }

    return {
      payload: undefined,
      explanation: "요청 실패",
    };
  } catch (err: any) {
    console.error("requestApi Error:", err);

    const explanation =
      err?.response?.data?.message ?? err?.message ?? "서버 요청 오류";

    return {
      payload: undefined,
      explanation,
    };
  }
}
