"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MultiLanguageVillaForm, { VillaFormData } from "@/components/admin/MultiLanguageVillaForm";
import { useTranslations } from "next-intl";

export default function NewVillaPage() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const t = useTranslations();

  const handleSubmit = async (data: VillaFormData) => {
    setLoading(true);
    
    try {
      const response = await fetch("/api/admin/villas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push(`/${locale}/admin/villas`);
      } else {
        alert("Villa eklenirken hata oluştu");
      }
    } catch {
      alert("Villa eklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t("admin.villas.addNew")}
      </h1>

      <MultiLanguageVillaForm
        onSubmit={handleSubmit}
        loading={loading}
        submitText={t("admin.villas.form.save")}
      />
    </div>
  );
}