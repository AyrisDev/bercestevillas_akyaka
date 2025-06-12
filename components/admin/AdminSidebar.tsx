"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const getMenuItems = (locale: string, t: (key: string) => string) => [
  {
    name: "Dashboard",
    href: `/${locale}/admin`,
    icon: "📊"
  },
  {
    name: t("admin.villas.title"),
    href: `/${locale}/admin/villas`,
    icon: "🏠"
  },
  {
    name: t("admin.reviews.title"),
    href: `/${locale}/admin/reviews`,
    icon: "💬"
  },
  {
    name: t("admin.settings.title"),
    href: `/${locale}/admin/settings`,
    icon: "⚙️"
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();
  const menuItems = getMenuItems(locale, t);

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-16">
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== `/${locale}/admin` && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}