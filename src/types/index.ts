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
  title: string;
  description: string;
  category: "custom-software" | "cloud-systems" | "ai-automation" | "mobile-apps" | "ui-ux";
  icon: string;
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
  company?: string;
  serviceInterest?: string;
  message: string;
  createdAt: string;
}
