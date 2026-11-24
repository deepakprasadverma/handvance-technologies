import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { ContentStatus } from "@prisma/client";

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

    const testimonial = await prisma.testimonial.findUnique({
      where: { id: params.id },
    });

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error: unknown) {
    console.error("GET /api/admin/testimonials/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonial." },
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

    if (body.author !== undefined) updateData.author = body.author.trim();
    if (body.role !== undefined) updateData.role = body.role.trim();
    if (body.company !== undefined) updateData.company = body.company.trim();
    if (body.quote !== undefined) updateData.quote = body.quote.trim();
    if (body.avatarUrl !== undefined) updateData.avatarUrl = body.avatarUrl?.trim() || null;
    if (body.projectScope !== undefined) updateData.projectScope = body.projectScope.trim();
    if (body.rating !== undefined) updateData.rating = Math.max(1, Math.min(5, Number(body.rating)));
    if (body.featured !== undefined) updateData.featured = Boolean(body.featured);
    if (body.sortOrder !== undefined) updateData.sortOrder = Number(body.sortOrder);
    if (body.status !== undefined && Object.values(ContentStatus).includes(body.status)) {
      updateData.status = body.status;
    }

    const updated = await prisma.testimonial.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "TESTIMONIAL_UPDATED",
        entityType: "Testimonial",
        entityId: updated.id,
        metadata: { updatedFields: Object.keys(updateData) },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PATCH /api/admin/testimonials/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update testimonial." },
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

    const deleted = await prisma.testimonial.delete({
      where: { id: params.id },
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "TESTIMONIAL_DELETED",
        entityType: "Testimonial",
        entityId: params.id,
        metadata: { author: deleted.author, company: deleted.company },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("DELETE /api/admin/testimonials/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}
