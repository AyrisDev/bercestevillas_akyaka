export interface ReviewWithContent {
  id: number;
  name: string;
  rating: number;
  comment: string; // Legacy field
  date: string;
  villaId: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  villa?: {
    id: number;
    title: string;
    slug: string;
  };
  
  // Multilingual content
  content?: Array<{
    id: number;
    reviewId: number;
    locale: string;
    comment: string;
  }>;
}

export function getReviewContent(review: ReviewWithContent, locale: string = 'tr') {
  // Try to get content from multilingual content table
  const content = review.content?.find(c => c.locale === locale);
  
  if (content) {
    return {
      comment: content.comment,
    };
  }
  
  // Fallback to legacy field
  return {
    comment: review.comment || '',
  };
}

export function getLocalizedReview(review: ReviewWithContent, locale: string = 'tr') {
  const content = getReviewContent(review, locale);
  
  return {
    ...review,
    ...content,
  };
}