"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MultiLanguageReviewForm from "@/components/admin/MultiLanguageReviewForm";

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
  villas: Villa[];
  locale: string;
}

export default function NewReviewClient({ villas, locale }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ReviewFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/reviews`);
      } else {
        const error = await response.json();
        alert(`Yorum oluşturulurken hata oluştu: ${error.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error("Review create error:", error);
      alert("Yorum oluşturulurken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Yeni Yorum Ekle</h1>
      
      <MultiLanguageReviewForm
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Yorum Ekle"
        villas={villas}
      />
    </div>
  );
}