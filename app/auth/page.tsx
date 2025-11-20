"use client";

import { useState } from "react";

export default function GoogleLoginPage() {
  const [loading, setLoading] = useState(false);

  const googleLogin = () => {
    const clientId =
      "326489851801-hjjug48fe5mqigus6ftaa6rslv5uokeh.apps.googleusercontent.com";
    const redirectUri = `${window.location.origin}/auth/callback`;

    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=token` +
      `&scope=email%20profile`;

    setLoading(true);
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6">Google Login</h1>

        <button
          onClick={googleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Redirecting..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
}
