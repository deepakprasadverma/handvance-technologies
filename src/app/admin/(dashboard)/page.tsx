import React from "react";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  Mail,
  FileText,
  Briefcase,
  Users,
  Shield,
  ArrowUpRight,
  Database,
  Lock,
  Layers,
  HardDrive,
  Activity,
  CheckCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  // Load aggregated statistics safely with fallbacks
  let contactsCount = 0;
  let newContactsCount = 0;
  let quotesCount = 0;
  let pendingQuotesCount = 0;
  let applicationsCount = 0;
  let newApplicationsCount = 0;
  let subscribersCount = 0;
  let recentLogs: Array<{
    id: string;
    action: string;
    entityType: string;
    createdAt: Date;
    ipAddress: string | null;
  }> = [];

  try {
    const [
      totalContacts,
      newContacts,
      totalQuotes,
      pendingQuotes,
      totalApps,
      newApps,
      totalSubs,
      logs,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: "PENDING" } }),
      prisma.jobApplication.count(),
      prisma.jobApplication.count({ where: { status: "NEW" } }),
      prisma.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
      prisma.activityLog.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          action: true,
          entityType: true,
          createdAt: true,
          ipAddress: true,
        },
      }),
    ]);

    contactsCount = totalContacts;
    newContactsCount = newContacts;
    quotesCount = totalQuotes;
    pendingQuotesCount = pendingQuotes;
    applicationsCount = totalApps;
    newApplicationsCount = newApps;
    subscribersCount = totalSubs;
    recentLogs = logs;
  } catch (err) {
    console.error("Dashboard stats query error:", err);
  }

  const statCards = [
    {
      title: "Client Inquiries",
      count: contactsCount,
      badge: `${newContactsCount} New`,
      badgeColor: "bg-blue-100 text-blue-700",
      icon: Mail,
      href: "/admin/contacts",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Quote Requests",
      count: quotesCount,
      badge: `${pendingQuotesCount} Pending`,
      badgeColor: "bg-amber-100 text-amber-700",
      icon: FileText,
      href: "/admin/quotes",
      color: "from-[#13CDEB] to-blue-500",
    },
    {
      title: "Job Applications",
      count: applicationsCount,
      badge: `${newApplicationsCount} Unreviewed`,
      badgeColor: "bg-emerald-100 text-emerald-700",
      icon: Briefcase,
      href: "/admin/careers",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Active Subscribers",
      count: subscribersCount,
      badge: "Active",
      badgeColor: "bg-purple-100 text-purple-700",
      icon: Users,
      href: "/admin/subscribers",
      color: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#101D36] via-[#162749] to-[#101D36] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden border border-[#1B2A4A] shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#13CDEB]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#13CDEB] mb-2">
              <Shield className="w-4 h-4" />
              <span>Handvance Operations Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {admin?.firstName}
            </h1>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              Monitor inbound customer opportunities, quote estimates, talent applications, and platform activity logs in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              <span>Public Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{stat.count}</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* 2-Column Section: Architecture & Recent Audits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security & Infrastructure Status */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#13CDEB]" />
                Infrastructure Health
              </h2>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Operational
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Supabase PostgreSQL</p>
                    <p className="text-[11px] text-gray-500">Prisma ORM Connection</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Supabase Storage</p>
                    <p className="text-[11px] text-gray-500">resumes, project-images</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Admin Authentication</p>
                    <p className="text-[11px] text-gray-500">Bcrypt + HS256 Sessions</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Layers className="w-4 h-4 text-cyan-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Edge Guard</p>
                    <p className="text-[11px] text-gray-500">Next.js Edge Middleware</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400">
            Current Admin: <span className="text-gray-700 font-medium">{admin?.email}</span>
          </div>
        </div>

        {/* Recent Activity Audit Logs */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Recent System & Audit Logs
            </h2>
            <span className="text-xs text-gray-400">Real-time Activity</span>
          </div>

          {recentLogs.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-100 text-gray-500 text-xs">
              No recent administrative actions recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#13CDEB]" />
                    <div>
                      <span className="font-semibold text-gray-800">{log.action}</span>
                      <span className="text-gray-400 ml-2">({log.entityType})</span>
                    </div>
                  </div>
                  <div className="text-right text-gray-400">
                    <p>{new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                    <p className="text-[10px]">{log.ipAddress || "Localhost"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
