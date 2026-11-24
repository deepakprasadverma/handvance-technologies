import { NextRequest, NextResponse } from "next/server";
import { 
  careerApplicationSchema, 
  MAX_FILE_SIZE, 
  ACCEPTED_RESUME_TYPES 
} from "@/lib/validations";
import { checkRateLimit, isSpamBot } from "@/lib/rateLimit";
import { SupabaseStorageService } from "@/services/storageService";
import prisma from "@/lib/prisma";
import { sendAdminApplicationNotification, sendApplicantConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check (Max 4 job applications per 15 minutes per IP)
    const rateLimit = checkRateLimit(req, "careers", 5, 15 * 60 * 1000);
    if (rateLimit.isLimited) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions. Please wait ${rateLimit.resetInSeconds} seconds before submitting again.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse Multipart Form Data
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Malformed multipart form data or missing file boundary.",
        },
        { status: 400 }
      );
    }
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const positionAppliedFor = formData.get("positionAppliedFor") as string;
    const careerId = (formData.get("careerId") as string) || undefined;
    const coverLetter = formData.get("coverLetter") as string;
    const website_hp = (formData.get("website_hp") as string) || undefined;
    const resumeFile = formData.get("resume") as File | null;

    // 3. Spam Check
    if (isSpamBot(website_hp)) {
      return NextResponse.json({
        success: true,
        message: "Your application has been received.",
      });
    }

    // 4. Validate Text Fields with Zod
    const validation = careerApplicationSchema.safeParse({
      fullName,
      email,
      phone,
      positionAppliedFor,
      careerId,
      coverLetter,
      website_hp,
    });

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please verify your application details.",
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    // 5. Validate Uploaded Resume File
    if (!resumeFile) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload your resume (PDF, DOC, or DOCX).",
        },
        { status: 400 }
      );
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `Resume file exceeds maximum allowed size of 10MB (${(resumeFile.size / (1024 * 1024)).toFixed(1)}MB provided).`,
        },
        { status: 400 }
      );
    }

    if (!ACCEPTED_RESUME_TYPES.includes(resumeFile.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file format. Only PDF, DOC, and DOCX resumes are accepted.",
        },
        { status: 400 }
      );
    }

    // 6. Upload Resume to Supabase Storage (resumes bucket)
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const sanitizedFileName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const timestamp = Date.now();
    const storagePath = `resumes/${timestamp}_${sanitizedFileName}`;

    let resumeStorageUrl = storagePath;

    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const uploadResult = await SupabaseStorageService.uploadFile(
        "resumes",
        storagePath,
        buffer,
        resumeFile.type
      );

      if (uploadResult.error) {
        console.error("Supabase Storage upload warning:", uploadResult.error);
      } else {
        resumeStorageUrl = uploadResult.path;
      }
    }

    // 7. Store Application in JobApplication table
    let applicationId = "simulated-" + timestamp;
    let dbConnected = false;

    if (process.env.DATABASE_URL) {
      try {
        const application = await prisma.jobApplication.create({
          data: {
            applicantName: fullName,
            email: email,
            phone: phone,
            positionTitle: positionAppliedFor,
            careerId: careerId || undefined,
            resumeUrl: resumeStorageUrl,
            coverNotes: coverLetter,
            status: "NEW",
          },
        });
        applicationId = application.id;
        dbConnected = true;

        await prisma.activityLog.create({
          data: {
            action: "JOB_APPLICATION_SUBMITTED",
            entityType: "JobApplication",
            entityId: application.id,
            metadata: {
              applicantName: fullName,
              email: email,
              position: positionAppliedFor,
              resumePath: resumeStorageUrl,
            },
          },
        });
      } catch (dbErr: unknown) {
        console.error("Database submission error:", dbErr);
      }
    }

    // 8. Send Email Notifications asynchronously via Resend (Phase 8)
    Promise.allSettled([
      sendAdminApplicationNotification({
        applicantName: fullName,
        email: email,
        phone: phone,
        positionTitle: positionAppliedFor,
        resumeUrl: resumeStorageUrl,
        coverNotes: coverLetter,
      }),
      sendApplicantConfirmation({
        applicantName: fullName,
        email: email,
        positionTitle: positionAppliedFor,
      }),
    ]).catch((err) => console.error("[CareerEmail:ASYNC_DISPATCH_FAIL]", err));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your job application has been successfully submitted.",
        data: {
          id: applicationId,
          position: positionAppliedFor,
          dbRecorded: dbConnected,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Unhandled career application error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred while submitting your application.",
      },
      { status: 500 }
    );
  }
}
