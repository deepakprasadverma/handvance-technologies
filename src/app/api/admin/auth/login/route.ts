import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { adminLoginSchema } from "@/lib/validations";
import {
  verifyPassword,
  signSessionToken,
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Protection (Max 10 login attempts per 15 minutes per IP)
    const rateLimit = checkRateLimit(req, "admin_login", 10, 15 * 60 * 1000);
    if (rateLimit.isLimited) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate credentials
    const body = await req.json();
    const validation = adminLoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password format.",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    // 3. Find administrator by email (case-insensitive)
    let adminUser = null;
    try {
      adminUser = await prisma.adminUser.findUnique({
        where: { email: email.toLowerCase() },
      });
    } catch (dbErr) {
      console.error("Admin login DB query fallback:", dbErr);
    }

    // 4. Verify user exists and is active
    if (!adminUser || !adminUser.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 5. Verify bcrypt password hash
    const isPasswordValid = await verifyPassword(password, adminUser.passwordHash);
    if (!isPasswordValid) {
      // Record failed login audit log
      try {
        await prisma.activityLog.create({
          data: {
            adminUserId: adminUser.id,
            action: "ADMIN_LOGIN_FAILED",
            entityType: "AdminUser",
            entityId: adminUser.id,
            metadata: { reason: "Bad credentials", ip, userAgent },
            ipAddress: ip,
            userAgent: userAgent,
          },
        });
      } catch (err) {
        console.error("Failed to log bad login attempt:", err);
      }

      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    // 6. Update user's last login timestamp
    await prisma.adminUser.update({
      where: { id: adminUser.id },
      data: { lastLoginAt: new Date() },
    });

    // 7. Audit log successful login
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: adminUser.id,
          action: "ADMIN_LOGIN_SUCCESS",
          entityType: "AdminUser",
          entityId: adminUser.id,
          metadata: { email: adminUser.email },
          ipAddress: ip,
          userAgent: userAgent,
        },
      });
    } catch (err) {
      console.error("Failed to log successful login:", err);
    }

    // 8. Generate cryptographically signed JWT session token
    const token = await signSessionToken({
      adminId: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      firstName: adminUser.firstName,
      lastName: adminUser.lastName,
    });

    // 9. Prepare response and set HTTP-only secure cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Authentication successful.",
        user: {
          id: adminUser.id,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          role: adminUser.role,
          avatarUrl: adminUser.avatarUrl,
        },
      },
      { status: 200 }
    );

    const isProduction = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred during authentication.",
      },
      { status: 500 }
    );
  }
}
