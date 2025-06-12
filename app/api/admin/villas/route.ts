import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Create villa with multilingual content
    const villa = await prisma.villa.create({
      data: {
        // Keep existing fields for backward compatibility
        title: data.content?.tr?.title || data.title,
        slug: data.slug,
        description: data.content?.tr?.description || data.description,
        shortDescription: data.content?.tr?.shortDescription || data.shortDescription,
        mainImage: data.mainImage,
        images: data.images || [],
        amenities: data.content?.tr?.amenities || data.amenities || [],
        features: data.content?.tr?.features || data.features || [],
        locationTitle: data.content?.tr?.locationTitle || data.locationTitle,
        locationCity: data.locationCity,
        guests: data.guests,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        pricePerNight: data.pricePerNight,
        currency: data.currency || "TRY",
        status: data.status || "available",
        
        // Create multilingual content
        content: {
          create: [
            {
              locale: 'tr',
              title: data.content?.tr?.title || data.title,
              description: data.content?.tr?.description || data.description,
              shortDescription: data.content?.tr?.shortDescription || data.shortDescription,
              locationTitle: data.content?.tr?.locationTitle || data.locationTitle,
              amenities: data.content?.tr?.amenities || data.amenities || [],
              features: data.content?.tr?.features || data.features || [],
            },
            {
              locale: 'en',
              title: data.content?.en?.title || data.title,
              description: data.content?.en?.description || data.description,
              shortDescription: data.content?.en?.shortDescription || data.shortDescription,
              locationTitle: data.content?.en?.locationTitle || data.locationTitle,
              amenities: data.content?.en?.amenities || data.amenities || [],
              features: data.content?.en?.features || data.features || [],
            }
          ]
        }
      },
      include: {
        content: true
      }
    });

    return NextResponse.json(villa);
  } catch (error) {
    console.error("Villa creation error:", error);
    return NextResponse.json(
      { error: "Villa oluşturulurken hata oluştu" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const villas = await prisma.villa.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(villas);
  } catch (error) {
    console.error("Villa fetch error:", error);
    return NextResponse.json(
      { error: "Villalar getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}