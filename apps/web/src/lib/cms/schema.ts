import { z } from "zod";

/**
 * Strict runtime schema for GET /wp-json/os/v1/site
 */
export const SiteSettingsSchema = z.object({
  siteName: z.string().min(1).default("Oderinde Stephen"),
  siteTagline: z.string().default("Website Development & Digital Solutions"),
  bookingUrl: z.string().url().default("https://cal.com/oderinde/free"),
  contactEmail: z.string().email().default("Contact@oderindestephen.com"),
  contactPhone: z.string().default("+44 7848 149224"),
  contactLocation: z.string().default("London, United Kingdom & Worldwide Remote"),
  currency: z.enum(["GBP", "USD", "EUR"]).default("GBP"),
  portalUrl: z.string().url().default("https://portal.oderindestephen.com/"),
  socialLinks: z.object({
    linkedin: z.string().url(),
    clutch: z.string().url(),
    trustpilot: z.string().url(),
    googleBusiness: z.string().url(),
  }).default({
    linkedin: "https://www.linkedin.com/in/pythonhero/",
    clutch: "https://clutch.co/profile/oderinde-stephen",
    trustpilot: "https://www.trustpilot.com/review/oderindestephen.com",
    googleBusiness: "https://share.google/vDGgZ0FrAHvVTa31h",
  }),
  navigation: z.array(
    z.object({
      label: z.string().min(1),
      path: z.string().min(1),
      isExternal: z.boolean().default(false),
      isCta: z.boolean().default(false),
    })
  ).default([]),
  footer: z.object({
    copyright: z.string().default("© 2026 Oderinde Stephen. All rights reserved."),
    legalLinks: z.array(
      z.object({
        label: z.string().min(1),
        path: z.string().min(1),
      })
    ).default([
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms" },
    ]),
  }).default({
    copyright: "© 2026 Oderinde Stephen. All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms" },
    ],
  }),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

/**
 * Schema for GET /wp-json/os/v1/resolve
 */
export const PathResolverSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  type: z.enum(["page", "case-study", "post"]),
  template: z.string().min(1),
  title: z.string(),
  status: z.literal("publish"),
});

export type PathResolution = z.infer<typeof PathResolverSchema>;

/**
 * Schema for Case Study ACF custom fields
 */
export const CaseStudyAcfSchema = z.object({
  business_focus: z.string().default(""),
  system_delivered: z.string().default(""),
  verified_outcome: z.string().default(""),
  technology_1: z.string().default(""),
  technology_2: z.string().default(""),
  technology_3: z.string().default(""),
  color: z.string().default("2563eb"),
  live_url: z.string().default(""),
  client_name: z.string().default(""),
  project_type: z.string().default(""),
  hero_screenshot: z.string().default(""),
  rating_value: z.string().default("5.0 / 5.0"),
  rating_source: z.string().default(""),
  review_quote: z.string().default(""),
  review_author: z.string().default(""),
});

export type CaseStudyAcf = z.infer<typeof CaseStudyAcfSchema>;

/**
 * Standard WordPress REST Post schema for /wp/v2/case-study
 */
export const CaseStudySchema = z.object({
  id: z.number().int().positive(),
  slug: z.string(),
  status: z.string().optional().default("publish"),
  date: z.string().optional().default(""),
  modified: z.string().optional().default(""),
  title: z.object({
    rendered: z.string(),
  }),
  excerpt: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }).optional(),
  featured_media: z.number().int().optional(),
  acf: CaseStudyAcfSchema.optional().default({}),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

/**
 * Schema for Blog Article ACF custom fields
 */
export const BlogPostAcfSchema = z.object({
  article_type: z.string().default("Practical Guide"),
  experience_basis: z.string().default("Project-led guidance"),
  last_reviewed: z.string().default(""),
  reading_time: z.string().default("5 min read"),
  related_service_title: z.string().default(""),
  related_service_description: z.string().default(""),
  related_service_url: z.string().default("/business-website-development"),
  review_status: z.string().default("Current and reviewed"),
});

export type BlogPostAcf = z.infer<typeof BlogPostAcfSchema>;

/**
 * Standard WordPress REST Post schema for /wp/v2/posts
 */
export const BlogPostSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string(),
  status: z.string().optional().default("publish"),
  title: z.object({
    rendered: z.string(),
  }),
  excerpt: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }).optional(),
  date: z.string().optional().default(""),
  modified: z.string().optional().default(""),
  featured_media: z.number().int().optional(),
  acf: BlogPostAcfSchema.optional().default({}),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * Public visitor contact form input schema
 */
export const EnquiryInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  service: z.string().min(2, "Please select or describe a service"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  company: z.string().max(100).optional().default(""),
  website: z.string().max(200).optional().default(""),
  budget: z.string().max(50).optional().default(""),
  timeline: z.string().max(50).optional().default(""),
  honeypot: z.string().max(0, "Bot detected").optional().default(""),
  turnstileToken: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof EnquiryInputSchema>;

/**
 * Server-to-server payload forwarded to WordPress /wp-json/os/v1/enquiries
 */
export const CmsEnquiryPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  service: z.string(),
  message: z.string(),
  company: z.string().optional(),
  website: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  submissionKey: z.string().min(8),
});

export type CmsEnquiryPayload = z.infer<typeof CmsEnquiryPayloadSchema>;

/**
 * Schema for Next.js On-Demand ISR Revalidation Webhook
 */
export const RevalidatePayloadSchema = z.object({
  tags: z.array(z.string()).default([]),
  paths: z.array(z.string()).default([]),
  postId: z.number().optional(),
  postType: z.string().optional(),
  slug: z.string().optional(),
});

export type RevalidatePayload = z.infer<typeof RevalidatePayloadSchema>;

/**
 * Standard WordPress REST Page schema for /wp/v2/pages
 */
export const PageAcfSchema = z.object({
  sections: z.array(z.record(z.any())).nullable().optional().transform((v) => v ?? []),
});

export const PageSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string(),
  title: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }).optional(),
  excerpt: z.object({
    rendered: z.string(),
  }).optional(),
  status: z.string().default("publish"),
  acf: z
    .preprocess((val) => (val === null || val === undefined ? {} : val), PageAcfSchema)
    .default({ sections: [] }),
});

export type Page = z.infer<typeof PageSchema>;

/**
 * Contact Form Option Constants
 */
export const SERVICE_OPTIONS = [
  "Business Website Development",
  "E-commerce Development",
  "Website Redesign",
  "Client Portal / Digital Systems",
  "Not Sure Yet",
] as const;

export const BUDGET_OPTIONS = [
  "Not decided yet",
  "Under £500",
  "£500–£1,500",
  "£1,500–£3,500",
  "£3,500+",
] as const;

export const TIMELINE_OPTIONS = [
  "Flexible",
  "As soon as practical",
  "Within 1–2 months",
  "3 months or later",
] as const;
