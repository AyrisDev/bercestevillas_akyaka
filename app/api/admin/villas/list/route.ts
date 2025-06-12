import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const villas = await prisma.villa.findMany({
      select: {
        id: true,
        title: true,
        slug: true
      },
      orderBy: {
        title: 'asc'
      }
    });

    return NextResponse.json(villas);
  } catch (error) {
    console.error("Villas list fetch error:", error);
    return NextResponse.json(
      { error: "Villa listesi getirilirken hata oluştu" },
      { status: 500 }
    );
  }
}