"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function HtmlLangSetter() {
  const params = useParams();
  const locale = params?.locale as string || "tr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}