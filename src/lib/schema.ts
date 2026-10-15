import { z } from "zod";

export const projectInputSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "lowercase, digits, dashes only"),
  title: z.string().trim().min(1),
  role: z.string().trim().default(""),
  subtitle: z.string().trim().optional(),
  description: z.string().trim().default(""),
  impact: z.string().trim().optional(),
  highlights: z.array(z.string().trim().min(1)).default([]),
  tech: z.array(z.string().trim().min(1)).default([]),
  github: z.string().trim().default(""),
  live: z.string().trim().default(""),
  image_url: z.string().trim().default(""),
  featured: z.boolean().default(false),
  year: z.string().trim().default(""),
  category: z.string().trim().optional(),
  status: z.string().trim().optional(),
  sort: z.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

const siteEnum = z.enum(["v3", "my", "minimal", "all"]);

export const experienceInputSchema = z.object({
  ext_id: z.string().trim().optional(),
  company: z.string().trim().min(1),
  position: z.string().trim().min(1),
  period: z.string().trim().default(""),
  location: z.string().trim().default(""),
  type: z.string().trim().default(""),
  duration: z.string().trim().default(""),
  mode: z.string().trim().default(""),
  role: z.string().trim().default(""),
  summary: z.string().trim().default(""),
  outcomes: z.array(z.string().trim().min(1)).default([]),
  stack: z.array(z.string().trim().min(1)).default([]),
  sort: z.number().int().default(0),
});

export const skillInputSchema = z.object({
  site: siteEnum.default("all"),
  category: z.string().trim().default(""),
  name: z.string().trim().min(1),
  icon_key: z.string().trim().default(""),
  sort: z.number().int().default(0),
});

export const capabilityInputSchema = z.object({
  site: siteEnum.default("all"),
  title: z.string().trim().min(1),
  description: z.string().trim().default(""),
  tags: z.array(z.string().trim().min(1)).default([]),
  sort: z.number().int().default(0),
});

export const headerInputSchema = z.object({
  site: siteEnum,
  section: z.string().trim().min(1),
  left_kicker: z.string().trim().default(""),
  left_title: z.string().trim().default(""),
  middle_kicker: z.string().trim().default(""),
  middle_title: z.string().trim().default(""),
  right_kicker: z.string().trim().default(""),
  right_title: z.string().trim().default(""),
});

export const profileInputSchema = z.object({
  name: z.string().trim().min(1),
  role: z.string().trim().default(""),
  location: z.string().trim().default(""),
  email: z.string().trim().email().or(z.literal("")).default(""),
  website: z.string().trim().default(""),
  avatar_url: z.string().trim().default(""),
  intro: z.string().trim().default(""),
  socials: z.record(z.string(), z.string()).default({}),
});

export const testimonialInputSchema = z.object({
  site: siteEnum.default("all"),
  name: z.string().trim().min(1),
  role: z.string().trim().default(""),
  quote: z.string().trim().min(1),
  avatar_url: z.string().trim().default(""),
  sort: z.number().int().default(0),
});

export const awardInputSchema = z.object({
  site: siteEnum.default("all"),
  kind: z.string().trim().default(""),
  title: z.string().trim().min(1),
  org: z.string().trim().default(""),
  year: z.string().trim().default(""),
  description: z.string().trim().default(""),
  sort: z.number().int().default(0),
});

export type ExperienceInput = z.infer<typeof experienceInputSchema>;
export type SkillInput = z.infer<typeof skillInputSchema>;
export type CapabilityInput = z.infer<typeof capabilityInputSchema>;
export type HeaderInput = z.infer<typeof headerInputSchema>;
export type ProfileInput = z.infer<typeof profileInputSchema>;
export type TestimonialInput = z.infer<typeof testimonialInputSchema>;
export type AwardInput = z.infer<typeof awardInputSchema>;
export type Site = z.infer<typeof siteEnum>;
