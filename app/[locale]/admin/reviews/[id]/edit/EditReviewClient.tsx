"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiLanguageReviewForm from "@/components/admin/MultiLanguageReviewForm";
import { ReviewWithContent } from "@/lib/review-content";

interface ReviewFormData {
  name: string;
  rating: number;
  villaId: number;
  date: string;
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
  review: ReviewWithContent;
  villas: Villa[];
  locale: string;
}

export default function EditReviewClient({ review, villas, locale }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Convert review data to form format
  const getInitialFormData = (): Partial<ReviewFormData> => {
    // Get content for both languages
    const trContent = review.content?.find(c => c.locale === 'tr');
    const enContent = review.content?.find(c => c.locale === 'en');

    return {
      name: review.name,
      rating: review.rating,
      villaId: review.villaId,
      date: review.date,
      content: {
        tr: {
          comment: trContent?.comment || review.comment || '',
        },
        en: {
          comment: enContent?.comment || '',
        }
      }
    };
  };

  const handleSubmit = async (data: ReviewFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/reviews/${review.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/reviews`);
      } else {
        const error = await response.json();
        alert(`Yorum güncellenirken hata oluştu: ${error.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error("Review update error:", error);
      alert("Yorum güncellenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Yorum Düzenle</h1>
      
      <MultiLanguageReviewForm
        initialData={getInitialFormData()}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Yorum Güncelle"
        villas={villas}
      />
    </div>
  );
}