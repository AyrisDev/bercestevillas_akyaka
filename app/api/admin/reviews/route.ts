import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reviews = await prisma.villaReview.findMany({
      include: {
        content: true,
        villa: {
          select: {
            id: true,
            title: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json(
      { error: "Yorumlar getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Create the review
    const review = await prisma.villaReview.create({
      data: {
        name: data.name,
        rating: data.rating,
        villaId: data.villaId,
        date: data.date,
        // Use Turkish content as legacy comment for backward compatibility
        comment: data.content.tr?.comment || '',
      }
    });

    // Create multilingual content
    for (const locale of ['tr', 'en']) {
      const localeContent = data.content[locale];
      if (localeContent && localeContent.comment) {
        await prisma.reviewContent.create({
          data: {
            reviewId: review.id,
            locale,
            comment: localeContent.comment,
          }
        });
      }
    }

    // Return the created review with content
    const createdReview = await prisma.villaReview.findUnique({
      where: { id: review.id },
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

    return NextResponse.json(createdReview);
  } catch (error) {
    console.error("Review create error:", error);
    return NextResponse.json(
      { error: "Yorum oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
}