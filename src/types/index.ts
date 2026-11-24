/**
 * Global TypeScript Interfaces for Handvance Technologies
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ServiceDefinition {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  category: 
    | "Web & Applications"
    | "Mobile & Software"
    | "Design & Creative"
    | "Growth & Marketing"
    | "Enterprise & Advisory";
  features: string[];
  deliverables: string[];
  techStack: string[];
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  clientIndustry: string;
  category: "Web & SaaS" | "Mobile Apps" | "AI & Systems" | "E-Commerce" | "Custom Software";
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  results: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  featured: boolean;
  liveDemoUrl?: string;
  githubUrl?: string;
  coverImageUrl?: string;
  accentColor?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Leadership" | "Engineering" | "AI & Cloud" | "Product & Design";
  bio: string;
  avatarUrl: string;
  skills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface JobOpening {
  id: string;
  slug: string;
  title: string;
  department: "Engineering" | "AI & Machine Learning" | "Product & Design" | "DevOps & Cloud";
  location: string; // e.g. "Remote (Global)" or "San Francisco, CA / Hybrid"
  type: "Full-Time" | "Contract" | "Part-Time";
  experience: "Junior" | "Mid-Level" | "Senior" | "Lead / Staff";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  projectScope: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  keyDeliverables: string[];
  iconName: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  budgetRange?: string;
  message: string;
  createdAt?: string;
}
