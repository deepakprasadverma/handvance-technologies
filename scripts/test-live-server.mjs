/**
 * Live Next.js Server Authentication & Middleware Verification
 * Handvance Technologies — Phase 6
 */

import { spawn } from "child_process";
import { SignJWT } from "jose";

const PORT = 3005;
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
  console.log("Server is ready! Running end-to-end security probes...\n");

  try {
    // 1. Probe /admin/ without session -> Must redirect to /admin/login/
    console.log("1. Admin Route Protection:");
    const res1 = await fetch(`${BASE_URL}/admin/`, { redirect: "manual" });
    assert(
      res1.status === 307 || res1.status === 302,
      "Unauthorized /admin/ access responds with redirect",
      `Got status ${res1.status}`
    );
    const loc1 = res1.headers.get("location") || "";
    assert(
      loc1.includes("/admin/login/") && loc1.includes("redirect="),
      "Redirect location is /admin/login/?redirect=...",
      `Got location: ${loc1}`
    );

    // 2. Probe /api/admin/auth/me without session -> Must return HTTP 401
    console.log("\n2. Admin API Route Protection:");
    const res2 = await fetch(`${BASE_URL}/api/admin/auth/me`);
    assert(
      res2.status === 401,
      "Unauthorized /api/admin/auth/me returns HTTP 401",
      `Got status ${res2.status}`
    );
    const json2 = await res2.json();
    assert(
      json2.success === false,
      "Response payload confirms success: false",
      JSON.stringify(json2)
    );

    // 3. Probe /admin/login/ without session -> Must return HTTP 200 OK
    console.log("\n3. Public Login Access:");
    const res3 = await fetch(`${BASE_URL}/admin/login/`);
    assert(res3.status === 200, "Unauthenticated /admin/login/ renders successfully (200 OK)");

    // 4. Probe /api/admin/auth/login with malformed/invalid schema body -> HTTP 400 Bad Request
    console.log("\n4. Login Validation & Bad Request Rejection:");
    const res4Bad = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "not-an-email",
        password: "short",
      }),
    });
    assert(
      res4Bad.status === 400,
      "Malformed login payload rejected with HTTP 400 Bad Request",
      `Got status ${res4Bad.status}`
    );
    const json4Bad = await res4Bad.json();
    assert(
      json4Bad.success === false && json4Bad.error.includes("Invalid email or password format"),
      "Payload contains validation format error details"
    );

    // 5. Probe with forged/invalid session cookie -> Must redirect to /admin/login/
    console.log("\n5. Tampered Cookie / Forgery Protection:");
    const res5 = await fetch(`${BASE_URL}/admin/`, {
      headers: { Cookie: "handvance_admin_session=forged.invalid.token" },
      redirect: "manual",
    });
    assert(
      res5.status === 307 || res5.status === 302,
      "Forged session token rejected with redirect to login",
      `Got status ${res5.status}`
    );

    // 6. Generate valid JWT and probe /admin/login/ -> Must redirect away to /admin/
    console.log("\n6. Valid Cryptographic Session Authorization:");
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

    const res6 = await fetch(`${BASE_URL}/admin/login/`, {
      headers: { Cookie: `handvance_admin_session=${validToken}` },
      redirect: "manual",
    });
    assert(
      res6.status === 307 || res6.status === 302,
      "Authenticated user visiting /admin/login/ is redirected to /admin/",
      `Got status ${res6.status}`
    );
    const loc6 = res6.headers.get("location") || "";
    assert(loc6.endsWith("/admin/"), "Redirect points to /admin/", `Got location: ${loc6}`);

    // 7. Test Logout API endpoint -> Must clear cookie
    console.log("\n7. Logout & Cookie Cleared:");
    const res7 = await fetch(`${BASE_URL}/api/admin/auth/logout`, {
      method: "POST",
      headers: { Cookie: `handvance_admin_session=${validToken}` },
    });
    assert(res7.status === 200, "Logout request succeeds with HTTP 200");
    const setCookie = res7.headers.get("set-cookie") || "";
    assert(
      setCookie.includes("handvance_admin_session=") &&
        (setCookie.includes("Max-Age=0") || setCookie.includes("Expires=")),
      "Logout clears handvance_admin_session cookie (Max-Age=0/Expires)",
      `Got set-cookie: ${setCookie}`
    );

    console.log("\n==================================================================");
    console.log(`📊 Live Server Probe Results: ${passed} Passed | ${failed} Failed`);
    console.log("==================================================================");
  } finally {
    cleanup();
  }

  if (failed > 0) process.exit(1);
  process.exit(0);
}

main().catch((err) => {
  console.error("Live test failed:", err);
  process.exit(1);
});
