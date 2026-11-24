import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { ContactStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

interface Params {
  params: {
    id: string;
  };
}

// 1. GET Single Contact
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const contact = await prisma.contact.findUnique({
      where: { id: params.id },
    });

    if (!contact) {
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error("GET contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch contact" }, { status: 500 });
  }
}

// 2. PATCH Update Contact (Status & Internal Notes)
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status, internalNotes } = body;

    const data: {
      status?: ContactStatus;
      internalNotes?: string;
      respondedAt?: Date;
    } = {};

    if (status && Object.values(ContactStatus).includes(status as ContactStatus)) {
      data.status = status as ContactStatus;
      if (status === "CONTACTED" || status === "CONVERTED") {
        data.respondedAt = new Date();
      }
    }

    if (internalNotes !== undefined) {
      data.internalNotes = internalNotes;
    }

    const updatedContact = await prisma.contact.update({
      where: { id: params.id },
      data,
    });

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "CONTACT_UPDATED",
          entityType: "Contact",
          entityId: params.id,
          metadata: { updatedFields: Object.keys(data), newStatus: data.status },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Contact inquiry updated successfully.",
      contact: updatedContact,
    });
  } catch (error) {
    console.error("PATCH contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to update contact" }, { status: 500 });
  }
}

// 3. DELETE Contact
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.contact.findUnique({
      where: { id: params.id },
      select: { id: true, email: true, name: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Contact inquiry not found" }, { status: 404 });
    }

    await prisma.contact.delete({
      where: { id: params.id },
    });

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "CONTACT_DELETED",
          entityType: "Contact",
          entityId: params.id,
          metadata: { email: existing.email, name: existing.name },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Contact inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete contact" }, { status: 500 });
  }
}
