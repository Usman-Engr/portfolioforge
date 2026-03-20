import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

const inter = {
  variable: "--font-inter",
};

export const metadata: Metadata = {
  title: "PortfolioForge - Build Your Portfolio in Minutes",
  description:
    "Create a stunning professional portfolio with just a few clicks. No design skills needed.",
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <Toaster position="bottom-right" theme="dark" richColors />
          <Navbar />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
