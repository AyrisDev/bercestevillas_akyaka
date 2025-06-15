import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  
  const pageUrl = `https://berceste.com/${locale}/${locale === 'tr' ? 'kullanim-sartlari' : 'terms'}`;
  
  return {
    title: t("title"),
    description: t("acceptance.content"),
    alternates: {
      canonical: pageUrl,
      languages: {
        en: "https://berceste.com/en/terms",
        tr: "https://berceste.com/tr/kullanim-sartlari",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TermsOfUsePage() {
  const t = useTranslations('terms');

  return (
    <div className="min-h-screen bg-[#141b22] text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#24b6b6]">
          {t('title')}
        </h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('acceptance.title')}</h2>
            <p className="mb-4">{t('acceptance.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('services.title')}</h2>
            <p className="mb-4">{t('services.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('services.reservation')}</li>
              <li>{t('services.information')}</li>
              <li>{t('services.support')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('user.title')}</h2>
            <p className="mb-4">{t('user.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('user.accurate')}</li>
              <li>{t('user.lawful')}</li>
              <li>{t('user.respectful')}</li>
              <li>{t('user.security')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('reservations.title')}</h2>
            <p className="mb-4">{t('reservations.content')}</p>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2 text-[#24b6b6]">{t('reservations.policy.title')}</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>{t('reservations.policy.confirmation')}</li>
                <li>{t('reservations.policy.payment')}</li>
                <li>{t('reservations.policy.cancellation')}</li>
                <li>{t('reservations.policy.checkin')}</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('payment.title')}</h2>
            <p className="mb-4">{t('payment.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('payment.methods')}</li>
              <li>{t('payment.currency')}</li>
              <li>{t('payment.taxes')}</li>
              <li>{t('payment.refunds')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('cancellation.title')}</h2>
            <p className="mb-4">{t('cancellation.content')}</p>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <ul className="list-disc list-inside space-y-2">
                <li>{t('cancellation.before30')}</li>
                <li>{t('cancellation.before15')}</li>
                <li>{t('cancellation.before7')}</li>
                <li>{t('cancellation.after7')}</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('property.title')}</h2>
            <p className="mb-4">{t('property.content')}</p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>{t('property.respect')}</li>
              <li>{t('property.damage')}</li>
              <li>{t('property.rules')}</li>
              <li>{t('property.capacity')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('liability.title')}</h2>
            <p className="mb-4">{t('liability.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('intellectual.title')}</h2>
            <p className="mb-4">{t('intellectual.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('termination.title')}</h2>
            <p className="mb-4">{t('termination.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#24b6b6]">{t('governing.title')}</h2>
            <p className="mb-4">{t('governing.content')}</p>
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