import VillaCard from "./VillaCard";
import villasData from "@/data/villas.json";

export default function VillasSection() {
  return (
    <section className="py-20 bg-[#141b22] mt-32 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-6 space-y-12">
          {villasData.villas.slice(0, 8).map((villa, index) => {
            // Index pattern: 0, -4, -8, 0, -4, -8, 0, -4
            const indexValues = [0, -4, -8];
            const indexValue = indexValues[index % 3];
            
            return (
              <VillaCard
                key={villa.id}
                id={villa.id}
                title={villa.title}
                description={villa.shortDescription}
                image={villa.mainImage}
                index={indexValue}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}