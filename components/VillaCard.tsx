"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface VillaCardProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function VillaCard({
  slug,
  title,
  description,
  image,
  index,
}: VillaCardProps) {
  const params = useParams();
  const locale = params.locale as string || 'tr';
  const t = useTranslations();
  // Index'e göre konum hesaplama - index * 10
  const translateValue = index * 10;

  // Debug için index değerini göster
  console.log(`Card ${index}: translateY=${translateValue}px`);

  // Konum stilleri
  const positionStyles = {
    transform: `translateY(${translateValue}px)`,
    transition: "transform 0.3s ease",
  };

  return (
    <div className="relative group bg-white" style={positionStyles}>
      {/* Top angled border - same as Hero */}
      <div
        className="absolute -top-6 -left-2 w-[calc(100%+12px)] h-16 bg-[#141b22] z-10"
        style={{
          clipPath: "polygon(0 100%, 100% 40%, 100% 0, 0 0)",
        }}
      ></div>

      {/* Image */}
      <div className="relative h-48 overflow-hidden cursor-pointer group-image">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#24b6b6] opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative z-5">
        {/* Button */}
        <Link 
          href={`/${locale}/villa/${slug}`}
          className="block w-full bg-[#24b6b6] hover:bg-[#141b22] text-white font-semibold mb-4 py-4 px-8 text-start transition-colors duration-300 text-lg cursor-pointer"
        >
          {t("villa.viewDetails")}
        </Link>
      </div>
      {/* Bottom angled border - same as Hero */}
      <div
        className="absolute -bottom-2 -left-2 w-[calc(100%+12px)]  h-10 bg-[#141b22] z-20"
        style={{
          clipPath: "polygon(0 40%, 100% 0%, 100% 100%, 0 100%)",
        }}
      ></div>
    </div>
  );
}
