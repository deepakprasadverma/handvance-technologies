"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
import { quoteRequestSchema, QuoteRequestData } from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SERVICES_DATA } from "@/utilities/websiteData";

interface QuoteRequestFormProps {
  initialService?: string;
  onSuccess?: () => void;
}

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({
  initialService = "",
  onSuccess,
}) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<QuoteRequestData | null>(null);

  const budgetOptions = [
    "< $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
  ];

  const timelineOptions = [
    "< 1 Month (Urgent)",
    "1 - 3 Months",
    "3 - 6 Months",
    "6+ Months",
    "Flexible / Ongoing Retainer",
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      serviceRequired: initialService || "",
      projectDescription: "",
      estimatedBudget: "$25,000 - $50,000",
      expectedTimeline: "1 - 3 Months",
      additionalRequirements: "",
      website_hp: "",
    },
  });

  const selectedBudget = watch("estimatedBudget");
  const selectedTimeline = watch("expectedTimeline");

  const onSubmit = async (data: QuoteRequestData) => {
    setServerError(null);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setServerError(result.error || "Quote submission failed. Please try again.");
        return;
      }

      setSubmittedData(data);
      setIsSuccess(true);
      reset();
      if (onSuccess) onSuccess();
    } catch {
      setServerError("Network error. Unable to reach the quote estimation server.");
    }
  };

  if (isSuccess && submittedData) {
    return (
      <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-lightGrey-border shadow-card space-y-4">
        <div className="w-16 h-16 rounded-full bg-cyan-glow flex items-center justify-center text-cyan-brand mx-auto shadow-cyan">
          <CheckCircle2 className="w-8 h-8 text-cyan-brand" />
        </div>
        <Badge variant="cyan" size="sm">Quote Request Received</Badge>
        <h3 className="text-2xl font-bold text-navy">
          Thank you, {submittedData.fullName}!
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Your quote specification for <strong className="text-navy">{submittedData.serviceRequired}</strong> ({submittedData.estimatedBudget}) has been routed to our senior solutions architects. We will deliver a formal estimate to <strong className="text-navy">{submittedData.email}</strong> within 1 business day.
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
            Submit Another Quote Request
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
        <h3 className="text-xl font-bold text-navy">Request a Project Scoping Quote</h3>
        <p className="text-xs text-slate-500 mt-1">
          Detailed estimates provided within 24 business hours under strict NDA.
        </p>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Full Name <span className="text-cyan-brand">*</span>
          </label>
          <input
            type="text"
            placeholder="Sarah Jenkins"
            {...register("fullName")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.fullName ? "border-red-400 focus:ring-red-400" : "border-lightGrey-border focus:ring-cyan-brand/40"
            }`}
          />
          {errors.fullName && <p className="text-[11px] text-red-600 font-medium">{errors.fullName.message}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Work Email <span className="text-cyan-brand">*</span>
          </label>
          <input
            type="email"
            placeholder="sarah@enterprise.com"
            {...register("email")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.email ? "border-red-400 focus:ring-red-400" : "border-lightGrey-border focus:ring-cyan-brand/40"
            }`}
          />
          {errors.email && <p className="text-[11px] text-red-600 font-medium">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Phone Number <span className="text-cyan-brand">*</span>
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register("phone")}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
              errors.phone ? "border-red-400 focus:ring-red-400" : "border-lightGrey-border focus:ring-cyan-brand/40"
            }`}
          />
          {errors.phone && <p className="text-[11px] text-red-600 font-medium">{errors.phone.message}</p>}
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-navy font-mono">
            Company Name <span className="text-slate-400">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Apex Global Inc."
            {...register("companyName")}
            className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Service Required */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-navy font-mono">
          Service Required <span className="text-cyan-brand">*</span>
        </label>
        <select
          {...register("serviceRequired")}
          className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy focus:outline-none focus:ring-2 focus:bg-white transition-all ${
            errors.serviceRequired ? "border-red-400 focus:ring-red-400" : "border-lightGrey-border focus:ring-cyan-brand/40"
          }`}
        >
          <option value="">Select required capability...</option>
          {SERVICES_DATA.map((s) => (
            <option key={s.id} value={s.title}>{s.title}</option>
          ))}
          <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
        </select>
        {errors.serviceRequired && <p className="text-[11px] text-red-600 font-medium">{errors.serviceRequired.message}</p>}
      </div>

      {/* Estimated Budget */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-navy font-mono block">
          Estimated Budget Range <span className="text-cyan-brand">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setValue("estimatedBudget", opt, { shouldValidate: true })}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedBudget === opt
                  ? "bg-navy text-cyan-brand border-navy font-bold shadow-xs"
                  : "bg-lightGrey text-slate-600 border-lightGrey-border hover:bg-white hover:text-navy"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {errors.estimatedBudget && <p className="text-[11px] text-red-600 font-medium">{errors.estimatedBudget.message}</p>}
      </div>

      {/* Expected Timeline */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-navy font-mono block">
          Expected Timeline <span className="text-cyan-brand">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {timelineOptions.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setValue("expectedTimeline", t, { shouldValidate: true })}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedTimeline === t
                  ? "bg-navy text-cyan-brand border-navy font-bold shadow-xs"
                  : "bg-lightGrey text-slate-600 border-lightGrey-border hover:bg-white hover:text-navy"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.expectedTimeline && <p className="text-[11px] text-red-600 font-medium">{errors.expectedTimeline.message}</p>}
      </div>

      {/* Project Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-navy font-mono">
          Project Description &amp; Specifications <span className="text-cyan-brand">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Describe your product architecture, user roles, core workflows, and must-have milestone requirements..."
          {...register("projectDescription")}
          className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all resize-none ${
            errors.projectDescription ? "border-red-400 focus:ring-red-400" : "border-lightGrey-border focus:ring-cyan-brand/40"
          }`}
        />
        {errors.projectDescription && <p className="text-[11px] text-red-600 font-medium">{errors.projectDescription.message}</p>}
      </div>

      {/* Additional Requirements */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-navy font-mono">
          Additional Requirements &amp; Integrations <span className="text-slate-400">(Optional)</span>
        </label>
        <textarea
          rows={2}
          placeholder="e.g. Existing AWS infrastructure, Salesforce/Stripe API connectors, HIPAA/SOC2 compliance mandates..."
          {...register("additionalRequirements")}
          className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="cyan"
        size="lg"
        disabled={isSubmitting}
        icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        className="w-full justify-center shadow-md hover:shadow-cyan"
      >
        {isSubmitting ? "Generating Scope & Quote..." : "Submit Project for Scoping"}
      </Button>

      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-brand" />
          <span>Strict Non-Disclosure Guarantee</span>
        </span>
        <span>Guaranteed 24h Scoping SLA</span>
      </div>
    </form>
  );
};
