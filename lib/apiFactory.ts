import { ApiResponse } from "@/app/api/response/apiResponse";
import { ClientResponse } from "@/type/clientResponse";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { env } from "next-runtime-env";

function getAuthHeader() {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

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
      ...getAuthHeader(),
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
    const baseURL = env("NEXT_PUBLIC_API_URL");
    if (!baseURL) {
      throw new Error("NEXT_PUBLIC_API_URL is missing");
    }

    const isFormData = data instanceof FormData;

    const headers: Record<string, any> = {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...getAuthHeader(),
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
