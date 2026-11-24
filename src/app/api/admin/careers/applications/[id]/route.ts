import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { ApplicationStatus } from "@prisma/client";

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

    const application = await prisma.jobApplication.findUnique({
      where: { id: params.id },
      include: {
        career: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, error: "Job application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: application });
  } catch (error: unknown) {
    console.error("GET /api/admin/careers/applications/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch application details." },
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

    if (body.status !== undefined && Object.values(ApplicationStatus).includes(body.status)) {
      updateData.status = body.status;
      updateData.reviewedBy = session.email;
      updateData.reviewedAt = new Date();
    }

    if (body.internalNotes !== undefined) {
      updateData.internalNotes = body.internalNotes;
    }

    const updated = await prisma.jobApplication.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "JOB_APPLICATION_STATUS_UPDATED",
        entityType: "JobApplication",
        entityId: updated.id,
        metadata: { status: updated.status, applicant: updated.applicantName },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PATCH /api/admin/careers/applications/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update job application." },
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

    const deleted = await prisma.jobApplication.delete({
      where: { id: params.id },
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "JOB_APPLICATION_DELETED",
        entityType: "JobApplication",
        entityId: params.id,
        metadata: { applicant: deleted.applicantName, position: deleted.positionTitle },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("DELETE /api/admin/careers/applications/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete job application." },
      { status: 500 }
    );
  }
}
