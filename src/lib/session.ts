import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "handvance_admin_session";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 Hours

export interface AdminSessionPayload {
  adminId: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
  firstName: string;
  lastName: string;
  [key: string]: unknown;
}

/**
 * Derives a cryptographically secure key buffer for JWT signing/verification.
 */
function getJwtSecret(): Uint8Array {
  const secret =
    process.env.ADMIN_JWT_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "handvance_default_jwt_secret_min_32_characters_key_2026";
  return new TextEncoder().encode(secret);
}

/**
 * Creates and signs an encrypted JWT session token.
 */
export async function signSessionToken(payload: AdminSessionPayload): Promise<string> {
  const secret = getJwtSecret();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("handvance:admin")
    .setAudience("handvance:dashboard")
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secret);
}

/**
 * Cryptographically verifies an incoming session token.
 * Returns payload if valid, or null if expired, tampered, or malformed.
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret, {
      issuer: "handvance:admin",
      audience: "handvance:dashboard",
    });

    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}
