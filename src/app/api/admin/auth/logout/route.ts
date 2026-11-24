import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (token) {
      try {
        const session = await verifySessionToken(token);
        if (session?.adminId) {
          const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
          const userAgent = req.headers.get("user-agent") || undefined;

          await prisma.activityLog.create({
            data: {
              adminUserId: session.adminId,
              action: "ADMIN_LOGOUT",
              entityType: "AdminUser",
              entityId: session.adminId,
              ipAddress: ip,
              userAgent: userAgent,
            },
          });
        }
      } catch (err) {
        console.error("Error logging admin logout:", err);
      }
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully.",
      },
      { status: 200 }
    );

    // Destroy session cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process logout request.",
      },
      { status: 500 }
    );
  }
}
