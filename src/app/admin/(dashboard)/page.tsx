import React from "react";
import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  Mail,
  FileText,
  Layers,
  Shield,
  ArrowUpRight,
  Database,
  Lock,
  HardDrive,
  Activity,
  CheckCircle,
  Clock,
  Sparkles,
  Users,
  Briefcase,
  MessageSquare,
  Send,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  // Load actual database statistics directly via Prisma ORM
  let totalInquiries = 0;
  let newInquiries = 0;
  let pendingQuotes = 0;
  let activeProjects = 0;
  let totalProjects = 0;
  let totalTeamMembers = 0;
  let activeCareers = 0;
  let totalApplications = 0;
  let newApplications = 0;
  let publishedTestimonials = 0;
  let activeSubscribers = 0;

  let recentActivities: Array<{
    id: string;
    action: string;
    entityType: string;
    entityId: string | null;
    createdAt: Date;
    ipAddress: string | null;
  }> = [];

  try {
    const [
      totalContactsCount,
      newContactsCount,
      pendingQuotesCount,
      activeProjectsCount,
      totalProjectsCount,
      teamCount,
      careersCount,
      appsCount,
      newAppsCount,
      testimonialsCount,
      subscribersCount,
      logs,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: "NEW" } }),
      prisma.quoteRequest.count({ where: { status: "PENDING" } }),
      prisma.project.count({ where: { status: "PUBLISHED" } }),
      prisma.project.count(),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.career.count({ where: { isActive: true } }),
      prisma.jobApplication.count(),
      prisma.jobApplication.count({ where: { status: "NEW" } }),
      prisma.testimonial.count({ where: { status: "PUBLISHED" } }),
      prisma.newsletterSubscriber.count({ where: { status: "ACTIVE" } }),
      prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          action: true,
          entityType: true,
          entityId: true,
          createdAt: true,
          ipAddress: true,
        },
      }),
    ]);

    totalInquiries = totalContactsCount;
    newInquiries = newContactsCount;
    pendingQuotes = pendingQuotesCount;
    activeProjects = activeProjectsCount;
    totalProjects = totalProjectsCount;
    totalTeamMembers = teamCount;
    activeCareers = careersCount;
    totalApplications = appsCount;
    newApplications = newAppsCount;
    publishedTestimonials = testimonialsCount;
    activeSubscribers = subscribersCount;
    recentActivities = logs;
  } catch (err) {
    console.error("Dashboard stats query error:", err);
  }

  const statCards = [
    {
      title: "Client Inquiries",
      count: totalInquiries,
      subtext: `${newInquiries} New Inquiries`,
      badgeColor: "bg-blue-100 text-blue-700",
      icon: Mail,
      href: "/admin/contacts",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Pending Quotes",
      count: pendingQuotes,
      subtext: "Awaiting Estimates",
      badgeColor: "bg-amber-100 text-amber-700",
      icon: FileText,
      href: "/admin/quotes",
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Portfolio Projects",
      count: activeProjects,
      subtext: `${totalProjects} Total Deliverables`,
      badgeColor: "bg-cyan-100 text-cyan-700",
      icon: Layers,
      href: "/admin/projects",
      color: "from-[#13CDEB] to-blue-600",
    },
    {
      title: "Engineering Team",
      count: totalTeamMembers,
      subtext: "Published Staff",
      badgeColor: "bg-purple-100 text-purple-700",
      icon: Users,
      href: "/admin/team",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Job Applications",
      count: totalApplications,
      subtext: `${newApplications} New Candidates`,
      badgeColor: "bg-emerald-100 text-emerald-700",
      icon: Briefcase,
      href: "/admin/careers",
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Client Testimonials",
      count: publishedTestimonials,
      subtext: "Approved & Live",
      badgeColor: "bg-rose-100 text-rose-700",
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "from-rose-500 to-pink-600",
    },
    {
      title: "Email Subscribers",
      count: activeSubscribers,
      subtext: "Active Audience",
      badgeColor: "bg-indigo-100 text-indigo-700",
      icon: Send,
      href: "/admin/subscribers",
      color: "from-indigo-500 to-violet-600",
    },
    {
      title: "Active Openings",
      count: activeCareers,
      subtext: "Hiring Openings",
      badgeColor: "bg-slate-100 text-slate-700",
      icon: Sparkles,
      href: "/admin/careers",
      color: "from-slate-700 to-[#101D36]",
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
              <span>Handvance Operations Command Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {admin?.firstName}
            </h1>
            <p className="text-gray-300 text-sm mt-1 max-w-2xl">
              Real-time administrative control across inbound customer consultations, custom quotations, portfolio deliverables, team members, careers pipeline, and email subscribers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              <span>Public Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#13CDEB]/40 transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                  {stat.subtext}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{stat.count}</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">{stat.title}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link
          href="/admin/contacts"
          className="p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#13CDEB] shadow-xs flex flex-col items-center text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#13CDEB] group-hover:text-[#101D36] transition-colors mb-2">
            <Mail className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-gray-900">Inquiries</h4>
          <p className="text-[10px] text-gray-400">Respond & triage</p>
        </Link>

        <Link
          href="/admin/quotes"
          className="p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#13CDEB] shadow-xs flex flex-col items-center text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-[#13CDEB] group-hover:text-[#101D36] transition-colors mb-2">
            <FileText className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-gray-900">Quotes</h4>
          <p className="text-[10px] text-gray-400">Scope proposals</p>
        </Link>

        <Link
          href="/admin/projects"
          className="p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#13CDEB] shadow-xs flex flex-col items-center text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#13CDEB] flex items-center justify-center group-hover:bg-[#13CDEB] group-hover:text-[#101D36] transition-colors mb-2">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-gray-900">Projects</h4>
          <p className="text-[10px] text-gray-400">Portfolio sync</p>
        </Link>

        <Link
          href="/admin/team"
          className="p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#13CDEB] shadow-xs flex flex-col items-center text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-[#13CDEB] group-hover:text-[#101D36] transition-colors mb-2">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-gray-900">Team</h4>
          <p className="text-[10px] text-gray-400">Manage members</p>
        </Link>

        <Link
          href="/admin/careers"
          className="p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#13CDEB] shadow-xs flex flex-col items-center text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#13CDEB] group-hover:text-[#101D36] transition-colors mb-2">
            <Briefcase className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-gray-900">Careers</h4>
          <p className="text-[10px] text-gray-400">Jobs & applicants</p>
        </Link>

        <Link
          href="/admin/testimonials"
          className="p-3.5 rounded-xl bg-white border border-gray-200 hover:border-[#13CDEB] shadow-xs flex flex-col items-center text-center transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-[#13CDEB] group-hover:text-[#101D36] transition-colors mb-2">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-gray-900">Reviews</h4>
          <p className="text-[10px] text-gray-400">Approve & feature</p>
        </Link>
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
                Live & Operational
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Supabase PostgreSQL</p>
                    <p className="text-[11px] text-gray-500">Prisma ORM Connection</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Supabase Storage</p>
                    <p className="text-[11px] text-gray-500">project-images, team & resumes</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Send className="w-4 h-4 text-cyan-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Resend Email Engine</p>
                    <p className="text-[11px] text-gray-500">Instant Admin & Lead Dispatches</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <div>
                    <p className="font-semibold text-gray-800">Admin Authentication</p>
                    <p className="text-[11px] text-gray-500">Bcrypt + HS256 Sessions</p>
                  </div>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-400">
            Current Authenticated User: <span className="text-gray-700 font-medium">{admin?.email}</span>
          </div>
        </div>

        {/* Recent Activity Audit Logs */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Recent Activities & Audit Trails
            </h2>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Live Feed
            </span>
          </div>

          {recentActivities.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-xl border border-gray-100 text-gray-500 text-xs">
              No recent administrative operations recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentActivities.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between text-xs hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-[#13CDEB]" />
                    <div>
                      <span className="font-semibold text-gray-900">{log.action}</span>
                      <span className="text-gray-400 ml-2">({log.entityType})</span>
                    </div>
                  </div>
                  <div className="text-right text-gray-400">
                    <p className="font-mono text-[11px]">{new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</p>
                    <p className="text-[10px]">{new Date(log.createdAt).toLocaleDateString()}</p>
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
