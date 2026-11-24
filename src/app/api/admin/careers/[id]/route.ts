import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { Department, EmploymentType, ExperienceLevel } from "@prisma/client";

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

    const career = await prisma.career.findUnique({
      where: { id: params.id },
      include: {
        applications: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!career) {
      return NextResponse.json(
        { success: false, error: "Career opening not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: career });
  } catch (error: unknown) {
    console.error("GET /api/admin/careers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch career." },
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

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.department !== undefined && Object.values(Department).includes(body.department)) {
      updateData.department = body.department;
    }
    if (body.location !== undefined) updateData.location = body.location.trim();
    if (body.type !== undefined && Object.values(EmploymentType).includes(body.type)) {
      updateData.type = body.type;
    }
    if (body.experience !== undefined && Object.values(ExperienceLevel).includes(body.experience)) {
      updateData.experience = body.experience;
    }
    if (body.summary !== undefined) updateData.summary = body.summary.trim();
    if (body.responsibilities !== undefined && Array.isArray(body.responsibilities)) {
      updateData.responsibilities = body.responsibilities;
    }
    if (body.requirements !== undefined && Array.isArray(body.requirements)) {
      updateData.requirements = body.requirements;
    }
    if (body.benefits !== undefined && Array.isArray(body.benefits)) {
      updateData.benefits = body.benefits;
    }
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    const updated = await prisma.career.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "CAREER_OPENING_UPDATED",
        entityType: "Career",
        entityId: updated.id,
        metadata: { updatedFields: Object.keys(updateData) },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PATCH /api/admin/careers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update career." },
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

    const deleted = await prisma.career.delete({
      where: { id: params.id },
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "CAREER_OPENING_DELETED",
        entityType: "Career",
        entityId: params.id,
        metadata: { title: deleted.title },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Career opening deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("DELETE /api/admin/careers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete career opening." },
      { status: 500 }
    );
  }
}
