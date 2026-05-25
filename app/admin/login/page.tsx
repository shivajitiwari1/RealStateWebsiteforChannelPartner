"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setErrorMsg(data.error || "Invalid credentials");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a2d50] to-brand-blue flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L12 3L21 12" stroke="#3B6CB5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 10V20H10V15H14V20H19V10" stroke="#3B6CB5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">PropTech NCR</h1>
          <p className="text-white/50 font-body text-sm mt-1">Admin Panel</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                required
                placeholder="admin"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-body text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-body">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm font-body text-gray-800 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
              />
            </div>

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600 font-body">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs font-body mt-6">
          Run <code className="bg-white/10 px-1.5 py-0.5 rounded">npm run seed</code> to set your password
        </p>
      </div>
    </div>
  );
}
