"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { setToken } from "@/app/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiFetch("/api/auth/login", { email, password }, "POST");
      setToken(data.token);
      router.replace("/admin");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-pink-100 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-gray-900">Admin Login</h1>
        <p className="text-sm text-gray-500 mt-1">MoodyMists Candles</p>

        {error && (
          <div className="mt-4 rounded-xl bg-pink-50 border border-pink-200 p-3 text-sm text-pink-700">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@moodymists.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-pink-600 text-white py-3 font-semibold hover:bg-pink-700 transition disabled:opacity-60"
            type="submit"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}