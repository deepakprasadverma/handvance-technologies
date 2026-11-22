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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  quote: string;
  metric: {
    label: string;
    value: string;
  };
  highlightTech: string;
}

export interface WorkflowNode {
  id: string;
  label: string;
  type: "input" | "agent" | "storage" | "guardrail" | "output";
  description: string;
  latencyMs: number;
  status: "idle" | "running" | "completed";
}

export interface WorkflowSimulation {
  id: string;
  title: string;
  tagline: string;
  domain: string;
  inputPrompt: string;
  targetModel: string;
  nodes: WorkflowNode[];
  estimatedCostPerRun: string;
  totalLatency: string;
  outputPayload: {
    status: string;
    actionTaken: string;
    consensusScore: number;
    summary: string;
  };
}

export interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Capabilities" | "Actions" | "Resources";
  subtitle?: string;
  href?: string;
  action?: () => void;
  iconName: string;
}
