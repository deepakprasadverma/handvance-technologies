"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  X, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  FileText, 
  Loader2 
} from "lucide-react";
import { 
  careerApplicationSchema, 
  CareerApplicationData, 
  MAX_FILE_SIZE, 
  ACCEPTED_RESUME_TYPES 
} from "@/lib/validations";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { JobOpening } from "@/types";

interface CareerApplicationModalProps {
  job: JobOpening | null;
  onClose: () => void;
}

export const CareerApplicationModal: React.FC<CareerApplicationModalProps> = ({
  job,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CareerApplicationData>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      positionAppliedFor: job?.title || "",
      careerId: job?.id || "",
      coverLetter: "",
      website_hp: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File exceeds maximum size of 10MB (${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
      setSelectedFile(null);
      return;
    }

    if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
      setFileError("Invalid file type. Only PDF, DOC, or DOCX resumes are accepted.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const onSubmit = async (data: CareerApplicationData) => {
    setServerError(null);

    if (!selectedFile) {
      setFileError("Please upload your resume file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("positionAppliedFor", data.positionAppliedFor);
      if (data.careerId) formData.append("careerId", data.careerId);
      formData.append("coverLetter", data.coverLetter);
      if (data.website_hp) formData.append("website_hp", data.website_hp);
      formData.append("resume", selectedFile);

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setServerError(result.error || "Application submission failed. Please try again.");
        return;
      }

      setIsSuccess(true);
      reset();
      setSelectedFile(null);
    } catch {
      setServerError("Network error. Unable to reach application server.");
    }
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-lightGrey-border max-h-[90vh] overflow-y-auto space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-lightGrey-border">
          <div>
            <Badge variant="cyan" size="sm" className="mb-1">Candidate Application Desk</Badge>
            <h3 className="text-xl font-bold text-navy">{job.title}</h3>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {job.department} • {job.location}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-navy hover:bg-lightGrey transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {serverError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span>{serverError}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-glow flex items-center justify-center text-cyan-brand mx-auto shadow-cyan">
              <CheckCircle2 className="w-8 h-8 text-cyan-brand" />
            </div>
            <h4 className="text-2xl font-bold text-navy">Application Submitted!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for applying for the <strong className="text-navy">{job.title}</strong> role at Handvance Technologies. Your resume has been delivered to our engineering recruitment desk. We will review your background and reach out within 3-5 business days.
            </p>
            <div className="pt-4">
              <Button variant="primary" size="md" onClick={onClose}>
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {/* Anti-spam honeypot */}
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
                  placeholder="Alex Rivera"
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
                  Email Address <span className="text-cyan-brand">*</span>
                </label>
                <input
                  type="email"
                  placeholder="alex@domain.com"
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
                  placeholder="+1 (555) 345-6789"
                  {...register("phone")}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    errors.phone ? "border-red-400 focus:ring-red-400" : "border-lightGrey-border focus:ring-cyan-brand/40"
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-600 font-medium">{errors.phone.message}</p>}
              </div>

              {/* Position Applied For */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy font-mono">
                  Position Applied For <span className="text-cyan-brand">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  {...register("positionAppliedFor")}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-lightGrey-border text-sm text-slate-700 font-semibold focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Resume File Upload (Supabase Storage) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy font-mono block">
                Resume Document <span className="text-cyan-brand">* (PDF, DOC, DOCX up to 10MB)</span>
              </label>
              
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`p-5 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-colors ${
                  fileError
                    ? "border-red-400 bg-red-50/50"
                    : selectedFile
                    ? "border-cyan-brand bg-cyan-glow/20"
                    : "border-lightGrey-border hover:border-cyan-brand/60 bg-lightGrey/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="w-6 h-6 text-cyan-brand flex-shrink-0" />
                    <div className="text-left">
                      <div className="text-xs font-bold text-navy">{selectedFile.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload to secure storage
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="text-xs font-bold text-navy">
                      Click to upload your resume
                    </div>
                    <div className="text-[11px] text-slate-500">
                      PDF, DOCX, or DOC (Max size: 10MB)
                    </div>
                  </div>
                )}
              </div>
              {fileError && <p className="text-[11px] text-red-600 font-medium">{fileError}</p>}
            </div>

            {/* Cover Letter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-navy font-mono">
                Cover Letter / Relevant Achievements <span className="text-cyan-brand">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about the distributed systems, AI pipelines, or software platforms you have shipped, and why you want to join Handvance..."
                {...register("coverLetter")}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-lightGrey border text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all resize-none ${
                  errors.coverLetter ? "border-red-400 focus:ring-red-400" : "border-lightGrey-border focus:ring-cyan-brand/40"
                }`}
              />
              {errors.coverLetter && <p className="text-[11px] text-red-600 font-medium">{errors.coverLetter.message}</p>}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-lightGrey-border">
              <Button type="button" variant="ghost" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="cyan"
                size="md"
                disabled={isSubmitting}
                icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              >
                {isSubmitting ? "Uploading & Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
