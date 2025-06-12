import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <AdminAuthWrapper locale={locale}>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 ml-64 p-8 mt-16">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthWrapper>
  );
}