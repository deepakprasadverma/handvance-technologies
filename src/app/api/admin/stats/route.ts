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

    const [
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
    ] = await Promise.all([
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
