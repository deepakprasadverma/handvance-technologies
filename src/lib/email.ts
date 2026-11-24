import { Resend } from 'resend';

// Initialize Resend if API key is provided
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = process.env.EMAIL_FROM || 'Handvance Technologies <notifications@handvance.com>';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'contact@handvance.com';

interface SendResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}

/**
 * Helper to dispatch email via Resend with graceful development fallback
 */
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<SendResult> {
  if (!resend) {
    console.info(`[EmailService:SIMULATED] Sending to ${Array.isArray(to) ? to.join(', ') : to}: "${subject}"`);
    return {
      success: true,
      simulated: true,
      messageId: `sim_${Date.now()}`,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('[EmailService:ERROR]', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: data?.id };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown email dispatch error';
    console.error('[EmailService:EXCEPTION]', msg);
    return { success: false, error: msg };
  }
}

// ============================================================================
// 1. CONTACT SUBMISSION EMAILS
// ============================================================================

export async function sendAdminContactNotification(contact: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceInterest?: string | null;
  subject?: string | null;
  message: string;
}): Promise<SendResult> {
  const subject = `[New Contact] ${contact.subject || 'Inquiry from ' + contact.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #101D36; margin-bottom: 16px;">New Contact Inquiry Received</h2>
      <p style="color: #4a5568; margin-bottom: 24px;">A new visitor has submitted the contact form on Handvance Technologies:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 8px 0; color: #718096; width: 140px;">Name:</td><td style="padding: 8px 0; font-weight: bold; color: #1a202c;">${contact.name}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;">Email:</td><td style="padding: 8px 0; color: #1a202c;"><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #718096;">Phone:</td><td style="padding: 8px 0; color: #1a202c;">${contact.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;">Company:</td><td style="padding: 8px 0; color: #1a202c;">${contact.company || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0; color: #718096;">Service Interest:</td><td style="padding: 8px 0; color: #13CDEB; font-weight: bold;">${contact.serviceInterest || 'General Inquiry'}</td></tr>
      </table>

      <div style="background-color: #f7fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #13CDEB; margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #101D36;">Message:</h4>
        <p style="margin: 0; color: #2d3748; white-space: pre-wrap; line-height: 1.5;">${contact.message}</p>
      </div>

      <p style="font-size: 12px; color: #a0aec0; text-align: center;">Handvance Technologies Automated Admin Dispatch</p>
    </div>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject, html });
}

export async function sendCustomerContactConfirmation(contact: {
  name: string;
  email: string;
}): Promise<SendResult> {
  const subject = 'Thank You for Contacting Handvance Technologies';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="background-color: #101D36; padding: 16px; border-radius: 6px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">HANDVANCE <span style="color: #13CDEB;">TECHNOLOGIES</span></h1>
      </div>
      <h2 style="color: #101D36; margin-bottom: 12px;">Hello ${contact.name},</h2>
      <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
        Thank you for reaching out to <strong>Handvance Technologies</strong>. We have received your inquiry and our enterprise consulting team has been notified.
      </p>
      <div style="background-color: #f8fafc; border-left: 4px solid #13CDEB; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.5;">
          Our technology consultants typically review submissions and respond within <strong>24 business hours</strong> with personalized recommendations or to schedule a discovery call.
        </p>
      </div>
      <p style="color: #4a5568; line-height: 1.6; margin-bottom: 24px;">
        If you have urgent inquiries, feel free to reply directly to this email or reach us at <a href="mailto:contact@handvance.com" style="color: #13CDEB;">contact@handvance.com</a>.
      </p>
      <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">Warm regards,<br><strong style="color: #101D36;">The Handvance Technologies Team</strong></p>
    </div>
  `;

  return sendEmail({ to: contact.email, subject, html });
}

// ============================================================================
// 2. PROJECT QUOTE REQUEST EMAILS
// ============================================================================

