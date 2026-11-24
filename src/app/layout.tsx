import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/utilities/constants";

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
    siteName: BRAND.name,
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
