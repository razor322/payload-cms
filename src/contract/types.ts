export type ContractProject = {
  slug: string;
  title: string;
  role: string;
  subtitle?: string;
  description: string;
  impact?: string;
  highlights: string[];
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  year: string;
  period?: { start: string; end?: string };
  category?: string;
  status?: string;
};

export type ContractExperience = {
  id: string; company: string; position: string; period: string;
  location: string; type: string; duration: string; mode: string; role: string;
  summary: string; outcomes: string[]; stack: string[];
  periodRange?: { start: string; end?: string };
};

export type ContractCompanyPosition = {
  id: string;
  title: string;
  period?: { start: string; end?: string };
  employmentType: string;
  description: string;
  skills: string[];
};

export type ContractCompany = {
  id: string;
  company: string;
  companyWebsite: string;
  companyIcon: string;
  isCurrent: boolean;
  positions: ContractCompanyPosition[];
};

export type ContractCapability = {
  id: string; title: string; description: string; tags: string[];
};
export type ContractSkill = { id: string; category: string; name: string; iconKey: string };
export type ContractTerminalLine = {
  id: string; text: string; delay: number; colorClass: string;
  bold: boolean; isCursor: boolean;
  kind: "line" | "command" | "output";
  outputFor: string;
};
export type ContractTestimonial = {
  id: string; name: string; role: string; quote: string; avatar: string;
};
export type ContractAward = {
  id: string; kind: string; title: string; org: string; year: string; description: string;
};

export type ContractEducation = {
  id: string;
  institution: string;
  degree: string;
  gpa: string;
  period?: { start: string; end?: string };
  description?: string;
  skills: string[];
};

export type ContractCertification = {
  id: string;
  title: string;
  issuer: string;
  issuerIcon: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
};

export type ContractOrganization = {
  id: string;
  company: string;
  position: string;
  period?: { start: string; end?: string };
  description: string;
  skills: string[];
};

export type ContractLanguage = { id: string; name: string; level: string };
export type ContractProfile = {
  name: string; role: string; location: string; email: string; website: string;
  avatar: string; intro: string; socials: Record<string, string>;
  languages: { name: string; level: string }[];
  documents: { label: string; href: string }[];
};

export type ContractSiteContent = {
  site: string;
  hero: {
    kicker: string;
    titleLines: string[];
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
    techStack: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  about: {
    subtitle: string;
    portrait: string;
    portraitAlt: string;
    location: string;
  };
  contact: {
    kicker: string;
    heading: string;
    body: string;
    email: string;
    whatsapp: string;
  };
};

export type ContractPayload = {
  profile: ContractProfile;
  siteContent: ContractSiteContent;
  projects: ContractProject[];
  experiences: ContractExperience[];
  companies: ContractCompany[];
  capabilities: ContractCapability[];
  skills: ContractSkill[];
  terminal_lines: ContractTerminalLine[];
  testimonials: ContractTestimonial[];
  awards: ContractAward[];
  education: ContractEducation[];
  certifications: ContractCertification[];
  organizations: ContractOrganization[];
  languages: ContractLanguage[];
};
