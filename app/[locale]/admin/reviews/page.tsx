import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import ReviewDeleteButton from "@/components/admin/ReviewDeleteButton";
import Link from "next/link";
import { getReviewContent } from "@/lib/review-content";

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
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


  const deleteReview = async (reviewId: number) => {
    "use server";
    try {
      await prisma.villaReview.delete({
        where: { id: reviewId }
      });
      revalidatePath(`/${locale}/admin/reviews`);
    } catch (error) {
      console.error("Review delete error:", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Yorumlar</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Toplam {reviews.length} yorum
          </div>
          <Link 
            href={`/${locale}/admin/reviews/new`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yeni Yorum Ekle
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yorum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Villa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => {
              const content = getReviewContent(review, locale);
              return (
                <tr key={review.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {review.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1 max-w-xs truncate">
                        {content.comment}
                      </div>
                      {/* Language indicators */}
                      <div className="flex space-x-1 mt-1">
                        {review.content?.find(c => c.locale === 'tr') && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            🇹🇷
                          </span>
                        )}
                        {review.content?.find(c => c.locale === 'en') && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            🇺🇸
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{review.villa.title}</div>
                    <div className="text-sm text-gray-500">{review.villa.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-1">
                        {review.rating}
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      href={`/${locale}/admin/reviews/${review.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Düzenle
                    </Link>
                    <ReviewDeleteButton 
                      reviewId={review.id} 
                      onDelete={deleteReview}
                    />
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">Henüz yorum bulunmuyor</div>
          </div>
        )}
      </div>
    </div>
  );
}