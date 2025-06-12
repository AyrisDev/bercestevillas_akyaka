import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditVillaClient from "./EditVillaClient";

interface EditVillaPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

async function getVillaWithContent(id: number) {
  return await prisma.villa.findUnique({
    where: { id },
    include: {
      content: true,
      nearbyPlaces: true,
      reviews: true
    }
  });
}

export default async function EditVillaPage({ params }: EditVillaPageProps) {
  const { id, locale } = await params;
  const villaId = parseInt(id);
  
  const villa = await getVillaWithContent(villaId);
  
  if (!villa) {
    notFound();
  }

  return <EditVillaClient villa={villa} locale={locale} />;
}