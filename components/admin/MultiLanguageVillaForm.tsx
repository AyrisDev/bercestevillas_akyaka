"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export interface VillaFormData {
  // Common fields
  slug: string;
  mainImage: string;
  images: string[];
  locationCity: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  currency: string;
  status: string;

  // Multilingual content
  content: {
    tr: {
      title: string;
      description: string;
      shortDescription: string;
      locationTitle: string;
      amenities: string[];
      features: string[];
    };
    en: {
      title: string;
      description: string;
      shortDescription: string;
      locationTitle: string;
      amenities: string[];
      features: string[];
    };
  };
}

interface Props {
  initialData?: Partial<VillaFormData>;
  onSubmit: (data: VillaFormData) => Promise<void>;
  loading?: boolean;
  submitText: string;
}

export default function MultiLanguageVillaForm({
  initialData,
  onSubmit,
  loading = false,
  submitText,
}: Props) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<"tr" | "en">("tr");
  const [formData, setFormData] = useState<VillaFormData>({
    slug: initialData?.slug || "",
    mainImage: initialData?.mainImage || "",
    images: initialData?.images || [],
    locationCity: initialData?.locationCity || "",
    guests: initialData?.guests || 1,
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    pricePerNight: initialData?.pricePerNight || 0,
    currency: initialData?.currency || "TRY",
    status: initialData?.status || "available",
    content: {
      tr: {
        title: initialData?.content?.tr?.title || "",
        description: initialData?.content?.tr?.description || "",
        shortDescription: initialData?.content?.tr?.shortDescription || "",
        locationTitle: initialData?.content?.tr?.locationTitle || "",
        amenities: initialData?.content?.tr?.amenities || [],
        features: initialData?.content?.tr?.features || [],
      },
      en: {
        title: initialData?.content?.en?.title || "",
        description: initialData?.content?.en?.description || "",
        shortDescription: initialData?.content?.en?.shortDescription || "",
        locationTitle: initialData?.content?.en?.locationTitle || "",
        amenities: initialData?.content?.en?.amenities || [],
        features: initialData?.content?.en?.features || [],
      },
    },
  });

  const validateForm = (): string[] => {
    const errors: string[] = [];

    // Common field validation
    if (!formData.slug.trim()) errors.push("Slug (URL) zorunludur");
    if (!formData.mainImage.trim()) errors.push("Ana resim URL zorunludur");
    if (!formData.locationCity.trim()) errors.push("Şehir zorunludur");
    if (formData.guests < 1) errors.push("Misafir sayısı en az 1 olmalıdır");
    if (formData.bedrooms < 1)
      errors.push("Yatak odası sayısı en az 1 olmalıdır");
    if (formData.bathrooms < 1) errors.push("Banyo sayısı en az 1 olmalıdır");
    if (formData.pricePerNight <= 0)
      errors.push("Gecelik fiyat 0'dan büyük olmalıdır");

    // Multilingual content validation
    const languages = ["tr", "en"] as const;
    for (const lang of languages) {
      const content = formData.content[lang];
      const langName = lang === "tr" ? "Türkçe" : "İngilizce";

      if (!content.title.trim()) {
        errors.push(`${langName} villa başlığı zorunludur`);
      }
      if (!content.description.trim()) {
        errors.push(`${langName} detaylı açıklama zorunludur`);
      }
      if (!content.locationTitle.trim()) {
        errors.push(`${langName} konum başlığı zorunludur`);
      }
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      alert("Lütfen aşağıdaki hataları düzeltin:\n\n" + errors.join("\n"));
      return;
    }

    await onSubmit(formData);
  };

  const updateContent = (
    locale: "tr" | "en",
    field: string,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [locale]: {
          ...prev.content[locale],
          [field]: value,
        },
      },
    }));
  };

  const getContentCompletionStatus = (locale: "tr" | "en") => {
    const content = formData.content[locale];
    const requiredFields = ["title", "description", "locationTitle"];
    const completedFields = requiredFields.filter(
      (field) => content[field as keyof typeof content]
    );
    return {
      completed: completedFields.length,
      total: requiredFields.length,
      isComplete: completedFields.length === requiredFields.length,
    };
  };

  const tabs = [
    { id: "tr" as const, name: "Türkçe", flag: "🇹🇷" },
    { id: "en" as const, name: "English", flag: "🇺🇸" },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      {/* Language Tabs - Enhanced */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">
            Villa İçeriği ({activeTab === "tr" ? "Türkçe" : "English"})
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Her iki dil için de içerik girilmesi zorunludur
            </div>
            {(() => {
              const trStatus = getContentCompletionStatus("tr");
              const enStatus = getContentCompletionStatus("en");
              const allComplete = trStatus.isComplete && enStatus.isComplete;
              return (
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    allComplete
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {allComplete ? "✓ Tüm diller tamamlandı" : "Eksik içerik var"}
                </div>
              );
            })()}
          </div>
        </div>
        <nav className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow"
              }`}
            >
              <span className="text-lg">{tab.flag}</span>
              <span>{tab.name}</span>
              {/* Content completion indicator */}
              {(() => {
                const status = getContentCompletionStatus(tab.id);
                return (
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activeTab === tab.id
                        ? status.isComplete
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                        : status.isComplete
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.completed}/{status.total}
                  </div>
                );
              })()}
            </button>
          ))}
        </nav>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Genel Bilgiler
          </h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Slug (URL)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Şehir
          </label>
          <input
            type="text"
            value={formData.locationCity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, locationCity: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Misafir Sayısı
          </label>
          <input
            type="number"
            min="1"
            value={formData.guests}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                guests: parseInt(e.target.value),
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Yatak Odası
          </label>
          <input
            type="number"
            min="1"
            value={formData.bedrooms}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bedrooms: parseInt(e.target.value),
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Banyo
          </label>
          <input
            type="number"
            min="1"
            value={formData.bathrooms}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                bathrooms: parseInt(e.target.value),
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Gecelik Fiyat
          </label>
          <input
            type="number"
            min="0"
            value={formData.pricePerNight}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                pricePerNight: parseInt(e.target.value),
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black mb-2">
            Ana Resim URL
          </label>
          <input
            type="url"
            value={formData.mainImage}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mainImage: e.target.value }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-black mb-2">
            Galeri Resimleri (virgülle ayırın)
          </label>
          <textarea
            rows={3}
            value={formData.images.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                images: e.target.value
                  .split(",")
                  .map((img) => img.trim())
                  .filter(Boolean),
              }))
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>

      {/* Language Specific Content */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {activeTab === "tr" ? "Türkçe İçerik" : "English Content"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Villa Başlığı
            </label>
            <input
              type="text"
              value={formData.content[activeTab].title}
              onChange={(e) =>
                updateContent(activeTab, "title", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Konum Başlığı
            </label>
            <input
              type="text"
              value={formData.content[activeTab].locationTitle}
              onChange={(e) =>
                updateContent(activeTab, "locationTitle", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black mb-2">
              Kısa Açıklama
            </label>
            <textarea
              rows={2}
              value={formData.content[activeTab].shortDescription}
              onChange={(e) =>
                updateContent(activeTab, "shortDescription", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black mb-2">
              Detaylı Açıklama
            </label>
            <textarea
              rows={4}
              value={formData.content[activeTab].description}
              onChange={(e) =>
                updateContent(activeTab, "description", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black mb-2">
              Olanaklar (virgülle ayırın)
            </label>
            <textarea
              rows={2}
              value={formData.content[activeTab].amenities.join(", ")}
              onChange={(e) =>
                updateContent(
                  activeTab,
                  "amenities",
                  e.target.value
                    .split(",")
                    .map((a) => a.trim())
                    .filter(Boolean)
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder={
                activeTab === "tr"
                  ? "WiFi, Klima, Havuz, Barbekü"
                  : "WiFi, Air Conditioning, Pool, BBQ"
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black mb-2">
              Özellikler (virgülle ayırın)
            </label>
            <textarea
              rows={2}
              value={formData.content[activeTab].features.join(", ")}
              onChange={(e) =>
                updateContent(
                  activeTab,
                  "features",
                  e.target.value
                    .split(",")
                    .map((f) => f.trim())
                    .filter(Boolean)
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder={
                activeTab === "tr"
                  ? "Deniz manzarası, Bahçe, Otopark"
                  : "Sea view, Garden, Parking"
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {(() => {
            const trStatus = getContentCompletionStatus("tr");
            const enStatus = getContentCompletionStatus("en");
            return (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-center">🇹🇷</span>
                  <span>
                    Türkçe: {trStatus.completed}/{trStatus.total}
                  </span>
                  {trStatus.isComplete && (
                    <span className="text-green-600">✓</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-center">🇺🇸</span>
                  <span>
                    English: {enStatus.completed}/{enStatus.total}
                  </span>
                  {enStatus.isComplete && (
                    <span className="text-green-600">✓</span>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("common.cancel")}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? t("common.loading") : submitText}
          </button>
        </div>
      </div>
    </form>
  );
}
