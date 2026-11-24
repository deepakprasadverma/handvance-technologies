import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { SubscriberStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

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

    if (body.status !== undefined && Object.values(SubscriberStatus).includes(body.status)) {
      updateData.status = body.status;
      if (body.status === "UNSUBSCRIBED") {
        updateData.unsubscribedAt = new Date();
      } else if (body.status === "ACTIVE") {
        updateData.unsubscribedAt = null;
      }
    }

    const updated = await prisma.newsletterSubscriber.update({
      where: { id: params.id },
      data: updateData,
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "SUBSCRIBER_STATUS_UPDATED",
        entityType: "NewsletterSubscriber",
        entityId: updated.id,
        metadata: { email: updated.email, status: updated.status },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    console.error("PATCH /api/admin/subscribers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update subscriber." },
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

    const deleted = await prisma.newsletterSubscriber.delete({
      where: { id: params.id },
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "SUBSCRIBER_REMOVED",
        entityType: "NewsletterSubscriber",
        entityId: params.id,
        metadata: { email: deleted.email },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Subscriber removed successfully.",
    });
  } catch (error: unknown) {
    console.error("DELETE /api/admin/subscribers/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove subscriber." },
      { status: 500 }
    );
  }
}
