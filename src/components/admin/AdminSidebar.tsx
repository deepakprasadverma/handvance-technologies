"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Briefcase,
  Layers,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Activity,
} from "lucide-react";

interface AdminSidebarProps {
  adminUser: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatarUrl?: string | null;
  };
}

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Inquiries", href: "/admin/contacts", icon: Mail },
  { name: "Quote Requests", href: "/admin/quotes", icon: FileText },
  { name: "Job Applications", href: "/admin/careers", icon: Briefcase },
  { name: "Portfolio", href: "/admin/projects", icon: Layers },
  { name: "Subscribers", href: "/admin/subscribers", icon: Users },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ adminUser }) => {
  const pathname = usePathname();
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
    <aside className="w-64 bg-[#101D36] text-white flex flex-col border-r border-[#1B2A4A] select-none h-screen sticky top-0 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#1B2A4A]">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#13CDEB] to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-[#13CDEB]/20">
            H
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              Handvance
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#13CDEB]/20 text-[#13CDEB] px-1.5 py-0.5 rounded">
                Admin
              </span>
            </div>
            <p className="text-xs text-gray-400">Enterprise Control</p>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#13CDEB] text-[#101D36] font-semibold shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#101D36]" : "text-gray-400"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Quick Links
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <span>Public Website</span>
          </div>
        </Link>
      </nav>

      {/* Admin User Profile & Logout */}
      <div className="p-4 border-t border-[#1B2A4A] bg-[#0C1629]">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#13CDEB]/30 to-blue-500/20 border border-[#13CDEB]/40 flex items-center justify-center font-bold text-[#13CDEB] text-sm">
            {adminUser.firstName?.[0] || "A"}
            {adminUser.lastName?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {adminUser.firstName} {adminUser.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate">{adminUser.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 mb-3 px-1">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-[#13CDEB]" />
            {adminUser.role}
          </span>
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-3 h-3" />
            Active
          </span>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/20 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </div>
    </aside>
  );
};