export async function sendAdminQuoteNotification(quote: {
  contactName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  projectType: string;
  estimatedBudget?: string | null;
  targetTimeline?: string | null;
  projectDetails: string;
  additionalRequirements?: string | null;
}): Promise<SendResult> {
  const subject = `[New Quote Request] ${quote.projectType} - ${quote.contactName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #101D36; margin-bottom: 16px;">New Project Scoping / Quote Request</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 6px 0; color: #718096; width: 140px;">Client Name:</td><td style="padding: 6px 0; font-weight: bold; color: #1a202c;">${quote.contactName}</td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Email:</td><td style="padding: 6px 0; color: #1a202c;"><a href="mailto:${quote.email}">${quote.email}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Phone:</td><td style="padding: 6px 0; color: #1a202c;">${quote.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Company:</td><td style="padding: 6px 0; color: #1a202c;">${quote.company || 'N/A'}</td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Project Type:</td><td style="padding: 6px 0; color: #13CDEB; font-weight: bold;">${quote.projectType}</td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Budget Range:</td><td style="padding: 6px 0; color: #1a202c;">${quote.estimatedBudget || 'Not specified'}</td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Target Timeline:</td><td style="padding: 6px 0; color: #1a202c;">${quote.targetTimeline || 'Not specified'}</td></tr>
      </table>

      <div style="background-color: #f7fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #101D36; margin-bottom: 16px;">
        <h4 style="margin: 0 0 8px 0; color: #101D36;">Project Scope & Specifications:</h4>
        <p style="margin: 0; color: #2d3748; white-space: pre-wrap; line-height: 1.5;">${quote.projectDetails}</p>
      </div>

      ${quote.additionalRequirements ? `
      <div style="background-color: #f0fdf4; padding: 14px; border-radius: 6px; border-left: 4px solid #22c55e; margin-bottom: 20px;">
        <h4 style="margin: 0 0 6px 0; color: #15803d;">Additional Requirements:</h4>
        <p style="margin: 0; color: #166534; font-size: 14px;">${quote.additionalRequirements}</p>
      </div>` : ''}

      <p style="font-size: 12px; color: #a0aec0; text-align: center;">Handvance Technologies Automated Quote Intake</p>
    </div>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject, html });
}

export async function sendCustomerQuoteConfirmation(quote: {
  contactName: string;
  email: string;
  projectType: string;
}): Promise<SendResult> {
  const subject = `Quotation Request Received - Handvance Technologies [${quote.projectType}]`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="background-color: #101D36; padding: 16px; border-radius: 6px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">HANDVANCE <span style="color: #13CDEB;">TECHNOLOGIES</span></h1>
      </div>
      <h2 style="color: #101D36; margin-bottom: 12px;">Dear ${quote.contactName},</h2>
      <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
        We have successfully received your project request for <strong>${quote.projectType}</strong>. Our senior solutions architects are currently reviewing your project requirements, scope, and technical roadmap.
      </p>
      <div style="background-color: #f8fafc; border-left: 4px solid #13CDEB; padding: 16px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #101D36;">What happens next?</h4>
        <ol style="margin: 0; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.6;">
          <li>A dedicated technical solutions manager will review your architectural specs.</li>
          <li>We prepare a custom preliminary proposal with milestone breakdowns and timeline.</li>
          <li>We will schedule a 30-minute discovery session with you.</li>
        </ol>
      </div>
      <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">Best regards,<br><strong style="color: #101D36;">Handvance Solutions Engineering</strong></p>
    </div>
  `;

  return sendEmail({ to: quote.email, subject, html });
}

// ============================================================================
// 3. JOB APPLICATION EMAILS
// ============================================================================

export async function sendAdminApplicationNotification(application: {
  applicantName: string;
  email: string;
  phone?: string | null;
  positionTitle?: string | null;
  resumeUrl: string;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  coverNotes?: string | null;
}): Promise<SendResult> {
  const subject = `[New Candidate] ${application.positionTitle || 'Job Application'} - ${application.applicantName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #101D36; margin-bottom: 16px;">New Candidate Application Received</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 6px 0; color: #718096; width: 140px;">Applicant:</td><td style="padding: 6px 0; font-weight: bold; color: #1a202c;">${application.applicantName}</td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Position:</td><td style="padding: 6px 0; color: #13CDEB; font-weight: bold;">${application.positionTitle || 'General Opening'}</td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Email:</td><td style="padding: 6px 0; color: #1a202c;"><a href="mailto:${application.email}">${application.email}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #718096;">Phone:</td><td style="padding: 6px 0; color: #1a202c;">${application.phone || 'N/A'}</td></tr>
        ${application.linkedinUrl ? `<tr><td style="padding: 6px 0; color: #718096;">LinkedIn:</td><td style="padding: 6px 0;"><a href="${application.linkedinUrl}" target="_blank">${application.linkedinUrl}</a></td></tr>` : ''}
        ${application.portfolioUrl ? `<tr><td style="padding: 6px 0; color: #718096;">Portfolio:</td><td style="padding: 6px 0;"><a href="${application.portfolioUrl}" target="_blank">${application.portfolioUrl}</a></td></tr>` : ''}
        <tr><td style="padding: 6px 0; color: #718096;">Resume:</td><td style="padding: 6px 0;"><a href="${application.resumeUrl}" target="_blank" style="color: #13CDEB; font-weight: bold;">View / Download Resume</a></td></tr>
      </table>

      ${application.coverNotes ? `
      <div style="background-color: #f7fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #101D36; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #101D36;">Cover Letter / Candidate Notes:</h4>
        <p style="margin: 0; color: #2d3748; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${application.coverNotes}</p>
      </div>` : ''}

      <p style="font-size: 12px; color: #a0aec0; text-align: center;">Handvance Technologies Careers Portal</p>
    </div>
  `;

  return sendEmail({ to: ADMIN_EMAIL, subject, html });
}

export async function sendApplicantConfirmation(application: {
  applicantName: string;
  email: string;
  positionTitle?: string | null;
}): Promise<SendResult> {
  const subject = `Application Received: ${application.positionTitle || 'Position'} at Handvance Technologies`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="background-color: #101D36; padding: 16px; border-radius: 6px; text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">HANDVANCE <span style="color: #13CDEB;">TECHNOLOGIES</span></h1>
      </div>
      <h2 style="color: #101D36; margin-bottom: 12px;">Hi ${application.applicantName},</h2>
      <p style="color: #4a5568; line-height: 1.6; margin-bottom: 20px;">
        Thank you for applying for the <strong>${application.positionTitle || 'position'}</strong> at Handvance Technologies. We have received your application materials and resume.
      </p>
      <div style="background-color: #f8fafc; border-left: 4px solid #13CDEB; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6;">
          Our technical hiring committee reviews all engineering and product submissions on a rolling basis. If your profile matches our team's current technical requirements, our talent team will reach out directly to schedule a preliminary conversation.
        </p>
      </div>
      <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">Wishing you the very best,<br><strong style="color: #101D36;">Handvance People & Culture Team</strong></p>
    </div>
  `;

  return sendEmail({ to: application.email, subject, html });
}
