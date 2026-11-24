/**
 * Handvance Technologies Brand Constants & Design Tokens
 */
export const BRAND = {
  name: "Handvance Technologies",
  shortName: "Handvance",
  legalName: "Handvance Technologies Inc.",
  tagline: "Engineering Scalable Software & Intelligent Systems",
  description:
    "Handvance Technologies is a modern, premium IT services and custom software engineering agency. We partner with ambitious enterprises and fast-growth startups to architect resilient cloud platforms, autonomous AI systems, and high-velocity digital products.",
  contactEmail: "hello@handvancetechnologies.com",
  phone: "+1 (800) 555-0199",
  address: "100 Pine Street, Suite 1250, San Francisco, CA 94111",
  colors: {
    primaryNavy: "#101D36",
    electricCyan: "#13CDEB",
    white: "#FFFFFF",
    lightGrey: "#F5F7FA",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_SERVICES = [
  { label: "Website Development", href: "/services#website-development" },
  { label: "Web Application Engineering", href: "/services#web-application-development" },
  { label: "Mobile App Development", href: "/services#mobile-app-development" },
  { label: "Custom Software Engineering", href: "/services#software-development" },
  { label: "UI/UX Product Engineering", href: "/services#ui-ux-design" },
  { label: "IT Consulting & Advisory", href: "/services#it-consulting" },
] as const;

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { name: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { name: "GitHub", href: "https://github.com", icon: "Github" },
  { name: "YouTube", href: "https://youtube.com", icon: "Youtube" },
] as const;
