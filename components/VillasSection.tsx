import VillaCard from "./VillaCard";
import { prisma } from "@/lib/prisma";
import { getLocalizedVilla } from "@/lib/villa-content";

interface VillasSectionProps {
  locale: string;
}

async function getVillas() {
  return await prisma.villa.findMany({
    include: {
      content: true
    },
    where: {
      status: 'available'
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 8 // İlk 8 villa
  });
}

export default async function VillasSection({ locale }: VillasSectionProps) {
  const villasData = await getVillas();

  return (
    <section className="py-20 bg-[#141b22] mt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-6 space-y-12">
          {villasData.map((villa, index) => {
            // Get localized content
            const localizedVilla = getLocalizedVilla(villa, locale);
            
            // Index pattern: 0, -4, -8, 0, -4, -8, 0, -4
            const indexValues = [0, -4, -8];
            const indexValue = indexValues[index % 3];
            
            return (
              <VillaCard
                key={villa.id}
                id={villa.id}
                slug={villa.slug}
                title={localizedVilla.title}
                description={localizedVilla.shortDescription || localizedVilla.description.substring(0, 100) + '...'}
                image={villa.mainImage}
                index={indexValue}
              />
            );
          })}
        </div>
        
        {villasData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">Henüz villa bulunmuyor</div>
          </div>
        )}
      </div>
    </section>
  );
}