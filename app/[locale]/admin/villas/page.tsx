import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import VillaDeleteButton from "@/components/admin/VillaDeleteButton";
import { getVillaContent } from "@/lib/villa-content";

export default async function VillasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const villas = await prisma.villa.findMany({
    include: {
      content: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  async function deleteVilla(villaId: number) {
    "use server";
    try {
      await prisma.villa.delete({
        where: { id: villaId }
      });
      revalidatePath(`/${locale}/admin/villas`);
    } catch (error) {
      console.error("Villa delete error:", error);
      throw error;
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Villalar</h1>
        <Link 
          href={`/${locale}/admin/villas/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Yeni Villa Ekle
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Villa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Konum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kapasite
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fiyat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {villas.map((villa) => {
              const content = getVillaContent(villa, locale);
              return (
                <tr key={villa.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        className="h-12 w-12 rounded-lg object-cover" 
                        src={villa.mainImage} 
                        alt={content.title}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {content.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {villa.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{content.locationTitle}</div>
                    <div className="text-sm text-gray-500">{villa.locationCity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {villa.guests} kişi, {villa.bedrooms} yatak odası
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {villa.pricePerNight.toLocaleString()} {villa.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      villa.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {villa.status === 'available' ? 'Müsait' : 'Dolu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      href={`/${locale}/admin/villas/${villa.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Düzenle
                    </Link>
                    <VillaDeleteButton 
                      villaId={villa.id} 
                      onDelete={deleteVilla}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}