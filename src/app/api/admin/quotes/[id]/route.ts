import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { QuoteStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

interface Params {
  params: {
    id: string;
  };
}

// 1. GET Single Quote Request
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const quote = await prisma.quoteRequest.findUnique({
      where: { id: params.id },
    });

    if (!quote) {
      return NextResponse.json({ success: false, error: "Quote request not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, quote });
  } catch (error) {
    console.error("GET quote error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch quote" }, { status: 500 });
  }
}

// 2. PATCH Update Quote Request
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status, internalNotes, estimatedAmount, assignedArchitect } = body;

    const data: {
      status?: QuoteStatus;
      internalNotes?: string;
      estimatedAmount?: Prisma.Decimal | null;
      assignedArchitect?: string | null;
    } = {};

    if (status && Object.values(QuoteStatus).includes(status as QuoteStatus)) {
      data.status = status as QuoteStatus;
    }

    if (internalNotes !== undefined) {
      data.internalNotes = internalNotes;
    }

    if (assignedArchitect !== undefined) {
      data.assignedArchitect = assignedArchitect;
    }

    if (estimatedAmount !== undefined) {
      data.estimatedAmount = estimatedAmount ? new Prisma.Decimal(estimatedAmount) : null;
    }

    const updatedQuote = await prisma.quoteRequest.update({
      where: { id: params.id },
      data,
    });

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "QUOTE_UPDATED",
          entityType: "QuoteRequest",
          entityId: params.id,
          metadata: { updatedFields: Object.keys(data), newStatus: data.status },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Quote request updated successfully.",
      quote: updatedQuote,
    });
  } catch (error) {
    console.error("PATCH quote error:", error);
    return NextResponse.json({ success: false, error: "Failed to update quote" }, { status: 500 });
  }
}

// 3. DELETE Quote Request
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.quoteRequest.findUnique({
      where: { id: params.id },
      select: { id: true, email: true, contactName: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Quote request not found" }, { status: 404 });
    }

    await prisma.quoteRequest.delete({
      where: { id: params.id },
    });

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "QUOTE_DELETED",
          entityType: "QuoteRequest",
          entityId: params.id,
          metadata: { email: existing.email, name: existing.contactName },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Quote request deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE quote error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete quote" }, { status: 500 });
  }
}
