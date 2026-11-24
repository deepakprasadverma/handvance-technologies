/**
 * Next.js Edge Middleware Routing & Security Simulation Test
 * Handvance Technologies — Phase 6
 */

import { middleware } from "../src/middleware.js";
import { signSessionToken, ADMIN_COOKIE_NAME } from "../src/lib/session.js";
import { NextRequest } from "next/server";

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

async function runMiddlewareTests() {
  console.log("==================================================================");
  console.log("🛡️ Handvance Technologies — Middleware Security Edge Route Tests");
  console.log("==================================================================\n");

  const validToken = await signSessionToken({
    adminId: "ad73e042-0f09-41b3-8df8-efd85c138888",
    email: "admin@handvance.com",
    role: "SUPER_ADMIN",
    firstName: "System",
    lastName: "Administrator",
  });

  // TEST 1: Unauthenticated request to /admin -> Redirect to /admin/login?redirect=/admin
  const reqUnauthAdmin = new NextRequest("http://localhost:3000/admin");
  const res1 = await middleware(reqUnauthAdmin);
  assert(res1.status === 307 || res1.status === 302, "Unauthenticated /admin redirects to login");
  assert(res1.headers.get("location")?.includes("/admin/login"), "Redirect location points to /admin/login");
  assert(res1.headers.get("location")?.includes("redirect=%2Fadmin"), "Redirect preserves intended path parameter");

  // TEST 2: Unauthenticated request to /api/admin/auth/me -> HTTP 401 Unauthorized
  const reqUnauthApi = new NextRequest("http://localhost:3000/api/admin/auth/me");
  const res2 = await middleware(reqUnauthApi);
  assert(res2.status === 401, "Unauthenticated /api/admin/* returns HTTP 401");
  const res2Json = await res2.json();
  assert(res2Json.success === false, "401 response contains success: false");

  // TEST 3: Unauthenticated request to /api/admin/auth/login -> Passes through (200 / next)
  const reqPublicLoginApi = new NextRequest("http://localhost:3000/api/admin/auth/login", { method: "POST" });
  const res3 = await middleware(reqPublicLoginApi);
  assert(res3.status === 200, "Unauthenticated /api/admin/auth/login allowed through to handler");

  // TEST 4: Unauthenticated request to /admin/login -> Passes through
  const reqUnauthLogin = new NextRequest("http://localhost:3000/admin/login");
  const res4 = await middleware(reqUnauthLogin);
  assert(res4.status === 200, "Unauthenticated /admin/login allowed through to login page");

  // TEST 5: Authenticated request to /admin/login -> Redirect to /admin
  const reqAuthLogin = new NextRequest("http://localhost:3000/admin/login", {
    headers: { cookie: `${ADMIN_COOKIE_NAME}=${validToken}` },
  });
  const res5 = await middleware(reqAuthLogin);
  assert(res5.status === 307 || res5.status === 302, "Already authenticated admin at /admin/login redirects away");
  assert(res5.headers.get("location")?.endsWith("/admin"), "Redirect destination is /admin");

  // TEST 6: Authenticated request to /admin -> Passes through (200 / next)
  const reqAuthAdmin = new NextRequest("http://localhost:3000/admin", {
    headers: { cookie: `${ADMIN_COOKIE_NAME}=${validToken}` },
  });
  const res6 = await middleware(reqAuthAdmin);
  assert(res6.status === 200, "Authenticated request to /admin allowed through to protected layout");

  // TEST 7: Forged / Tampered Cookie -> Rejected with redirect to /admin/login
  const reqForged = new NextRequest("http://localhost:3000/admin", {
    headers: { cookie: `${ADMIN_COOKIE_NAME}=forged.invalid.token` },
  });
  const res7 = await middleware(reqForged);
  assert(res7.status === 307 || res7.status === 302, "Tampered/invalid session cookie redirects to login");

  console.log("\n==================================================================");
  console.log(`📊 Middleware Route Tests: ${passed} Passed | ${failed} Failed`);
  console.log("==================================================================");

  if (failed > 0) process.exit(1);
}

runMiddlewareTests().catch((err) => {
  console.error("Middleware test error:", err);
  process.exit(1);
});
