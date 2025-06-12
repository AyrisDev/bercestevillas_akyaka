import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import VillaGallery from "@/components/VillaGallery";
import Hero from "@/components/Hero";
import villasData from "@/data/villas.json";

// Villa verilerini JSON'dan al
const getVillaBySlug = (slug: string) => {
  return villasData.villas.find(villa => villa.slug === slug);
};

interface VillaDetailPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function VillaDetailPage({ params }: VillaDetailPageProps) {
  const { slug } = params;
  const villa = getVillaBySlug(slug);

  if (!villa) {
    notFound();
  }

  return (
    <div className="bg-[#141b22] min-h-screen mt-10">
      ,
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
              <h2 className="text-2xl font-bold text-black mb-4">Özellikler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {villa.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#24b6b6] rounded-full"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-black mb-4">
                Konum & Yakınlık
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {villa.location.title}
              </h3>
              <div className="space-y-2">
                {villa.location.nearbyPlaces.map((place, index) => (
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
              <h2 className="text-2xl font-bold text-black mb-4">Yorumlar</h2>
              <div className="space-y-4">
                {villa.reviews.map((review) => (
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

            {/* Contact/Booking */}
            <section className="bg-[#24b6b6] p-6 rounded-lg text-white">
              <h3 className="text-xl font-bold mb-4">Rezervasyon</h3>
              <button className="w-full bg-white text-[#24b6b6] font-semibold py-3 px-4 rounded hover:bg-gray-100 transition-colors">
                İletişim
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
