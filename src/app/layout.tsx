import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WebVitalsReporter } from "@/components/analytics/web-vitals-reporter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hello Next.js 16 - Modern Web Development Boilerplate",
    template: "%s | Hello Next.js 16",
  },
  description:
    "A production-ready Next.js 16 boilerplate with Auth.js, Prisma, Tailwind CSS, TanStack Form, and Zod validation.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Auth.js",
    "Prisma",
    "TanStack Form",
    "Zod",
  ],
  authors: [{ name: "Hello Next.js 16" }],
  creator: "Hello Next.js 16",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://hello-nextjs16.vercel.app",
    title: "Hello Next.js 16 - Modern Web Development Boilerplate",
    description:
      "A production-ready Next.js 16 boilerplate with Auth.js, Prisma, Tailwind CSS, TanStack Form, and Zod validation.",
    siteName: "Hello Next.js 16",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Next.js 16",
    description:
      "A production-ready Next.js 16 boilerplate with Auth.js, Prisma, Tailwind CSS, TanStack Form, and Zod validation.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* Web Vitals 성능 모니터링 */}
        <WebVitalsReporter />
      </body>
    </html>
  );
}
