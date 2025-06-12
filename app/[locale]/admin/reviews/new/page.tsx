import { prisma } from "@/lib/prisma";
import NewReviewClient from "./NewReviewClient";

interface NewReviewPageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function getVillas() {
  return await prisma.villa.findMany({
    select: {
      id: true,
      title: true,
      slug: true
    },
    orderBy: {
      title: 'asc'
    }
  });
}

export default async function NewReviewPage({ params }: NewReviewPageProps) {
  const { locale } = await params;
  const villas = await getVillas();

  return <NewReviewClient villas={villas} locale={locale} />;
}