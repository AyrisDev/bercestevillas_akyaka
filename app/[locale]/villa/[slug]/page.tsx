import { notFound } from "next/navigation";
import VillaGallery from "@/components/VillaGallery";
import Hero from "@/components/Hero";
import { prisma } from "@/lib/prisma";
import { getLocalizedVilla } from "@/lib/villa-content";
import { getTranslations } from "next-intl/server";

// Villa verilerini veritabanından al
const getVillaBySlug = async (slug: string) => {
  return await prisma.villa.findUnique({
    where: { slug },
    include: {
      content: true,
      nearbyPlaces: true,
      reviews: true
    }
  });
};

interface VillaDetailPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function VillaDetailPage({ params }: VillaDetailPageProps) {
  const { slug, locale } = await params;
  const villaData = await getVillaBySlug(slug);
  const t = await getTranslations();

  if (!villaData) {
    notFound();
  }

  const villa = getLocalizedVilla(villaData, locale);

  return (
    <div className="bg-[#141b22] min-h-screen mt-10">
      <Hero />
      <div className="container mx-auto px-4 py-8 ">
        {/* Villa Title */}
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold text-white">{villa.title}</h1>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-lg p-6">
          <VillaGallery images={villa.images} title={villa.title} />
        </div>

        {/* Villa Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-white p-6 rounded-lg">
              <h1 className="text-3xl font-bold text-black mb-4">
                {villa.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {villa.description}
              </p>
            </section>

            {/* Amenities */}
            <section className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-black mb-4">{t("villa.amenities")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {villa.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#24b6b6] rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-black mb-4">{t("villa.features")}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {villa.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#24b6b6] rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-black mb-4">
                {t("villa.proximity")}
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {villa.locationTitle}
              </h3>
              <div className="space-y-2">
                {villaData.nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-gray-700">{place.name}</span>
                    <span className="text-[#24b6b6] font-medium">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reviews */}
            <section className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-black mb-4">{t("villa.reviews")}</h2>
              <div className="space-y-4">
                {villaData.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        {review.name}
                      </span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {review.comment}
                    </p>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Villa Info */}
            <section className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">{t("villa.info")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("villa.guests")}</span>
                  <span className="font-semibold">{villaData.guests} {t("villa.person")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("villa.bedrooms")}</span>
                  <span className="font-semibold">{villaData.bedrooms} {t("villa.room")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("villa.bathrooms")}</span>
                  <span className="font-semibold">{villaData.bathrooms} {t("villa.bathroom")}</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">{t("villa.perNight")}</span>
                  <span className="font-bold text-lg text-[#24b6b6]">
                    {villaData.pricePerNight.toLocaleString()} {villaData.currency}
                  </span>
                </div>
              </div>
            </section>

            {/* Contact/Booking */}
            <section className="bg-[#24b6b6] p-6 rounded-lg text-white">
              <h3 className="text-xl font-bold mb-4">{t("villa.reservation")}</h3>
              <button className="w-full bg-white text-[#24b6b6] font-semibold py-3 px-4 rounded hover:bg-gray-100 transition-colors">
                {t("villa.contact")}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
