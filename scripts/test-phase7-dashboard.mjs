/**
 * Automated Test Suite for Phase 7 Admin Dashboard & CRUD APIs
 * Handvance Technologies
 */

import { spawn } from "child_process";
import { SignJWT } from "jose";

const PORT = 3006;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "handvance_default_jwt_secret_min_32_characters_key_2026"
);

let passed = 0;
let failed = 0;

function assert(condition, name, info = "") {
  if (condition) {
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${name} - ${info}`);
    failed++;
  }
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${url}/`);
      if (res.status === 200) return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return false;
}

async function main() {
  console.log("==================================================================");
  console.log("🚀 Starting Handvance Technologies Next.js Production Server on port", PORT);
  console.log("==================================================================");

  const serverProcess = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(PORT)],
    {
      stdio: "pipe",
      shell: true,
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/postgres",
        ADMIN_JWT_SECRET: "handvance_default_jwt_secret_min_32_characters_key_2026",
      },
    }
  );

  const cleanup = () => {
    try {
      if (process.platform === "win32") {
        spawn("taskkill", ["/pid", String(serverProcess.pid), "/f", "/t"]);
      } else {
        serverProcess.kill("SIGTERM");
      }
    } catch {}
  };

  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  console.log("Waiting for Next.js server to be ready...");
  const isReady = await waitForServer(BASE_URL);
  if (!isReady) {
    console.error("❌ Failed to start Next.js server within timeout.");
    cleanup();
    process.exit(1);
  }
  console.log("Server is ready! Running Phase 7 Dashboard & CRUD tests...\n");

  try {
    const validToken = await new SignJWT({
      adminId: "00000000-0000-0000-0000-000000000001",
      email: "admin@handvance.com",
      role: "SUPER_ADMIN",
      firstName: "System",
      lastName: "Administrator",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("handvance:admin")
      .setAudience("handvance:dashboard")
      .setExpirationTime("8h")
      .sign(SECRET);

    const authCookieHeader = {
      Cookie: `handvance_admin_session=${validToken}`,
    };

    // -------------------------------------------------------------------------
    // 1. ROUTE GUARDS: Verify all admin UI pages redirect if unauthorized
    // -------------------------------------------------------------------------
    console.log("1. Module UI Route Protection Tests:");
    const protectedPages = [
      "/admin/contacts/",
      "/admin/quotes/",
      "/admin/projects/",
      "/admin/settings/",
    ];

    for (const page of protectedPages) {
      const res = await fetch(`${BASE_URL}${page}`, { redirect: "manual" });
      assert(
        res.status === 307 || res.status === 302,
        `Unauthenticated ${page} redirects away`,
        `Got status ${res.status}`
      );
      const loc = res.headers.get("location") || "";
      assert(
        loc.includes("/admin/login/") && loc.includes("redirect="),
        `Redirect location for ${page} includes /admin/login/?redirect=...`,
        `Got location ${loc}`
      );
    }

    // -------------------------------------------------------------------------
    // 2. API GUARDS: Verify all admin API routes return 401 if unauthorized
    // -------------------------------------------------------------------------
    console.log("\n2. Admin API Endpoint Security Tests:");
    const protectedApis = [
      "/api/admin/stats",
      "/api/admin/contacts",
      "/api/admin/quotes",
      "/api/admin/projects",
      "/api/admin/settings",
    ];

    for (const api of protectedApis) {
      const res = await fetch(`${BASE_URL}${api}`);
      assert(
        res.status === 401,
        `Unauthenticated call to ${api} rejected with 401`,
        `Got status ${res.status}`
      );
      const json = await res.json();
      assert(
        json.success === false,
        `Response for ${api} contains success: false`
      );
    }

    // -------------------------------------------------------------------------
    // 3. PUBLIC PORTFOLIO API: Returns case studies
    // -------------------------------------------------------------------------
    console.log("\n3. Public Portfolio Synchronization API Tests:");
    const resPortfolio = await fetch(`${BASE_URL}/api/portfolio`);
    assert(
      resPortfolio.status === 200,
      "Public /api/portfolio returns HTTP 200"
    );
    const jsonPortfolio = await resPortfolio.json();
    assert(
      jsonPortfolio.success === true && Array.isArray(jsonPortfolio.projects),
      "Portfolio returns projects array"
    );
    assert(
      jsonPortfolio.projects.length >= 6,
      `Portfolio has at least 6 case studies (found ${jsonPortfolio.projects.length})`
    );

    // -------------------------------------------------------------------------
    // 4. DEFENSE-IN-DEPTH: Non-existent or deleted admin user rejected at layout
    // -------------------------------------------------------------------------
    console.log("\n4. Server-Side Defense-in-Depth Verification:");
    const resLayoutCheck = await fetch(`${BASE_URL}/admin/contacts/`, {
      headers: authCookieHeader,
      redirect: "manual",
    });
    // Because token adminId does not exist in Prisma DB, server layout denies access & redirects to login
    assert(
      resLayoutCheck.status === 307 || resLayoutCheck.status === 302,
      "Server layout denies access to tokens whose adminId is not in active database",
      `Got status ${resLayoutCheck.status}`
    );
    const layoutRedirect = resLayoutCheck.headers.get("location") || "";
    assert(
      layoutRedirect.includes("/admin/login/"),
      "Denied layout redirects back to login portal",
      `Got location: ${layoutRedirect}`
    );

    console.log("\n==================================================================");
    console.log(`📊 Phase 7 Test Results: ${passed} Passed | ${failed} Failed`);
    console.log("==================================================================");
  } finally {
    cleanup();
  }

  if (failed > 0) process.exit(1);
  process.exit(0);
}

main().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
