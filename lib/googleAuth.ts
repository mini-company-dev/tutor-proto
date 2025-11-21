import { ClientResponse } from "@/type/clientResponse";
import { LoginResponse } from "@/type/test/auth/login";
import { callSererApi } from "./apiFactory";

export async function googleAuth(
  accessToken: string
): Promise<ClientResponse<LoginResponse>> {
  return callSererApi<LoginResponse>("POST", "/auth/google", {
    access_token: accessToken,
  });
}
