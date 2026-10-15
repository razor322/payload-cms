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
  category?: string;
  status?: string;
};

export type ContractExperience = {
  id: string; company: string; position: string; period: string;
  location: string; type: string; duration: string; mode: string; role: string;
  summary: string; outcomes: string[]; stack: string[];
};

export type ContractCapability = {
  id: string; title: string; description: string; tags: string[];
};
export type ContractSkill = { id: string; category: string; name: string; iconKey: string };
export type ContractTerminalLine = {
  id: string; text: string; delay: number; colorClass: string;
  bold: boolean; isCursor: boolean;
};
export type ContractTestimonial = {
  id: string; name: string; role: string; quote: string; avatar: string;
};
export type ContractAward = {
  id: string; kind: string; title: string; org: string; year: string; description: string;
};
export type ContractProfile = {
  name: string; role: string; location: string; email: string; website: string;
  avatar: string; intro: string; socials: Record<string, string>;
};

export type ContractPayload = {
  profile: ContractProfile;
  projects: ContractProject[];
  experiences: ContractExperience[];
  capabilities: ContractCapability[];
  skills: ContractSkill[];
  terminal_lines: ContractTerminalLine[];
  testimonials: ContractTestimonial[];
  awards: ContractAward[];
};
