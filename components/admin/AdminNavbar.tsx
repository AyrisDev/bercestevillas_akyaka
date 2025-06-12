"use client";

import { useSession, signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const t = useTranslations();

  const handleLogout = () => {
    signOut({ 
      callbackUrl: `/${locale}/admin-login` 
    });
  };
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {t("site.name")} Admin
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <select
              value={locale}
              onChange={(e) => {
                const newLocale = e.target.value;
                const currentPath = window.location.pathname;
                const newPath = currentPath.replace(`/${locale}/`, `/${newLocale}/`);
                router.push(newPath);
              }}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="tr">🇹🇷 Türkçe</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-700">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">
                {session?.user?.name?.charAt(0).toUpperCase() || "A"}
              </span>
            </div>
            <span className="text-sm">{session?.user?.name || "Admin"}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            {t("navigation.logout")}
          </button>
        </div>
      </div>
    </nav>
  );
}