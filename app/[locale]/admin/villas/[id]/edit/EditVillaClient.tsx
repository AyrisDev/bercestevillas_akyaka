"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiLanguageVillaForm from "@/components/admin/MultiLanguageVillaForm";
import { VillaWithContent } from "@/lib/villa-content";

interface VillaFormData {
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
  villa: VillaWithContent;
  locale: string;
}

export default function EditVillaClient({ villa, locale }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Convert villa data to form format
  const getInitialFormData = (): Partial<VillaFormData> => {
    // Get content for both languages
    const trContent = villa.content?.find(c => c.locale === 'tr');
    const enContent = villa.content?.find(c => c.locale === 'en');

    return {
      slug: villa.slug,
      mainImage: villa.mainImage,
      images: villa.images,
      locationCity: villa.locationCity,
      guests: villa.guests,
      bedrooms: villa.bedrooms,
      bathrooms: villa.bathrooms,
      pricePerNight: villa.pricePerNight,
      currency: villa.currency,
      status: villa.status,
      content: {
        tr: {
          title: trContent?.title || villa.title || '',
          description: trContent?.description || villa.description || '',
          shortDescription: trContent?.shortDescription || villa.shortDescription || '',
          locationTitle: trContent?.locationTitle || villa.locationTitle || '',
          amenities: trContent?.amenities || villa.amenities || [],
          features: trContent?.features || villa.features || [],
        },
        en: {
          title: enContent?.title || '',
          description: enContent?.description || '',
          shortDescription: enContent?.shortDescription || '',
          locationTitle: enContent?.locationTitle || '',
          amenities: enContent?.amenities || [],
          features: enContent?.features || [],
        }
      }
    };
  };

  const handleSubmit = async (data: VillaFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/villas/${villa.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/villas`);
      } else {
        const error = await response.json();
        alert(`Villa güncellenirken hata oluştu: ${error.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error("Villa update error:", error);
      alert("Villa güncellenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Villa Düzenle</h1>
      
      <MultiLanguageVillaForm
        initialData={getInitialFormData()}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Villa Güncelle"
      />
    </div>
  );
}