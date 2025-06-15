import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  
  const pageUrl = `https://berceste.com/${locale}/${locale === 'tr' ? 'gizlilik' : 'privacy'}`;
  
  return {
    title: t("title"),
    description: t("intro.content"),
    alternates: {
      canonical: pageUrl,
      languages: {
        en: "https://berceste.com/en/privacy",
        tr: "https://berceste.com/tr/gizlilik",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-[#141b22] text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#24b6b6]">
          {t('title')}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('intro.title')}</h2>
            <p className="mb-4">{t('intro.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('collection.title')}</h2>
            <p className="mb-4">{t('collection.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('collection.personal')}</li>
              <li>{t('collection.contact')}</li>
              <li>{t('collection.reservation')}</li>
              <li>{t('collection.technical')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('usage.title')}</h2>
            <p className="mb-4">{t('usage.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('usage.services')}</li>
              <li>{t('usage.communication')}</li>
              <li>{t('usage.improvement')}</li>
              <li>{t('usage.legal')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('sharing.title')}</h2>
            <p className="mb-4">{t('sharing.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('security.title')}</h2>
            <p className="mb-4">{t('security.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('rights.title')}</h2>
            <p className="mb-4">{t('rights.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('rights.access')}</li>
              <li>{t('rights.correction')}</li>
              <li>{t('rights.deletion')}</li>
              <li>{t('rights.portability')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('cookies.title')}</h2>
            <p className="mb-4">{t('cookies.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('contact.title')}</h2>
            <p className="mb-4">{t('contact.content')}</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="mb-2"><strong>Email:</strong> info@berceste.com</p>
              <p className="mb-2"><strong>Telefon:</strong> +90 XXX XXX XX XX</p>
              <p><strong>Adres:</strong> Türkiye</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('changes.title')}</h2>
            <p className="mb-4">{t('changes.content')}</p>
          </section>

          <div className="text-center text-gray-400 mt-12">
            <p>{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}