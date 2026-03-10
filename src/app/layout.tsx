import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://certs.harsha.dev"),
  title: "My Certifications | Harsha",
  description:
    "A visual showcase of my professional certifications and achievements. Browse, search, and download certificates across various domains.",
  icons: {
    icon: "/assets/icon.jpg",
    apple: "/assets/icon.jpg",
  },
  openGraph: {
    title: "My Certifications | Harsha",
    description:
      "A visual showcase of my professional certifications and achievements.",
    type: "website",
    images: [
      {
        url: "/certs/Fundamentals-of-Responsible-AI.png",
        width: 1200,
        height: 630,
        alt: "My Certifications Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Certifications | Harsha",
    description:
      "A visual showcase of my professional certifications and achievements.",
    images: ["/certs/Fundamentals-of-Responsible-AI.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
