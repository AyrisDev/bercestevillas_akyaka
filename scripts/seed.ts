import { PrismaClient } from '@prisma/client'
import villasData from '../data/villas.json'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.villaReview.deleteMany()
  await prisma.nearbyPlace.deleteMany()
  await prisma.villa.deleteMany()

  // Seed villas
  for (const villaData of villasData.villas) {
    const villa = await prisma.villa.create({
      data: {
        title: villaData.title,
        slug: villaData.slug,
        description: villaData.description,
        shortDescription: villaData.shortDescription,
        images: villaData.images,
        mainImage: villaData.mainImage,
        amenities: villaData.amenities,
        features: villaData.features,
        status: villaData.status,
        locationTitle: villaData.location.title,
        locationCity: villaData.location.city,
        guests: villaData.capacity.guests,
        bedrooms: villaData.capacity.bedrooms,
        bathrooms: villaData.capacity.bathrooms,
        pricePerNight: villaData.price.perNight,
        currency: villaData.price.currency,
        nearbyPlaces: {
          create: villaData.location.nearbyPlaces.map(place => ({
            name: place.name,
            distance: place.distance
          }))
        },
        reviews: {
          create: villaData.reviews.map(review => ({
            name: review.name,
            rating: review.rating,
            comment: review.comment,
            date: review.date
          }))
        }
      }
    })

    console.log(`✅ Created villa: ${villa.title}`)
  }

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