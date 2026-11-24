import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise IT Services & Engineering Capabilities",
  description:
    "Explore our full suite of digital engineering capabilities: full-stack web applications, mobile apps, enterprise cloud architecture, UI/UX systems, and bespoke IT solutions.",
  openGraph: {
    title: "Enterprise IT Services | Handvance Technologies",
    description:
      "Full-stack software engineering, cloud systems, and modern digital product architecture crafted for high-growth enterprises.",
    url: "https://handvance-technologies.vercel.app/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise IT Services | Handvance Technologies",
    description:
      "Full-stack software engineering, cloud systems, and modern digital product architecture crafted for high-growth enterprises.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
