import { NextRequest, NextResponse } from "next/server";
import { quoteRequestSchema } from "@/lib/validations";
import { checkRateLimit, isSpamBot } from "@/lib/rateLimit";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (Max 5 quote requests per 10 minutes)
    const rateLimit = checkRateLimit(req, "quote", 5, 10 * 60 * 1000);
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
      return NextResponse.json({
        success: true,
        message: "Your quote request has been received.",
      });
    }

    // 4. Validate with Zod
    const validation = quoteRequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please verify the project requirements.",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validation.data;
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || undefined;

    // 5. Store in QuoteRequest database table
    let quoteId = "simulated-" + Date.now();
    let dbConnected = false;

    if (process.env.DATABASE_URL) {
      try {
        const quote = await prisma.quoteRequest.create({
          data: {
            contactName: data.fullName,
            email: data.email,
            phone: data.phone,
            company: data.companyName || undefined,
            projectType: data.serviceRequired,
            estimatedBudget: data.estimatedBudget,
            targetTimeline: data.expectedTimeline,
            projectDetails: data.projectDescription,
            additionalRequirements: data.additionalRequirements || undefined,
            status: "PENDING",
          },
        });
        quoteId = quote.id;
        dbConnected = true;

        await prisma.activityLog.create({
          data: {
            action: "QUOTE_REQUEST_CREATED",
            entityType: "QuoteRequest",
            entityId: quote.id,
            metadata: {
              email: data.email,
              projectType: data.serviceRequired,
              budget: data.estimatedBudget,
              timeline: data.expectedTimeline,
            },
            ipAddress: typeof ip === "string" ? ip.split(",")[0].trim() : undefined,
            userAgent,
          },
        });
      } catch (dbErr: unknown) {
        console.error("Database submission error:", dbErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your quote request has been submitted to our lead architects.",
        data: {
          id: quoteId,
          dbRecorded: dbConnected,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Unhandled quote API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred while processing your quote request.",
      },
      { status: 500 }
    );
  }
}
