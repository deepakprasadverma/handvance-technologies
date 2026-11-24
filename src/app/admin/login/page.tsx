"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema, AdminLoginData } from "@/lib/validations";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginData) => {
    setAuthError(null);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setAuthError(result.error || "Authentication failed. Please verify your credentials.");
        return;
      }

      setAuthSuccess(true);
      // Brief pause to display success state before redirecting
      setTimeout(() => {
        router.push(redirectPath);
        router.refresh();
      }, 500);
    } catch (err) {
      console.error("Login request failed:", err);
      setAuthError("Network connection error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Error Notice */}
      {authError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <span>{authError}</span>
        </div>
      )}

      {/* Success Notice */}
      {authSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-3 text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
          <span>Authentication verified. Redirecting to dashboard...</span>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
          Work Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            autoComplete="username"
            placeholder="admin@handvance.com"
            {...register("email")}
            className={`w-full pl-10 pr-4 py-3 bg-[#0C1629] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none transition-colors ${
              errors.email
                ? "border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                : "border-[#1B2A4A] focus:border-[#13CDEB] focus:ring-1 focus:ring-[#13CDEB]"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-rose-400 text-xs mt-1.5">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••••••"
            {...register("password")}
            className={`w-full pl-10 pr-11 py-3 bg-[#0C1629] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none transition-colors ${
              errors.password
                ? "border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                : "border-[#1B2A4A] focus:border-[#13CDEB] focus:ring-1 focus:ring-[#13CDEB]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-rose-400 text-xs mt-1.5">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || authSuccess}
        className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-[#13CDEB] to-cyan-400 hover:from-cyan-400 hover:to-[#13CDEB] text-[#101D36] font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#13CDEB]/20 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-cyan-400/30"
      >
        {isSubmitting || authSuccess ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Verifying Credentials...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-vh-100 min-h-screen bg-[#0A1220] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden select-none">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#13CDEB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-4 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#13CDEB] to-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-[#13CDEB]/20 group-hover:scale-105 transition-transform">
              H
            </div>
            <div className="text-left">
              <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                Handvance
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#13CDEB]/20 text-[#13CDEB] px-2 py-0.5 rounded">
                  Admin
                </span>
              </div>
              <p className="text-xs text-gray-400">Enterprise Control Panel</p>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Administrator Sign In</h1>
          <p className="text-sm text-gray-400 mt-1">
            Access Handvance Technologies secure back-office operations
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#101D36]/90 backdrop-blur-md border border-[#1B2A4A] rounded-2xl p-8 shadow-2xl">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 space-y-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#13CDEB]" />
                <span className="text-xs">Loading secure login portal...</span>
              </div>
            }
          >
            <LoginFormInner />
          </Suspense>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-[#1B2A4A] text-center">
            <div className="flex items-center justify-center space-x-1.5 text-xs text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#13CDEB]" />
              <span>256-Bit Encrypted Session • 8-Hour Token</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Authorized personnel only. All access attempts are cryptographically verified and audited.
            </p>
          </div>
        </div>

        {/* Back to Public Site */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-[#13CDEB] transition-colors"
          >
            ← Return to Handvance Technologies Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
