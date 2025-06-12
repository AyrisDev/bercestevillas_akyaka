"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface ReviewFormData {
  name: string;
  rating: number;
  villaId: number;
  date: string;
  
  // Multilingual content
  content: {
    tr: {
      comment: string;
    };
    en: {
      comment: string;
    };
  };
}

interface Villa {
  id: number;
  title: string;
  slug: string;
}

interface Props {
  initialData?: Partial<ReviewFormData>;
  onSubmit: (data: ReviewFormData) => Promise<void>;
  loading?: boolean;
  submitText: string;
  villas: Villa[];
}

export default function MultiLanguageReviewForm({ 
  initialData, 
  onSubmit, 
  loading = false, 
  submitText,
  villas
}: Props) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<'tr' | 'en'>('tr');
  const [formData, setFormData] = useState<ReviewFormData>({
    name: initialData?.name || '',
    rating: initialData?.rating || 5,
    villaId: initialData?.villaId || (villas[0]?.id || 0),
    date: initialData?.date || new Date().toLocaleDateString('tr-TR'),
    content: {
      tr: {
        comment: initialData?.content?.tr?.comment || '',
      },
      en: {
        comment: initialData?.content?.en?.comment || '',
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      alert('Lütfen aşağıdaki hataları düzeltin:\n\n' + errors.join('\n'));
      return;
    }
    
    await onSubmit(formData);
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    // Common field validation
    if (!formData.name.trim()) errors.push('İsim zorunludur');
    if (formData.rating < 1 || formData.rating > 5) errors.push('Puan 1-5 arasında olmalıdır');
    if (!formData.villaId) errors.push('Villa seçimi zorunludur');
    
    // Multilingual content validation
    const languages = ['tr', 'en'] as const;
    for (const lang of languages) {
      const content = formData.content[lang];
      const langName = lang === 'tr' ? 'Türkçe' : 'İngilizce';
      
      if (!content.comment.trim()) {
        errors.push(`${langName} yorum metni zorunludur`);
      }
    }
    
    return errors;
  };

  const updateContent = (locale: 'tr' | 'en', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [locale]: {
          ...prev.content[locale],
          [field]: value
        }
      }
    }));
  };

  const getContentCompletionStatus = (locale: 'tr' | 'en') => {
    const content = formData.content[locale];
    const requiredFields = ['comment'];
    const completedFields = requiredFields.filter(field => content[field as keyof typeof content]);
    return {
      completed: completedFields.length,
      total: requiredFields.length,
      isComplete: completedFields.length === requiredFields.length
    };
  };

  const tabs = [
    { id: 'tr' as const, name: 'Türkçe', flag: '🇹🇷' },
    { id: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      {/* Language Tabs */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Yorum İçeriği ({activeTab === 'tr' ? 'Türkçe' : 'English'})
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Her iki dil için de yorum girilmesi zorunludur
            </div>
            {(() => {
              const trStatus = getContentCompletionStatus('tr');
              const enStatus = getContentCompletionStatus('en');
              const allComplete = trStatus.isComplete && enStatus.isComplete;
              return (
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  allComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {allComplete ? '✓ Tüm diller tamamlandı' : 'Eksik içerik var'}
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
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activeTab === tab.id 
                      ? (status.isComplete ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800')
                      : (status.isComplete ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
                  }`}>
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
          <h3 className="text-lg font-medium text-gray-900 mb-4">Genel Bilgiler</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            İsim
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Puan
          </label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option value={1}>1 ⭐</option>
            <option value={2}>2 ⭐⭐</option>
            <option value={3}>3 ⭐⭐⭐</option>
            <option value={4}>4 ⭐⭐⭐⭐</option>
            <option value={5}>5 ⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Villa
          </label>
          <select
            value={formData.villaId}
            onChange={(e) => setFormData(prev => ({ ...prev, villaId: parseInt(e.target.value) }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option value="">Villa seçin</option>
            {villas.map((villa) => (
              <option key={villa.id} value={villa.id}>
                {villa.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Tarih
          </label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="gg.aa.yyyy"
          />
        </div>
      </div>

      {/* Language Specific Content */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {activeTab === 'tr' ? 'Türkçe Yorum' : 'English Comment'}
        </h3>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Yorum Metni
          </label>
          <textarea
            rows={6}
            value={formData.content[activeTab].comment}
            onChange={(e) => updateContent(activeTab, 'comment', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder={activeTab === 'tr' ? 'Türkçe yorum yazın...' : 'Write comment in English...'}
            required
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {(() => {
            const trStatus = getContentCompletionStatus('tr');
            const enStatus = getContentCompletionStatus('en');
            return (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-center">🇹🇷</span>
                  <span>Türkçe: {trStatus.completed}/{trStatus.total}</span>
                  {trStatus.isComplete && <span className="text-green-600">✓</span>}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-center">🇺🇸</span>
                  <span>English: {enStatus.completed}/{enStatus.total}</span>
                  {enStatus.isComplete && <span className="text-green-600">✓</span>}
                </div>
              </div>
            );
          })()}
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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