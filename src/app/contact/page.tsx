"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BRAND, SOCIAL_LINKS } from "@/utilities/constants";
import { SERVICES_DATA } from "@/utilities/websiteData";

function ContactFormInner() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";
  const intent = searchParams.get("intent") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: preselectedService,
    budget: intent === "quote" ? "$25k - $50k" : "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const budgetRanges = [
    "< $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API submission latency
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div>
      {submitted ? (
        <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-lightGrey-border shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-glow flex items-center justify-center text-cyan-brand mx-auto shadow-cyan">
            <CheckCircle2 className="w-8 h-8 text-cyan-brand" />
          </div>
          <Badge variant="cyan" size="sm">Inquiry Received</Badge>
          <h3 className="text-2xl font-bold text-navy">
            Thank you, {formData.name || "there"}!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Your project inquiry has been delivered directly to our lead engineering team. A principal architect will review your technical requirements and respond within 24 business hours.
          </p>
          <div className="pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  service: "",
                  budget: "",
                  message: "",
                });
              }}
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-lightGrey-border shadow-card space-y-6"
        >
          <div className="border-b border-lightGrey-border pb-4">
            <h3 className="text-xl font-bold text-navy">Initiate Technical Consultation</h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide project details below to receive a scoped milestone proposal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy font-mono">
                Full Name <span className="text-cyan-brand">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy font-mono">
                Work Email <span className="text-cyan-brand">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy font-mono">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all"
              />
            </div>

            {/* Company / Organization */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy font-mono">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Acme Enterprises"
                className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Service Interested In */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy font-mono">
              Service Area of Interest
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all"
            >
              <option value="">Select a service category...</option>
              {SERVICES_DATA.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Other / Custom Scoping">Other / Custom Enterprise Architecture</option>
            </select>
          </div>

          {/* Budget Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-navy font-mono block">
              Estimated Budget Range
            </label>
            <div className="flex flex-wrap gap-2">
              {budgetRanges.map((range) => (
                <button
                  type="button"
                  key={range}
                  onClick={() => setFormData({ ...formData, budget: range })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    formData.budget === range
                      ? "bg-navy text-cyan-brand border-navy font-bold shadow-xs"
                      : "bg-lightGrey text-slate-600 border-lightGrey-border hover:bg-white hover:text-navy"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Project Details Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-navy font-mono">
              Project Description &amp; Objectives <span className="text-cyan-brand">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your product goals, technical hurdles, target launch date, and desired deliverables..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border border-lightGrey-border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-brand/40 focus:bg-white transition-all resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="cyan"
            size="lg"
            disabled={submitting}
            icon={<Send className="w-4 h-4" />}
            className="w-full justify-center shadow-lg hover:shadow-cyan"
          >
            {submitting ? "Transmitting Requirements..." : "Submit Technical Inquiry"}
          </Button>

          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-brand" />
              <span>Strict NDA Protected</span>
            </span>
            <span>Response within 24h</span>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-lightGrey border-b border-lightGrey-border pt-12 pb-16">
        <Container size="xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold font-mono">
              <span>Direct Channel</span>
              <span>•</span>
              <span>Global Engineering Desk</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
              Connect With Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy to-cyan-brand">
                Systems Architects
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Whether you are planning a greenfield software build, modernizing legacy infrastructure, or looking for senior team augmentation, we are ready to assist.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Form and Direct Contact Cards */}
      <section>
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Suspense fallback={
                <div className="p-12 text-center bg-white rounded-3xl border border-lightGrey-border">
                  <div className="w-8 h-8 rounded-full border-2 border-cyan-brand border-t-transparent animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 mt-3 font-mono">Loading consultation form...</p>
                </div>
              }>
                <ContactFormInner />
              </Suspense>
            </div>

            {/* Direct Contact & Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary Contact Details Card */}
              <div className="bg-navy rounded-3xl p-8 text-white space-y-6 shadow-xl border border-navy-muted/60">
                <h3 className="text-xl font-bold text-white border-b border-navy-muted/60 pb-3 font-mono">
                  Direct Contact Desk
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <Mail className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Email Address</div>
                      <a
                        href={`mailto:${BRAND.contactEmail}`}
                        className="text-sm font-bold text-white hover:text-cyan-brand transition-colors"
                      >
                        {BRAND.contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <Phone className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Direct Phone</div>
                      <a
                        href={`tel:${BRAND.phone}`}
                        className="text-sm font-bold text-white hover:text-cyan-brand transition-colors"
                      >
                        {BRAND.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <MapPin className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Headquarters</div>
                      <div className="text-sm text-slate-200 leading-snug">
                        {BRAND.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-navy-dark flex items-center justify-center text-cyan-brand flex-shrink-0 border border-navy-muted/60">
                      <Clock className="w-5 h-5 text-cyan-brand" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Operating Hours</div>
                      <div className="text-sm text-slate-200">
                        Monday – Friday • 8:00 AM – 6:00 PM PST
                      </div>
                      <div className="text-[11px] text-cyan-brand mt-0.5">
                        24/7 Priority SLA for Managed Clients
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-navy-muted/60">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    Verified Digital Channels
                  </div>
                  <div className="flex items-center gap-2">
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-navy-dark border border-navy-muted/60 text-xs font-mono text-slate-300 hover:text-cyan-brand hover:border-cyan-brand/50 transition-all"
                      >
                        {s.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response Guarantee Card */}
              <div className="p-6 rounded-2xl bg-white border border-lightGrey-border space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-navy font-bold text-sm">
                  <FileCheck className="w-4 h-4 text-cyan-brand" />
                  <span>The Handvance Discovery Guarantee</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We guarantee an initial technical review within 24 business hours. If requested, an executive non-disclosure agreement (NDA) will be executed prior to discussing proprietary architecture.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
