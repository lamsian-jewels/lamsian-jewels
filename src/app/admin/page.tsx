"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src="/logo.jpeg" alt="Lamsian Jewels" fill className="object-cover" />
            </div>
            <div>
              <p className="font-display text-2xl text-cream-50">Lamsian</p>
              <p className="font-body text-[10px] tracking-[0.3em] text-gold-400 uppercase">Admin</p>
            </div>
          </div>
        </div>

        <div className="bg-cream-50 p-8">
          <h1 className="font-display text-2xl text-charcoal-900 mb-6">Sign In</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-body p-3 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs tracking-widest text-charcoal-500 uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-cream-300 bg-white px-4 py-3 text-sm font-body text-charcoal-900 focus:outline-none focus:border-gold-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-body text-xs tracking-widest text-charcoal-500 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full border border-cream-300 bg-white px-4 py-3 text-sm font-body text-charcoal-900 focus:outline-none focus:border-gold-500"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-charcoal-900 text-cream-50 py-3 text-xs tracking-widest uppercase font-body hover:bg-gold-500 hover:text-charcoal-900 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
