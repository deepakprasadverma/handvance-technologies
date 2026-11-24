import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { checkRateLimit, isSpamBot } from "@/lib/rateLimit";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (Max 5 inquiries per 10 minutes per IP)
    const rateLimit = checkRateLimit(req, "contact", 5, 10 * 60 * 1000);
    if (rateLimit.isLimited) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json();

    // 3. Spam Honeypot Check
    if (isSpamBot(body.website_hp)) {
      // Silently discard spam submission with simulated success
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been received.",
      });
    }

    // 4. Validate with Zod
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      const formattedErrors = validation.error.format();
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please review your input fields.",
          details: formattedErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    // 5. Store Submission in Supabase PostgreSQL via Prisma
    let contactId = "simulated-" + Date.now();
    let dbConnected = false;

    if (process.env.DATABASE_URL) {
      try {
        const contact = await prisma.contact.create({
          data: {
            name: data.fullName,
            email: data.email,
            phone: data.phone,
            serviceInterest: data.serviceRequired,
            subject: data.subject,
            message: data.message,
            status: "NEW",
            ipAddress: typeof ip === "string" ? ip.split(",")[0].trim() : undefined,
            userAgent,
          },
        });
        contactId = contact.id;
        dbConnected = true;

        // Log administrative activity audit
        await prisma.activityLog.create({
          data: {
            action: "CONTACT_INQUIRY_CREATED",
            entityType: "Contact",
            entityId: contact.id,
            metadata: {
              email: data.email,
              serviceInterest: data.serviceRequired,
              subject: data.subject,
            },
            ipAddress: typeof ip === "string" ? ip.split(",")[0].trim() : undefined,
            userAgent,
          },
        });
      } catch (dbErr: unknown) {
        console.error("Database submission error:", dbErr);
        // Fall back gracefully if live database is unreachable
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your inquiry has been received by our engineering team.",
        data: {
          id: contactId,
          dbRecorded: dbConnected,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Unhandled contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
