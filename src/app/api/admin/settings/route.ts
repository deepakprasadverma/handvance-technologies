import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth";
import { SettingCategory } from "@prisma/client";

export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS = {
  company_profile: {
    companyName: "Handvance Technologies",
    tagline: "Enterprise IT Services and Custom Software Engineering",
    logoText: "Handvance",
    logoUrl: "",
    foundedYear: "2024",
  },
  contact_info: {
    email: "contact@handvance.com",
    supportEmail: "support@handvance.com",
    phone: "+1 (800) 555-0199",
    address: "100 Innovation Way, Suite 400, Tech District, CA 94016",
    businessHours: "Monday - Friday: 9:00 AM - 6:00 PM PST",
  },
  social_links: {
    linkedin: "https://linkedin.com/company/handvance-technologies",
    github: "https://github.com/handvance-technologies",
    twitter: "https://twitter.com/handvance_tech",
    instagram: "https://instagram.com/handvance.tech",
  },
  footer_info: {
    copyrightText: "© 2026 Handvance Technologies. All rights reserved.",
    tagline: "Engineering Scalable Software & High-Performance Intelligent Systems.",
    complianceText: "ISO 27001 Certified • SOC 2 Type II Compliant • GDPR Ready",
  },
};

// 1. GET Settings
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let settingsRecords: Array<{ key: string; value: unknown }> = [];
    try {
      settingsRecords = await prisma.websiteSetting.findMany();
    } catch (dbErr) {
      console.error("GET settings DB query fallback:", dbErr);
    }
    const settingsMap: Record<string, Record<string, string>> = {};

    settingsRecords.forEach((record) => {
      settingsMap[record.key] = record.value as Record<string, string>;
    });

    const mergedSettings = {
      company_profile: { ...DEFAULT_SETTINGS.company_profile, ...(settingsMap.company_profile || {}) },
      contact_info: { ...DEFAULT_SETTINGS.contact_info, ...(settingsMap.contact_info || {}) },
      social_links: { ...DEFAULT_SETTINGS.social_links, ...(settingsMap.social_links || {}) },
      footer_info: { ...DEFAULT_SETTINGS.footer_info, ...(settingsMap.footer_info || {}) },
    };

    return NextResponse.json({
      success: true,
      settings: mergedSettings,
    });
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

// 2. POST / PUT Update Settings
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.adminId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const keys = ["company_profile", "contact_info", "social_links", "footer_info"];

    const upsertPromises = keys
      .filter((key) => body[key] !== undefined)
      .map((key) => {
        let category: SettingCategory = SettingCategory.GENERAL;
        if (key === "company_profile") category = SettingCategory.BRANDING;
        if (key === "contact_info") category = SettingCategory.CONTACT_INFO;
        if (key === "social_links") category = SettingCategory.INTEGRATIONS;
        if (key === "footer_info") category = SettingCategory.GENERAL;

        return prisma.websiteSetting.upsert({
          where: { key },
          update: {
            value: body[key],
          },
          create: {
            key,
            value: body[key],
            category,
            isPublic: true,
            description: `Global configuration for ${key}`,
          },
        });
      });

    await Promise.all(upsertPromises);

    // Record activity audit
    try {
      await prisma.activityLog.create({
        data: {
          adminUserId: session.adminId,
          action: "SETTINGS_UPDATED",
          entityType: "WebsiteSetting",
          metadata: { updatedSections: Object.keys(body) },
        },
      });
    } catch (logErr) {
      console.error("Failed to record activity log:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Website settings saved successfully.",
    });
  } catch (error) {
    console.error("POST settings error:", error);
    return NextResponse.json({ success: false, error: "Failed to save settings" }, { status: 500 });
  }
}
