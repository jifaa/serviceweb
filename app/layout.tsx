import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Al Ghifari — Freelance Web Developer",
  description:
    "Mahasiswa Teknik Informatika yang membantu mewujudkan website dan aplikasi sesuai kebutuhan Anda. Terbuka untuk project freelance dengan teknologi modern.",
  keywords: [
    "freelance web developer",
    "web development",
    "react developer",
    "next.js developer",
    "landing page",
    "website creation",
  ],
  authors: [{ name: "Al Ghifari" }],
  openGraph: {
    title: "Al Ghifari — Freelance Web Developer",
    description:
      "Mahasiswa Teknik Informatika yang membantu mewujudkan website dan aplikasi sesuai kebutuhan Anda.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn(rubik.className, rubik.variable)}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
