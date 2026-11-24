import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { checkRateLimit, isSpamBot } from "@/lib/rateLimit";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (Max 5 newsletter subscriptions per 10 minutes)
    const rateLimit = checkRateLimit(req, "newsletter", 5, 10 * 60 * 1000);
    if (rateLimit.isLimited) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many attempts. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
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
        message: "You have been subscribed to our newsletter.",
      });
    }

    // 4. Validate with Zod
    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // 5. Store / Upsert in NewsletterSubscriber table & Prevent Duplicates
    let subscriberId = "simulated-" + Date.now();
    let alreadySubscribed = false;
    let dbConnected = false;

    if (process.env.DATABASE_URL) {
      try {
        const existing = await prisma.newsletterSubscriber.findUnique({
          where: { email },
        });

        if (existing) {
          alreadySubscribed = true;
          subscriberId = existing.id;

          // Reactivate if previously unsubscribed
          if (existing.status !== "ACTIVE") {
            await prisma.newsletterSubscriber.update({
              where: { email },
              data: {
                status: "ACTIVE",
                unsubscribedAt: null,
                confirmedAt: new Date(),
              },
            });
          }
        } else {
          const subscriber = await prisma.newsletterSubscriber.create({
            data: {
              email,
              source: "website_footer",
              status: "ACTIVE",
              confirmedAt: new Date(),
            },
          });
          subscriberId = subscriber.id;
        }

        dbConnected = true;
      } catch (dbErr: unknown) {
        console.error("Database newsletter error:", dbErr);
      }
    }

    if (alreadySubscribed) {
      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed to the Handvance Engineering newsletter!",
          data: { id: subscriberId, alreadySubscribed: true },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Welcome aboard! You have been subscribed to our monthly engineering insights.",
        data: {
          id: subscriberId,
          dbRecorded: dbConnected,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Unhandled newsletter API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
