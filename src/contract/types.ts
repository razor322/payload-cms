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
