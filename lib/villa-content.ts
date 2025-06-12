export interface VillaWithContent {
  id: number;
  slug: string;
  mainImage: string;
  images: string[];
  locationCity: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Legacy fields (for backward compatibility)
  title?: string;
  description?: string;
  shortDescription?: string | null;
  locationTitle?: string;
  amenities?: string[];
  features?: string[];
  
  // Multilingual content
  content?: Array<{
    id: number;
    villaId: number;
    locale: string;
    title: string;
    description: string;
    shortDescription?: string | null;
    locationTitle: string;
    amenities: string[];
    features: string[];
  }>;
}

export function getVillaContent(villa: VillaWithContent, locale: string = 'tr') {
  // Try to get content from multilingual content table
  const content = villa.content?.find(c => c.locale === locale);
  
  if (content) {
    return {
      title: content.title,
      description: content.description,
      shortDescription: content.shortDescription,
      locationTitle: content.locationTitle,
      amenities: content.amenities,
      features: content.features,
    };
  }
  
  // Fallback to legacy fields
  return {
    title: villa.title || '',
    description: villa.description || '',
    shortDescription: villa.shortDescription,
    locationTitle: villa.locationTitle || '',
    amenities: villa.amenities || [],
    features: villa.features || [],
  };
}

export function getLocalizedVilla(villa: VillaWithContent, locale: string = 'tr') {
  const content = getVillaContent(villa, locale);
  
  return {
    ...villa,
    ...content,
  };
}