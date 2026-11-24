import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { SubscriberStatus, Prisma } from "@prisma/client";

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
    const format = searchParams.get("format")?.trim();

    const where: Prisma.NewsletterSubscriberWhereInput = {};

    if (status && status !== "ALL" && Object.values(SubscriberStatus).includes(status as SubscriberStatus)) {
      where.status = status as SubscriberStatus;
    }

    if (search) {
      where.email = { contains: search, mode: "insensitive" };
    }

    let subscribers: Array<{
      id: string;
      email: string;
      source: string | null;
      status: SubscriberStatus;
      createdAt: Date;
      unsubscribedAt: Date | null;
    }> = [];

    try {
      subscribers = await prisma.newsletterSubscriber.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.error("GET /api/admin/subscribers DB query:", dbErr);
    }

    // Check if client requested CSV export
    if (format === "csv") {
      const csvHeader = "ID,Email,Source,Status,SubscribedAt,UnsubscribedAt\n";
      const csvRows = subscribers.map((s) => {
        const cleanEmail = s.email.replace(/"/g, '""');
        const cleanSource = (s.source || "").replace(/"/g, '""');
        return `"${s.id}","${cleanEmail}","${cleanSource}","${s.status}","${s.createdAt.toISOString()}","${s.unsubscribedAt ? s.unsubscribedAt.toISOString() : ""}"`;
      });

      const csvContent = csvHeader + csvRows.join("\n");

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="handvance_subscribers_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: subscribers,
      count: subscribers.length,
    });
  } catch (error: unknown) {
    console.error("GET /api/admin/subscribers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers." },
      { status: 500 }
    );
  }
}
