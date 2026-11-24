import React from "react";
import { ArrowLeft, Home, Compass } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <AppLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Subtle Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-card border border-lightGrey-border text-cyan-brand mx-auto">
            <Compass className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-glow text-navy text-xs font-bold uppercase tracking-wider">
              Error 404 • Resource Not Located
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">
              Page Not Found
            </h1>
            <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              The page you are looking for does not exist, has been removed, or is temporarily unavailable in this release.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="cyan"
              size="md"
              href="/"
              icon={<Home className="w-4 h-4" />}
              iconPosition="left"
            >
              Back to Home
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/contact"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Contact Support
            </Button>
          </div>

          <div className="pt-6 border-t border-lightGrey-border text-xs text-slate-400">
            Handvance Technologies Routing Mesh • HTTP 404 Status Verified
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
