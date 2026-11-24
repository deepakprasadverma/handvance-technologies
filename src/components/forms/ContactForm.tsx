"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
import { contactFormSchema, ContactFormData } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES_DATA } from "@/utilities/websiteData";

interface ContactFormProps {
  initialService?: string;
  initialSubject?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = "",
  initialSubject = "",
}) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      serviceRequired: initialService || "",
      subject: initialSubject || "",
      message: "",
      website_hp: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setServerError(result.error || "Submission failed. Please try again.");
        return;
      }

      setSubmittedData(data);
      setIsSuccess(true);
      reset();
    } catch {
      setServerError("Network error. Unable to reach the consultation server.");
    }
  };

  if (isSuccess && submittedData) {
    return (
      <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-lightGrey-border shadow-card space-y-4">
        <div className="w-16 h-16 rounded-full bg-cyan-glow flex items-center justify-center text-cyan-brand mx-auto shadow-cyan">
          <CheckCircle2 className="w-8 h-8 text-cyan-brand" />
        </div>
        <Badge variant="cyan" size="sm">Inquiry Received</Badge>
        <h3 className="text-2xl font-bold text-navy">
          Thank you, {submittedData.fullName}!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your inquiry regarding <strong className="text-navy">{submittedData.serviceRequired}</strong> has been transmitted directly to our lead engineering team. We will review your requirements and respond to <strong className="text-navy">{submittedData.email}</strong> within 24 business hours.
        </p>
        <div className="pt-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setIsSuccess(false);
              setSubmittedData(null);
            }}
          >
            Submit Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="bg-white p-6 sm:p-8 rounded-3xl border border-lightGrey-border shadow-card space-y-5"
    >
      <div className="border-b border-lightGrey-border pb-4">
        <h3 className="text-xl font-bold text-navy">Initiate Technical Consultation</h3>
        <p className="text-xs text-slate-500 mt-1">
          Complete the form below to connect directly with a systems architect.
        </p>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Anti-Spam Honeypot (Hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website_hp")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Full Name <span className="text-cyan-brand">*</span>
          </label>
          <input
            type="text"
            placeholder="Jane Doe"
            {...register("fullName")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.fullName
                ? "border-red-400 focus:ring-red-400"
                : "border-lightGrey-border focus:ring-cyan-brand/40"
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-600 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Work Email <span className="text-cyan-brand">*</span>
          </label>
          <input
            type="email"
            placeholder="jane@company.com"
            {...register("email")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.email
                ? "border-red-400 focus:ring-red-400"
                : "border-lightGrey-border focus:ring-cyan-brand/40"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Phone Number <span className="text-cyan-brand">*</span>
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.phone
                ? "border-red-400 focus:ring-red-400"
                : "border-lightGrey-border focus:ring-cyan-brand/40"
            }`}
          />
          {errors.phone && (
            <p className="text-[11px] text-red-600 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Service Required */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Service Required <span className="text-cyan-brand">*</span>
          </label>
          <select
            {...register("serviceRequired")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.serviceRequired
                ? "border-red-400 focus:ring-red-400"
                : "border-lightGrey-border focus:ring-cyan-brand/40"
            }`}
          >
            <option value="">Select a service category...</option>
            {SERVICES_DATA.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
          </select>
          {errors.serviceRequired && (
            <p className="text-[11px] text-red-600 font-medium">
              {errors.serviceRequired.message}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-navy font-mono">
          Subject <span className="text-cyan-brand">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Greenfield Web App Build & AWS Infrastructure Architecture"
          {...register("subject")}
          className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
            errors.subject
              ? "border-red-400 focus:ring-red-400"
              : "border-lightGrey-border focus:ring-cyan-brand/40"
          }`}
        />
        {errors.subject && (
          <p className="text-[11px] text-red-600 font-medium">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-navy font-mono">
          Project Description &amp; Technical Scope <span className="text-cyan-brand">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Share your goals, target architecture, user volume, and desired launch milestone..."
          {...register("message")}
          className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all resize-none ${
            errors.message
              ? "border-red-400 focus:ring-red-400"
              : "border-lightGrey-border focus:ring-cyan-brand/40"
          }`}
        />
        {errors.message && (
          <p className="text-[11px] text-red-600 font-medium">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="cyan"
        size="lg"
        disabled={isSubmitting}
        icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        className="w-full justify-center shadow-md hover:shadow-cyan"
      >
        {isSubmitting ? "Submitting Inquiry..." : "Submit Technical Inquiry"}
      </Button>

      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-brand" />
          <span>Strict Non-Disclosure Guarantee</span>
        </span>
        <span>Guaranteed 24h Response</span>
      </div>
    </form>
  );
};
