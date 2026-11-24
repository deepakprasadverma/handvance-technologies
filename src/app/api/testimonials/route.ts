import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TESTIMONIALS } from "@/utilities/websiteData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });

    if (testimonials.length > 0) {
      return NextResponse.json({
        success: true,
        data: testimonials,
        source: "database",
      });
    }

    return NextResponse.json({
      success: true,
      data: TESTIMONIALS,
      source: "seed",
    });
  } catch (error: unknown) {
    console.error("GET /api/testimonials fallback error:", error);
    return NextResponse.json({
      success: true,
      data: TESTIMONIALS,
      source: "fallback",
    });
  }
}
