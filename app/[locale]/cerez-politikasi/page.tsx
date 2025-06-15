import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

interface CookiePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CookiePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookies" });
  
  const pageUrl = `https://berceste.com/${locale}/${locale === 'tr' ? 'cerez-politikasi' : 'cookies'}`;
  
  return {
    title: t("title"),
    description: t("intro.content"),
    alternates: {
      canonical: pageUrl,
      languages: {
        en: "https://berceste.com/en/cookies",
        tr: "https://berceste.com/tr/cerez-politikasi",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CookiePolicyPage() {
  const t = useTranslations('cookies');

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
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('what.title')}</h2>
            <p className="mb-4">{t('what.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('types.title')}</h2>
            <div className="space-y-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-[#24b6b6]">{t('types.essential.title')}</h3>
                <p className="mb-2">{t('types.essential.content')}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('types.essential.session')}</li>
                  <li>{t('types.essential.security')}</li>
                  <li>{t('types.essential.preferences')}</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-[#24b6b6]">{t('types.performance.title')}</h3>
                <p className="mb-2">{t('types.performance.content')}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('types.performance.analytics')}</li>
                  <li>{t('types.performance.usage')}</li>
                  <li>{t('types.performance.optimization')}</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-[#24b6b6]">{t('types.functional.title')}</h3>
                <p className="mb-2">{t('types.functional.content')}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('types.functional.language')}</li>
                  <li>{t('types.functional.remember')}</li>
                  <li>{t('types.functional.personalization')}</li>
                </ul>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-[#24b6b6]">{t('types.marketing.title')}</h3>
                <p className="mb-2">{t('types.marketing.content')}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('types.marketing.tracking')}</li>
                  <li>{t('types.marketing.advertising')}</li>
                  <li>{t('types.marketing.social')}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('thirdparty.title')}</h2>
            <p className="mb-4">{t('thirdparty.content')}</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Google Analytics:</strong> {t('thirdparty.analytics')}</li>
                <li><strong>Google Maps:</strong> {t('thirdparty.maps')}</li>
                <li><strong>Facebook Pixel:</strong> {t('thirdparty.facebook')}</li>
                <li><strong>WhatsApp:</strong> {t('thirdparty.whatsapp')}</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('manage.title')}</h2>
            <p className="mb-4">{t('manage.content')}</p>
            
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[#24b6b6]">{t('manage.browser.title')}</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Chrome:</strong> {t('manage.browser.chrome')}</li>
                <li><strong>Firefox:</strong> {t('manage.browser.firefox')}</li>
                <li><strong>Safari:</strong> {t('manage.browser.safari')}</li>
                <li><strong>Edge:</strong> {t('manage.browser.edge')}</li>
              </ul>
            </div>

            <div className="bg-yellow-900 border border-yellow-600 p-4 rounded-lg">
              <p className="text-yellow-200">{t('manage.warning')}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('retention.title')}</h2>
            <p className="mb-4">{t('retention.content')}</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>{t('retention.session.title')}:</strong> {t('retention.session.duration')}</li>
                <li><strong>{t('retention.persistent.title')}:</strong> {t('retention.persistent.duration')}</li>
                <li><strong>{t('retention.analytics.title')}:</strong> {t('retention.analytics.duration')}</li>
                <li><strong>{t('retention.marketing.title')}:</strong> {t('retention.marketing.duration')}</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('consent.title')}</h2>
            <p className="mb-4">{t('consent.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('consent.continuing')}</li>
              <li>{t('consent.banner')}</li>
              <li>{t('consent.settings')}</li>
              <li>{t('consent.withdraw')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('updates.title')}</h2>
            <p className="mb-4">{t('updates.content')}</p>
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

          <div className="text-center text-gray-400 mt-12">
            <p>{t('lastUpdated')}: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}