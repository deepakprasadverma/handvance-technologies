import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Project Consultation | Handvance Technologies",
  description:
    "Get in touch with our solutions engineering team for inquiries, software architecture consultations, and project scoping estimates.",
  openGraph: {
    title: "Contact Handvance Technologies | Enterprise Technical Consultation",
    description:
      "Schedule a technical discovery session or request a custom architectural quotation for your enterprise software roadmap.",
    url: "https://handvance-technologies.vercel.app/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Handvance Technologies | Enterprise Technical Consultation",
    description:
      "Schedule a technical discovery session or request a custom architectural quotation for your enterprise software roadmap.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
