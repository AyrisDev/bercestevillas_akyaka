import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://berceste.com"),
  title: {
    template: "%s | Berceste",
    default: "Berceste - Villa Rental & Holiday Homes",
  },
  description: "Discover luxury villa rentals in Turkey's most beautiful locations. Premium holiday homes with private pools, stunning views, and exceptional amenities.",
  keywords: [
    "villa rental",
    "holiday homes",
    "Turkey vacation",
    "luxury accommodation",
    "private pool",
    "villa kiralama",
    "tatil villası",
    "Türkiye tatil",
    "lüks konaklama",
  ],
  authors: [{ name: "Berceste" }],
  creator: "Ayris.Tech",
  publisher: "Berceste",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://berceste.com",
    siteName: "Berceste",
    title: "Berceste - Luxury Villa Rentals in Turkey",
    description: "Discover luxury villa rentals in Turkey's most beautiful locations. Premium holiday homes with private pools, stunning views, and exceptional amenities.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Berceste - Luxury Villa Rentals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Berceste - Luxury Villa Rentals in Turkey",
    description: "Discover luxury villa rentals in Turkey's most beautiful locations. Premium holiday homes with private pools, stunning views, and exceptional amenities.",
    images: ["/og-image.jpg"],
    creator: "@berceste",
    site: "@berceste",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
