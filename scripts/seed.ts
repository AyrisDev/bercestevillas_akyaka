import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.villaReview.deleteMany()
  await prisma.nearbyPlace.deleteMany()
  await prisma.villa.deleteMany()
  await prisma.adminUser.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@berceste.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      isActive: true
    }
  })
  console.log('✅ Created admin user: admin@berceste.com / admin123')

  // Create a sample villa
  const villa = await prisma.villa.create({
    data: {
      title: "Örnek Villa",
      slug: "ornek-villa",
      description: "Harika bir villa",
      shortDescription: "Güzel villa",
      images: ["/villas/sample1.jpg", "/villas/sample2.jpg"],
      mainImage: "/villas/sample1.jpg",
      amenities: ["WiFi", "Klima", "Yüzme Havuzu"],
      features: ["Deniz Manzarası", "Özel Bahçe"],
      status: "available",
      locationTitle: "Antalya Merkez",
      locationCity: "Antalya",
      guests: 6,
      bedrooms: 3,
      bathrooms: 2,
      pricePerNight: 1500,
      currency: "TRY",
      nearbyPlaces: {
        create: [
          { name: "Merkez", distance: "5 km" },
          { name: "Plaj", distance: "2 km" }
        ]
      },
      reviews: {
        create: [
          {
            name: "Ahmet Yılmaz",
            rating: 5,
            comment: "Harika bir tatil geçirdik!",
            date: "2024-01-15"
          }
        ]
      }
    }
  })

  console.log(`✅ Created villa: ${villa.title}`)

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })