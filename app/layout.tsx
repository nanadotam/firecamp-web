import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import site from "@/content/site.json";

const unbounded = localFont({
  src: "../public/fonts/Unbounded-SemiBold.ttf",
  variable: "--font-unbounded",
  display: "swap",
  weight: "600",
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.og_image],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.og_image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${unbounded.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
