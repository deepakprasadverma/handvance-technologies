/**
 * scripts/test-phase8.mjs
 * End-to-end automated verification script for Phase 8:
 * - Admin route guards for Team, Careers, Testimonials, Subscribers
 * - Admin API security (401 Unauthorized for unauthenticated calls)
 * - Public data endpoints (/api/team, /api/careers, /api/testimonials, /api/portfolio)
 * - Dynamic SEO routes (/sitemap.xml, /robots.txt)
 * - Clean Next.js server startup & teardown
 */

import { spawn } from "child_process";
import { SignJWT } from "jose";

const PORT = 3008;
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

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${url}/`);
      if (res.status === 200) return true;
    } catch {
      await new Promise((r) => setTimeout(r, 600));
    }
  }
  return false;
}

async function main() {
  console.log("==================================================================");
  console.log("🚀 Starting Next.js Production Server on port", PORT, "for Phase 8 Tests");
  console.log("==================================================================");

  const serverProcess = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", String(PORT)],
    {
      stdio: "pipe",
      shell: true,
      env: {
        ...process.env,
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
  console.log("Server is ready! Running Phase 8 verification suite...\n");

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

    const authHeaders = {
      Cookie: `handvance_admin_session=${validToken}`,
    };

    // -------------------------------------------------------------------------
    // 1. ROUTE GUARDS: Verify all new Phase 8 admin UI pages redirect if unauthorized
    // -------------------------------------------------------------------------
    console.log("1. New Admin Module Route Guard Tests:");
    const protectedPages = [
      { path: "/admin/team/", name: "Team Management" },
      { path: "/admin/careers/", name: "Careers Management" },
      { path: "/admin/testimonials/", name: "Testimonials Management" },
      { path: "/admin/subscribers/", name: "Subscribers Management" },
    ];

    for (const { path, name } of protectedPages) {
      const res = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
      assert(
        res.status === 307 || res.status === 302,
        `Unauthenticated ${name} (${path}) redirects away`,
        `Got status ${res.status}`
      );
      const loc = res.headers.get("location") || "";
      assert(
        loc.includes("/admin/login/") && loc.includes("redirect="),
        `Redirect location for ${name} includes /admin/login/?redirect=...`,
        `Got location ${loc}`
      );
    }

    // -------------------------------------------------------------------------
    // 2. API GUARDS: Verify Phase 8 admin API routes return 401 if unauthorized
    // -------------------------------------------------------------------------
    console.log("\n2. Admin API Endpoint Security Tests (401 Unauthorized):");
    const protectedApis = [
      "/api/admin/team",
      "/api/admin/careers",
      "/api/admin/careers/applications",
      "/api/admin/testimonials",
      "/api/admin/subscribers",
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
    // 3. AUTHENTICATED ACCESS: Verify admin APIs return 200 with valid session
    // -------------------------------------------------------------------------
    console.log("\n3. Authenticated Admin API Access Tests:");
    for (const api of protectedApis) {
      const res = await fetch(`${BASE_URL}${api}`, { headers: authHeaders });
      assert(
        res.status === 200,
        `Authenticated call to ${api} returns HTTP 200`,
        `Got status ${res.status}`
      );
      const json = await res.json();
      assert(
        json.success === true,
        `Authenticated response for ${api} contains success: true`
      );
    }

    // -------------------------------------------------------------------------
    // 4. PUBLIC DATA SYNCHRONIZATION APIS
    // -------------------------------------------------------------------------
    console.log("\n4. Public Data Synchronization APIs:");
    const publicApis = [
      { path: "/api/team", key: "data", desc: "Public Team API" },
      { path: "/api/careers", key: "data", desc: "Public Careers API" },
      { path: "/api/testimonials", key: "data", desc: "Public Testimonials API (Published Only)" },
      { path: "/api/portfolio", key: "projects", desc: "Public Portfolio API" },
    ];

    for (const p of publicApis) {
      const res = await fetch(`${BASE_URL}${p.path}`);
      assert(
        res.status === 200,
        `${p.desc} returns HTTP 200`,
        `Got status ${res.status}`
      );
      const json = await res.json();
      assert(
        json.success === true && Array.isArray(json[p.key]),
        `${p.desc} returns valid array payload`
      );
    }

    // -------------------------------------------------------------------------
    // 5. SEO & DYNAMIC OPTIMIZATION ROUTES
    // -------------------------------------------------------------------------
    console.log("\n5. SEO & Dynamic Optimization Routes:");
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    assert(sitemapRes.status === 200, "GET /sitemap.xml returns HTTP 200");
    const sitemapText = await sitemapRes.text();
    assert(
      sitemapText.includes("<urlset") || sitemapText.includes("handvance-technologies"),
      "Sitemap contains valid XML urlset"
    );

    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    assert(robotsRes.status === 200, "GET /robots.txt returns HTTP 200");
    const robotsText = await robotsRes.text();
    assert(
      robotsText.includes("Disallow: /admin/"),
      "Robots.txt disallows administrative routes"
    );
    assert(
      robotsText.includes("sitemap.xml"),
      "Robots.txt includes reference to sitemap.xml"
    );

    // -------------------------------------------------------------------------
    // 6. PUBLIC PAGES HEALTH CHECK
    // -------------------------------------------------------------------------
    console.log("\n6. Public Website Pages Health:");
    const pages = ["/", "/about/", "/services/", "/portfolio/", "/team/", "/careers/", "/contact/"];
    for (const page of pages) {
      const res = await fetch(`${BASE_URL}${page}`);
      assert(
        res.status === 200,
        `Page ${page} loads cleanly with HTTP 200`,
        `Got status ${res.status}`
      );
    }

    console.log("\n==================================================================");
    console.log(`📊 Phase 8 Test Results: ${passed} Passed | ${failed} Failed`);
    console.log("==================================================================");
  } finally {
    cleanup();
  }

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Test execution exception:", err);
  process.exit(1);
});
