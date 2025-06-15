"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/villas/berceste/16.jpeg')",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Top angled border */}
      <div
        className="absolute top-0 left-0 w-full h-48 bg-[#141b22] z-10"
        style={{
          clipPath: "polygon(0 100%, 100% 40%, 100% 0, 0 0)",
        }}
      ></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 mt-12">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={400}
              height={120}
              className="mx-auto filter invert"
              priority
            />
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Tam Korunaklı Özel Tatil ve Balayı Villaları
            </p>
          </div>
        </div>
      </div>

      {/* Bottom angled border */}
      <div
        className="absolute -bottom-[0.5px] -left-0 w-full h-48 bg-[#141b22] z-10"
        style={{
          clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0 100%)",
        }}
      ></div>
    </section>
  );
}
