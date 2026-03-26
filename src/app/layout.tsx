import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import ConditionalNavbarWrapper from "./components/ConditionalNavbarWrapper";

const inter = {
  variable: "--font-inter",
};

export const metadata: Metadata = {
  title: {
    default: "PortfolioForge - Build Professional Portfolios in Minutes",
    template: "%s | PortfolioForge",
  },
  description:
    "Create stunning professional portfolios with AI-powered templates. No coding skills needed. Choose from 13+ beautiful templates, customize instantly, and deploy to your own domain. Free forever plan available.",
  keywords: [
    "portfolio builder",
    "portfolio website",
    "professional portfolio",
    "online portfolio",
    "portfolio templates",
    "resume builder",
    "CV builder",
    "personal website",
    "portfolio creator",
    "free portfolio",
    "portfolio maker",
    "developer portfolio",
    "design portfolio",
    "portfolio hosting"
  ],
  authors: [{ name: "PortfolioForge" }],
  creator: "PortfolioForge",
  publisher: "PortfolioForge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolioforge.com",
    title: "PortfolioForge - Build Professional Portfolios in Minutes",
    description: "Create stunning professional portfolios with AI-powered templates. No coding skills needed. Choose from 13+ beautiful templates.",
    siteName: "PortfolioForge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PortfolioForge - Build Professional Portfolios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfolioForge - Build Professional Portfolios in Minutes",
    description: "Create stunning professional portfolios with AI-powered templates. No coding skills needed.",
    images: ["/og-image.png"],
    creator: "@portfolioforge",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://portfolioforge.com",
  },
  metadataBase: new URL("https://portfolioforge.com"),
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PortfolioForge",
              description: "Create stunning professional portfolios with AI-powered templates. No coding skills needed.",
              url: "https://portfolioforge.com",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free forever plan available"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
                bestRating: "5",
                worstRating: "1"
              },
              featureList: [
                "13+ Beautiful Templates",
                "Drag & Drop Builder",
                "Real-time Preview",
                "Custom Domain",
                "SSL Certificate",
                "Analytics Dashboard",
                "Mobile Responsive",
                "SEO Optimized"
              ]
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <Toaster position="bottom-right" theme="dark" richColors />
          <ConditionalNavbarWrapper>
            {children}
          </ConditionalNavbarWrapper>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
