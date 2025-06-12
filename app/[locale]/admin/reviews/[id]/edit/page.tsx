import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditReviewClient from "./EditReviewClient";

interface EditReviewPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

async function getReviewWithContent(id: number) {
  return await prisma.villaReview.findUnique({
    where: { id },
    include: {
      content: true,
      villa: {
        select: {
          id: true,
          title: true,
          slug: true
        }
      }
    }
  });
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

export default async function EditReviewPage({ params }: EditReviewPageProps) {
  const { id, locale } = await params;
  const reviewId = parseInt(id);
  
  const [review, villas] = await Promise.all([
    getReviewWithContent(reviewId),
    getVillas()
  ]);
  
  if (!review) {
    notFound();
  }

  return <EditReviewClient review={review} villas={villas} locale={locale} />;
}