"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { googleAuth } from "@/lib/googleAuth";

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    async function run() {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");

      if (!accessToken) {
        alert("구글 로그인에 실패했습니다.");
        router.push("/");
        return;
      }

      try {
        const res = await googleAuth(accessToken);

        if (!res.payload) {
          alert(res.explanation || "로그인 처리 중 오류가 발생했습니다.");
          router.push("/auth");
          return;
        }

        const token = res.payload.token;
        if (!token) {
          alert("서버 응답이 올바르지 않습니다.");
          router.push("/auth");
          return;
        }

        localStorage.setItem("token", token);

        router.push("/");
      } catch (err) {
        console.error("Google login error:", err);
        alert("로그인 처리 중 오류가 발생했습니다.");
        router.push("/auth");
      }
    }

    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>로그인 처리중...</p>
    </div>
  );
}
