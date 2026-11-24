/**
 * Initial Administrator Setup Script
 * Handvance Technologies
 * 
 * Usage:
 *   node scripts/seed-admin.mjs
 *   node scripts/seed-admin.mjs --email=admin@handvance.com --password=YourStrongPassword123!
 *   INITIAL_ADMIN_EMAIL=admin@handvance.com INITIAL_ADMIN_PASSWORD=... node scripts/seed-admin.mjs
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// 1. Attempt to load local environment file if exists
const envPaths = [".env.local", ".env"];
for (const envFile of envPaths) {
  const fullPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(fullPath)) {
    try {
      if (typeof process.loadEnvFile === "function") {
        process.loadEnvFile(fullPath);
      }
    } catch {
      // Ignore if already loaded or manual
    }
  }
}

// 2. Parse CLI arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith("--")) {
    const [key, value] = arg.slice(2).split("=");
    acc[key] = value || true;
  }
  return acc;
}, {});

const email = (
  args.email ||
  process.env.INITIAL_ADMIN_EMAIL ||
  "admin@handvance.com"
).toLowerCase().trim();

const password =
  args.password ||
  process.env.INITIAL_ADMIN_PASSWORD ||
  "Handvance@Admin2026!";

const firstName =
  args.firstName ||
  process.env.INITIAL_ADMIN_FIRST_NAME ||
  "System";

const lastName =
  args.lastName ||
  process.env.INITIAL_ADMIN_LAST_NAME ||
  "Administrator";

const role =
  args.role ||
  process.env.INITIAL_ADMIN_ROLE ||
  "SUPER_ADMIN";

async function main() {
  console.log("==================================================================");
  console.log("🔐 Handvance Technologies — Initial Administrator Provisioning");
  console.log("==================================================================");

  if (!email || !email.includes("@")) {
    console.error("❌ Error: Invalid admin email address provided:", email);
    process.exit(1);
  }

  if (!password || password.length < 8) {
    console.error("❌ Error: Administrator password must be at least 8 characters.");
    process.exit(1);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("⚠️ Warning: DATABASE_URL is not set in environment or .env file.");
    console.error("Please configure your Supabase connection string before seeding.");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    console.log(`Connecting to database and hashing password with bcrypt (12 rounds)...`);
    const passwordHash = await bcrypt.hash(password, 12);

    console.log(`Upserting administrator account: ${email}...`);
    const admin = await prisma.adminUser.upsert({
      where: { email },
      update: {
        passwordHash,
        firstName,
        lastName,
        role,
        isActive: true,
      },
      create: {
        email,
        passwordHash,
        firstName,
        lastName,
        role,
        isActive: true,
      },
    });

    // Record activity audit log
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: admin.id,
          action: "ADMIN_PROVISIONED_CLI",
          entityType: "AdminUser",
          entityId: admin.id,
          metadata: {
            email: admin.email,
            role: admin.role,
            provisionedAt: new Date().toISOString(),
          },
        },
      });
    } catch {
      // Non-critical if activity log table is not yet migrated
    }

    console.log("\n✅ Administrator account successfully provisioned!");
    console.log("------------------------------------------------------------------");
    console.log(`  ID:         ${admin.id}`);
    console.log(`  Email:      ${admin.email}`);
    console.log(`  Name:       ${admin.firstName} ${admin.lastName}`);
    console.log(`  Role:       ${admin.role}`);
    console.log(`  Status:     ${admin.isActive ? "ACTIVE" : "INACTIVE"}`);
    console.log("------------------------------------------------------------------");
    console.log("You can now sign in at: /admin/login\n");
  } catch (error) {
    console.error("❌ Failed to provision administrator:", error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
