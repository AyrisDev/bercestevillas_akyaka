"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminAuthWrapperProps {
  children: React.ReactNode;
  locale: string;
}

export default function AdminAuthWrapper({ children, locale }: AdminAuthWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session || session.user?.role !== "admin") {
      router.push(`/${locale}/admin-login`);
      return;
    }
  }, [session, status, router, locale]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return null; // Will redirect
  }

  return <>{children}</>;
}