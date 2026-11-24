import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Administrator session required." },
        { status: 401 }
      );
    }

    let totalInquiries = 0;
    let newInquiries = 0;
    let totalQuotes = 0;
    let pendingQuotes = 0;
    let activeProjects = 0;
    let totalProjects = 0;
    let totalTeamMembers = 0;
    let activeCareers = 0;
    let totalApplications = 0;
    let newApplications = 0;
    let publishedTestimonials = 0;
    let activeSubscribers = 0;
    let recentActivities: Array<Record<string, unknown>> = [];

    try {
      const results = await Promise.all([
        prisma.contact.count(),
        prisma.contact.count({ where: { status: "NEW" } }),
        prisma.quoteRequest.count(),
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
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            adminUser: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        }),
      ]);

      totalInquiries = results[0];
      newInquiries = results[1];
      totalQuotes = results[2];
      pendingQuotes = results[3];
      activeProjects = results[4];
      totalProjects = results[5];
      totalTeamMembers = results[6];
      activeCareers = results[7];
      totalApplications = results[8];
      newApplications = results[9];
      publishedTestimonials = results[10];
      activeSubscribers = results[11];
      recentActivities = results[12] as unknown as Array<Record<string, unknown>>;
    } catch (dbErr) {
      console.error("GET /api/admin/stats DB query fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: {
        totalInquiries,
        newInquiries,
        totalQuotes,
        pendingQuotes,
        activeProjects,
        totalProjects,
        totalTeamMembers,
        activeCareers,
        totalApplications,
        newApplications,
        publishedTestimonials,
        activeSubscribers,
        recentActivities,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard statistics." },
      { status: 500 }
    );
  }
}
