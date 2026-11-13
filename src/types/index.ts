export type ServiceCategory = "web" | "ai" | "mobile" | "design" | "cloud";

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  features: string[];
  metrics: {
    label: string;
    value: string;
  };
  technologies: string[];
}

export type CaseStudyFilter = "all" | "web" | "ai" | "mobile";

export interface CaseStudy {
  id: string;
  title: string;
  clientIndustry: string;
  category: "web" | "ai" | "mobile";
  categoryLabel: string;
  tagline: string;
  problem: string;
  solution: string;
  impactMetrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  techStack: string[];
  mockupAccent: "indigo" | "cyan" | "violet" | "emerald";
  architectureType: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: string;
}

export interface TechItem {
  name: string;
  level: string;
  iconName: string;
  color: string;
}

export interface TechCategory {
  title: string;
  badge: string;
  description: string;
  items: TechItem[];
}

export interface EstimatorState {
  services: string[];
  tier: "mvp" | "growth" | "enterprise";
  timeline: "accelerated" | "standard" | "flexible";
  name: string;
  email: string;
  company: string;
  projectOverview: string;
}
