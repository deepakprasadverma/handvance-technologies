import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Open Positions | Join Handvance",
  description:
    "Explore open software engineering, cloud architecture, and product design positions at Handvance Technologies. Remote-first culture, global compensation, and high-impact engineering.",
  openGraph: {
    title: "Careers at Handvance Technologies | Engineering Opportunities",
    description:
      "Join a high-performance team of distributed systems engineers and product craftspeople building next-generation technology systems.",
    url: "https://handvance-technologies.vercel.app/careers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Handvance Technologies | Engineering Opportunities",
    description:
      "Join a high-performance team of distributed systems engineers and product craftspeople building next-generation technology systems.",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
