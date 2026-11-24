/**
 * Handvance Technologies Brand Constants
 */
export const BRAND = {
  name: "Handvance Technologies",
  shortName: "Handvance",
  legalName: "Handvance Technologies Inc.",
  tagline: "Engineering Scalable Software & Intelligent Systems",
  description:
    "Handvance Technologies is a premium IT services and software development brand delivering modern cloud platforms, enterprise architectures, and intelligent systems.",
  contactEmail: "hello@handvancetechnologies.com",
  phone: "+1 (800) 555-0199",
  address: "San Francisco, CA & Global Distributed Engineering",
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
  { label: "Contact", href: "/contact" },
] as const;
