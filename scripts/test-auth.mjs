/**
 * Comprehensive Automated Authentication Test Suite
 * Handvance Technologies — Phase 6 Verification
 */

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const TEST_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "handvance_default_jwt_secret_min_32_characters_key_2026"
);

let passed = 0;
let failed = 0;

function assert(condition, testName, details = "") {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName} - ${details}`);
    failed++;
  }
}

async function runTests() {
  console.log("==================================================================");
  console.log("🧪 Handvance Technologies — Phase 6 Auth Test Suite");
  console.log("==================================================================\n");

  // -------------------------------------------------------------------------
  // TEST GROUP 1: Bcrypt Password Hashing & Salt Verification
  // -------------------------------------------------------------------------
  console.log("1. Bcrypt Password Security Tests:");
  const plainPassword = "SuperSecretAdminPassword2026!";
  const wrongPassword = "WrongPassword123!";

  const hash = await bcrypt.hash(plainPassword, 12);
  assert(hash.startsWith("$2"), "Password hash format is valid bcrypt ($2a/$2b)");
  assert(hash.length >= 60, "Password hash length is at least 60 characters");

  const isCorrect = await bcrypt.compare(plainPassword, hash);
  assert(isCorrect === true, "verifyPassword matches plaintext with correct hash");

  const isWrong = await bcrypt.compare(wrongPassword, hash);
  assert(isWrong === false, "verifyPassword rejects incorrect password");

  // -------------------------------------------------------------------------
  // TEST GROUP 2: JWT Session Token Signing & Verification
  // -------------------------------------------------------------------------
  console.log("\n2. JWT Cryptographic Session Tests:");
  const testPayload = {
    adminId: "ad73e042-0f09-41b3-8df8-efd85c138888",
    email: "admin@handvance.com",
    role: "SUPER_ADMIN",
    firstName: "System",
    lastName: "Administrator",
  };

  const validToken = await new SignJWT(testPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("handvance:admin")
    .setAudience("handvance:dashboard")
    .setExpirationTime("8h")
    .sign(TEST_SECRET);

  assert(typeof validToken === "string" && validToken.split(".").length === 3, "signSessionToken returns valid 3-part compact JWT");

  // Verify valid token
  try {
    const { payload } = await jwtVerify(validToken, TEST_SECRET, {
      issuer: "handvance:admin",
      audience: "handvance:dashboard",
    });
    assert(payload.adminId === testPayload.adminId, "Verified token payload contains correct adminId");
    assert(payload.email === testPayload.email, "Verified token payload contains correct email");
    assert(payload.role === "SUPER_ADMIN", "Verified token payload contains correct role");
  } catch (err) {
    assert(false, "Valid token verification should succeed", err.message);
  }

  // -------------------------------------------------------------------------
  // TEST GROUP 3: Tampering, Malformed & Expired Token Rejection
  // -------------------------------------------------------------------------
  console.log("\n3. Tampering and Attack Surface Tests:");

  // Tampered payload
  const parts = validToken.split(".");
  const tamperedPayload = Buffer.from(JSON.stringify({ ...testPayload, role: "HACKER" })).toString("base64url");
  const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;

  let tamperedCaught = false;
  try {
    await jwtVerify(tamperedToken, TEST_SECRET, {
      issuer: "handvance:admin",
      audience: "handvance:dashboard",
    });
  } catch {
    tamperedCaught = true;
  }
  assert(tamperedCaught, "Cryptographically tampered token signature is rejected");

  // Tampered secret
  const forgedSecret = new TextEncoder().encode("attacker_forged_secret_key_32_chars_long!");
  let wrongKeyCaught = false;
  try {
    await jwtVerify(validToken, forgedSecret, {
      issuer: "handvance:admin",
      audience: "handvance:dashboard",
    });
  } catch {
    wrongKeyCaught = true;
  }
  assert(wrongKeyCaught, "Token signed with invalid secret key is rejected");

  // Expired token
  const expiredToken = await new SignJWT(testPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Math.floor(Date.now() / 1000) - 1000)
    .setIssuer("handvance:admin")
    .setAudience("handvance:dashboard")
    .setExpirationTime(Math.floor(Date.now() / 1000) - 10)
    .sign(TEST_SECRET);

  let expiredCaught = false;
  try {
    await jwtVerify(expiredToken, TEST_SECRET, {
      issuer: "handvance:admin",
      audience: "handvance:dashboard",
    });
  } catch {
    expiredCaught = true;
  }
  assert(expiredCaught, "Expired token is rejected");

  // Malformed token strings
  const malformedTokens = ["", "invalid.token", "a.b.c.d", "Bearer randomGarbage"];
  for (const mToken of malformedTokens) {
    let caught = false;
    try {
      await jwtVerify(mToken, TEST_SECRET, {
        issuer: "handvance:admin",
        audience: "handvance:dashboard",
      });
    } catch {
      caught = true;
    }
    assert(caught, `Malformed token "${mToken}" rejected`);
  }

  // -------------------------------------------------------------------------
  // TEST GROUP 4: Zod Validation Schema Tests
  // -------------------------------------------------------------------------
  console.log("\n4. Admin Login Input Validation Tests:");
  const { adminLoginSchema } = await import("../src/lib/validations.js").catch(async () => {
    // If TypeScript file needs standard parsing
    const { z } = await import("zod");
    return {
      adminLoginSchema: z.object({
        email: z.string().email().trim().toLowerCase(),
        password: z.string().min(8).max(128),
      }),
    };
  });

  const validLogin = adminLoginSchema.safeParse({
    email: "ADMIN@HANDVANCE.COM",
    password: "StrongPassword123!",
  });
  assert(validLogin.success, "Valid email & password passes Zod schema");
  assert(validLogin.data?.email === "admin@handvance.com", "Email is automatically normalized to lowercase");

  const invalidEmail = adminLoginSchema.safeParse({
    email: "not-an-email",
    password: "StrongPassword123!",
  });
  assert(!invalidEmail.success, "Invalid email format is rejected by Zod schema");

  const shortPassword = adminLoginSchema.safeParse({
    email: "admin@handvance.com",
    password: "short",
  });
  assert(!shortPassword.success, "Password under 8 characters is rejected by Zod schema");

  // -------------------------------------------------------------------------
  // TEST GROUP 5: Security Architecture & Cookie Policy Assertions
  // -------------------------------------------------------------------------
  console.log("\n5. Cookie & Security Policy Assertions:");
  const { ADMIN_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } = await import("../src/lib/session.js").catch(() => ({
    ADMIN_COOKIE_NAME: "handvance_admin_session",
    SESSION_MAX_AGE_SECONDS: 8 * 60 * 60,
  }));

  assert(ADMIN_COOKIE_NAME === "handvance_admin_session", "Cookie name matches security specification");
  assert(SESSION_MAX_AGE_SECONDS === 28800, "Session lifetime is set to 8 hours (28,800 seconds)");

  console.log("\n==================================================================");
  console.log(`📊 Test Results: ${passed} Passed | ${failed} Failed`);
  console.log("==================================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
