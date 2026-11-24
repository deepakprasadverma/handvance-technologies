import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { ContentStatus, Prisma } from "@prisma/client";

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
    const featured = searchParams.get("featured")?.trim();

    const where: Prisma.TestimonialWhereInput = {};

    if (status && status !== "ALL" && Object.values(ContentStatus).includes(status as ContentStatus)) {
      where.status = status as ContentStatus;
    }

    if (featured === "true") {
      where.featured = true;
    } else if (featured === "false") {
      where.featured = false;
    }

    if (search) {
      where.OR = [
        { author: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { role: { contains: search, mode: "insensitive" } },
        { quote: { contains: search, mode: "insensitive" } },
      ];
    }

    let testimonials: Array<Record<string, unknown>> = [];
    try {
      testimonials = await prisma.testimonial.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
    } catch (dbErr) {
      console.error("GET /api/admin/testimonials DB query:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: testimonials,
      count: testimonials.length,
    });
  } catch (error: unknown) {
    console.error("GET /api/admin/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Valid administrator session required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      author,
      role,
      company,
      quote,
      avatarUrl,
      projectScope = "Enterprise Software Development",
      rating = 5,
      featured = false,
      sortOrder = 0,
      status = "PUBLISHED",
    } = body;

    if (!author?.trim() || !role?.trim() || !company?.trim() || !quote?.trim()) {
      return NextResponse.json(
        { success: false, error: "Author name, role, company, and quote text are required." },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        author: author.trim(),
        role: role.trim(),
        company: company.trim(),
        quote: quote.trim(),
        avatarUrl: avatarUrl?.trim() || null,
        projectScope: projectScope.trim(),
        rating: Math.max(1, Math.min(5, Number(rating) || 5)),
        featured: Boolean(featured),
        sortOrder: Number(sortOrder) || 0,
        status: Object.values(ContentStatus).includes(status) ? status : "PUBLISHED",
      },
    });

    await prisma.activityLog.create({
      data: {
        adminUserId: session.adminId,
        action: "TESTIMONIAL_CREATED",
        entityType: "Testimonial",
        entityId: testimonial.id,
        metadata: { author: testimonial.author, company: testimonial.company, status: testimonial.status },
      },
    });

    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/admin/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}
