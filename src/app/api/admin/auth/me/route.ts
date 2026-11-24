import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: No session token provided.",
        },
        { status: 401 }
      );
    }

    const session = await verifySessionToken(token);
    if (!session || !session.adminId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or expired session token.",
        },
        { status: 401 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: session.adminId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatarUrl: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    if (!admin || !admin.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: "Administrator account not found or has been deactivated.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: admin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin /me endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify session status.",
      },
      { status: 500 }
    );
  }
}
