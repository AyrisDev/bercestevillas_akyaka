import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HtmlLangSetter from "@/components/HtmlLangSetter";
import type { Metadata } from "next";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  const isEnglish = locale === "en";
  const siteUrl = `https://berceste.com/${locale}`;
  
  return {
    title: t("title"),
    description: t("description"),
    keywords: isEnglish 
      ? [
          "villa rental Turkey",
          "luxury holiday homes",
          "private pool villas",
          "Turkey vacation rentals",
          "boutique accommodation",
          "premium villas",
          "holiday rental",
          "vacation homes Turkey",
        ]
      : [
          "villa kiralama",
          "tatil villası",
          "lüks villa",
          "özel havuzlu villa", 
          "Türkiye tatil",
          "villa tatil",
          "konaklama",
          "tatil evi",
        ],
    alternates: {
      canonical: siteUrl,
      languages: {
        en: "https://berceste.com/en",
        tr: "https://berceste.com/tr",
        "x-default": "https://berceste.com/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteUrl,
      siteName: t("name"),
      locale: isEnglish ? "en_US" : "tr_TR",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLangSetter />
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
