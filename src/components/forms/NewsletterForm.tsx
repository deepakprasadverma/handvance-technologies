"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { newsletterSchema, NewsletterData } from "@/lib/validations";

export const NewsletterForm: React.FC = () => {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      website_hp: "",
    },
  });

  const onSubmit = async (data: NewsletterData) => {
    setFeedback(null);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setFeedback({
          type: "error",
          message: result.error || "Subscription failed. Please try again.",
        });
        return;
      }

      if (result.data?.alreadySubscribed) {
        setFeedback({
          type: "info",
          message: result.message || "You are already subscribed to our newsletter!",
        });
      } else {
        setFeedback({
          type: "success",
          message: result.message || "Thank you for subscribing to Handvance Engineering Dispatch!",
        });
        reset();
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Network error. Unable to process newsletter subscription.",
      });
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <input
              type="email"
              placeholder="Enter your corporate email..."
              {...register("email")}
              className={`w-full px-4 py-2.5 rounded-xl bg-navy-dark text-white placeholder:text-slate-400 text-xs border focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-navy-muted/60 focus:border-cyan-brand focus:ring-cyan-brand/30"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl bg-cyan-brand text-navy hover:bg-cyan-light font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-60 shadow-md flex-shrink-0"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <span>Subscribe</span>
                <Send className="w-3 h-3" />
              </>
            )}
          </button>
        </div>

        {errors.email && (
          <p className="text-[11px] text-red-400 font-medium">
            {errors.email.message}
          </p>
        )}
      </form>

      {/* Feedback Message */}
      {feedback && (
        <div
          className={`p-2.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in ${
            feedback.type === "success"
              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300"
              : feedback.type === "info"
              ? "bg-cyan-950/60 border border-cyan-500/40 text-cyan-300"
              : "bg-red-950/60 border border-red-500/40 text-red-300"
          }`}
        >
          {feedback.type === "success" || feedback.type === "info" ? (
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
};
