import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CAREERS_DATA } from "@/utilities/websiteData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    if (careers.length > 0) {
      return NextResponse.json({
        success: true,
        data: careers,
        source: "database",
      });
    }

    return NextResponse.json({
      success: true,
      data: CAREERS_DATA,
      source: "seed",
    });
  } catch (error: unknown) {
    console.error("GET /api/careers fallback error:", error);
    return NextResponse.json({
      success: true,
      data: CAREERS_DATA,
      source: "fallback",
    });
  }
}
