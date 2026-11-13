import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sansFont = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const monoFont = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Handvance Technologies | Custom Software & AI Development Agency",
  description:
    "Engineering scalable software, distributed cloud systems, and autonomous AI pipelines for forward-thinking enterprises and fast-growing startups.",
  keywords: [
    "AI Development Agency",
    "Custom Software Engineering",
    "Autonomous AI Agents",
    "Distributed Cloud Architecture",
    "Next.js Development",
    "Mobile Apps",
    "SaaS Platforms",
  ],
  authors: [{ name: "Handvance Technologies" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" style={{ colorScheme: "dark" }}>
      <body
        className={`${sansFont.variable} ${monoFont.variable} bg-[#07070B] text-[#94A3B8] font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
