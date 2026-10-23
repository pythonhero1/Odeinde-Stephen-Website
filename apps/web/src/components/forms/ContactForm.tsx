"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2, Calendar } from "lucide-react";
import {
  EnquiryInputSchema,
  SERVICE_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  type EnquiryInput,
} from "@/lib/cms/schema";

interface ContactFormProps {
  bookingUrl: string;
}

function ContactFormInner({ bookingUrl }: ContactFormProps) {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<Partial<EnquiryInput>>({
    name: "",
    email: "",
    service: SERVICE_OPTIONS[0],
    company: "",
    website: "",
    budget: BUDGET_OPTIONS[0],
    timeline: TIMELINE_OPTIONS[0],
    message: "",
    honeypot: "",
  });

  const [clientKey, setClientKey] = useState("");

  useEffect(() => {
    setClientKey(`cl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`);

    const serviceParam = searchParams.get("service")?.toLowerCase();
    const interestParam = searchParams.get("interest")?.toLowerCase();

    setFormData((prev) => {
      let matchedService = prev.service;
      let initialMessage = prev.message;

      if (serviceParam) {
        if (serviceParam.includes("e-commerce") || serviceParam.includes("ecommerce")) {
          matchedService = SERVICE_OPTIONS[2];
        } else if (serviceParam.includes("dev") || serviceParam.includes("wordpress")) {
          matchedService = SERVICE_OPTIONS[1];
        } else if (serviceParam.includes("solution")) {
          matchedService = SERVICE_OPTIONS[0];
        }
      }

      if (interestParam === "checklist") {
        initialMessage =
          "Hello Stephen, I would like to request the Website Review Checklist & Guide, and discuss recommendations for my project.";
      }

      return {
        ...prev,
        service: matchedService,
        message: initialMessage,
      };
    });
  }, [searchParams]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submissionKey, setSubmissionKey] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on edit
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    // 1. Client-side Zod validation
    const result = EnquiryInputSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0]?.toString();
        if (path) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);

      // Focus first error field
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const el = document.getElementById(firstErrorKey);
      el?.focus();
      return;
    }

    // 2. Submit to Next.js route handler /api/enquiry
    setStatus("submitting");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...result.data,
          submissionKey: clientKey || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to submit enquiry.");
      }

      setSubmissionKey(data.submissionKey || "");
      setStatus("success");
    } catch (err: any) {
      console.error("[ContactForm] Submission error:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again or email directly."
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 sm:p-10 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 text-center animate-fade-in"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
          Enquiry Received Safely
        </h3>

        <p className="text-sm text-brand-muted max-w-md mx-auto mb-6 leading-relaxed">
          Thank you. Your project enquiry has been logged and forwarded directly to Stephen
          (<span className="text-white">Contact@oderindestephen.com</span>). You will receive a
          response within 24 business hours.
        </p>

        {submissionKey && (
          <div className="inline-block px-3 py-1.5 rounded bg-brand-surface border border-brand-border text-xs font-mono text-brand-muted mb-8">
            Reference ID: <span className="text-white">{submissionKey}</span>
          </div>
        )}

        <div className="pt-6 border-t border-emerald-900/40">
          <p className="text-xs text-brand-muted mb-3 font-mono">
            Prefer immediate confirmation?
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-accentHover hover:bg-blue-700 text-white font-medium text-xs font-heading transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Strategy Call on Cal.com</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "submitting"}
      className="p-6 sm:p-10 rounded-2xl bg-brand-card/90 border border-brand-border shadow-xl space-y-6"
    >
      {/* Bot Honeypot Field (visually hidden) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Leave this blank</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot || ""}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Error Alert Banner */}
      {status === "error" && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs sm:text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
          <div>
            <p className="font-semibold text-white mb-1">Submission Failed</p>
            <p>{errorMessage}</p>
            <p className="mt-2 text-xs">
              Direct fallback email:{" "}
              <a
                href="mailto:Contact@oderindestephen.com"
                className="underline hover:text-white"
              >
                Contact@oderindestephen.com
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-mono text-white mb-2">
            Your Name <span className="text-brand-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Stephen Oderinde"
            className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400 font-mono">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-mono text-white mb-2">
            Email Address <span className="text-brand-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="you@company.com"
            className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400 font-mono">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Service Selection */}
      <div>
        <label htmlFor="service" className="block text-xs font-mono text-white mb-2">
          Service Requested <span className="text-brand-accent">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
          value={formData.service || SERVICE_OPTIONS[0]}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-brand-surface">
              {opt}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="service-error" className="mt-1.5 text-xs text-red-400 font-mono">
            {errors.service}
          </p>
        )}
      </div>

      {/* Row 3: Optional Company and Current Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-xs font-mono text-brand-muted mb-2">
            Company Name (Optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            placeholder="Acme Ltd"
            className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-xs font-mono text-brand-muted mb-2">
            Current Website (Optional)
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
          />
        </div>
      </div>

      {/* Row 4: Budget in GBP (£) and Preferred Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-xs font-mono text-brand-muted mb-2">
            Budget Range in GBP (£) (Optional)
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget || BUDGET_OPTIONS[0]}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-brand-surface">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-xs font-mono text-brand-muted mb-2">
            Preferred Timeline (Optional)
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline || TIMELINE_OPTIONS[0]}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors"
          >
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-brand-surface">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 5: Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono text-white mb-2">
          Project Details &amp; Objectives <span className="text-brand-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          value={formData.message || ""}
          onChange={handleChange}
          placeholder="Tell me about your business goals, target audience, and any current performance bottlenecks. (Please do not include passwords or sensitive credentials)."
          className="w-full px-4 py-3 rounded-lg bg-brand-surface border border-brand-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors resize-y"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400 font-mono">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Action Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-brand-accentHover hover:bg-blue-700 text-white font-heading font-semibold text-sm transition-colors shadow-lg shadow-blue-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:opacity-50 disabled:pointer-events-none min-h-[44px]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Project Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactForm({ bookingUrl }: ContactFormProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 sm:p-10 rounded-2xl bg-brand-surface/40 border border-brand-border/60 text-center animate-pulse">
          <p className="text-sm font-mono text-brand-muted">Loading enquiry form...</p>
        </div>
      }
    >
      <ContactFormInner bookingUrl={bookingUrl} />
    </Suspense>
  );
}
