import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ApiResponse } from "./response/apiResponse";

export async function serverApiFileHandler<T>(
  req: NextRequest,
  path: string,
  form: FormData
): Promise<NextResponse<ApiResponse<T | null>>> {
  try {
    const token = req.headers.get("token");
    const url = `${process.env.API_URL}${path}`;

    const { data } = await axios.post<ApiResponse<T>>(url, form, {
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
      validateStatus: () => true,
    });

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Server API Error:", err.message);
    return NextResponse.json(
      { data: null, code: 999, message: "Server Response Error" },
      { status: 500 }
    );
  }
}
