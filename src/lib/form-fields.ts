import type { FieldSpec } from "@/components/forms/resource-form";

export const experienceFields: FieldSpec[] = [
  { kind: "text", name: "ext_id", label: "ID" },
  { kind: "text", name: "company", label: "Company", required: true },
  { kind: "text", name: "position", label: "Position", required: true },
  { kind: "text", name: "period", label: "Period" },
  { kind: "text", name: "location", label: "Location" },
  { kind: "text", name: "type", label: "Type" },
  { kind: "text", name: "duration", label: "Duration" },
  { kind: "text", name: "mode", label: "Mode" },
  { kind: "text", name: "role", label: "Role" },
  { kind: "number", name: "sort", label: "Sort" },
  { kind: "textarea", name: "summary", label: "Summary" },
  { kind: "array", name: "outcomes", label: "Outcomes", addLabel: "Add outcome" },
  { kind: "array", name: "stack", label: "Stack", addLabel: "Add tech" },
];

const siteOptions = [
  { value: "all", label: "all" },
  { value: "v3", label: "v3" },
  { value: "my", label: "my" },
  { value: "minimal", label: "minimal" },
];

export const skillFields: FieldSpec[] = [
  { kind: "select", name: "site", label: "Site", options: siteOptions },
  { kind: "text", name: "category", label: "Category" },
  { kind: "text", name: "name", label: "Name", required: true },
  { kind: "text", name: "icon_key", label: "Icon key" },
  { kind: "number", name: "sort", label: "Sort" },
];

export const capabilityFields: FieldSpec[] = [
  { kind: "select", name: "site", label: "Site", options: siteOptions },
  { kind: "text", name: "title", label: "Title", required: true },
  { kind: "number", name: "sort", label: "Sort" },
  { kind: "textarea", name: "description", label: "Description" },
  { kind: "array", name: "tags", label: "Tags", addLabel: "Add tag" },
];

export const headerFields: FieldSpec[] = [
  { kind: "select", name: "site", label: "Site", options: siteOptions },
  { kind: "text", name: "section", label: "Section", required: true },
  { kind: "text", name: "left_kicker", label: "Left kicker" },
  { kind: "text", name: "left_title", label: "Left title" },
  { kind: "text", name: "middle_kicker", label: "Middle kicker" },
  { kind: "text", name: "middle_title", label: "Middle title" },
  { kind: "text", name: "right_kicker", label: "Right kicker" },
  { kind: "text", name: "right_title", label: "Right title" },
];

export const profileFields: FieldSpec[] = [
  { kind: "text", name: "name", label: "Name", required: true },
  { kind: "text", name: "role", label: "Role" },
  { kind: "text", name: "location", label: "Location" },
  { kind: "text", name: "email", label: "Email", type: "email" },
  { kind: "text", name: "website", label: "Website" },
  { kind: "image", name: "avatar_url", label: "Avatar" },
  { kind: "textarea", name: "intro", label: "Intro" },
];

export const testimonialFields: FieldSpec[] = [
  { kind: "select", name: "site", label: "Site", options: siteOptions },
  { kind: "text", name: "name", label: "Name", required: true },
  { kind: "text", name: "role", label: "Role" },
  { kind: "number", name: "sort", label: "Sort" },
  { kind: "textarea", name: "quote", label: "Quote" },
  { kind: "image", name: "avatar_url", label: "Avatar" },
];

export const awardFields: FieldSpec[] = [
  { kind: "select", name: "site", label: "Site", options: siteOptions },
  { kind: "text", name: "kind", label: "Kind" },
  { kind: "text", name: "title", label: "Title", required: true },
  { kind: "text", name: "org", label: "Organization" },
  { kind: "text", name: "year", label: "Year" },
  { kind: "number", name: "sort", label: "Sort" },
  { kind: "textarea", name: "description", label: "Description" },
];
