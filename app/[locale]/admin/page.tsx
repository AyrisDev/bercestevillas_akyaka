import { prisma } from "@/lib/prisma";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const villaCount = await prisma.villa.count();
  const reviewCount = await prisma.villaReview.count();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Toplam Villalar</h3>
          <p className="text-3xl font-bold text-blue-600">{villaCount}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Toplam Yorumlar</h3>
          <p className="text-3xl font-bold text-green-600">{reviewCount}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Aktif Villalar</h3>
          <p className="text-3xl font-bold text-purple-600">{villaCount}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Bu Ay</h3>
          <p className="text-3xl font-bold text-orange-600">12</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hoşgeldiniz</h2>
        <p className="text-gray-600">
          Admin paneline hoşgeldiniz. Sol menüden villaları yönetebilir, yeni villa ekleyebilir ve mevcut villaları düzenleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}