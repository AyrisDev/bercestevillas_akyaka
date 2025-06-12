import Hero from "@/components/Hero";
import VillasSection from "@/components/VillasSection";

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  
  return (
    <div className="bg-[#141b22]">
      <Hero />
      <VillasSection locale={locale} />
    </div>
  );
}
