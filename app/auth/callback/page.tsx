"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    // URL에서 access_token 추출
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const accessToken = params.get("access_token");

    if (!accessToken) {
      alert("구글 로그인에 실패했습니다.");
      router.push("/login");
      return;
    }

    // FastAPI로 accessToken 전송
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        // 로그인 성공 → JWT 저장
        localStorage.setItem("token", data.access_token);

        // 메인 페이지로 이동
        router.push("/");
      })
      .catch(() => {
        alert("로그인 처리 중 오류가 발생했습니다.");
        router.push("/login");
      });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>로그인 처리중...</p>
    </div>
  );
}
