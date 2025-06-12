import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const villa = await prisma.villa.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        content: true,
        nearbyPlaces: true,
        reviews: true
      }
    });

    if (!villa) {
      return NextResponse.json(
        { error: "Villa bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(villa);
  } catch (error) {
    console.error("Villa fetch error:", error);
    return NextResponse.json(
      { error: "Villa getirilirken hata oluştu" },
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
    const villaId = parseInt(id);

    // Check if this is multilingual data or legacy data
    if (data.content) {
      // Multilingual update
      const villa = await prisma.villa.update({
        where: { id: villaId },
        data: {
          slug: data.slug,
          mainImage: data.mainImage,
          images: data.images || [],
          locationCity: data.locationCity,
          guests: data.guests,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          pricePerNight: data.pricePerNight,
          currency: data.currency || "TRY",
          status: data.status || "available",
          // Update legacy fields with Turkish content for backward compatibility
          title: data.content.tr?.title || '',
          description: data.content.tr?.description || '',
          shortDescription: data.content.tr?.shortDescription,
          locationTitle: data.content.tr?.locationTitle || '',
          amenities: data.content.tr?.amenities || [],
          features: data.content.tr?.features || [],
        }
      });

      // Update or create multilingual content
      for (const locale of ['tr', 'en']) {
        const localeContent = data.content[locale];
        if (localeContent) {
          await prisma.villaContent.upsert({
            where: {
              villaId_locale: {
                villaId,
                locale
              }
            },
            create: {
              villaId,
              locale,
              title: localeContent.title,
              description: localeContent.description,
              shortDescription: localeContent.shortDescription,
              locationTitle: localeContent.locationTitle,
              amenities: localeContent.amenities || [],
              features: localeContent.features || [],
            },
            update: {
              title: localeContent.title,
              description: localeContent.description,
              shortDescription: localeContent.shortDescription,
              locationTitle: localeContent.locationTitle,
              amenities: localeContent.amenities || [],
              features: localeContent.features || [],
            }
          });
        }
      }

      return NextResponse.json(villa);
    } else {
      // Legacy update for backward compatibility
      const villa = await prisma.villa.update({
        where: { id: villaId },
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          shortDescription: data.shortDescription || null,
          mainImage: data.mainImage,
          images: data.images || [],
          amenities: data.amenities || [],
          features: data.features || [],
          locationTitle: data.locationTitle,
          locationCity: data.locationCity,
          guests: data.guests,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          pricePerNight: data.pricePerNight,
          currency: data.currency || "TRY",
          status: data.status || "available"
        }
      });

      return NextResponse.json(villa);
    }
  } catch (error) {
    console.error("Villa update error:", error);
    return NextResponse.json(
      { error: "Villa güncellenirken hata oluştu" },
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
    const villaId = parseInt(id);

    await prisma.villa.delete({
      where: {
        id: villaId
      }
    });

    return NextResponse.json({ message: "Villa silindi" });
  } catch (error) {
    console.error("Villa delete error:", error);
    return NextResponse.json(
      { error: "Villa silinirken hata oluştu" },
      { status: 500 }
    );
  }
}