"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  ExternalLink,
  LogOut,
  Database,
  Lock,
} from "lucide-react";

interface AdminTopNavProps {
  adminUser: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export const AdminTopNav: React.FC<AdminTopNavProps> = ({ adminUser }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live
          </span>
          <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <Database className="w-3 h-3 text-blue-500" />
            Supabase DB Connected
          </span>
          <span className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
            <Lock className="w-3 h-3 text-gray-500" />
            Edge Session Verified
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-[#101D36] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200 transition-colors"
        >
          <span>View Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#101D36] text-[#13CDEB] flex items-center justify-center font-bold text-xs shadow-xs">
            {adminUser.firstName?.[0] || "A"}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-gray-900 leading-tight">
              {adminUser.firstName} {adminUser.lastName}
            </div>
            <div className="text-[10px] text-gray-500 leading-tight flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-[#13CDEB]" />
              {adminUser.role}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Sign out of Admin Portal"
          className="p-1.5 rounded-md text-gray-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
