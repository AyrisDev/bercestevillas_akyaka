"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { routing } from "@/i18n/config";

const flags = {
  en: "🇺🇸",
  tr: "🇹🇷",
};

const languages = {
  en: "EN",
  tr: "TR",
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
      >
        <span className="text-lg">{flags[locale as keyof typeof flags]}</span>
        <span className="text-sm font-medium">
          {languages[locale as keyof typeof languages]}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-20">
            {routing.locales.map((lng) => (
              <button
                key={lng}
                onClick={() => handleLanguageChange(lng)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-600 transition-colors first:rounded-t-md last:rounded-b-md ${
                  locale === lng ? "bg-gray-600" : ""
                }`}
              >
                <span className="text-lg">
                  {flags[lng as keyof typeof flags]}
                </span>
                <span className="text-sm font-medium text-white">
                  {languages[lng as keyof typeof languages]}
                </span>
                {locale === lng && (
                  <svg
                    className="w-4 h-4 ml-auto text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
