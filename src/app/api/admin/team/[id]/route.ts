import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { Department } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized session." },
        { status: 401 }
      );
    }

    const member = await prisma.teamMember.findUnique({
      where: { id: params.id },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Team member not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error: unknown) {
    console.error("GET /api/admin/team/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch team member." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized session." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.role !== undefined) updateData.role = body.role.trim();
    if (body.department !== undefined && Object.values(Department).includes(body.department)) {
      updateData.department = body.department;
    }
    if (body.bio !== undefined) updateData.bio = body.bio.trim();
    if (body.avatarUrl !== undefined) updateData.avatarUrl = body.avatarUrl?.trim() || null;
    if (body.skills !== undefined && Array.isArray(body.skills)) updateData.skills = body.skills;
    if (body.linkedinUrl !== undefined) updateData.linkedinUrl = body.linkedinUrl?.trim() || null;
    if (body.githubUrl !== undefined) updateData.githubUrl = body.githubUrl?.trim() || null;
    if (body.twitterUrl !== undefined) updateData.twitterUrl = body.twitterUrl?.trim() || null;
    if (body.sortOrder !== undefined) updateData.sortOrder = Number(body.sortOrder);
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    const updated = await prisma.teamMember.update({
      where: { id: params.id },
      data: updateData,
    });

    // Audit log
    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "TEAM_MEMBER_UPDATED",
        entityType: "TeamMember",
        entityId: updated.id,
        metadata: { updatedFields: Object.keys(updateData) },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PATCH /api/admin/team/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update team member." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized session." },
        { status: 401 }
      );
    }

    const deleted = await prisma.teamMember.delete({
      where: { id: params.id },
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "TEAM_MEMBER_DELETED",
        entityType: "TeamMember",
        entityId: params.id,
        metadata: { name: deleted.name },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Team member deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("DELETE /api/admin/team/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete team member." },
      { status: 500 }
    );
  }
}
