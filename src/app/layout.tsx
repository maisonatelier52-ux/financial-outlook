// app/layout.tsx 
import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.financialoutlook.xyz"),
  title: {
    default: "Financial Outlook – Business, Wealth & Markets News 2025",
    template: "%s – Business & Wealth Markets",
  },
  description: "Financial Outlook delivers trusted business and wealth news: stock markets, crypto, billionaire moves, investing strategies, real estate, fintech, and global economy – updated daily 2025.",
  keywords: [
    "financial outlook",
    "business news 2025",
    "wealth management",
    "stock market",
    "financial outlook",
    "crypto news",
    "billionaires",
    "investing",
    "real estate",
    "fintech",
    "economy",
  ].join(", "),

  openGraph: {
    title: "Financial Outlook – Business & Wealth News 2025",
    description: "Your #1 source for financial markets, business trends, and wealth creation strategies – updated daily.",
    url: "https://www.financialoutlook.xyz",
    siteName: "Financial Outlook",
    images: [
      {
        url: "/images/fin-favIcon2.svg",
        width: 1200,
        height: 630,
        alt: "Financial Outlook – Business, Wealth & Markets 2025",
      },
    ],
    locale: "en_US",
    determiner: "the",
  },

  twitter: {
    card: "summary_large_image",
    title: "Financial Outlook – Business, Wealth & Markets News 2025",
    description: "Financial Outlook delivers trusted business and wealth news: stock markets, crypto, billionaire moves, investing strategies, real estate, fintech, and global economy – updated daily 2025.",
    images: ["/images/fin-favIcon2.svg"],
    creator: "@FinancialOutlook",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: { 
    icon: "/images/fin-favIcon2.ico"
  },

  alternates: {
    canonical: "https://www.financialoutlook.xyz",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>



        <meta name="google-site-verification" content="bR-eiO8rI3epTbJIowoHjcJcjkDw-65UGbGr6deTk_0" />
        
        {/* Essential Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="language" content="English" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Link Elements */}
        <link rel="icon" href="/images/fin-favIcon3.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/fin-favIcon3.ico" />
        <link rel="canonical" href="https://www.financialoutlook.xyz" />
        <link rel="alternate" type="application/rss+xml" title="Financial Outlook RSS Feed" href="https://www.financialoutlook.xyz/rss.xml" />
        
        {/* DNS Prefetch and Preconnect */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      </head>
      <body className="bg-black text-white antialiased max-w-7xl mx-auto">
        {children}
      </body>
    </html>
  );
}