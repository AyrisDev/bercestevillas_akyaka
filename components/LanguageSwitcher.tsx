"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/config";

const flags = {
  en: "🇺🇸",
  tr: "🇹🇷",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      {routing.locales.map((lng) => (
        <button
          key={lng}
          onClick={() => handleLanguageChange(lng)}
          className={`w-10 h-8 rounded-md transition-all duration-200 flex items-center justify-center text-xl hover:scale-110 ${
            locale === lng 
              ? "bg-[#24b6b6] shadow-md" 
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          title={lng === 'tr' ? 'Türkçe' : 'English'}
          aria-label={lng === 'tr' ? 'Türkçe' : 'English'}
        >
          {flags[lng as keyof typeof flags]}
        </button>
      ))}
    </div>
  );
}