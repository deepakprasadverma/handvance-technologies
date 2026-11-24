import { z } from "zod";

/**
 * 1. Contact Form Validation Schema
 * Fields: Full Name, Email, Phone, Service Required, Subject, Message
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name must not exceed 100 characters." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid work email address." })
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits." })
    .max(25, { message: "Phone number is too long." })
    .regex(/^[\d\s+\-().]+$/, { message: "Please enter a valid phone number." }),
  serviceRequired: z
    .string()
    .min(1, { message: "Please select the service required." }),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." })
    .max(150, { message: "Subject must not exceed 150 characters." })
    .trim(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(5000, { message: "Message must not exceed 5000 characters." })
    .trim(),
  // Honeypot field for bot detection (must be empty)
  website_hp: z.string().max(0, { message: "Bot detected." }).nullable().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * 2. Quote Request Form Validation Schema
 * Fields: Full Name, Email, Phone, Company Name (optional), Service Required,
 *         Project Description, Estimated Budget, Expected Timeline, Additional Requirements
 */
export const quoteRequestSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name must not exceed 100 characters." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits." })
    .max(25, { message: "Phone number is too long." })
    .regex(/^[\d\s+\-().]+$/, { message: "Please enter a valid phone number." }),
  companyName: z
    .string()
    .max(100, { message: "Company name must not exceed 100 characters." })
    .optional()
    .or(z.literal("")),
  serviceRequired: z
    .string()
    .min(1, { message: "Please select the required service." }),
  projectDescription: z
    .string()
    .min(10, { message: "Project description must be at least 10 characters." })
    .max(5000, { message: "Description must not exceed 5000 characters." })
    .trim(),
  estimatedBudget: z
    .string()
    .min(1, { message: "Please select an estimated budget range." }),
  expectedTimeline: z
    .string()
    .min(1, { message: "Please select an expected project timeline." }),
  additionalRequirements: z
    .string()
    .max(3000, { message: "Additional requirements must not exceed 3000 characters." })
    .optional()
    .or(z.literal("")),
  website_hp: z.string().max(0, { message: "Bot detected." }).nullable().optional(),
});

export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;

/**
 * 3. Career Application Form Validation Schema
 * Fields: Full Name, Email, Phone, Position Applied For, Resume Upload, Cover Letter
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const careerApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name must not exceed 100 characters." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits." })
    .max(25, { message: "Phone number is too long." })
    .regex(/^[\d\s+\-().]+$/, { message: "Please enter a valid phone number." }),
  positionAppliedFor: z
    .string()
    .min(2, { message: "Please specify the position you are applying for." }),
  careerId: z.string().optional(),
  coverLetter: z
    .string()
    .min(10, { message: "Cover letter / notes must be at least 10 characters." })
    .max(5000, { message: "Cover letter must not exceed 5000 characters." })
    .trim(),
  website_hp: z.string().max(0, { message: "Bot detected." }).nullable().optional(),
});

export type CareerApplicationData = z.infer<typeof careerApplicationSchema>;

/**
 * 4. Newsletter Subscription Validation Schema
 * Fields: Email Address
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim()
    .toLowerCase(),
  website_hp: z.string().max(0, { message: "Bot detected." }).nullable().optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * 5. Admin Login Validation Schema
 * Fields: Email, Password
 */
export const adminLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid administrator email." })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(128, { message: "Password exceeds maximum length." }),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;
