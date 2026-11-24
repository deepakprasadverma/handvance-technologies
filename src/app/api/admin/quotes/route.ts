import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { QuoteStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized session." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(50, parseInt(searchParams.get("limit") || "10", 10)));
    const skip = (page - 1) * limit;

    const where: Prisma.QuoteRequestWhereInput = {};

    if (status && status !== "ALL" && Object.values(QuoteStatus).includes(status as QuoteStatus)) {
      where.status = status as QuoteStatus;
    }

    if (search) {
      where.OR = [
        { contactName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { projectType: { contains: search, mode: "insensitive" } },
      ];
    }

    let quotes: Array<Record<string, unknown>> = [];
    let total = 0;

    try {
      const results = await Promise.all([
        prisma.quoteRequest.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.quoteRequest.count({ where }),
      ]);
      quotes = results[0];
      total = results[1];
    } catch (dbErr) {
      console.error("Admin quotes DB query fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      quotes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error("Admin quotes GET error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve quote requests." },
      { status: 500 }
    );
  }
}
