import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const review = await prisma.villaReview.findUnique({
      where: {
        id: parseInt(id)
      },
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

    if (!review) {
      return NextResponse.json(
        { error: "Yorum bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Review fetch error:", error);
    return NextResponse.json(
      { error: "Yorum getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const { id } = await params;
    const reviewId = parseInt(id);

    // Check if this is multilingual data or legacy data
    if (data.content) {
      // Multilingual update
      const review = await prisma.villaReview.update({
        where: { id: reviewId },
        data: {
          name: data.name,
          rating: data.rating,
          villaId: data.villaId,
          date: data.date,
          // Update legacy comment with Turkish content for backward compatibility
          comment: data.content.tr?.comment || '',
        }
      });

      // Update or create multilingual content
      for (const locale of ['tr', 'en']) {
        const localeContent = data.content[locale];
        if (localeContent && localeContent.comment) {
          await prisma.reviewContent.upsert({
            where: {
              reviewId_locale: {
                reviewId,
                locale
              }
            },
            create: {
              reviewId,
              locale,
              comment: localeContent.comment,
            },
            update: {
              comment: localeContent.comment,
            }
          });
        }
      }

      return NextResponse.json(review);
    } else {
      // Legacy update for backward compatibility
      const review = await prisma.villaReview.update({
        where: { id: reviewId },
        data: {
          name: data.name,
          rating: data.rating,
          comment: data.comment,
          date: data.date,
          villaId: data.villaId,
        }
      });

      return NextResponse.json(review);
    }
  } catch (error) {
    console.error("Review update error:", error);
    return NextResponse.json(
      { error: "Yorum güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reviewId = parseInt(id);

    await prisma.villaReview.delete({
      where: {
        id: reviewId
      }
    });

    return NextResponse.json({ message: "Yorum silindi" });
  } catch (error) {
    console.error("Review delete error:", error);
    return NextResponse.json(
      { error: "Yorum silinirken hata oluştu" },
      { status: 500 }
    );
  }
}