"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Layers,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Activity,
  Menu,
  X,
  Bell,
  Database,
  ChevronRight,
  Users,
  Briefcase,
  MessageSquare,
  Send,
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string | null;
}

interface NotificationItem {
  id: string;
  action: string;
  entityType: string;
  createdAt: string;
}

interface AdminLayoutShellProps {
  adminUser: AdminUser;
  children: React.ReactNode;
}

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Quote Requests", href: "/admin/quotes", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: Layers },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Careers & Jobs", href: "/admin/careers", icon: Briefcase },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Subscribers", href: "/admin/subscribers", icon: Send },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminLayoutShell: React.FC<AdminLayoutShellProps> = ({
  adminUser,
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Click outside to close notifications dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch recent notifications from stats
  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.recentActivities) {
          setNotifications(data.data.recentActivities.slice(0, 5));
        }
      })
      .catch((err) => console.error("Error loading notifications:", err));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await fetch("/api/admin/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      router.push("/admin/login/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#101D36] text-white">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#1B2A4A] flex items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#13CDEB] to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-[#13CDEB]/20">
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

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Modules */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Main Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          // Match /admin exactly or sub-routes
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin" || pathname === "/admin/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#13CDEB] text-[#101D36] font-bold shadow-md shadow-[#13CDEB]/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#101D36]" : "text-[#13CDEB]"}`} />
              <span className="flex-1">{item.name}</span>
              {isActive && <ChevronRight className="w-4 h-4 text-[#101D36]" />}
            </Link>
          );
        })}

        <div className="pt-8 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Quick Access
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <ExternalLink className="w-4 h-4 text-gray-400" />
            <span>Public Website</span>
          </div>
        </Link>
      </nav>

      {/* Admin User Card & Logout */}
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
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Shield className="w-3 h-3 text-[#13CDEB]" />
            {adminUser.role}
          </span>
          <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
            <Activity className="w-3 h-3" />
            Verified
          </span>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/20 transition-colors disabled:opacity-50"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggingOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F5F7FA] text-gray-900 font-sans antialiased">
      {/* 1. Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-[#1B2A4A] select-none h-screen sticky top-0 shrink-0 z-20">
        <SidebarContent />
      </aside>

      {/* 2. Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* 3. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          {/* Left: Mobile hamburger & live pills */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-navy hover:bg-gray-100 transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center space-x-2 text-xs font-medium">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                System Live
              </span>
              <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <Database className="w-3 h-3 text-blue-500" />
                Supabase Connected
              </span>
            </div>
          </div>

          {/* Right: Notification Area, Profile & Logout */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Notification Area */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-gray-500 hover:text-navy hover:bg-gray-100 transition-colors"
                title="System Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#13CDEB] ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#13CDEB]" />
                      Activity Notifications
                    </h3>
                    <span className="text-[11px] font-semibold text-gray-400">
                      Recent {notifications.length}
                    </span>
                  </div>

                  <div className="py-2 divide-y divide-gray-100 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-gray-400">
                        No new system activity recorded.
                      </div>
                    ) : (
                      notifications.map((item) => (
                        <div key={item.id} className="py-2.5 px-1 flex items-start space-x-3 text-xs">
                          <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#13CDEB] flex items-center justify-center shrink-0 mt-0.5">
                            <Activity className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 leading-snug truncate">
                              {item.action}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              {item.entityType} • {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-center">
                    <Link
                      href="/admin"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] font-semibold text-[#101D36] hover:text-[#13CDEB] transition-colors"
                    >
                      View full activity audit log →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Public Website Shortcut */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-navy bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <div className="h-4 w-[1px] bg-gray-200"></div>

            {/* Admin Profile */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#101D36] text-[#13CDEB] flex items-center justify-center font-bold text-xs shadow-xs border border-[#13CDEB]/30">
                {adminUser.firstName?.[0] || "A"}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-gray-900 leading-tight">
                  {adminUser.firstName} {adminUser.lastName}
                </div>
                <div className="text-[10px] text-gray-500 leading-tight">
                  {adminUser.role}
                </div>
              </div>
            </div>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
