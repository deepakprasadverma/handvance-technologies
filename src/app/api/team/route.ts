import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TEAM_MEMBERS } from "@/utilities/websiteData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    if (teamMembers.length > 0) {
      return NextResponse.json({
        success: true,
        data: teamMembers,
        source: "database",
      });
    }

    return NextResponse.json({
      success: true,
      data: TEAM_MEMBERS,
      source: "seed",
    });
  } catch (error: unknown) {
    console.error("GET /api/team fallback error:", error);
    return NextResponse.json({
      success: true,
      data: TEAM_MEMBERS,
      source: "fallback",
    });
  }
}
