"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/app/components/brand/BrandLogo";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/new", label: "Add Product" },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-72 bg-white border-r border-pink-100">
      <div className="h-16 px-5 flex items-center border-b border-pink-100">
        <BrandLogo href="/admin" />
      </div>

      <nav className="p-4 space-y-2">
        {items.map((it) => {
          const active =
            pathname === it.href ||
            (it.href !== "/admin" && pathname.startsWith(it.href));

          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={onNavigate}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition
                ${
                  active
                    ? "bg-[var(--brand-soft)] border border-pink-200 text-[var(--brand)]"
                    : "text-gray-700 hover:bg-pink-50"
                }`}
            >
              {it.label}
              <span className="text-xs opacity-70">→</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-2xl border border-pink-100 bg-white p-4 text-xs text-gray-600">
          MoodyMists Admin
        </div>
      </div>
    </aside>
  );
}