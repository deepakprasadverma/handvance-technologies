import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Engineering Deliverables",
  description:
    "Explore our flagship client deliverables, architecture breakdowns, technology stacks, and performance metrics across SaaS, AI, and enterprise applications.",
  openGraph: {
    title: "Portfolio & Case Studies | Handvance Technologies",
    description:
      "Explore verified software engineering case studies, architecture blueprints, and real performance outcomes built by Handvance.",
    url: "https://handvance-technologies.vercel.app/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | Handvance Technologies",
    description:
      "Explore verified software engineering case studies, architecture blueprints, and real performance outcomes built by Handvance.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
