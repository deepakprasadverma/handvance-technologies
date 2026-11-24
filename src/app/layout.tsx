import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/utilities/constants";
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} | IT Services & Software Development`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "IT Services",
    "Custom Software Development",
    "Cloud Architecture",
    "Enterprise Solutions",
    "Handvance Technologies",
    "Web Application Engineering",
    "Mobile App Development",
    "AI Systems",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  metadataBase: new URL("https://handvance-technologies.vercel.app"),
  openGraph: {
    title: `${BRAND.name} | IT Services & Software Development`,
    description: BRAND.description,
    url: "https://handvance-technologies.vercel.app",
    siteName: BRAND.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Handvance Technologies Enterprise Software Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | IT Services & Software Development`,
    description: BRAND.description,
    creator: "@handvancetech",
    images: ["https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#101D36",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-lightGrey text-navy font-sans antialiased selection:bg-cyan-brand/20 selection:text-navy min-h-screen">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
