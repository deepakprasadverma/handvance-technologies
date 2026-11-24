import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import {
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  AdminSessionPayload,
  verifySessionToken,
} from "./session";

export * from "./session";

/**
 * Hashes a plaintext password with bcrypt using 12 salt rounds.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, 12);
}

/**
 * Securely verifies a plaintext password against a stored bcrypt hash.
 */
export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

/**
 * Standard HTTP-only Cookie Options for Admin Session
 */
export function getAdminCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    name: ADMIN_COOKIE_NAME,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

/**
 * Server-side helper to get and verify admin session from Next.js cookies (Server Components / Actions).
 */
export async function getServerSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Verifies session and confirms administrator exists and is active in the database.
 */
export async function getCurrentAdmin() {
  const session = await getServerSession();
  if (!session?.adminId) return null;

  try {
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
      return null;
    }

    return admin;
  } catch (error) {
    console.error("Error fetching current admin user:", error);
    return null;
  }
}
