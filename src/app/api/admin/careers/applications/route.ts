import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { ApplicationStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Valid administrator session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim();
    const careerId = searchParams.get("careerId")?.trim();

    const where: Prisma.JobApplicationWhereInput = {};

    if (status && status !== "ALL" && Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
      where.status = status as ApplicationStatus;
    }

    if (careerId && careerId !== "ALL") {
      where.careerId = careerId;
    }

    if (search) {
      where.OR = [
        { applicantName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { positionTitle: { contains: search, mode: "insensitive" } },
      ];
    }

    let applications: Array<Record<string, unknown>> = [];
    try {
      applications = await prisma.jobApplication.findMany({
        where,
        include: {
          career: {
            select: { id: true, title: true, department: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.error("GET /api/admin/careers/applications DB query:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: applications,
      count: applications.length,
    });
  } catch (error: unknown) {
    console.error("GET /api/admin/careers/applications error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch job applications." },
      { status: 500 }
    );
  }
}
