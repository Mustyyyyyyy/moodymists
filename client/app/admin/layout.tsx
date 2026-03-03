"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/components/layout/AdminSidebar";
import AdminMobileDrawer from "@/app/components/layout/AdminMobileDrawer";
import { requireAdmin } from "@/app/lib/adminGuard";
import { getToken, logout } from "@/app/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await Promise.race([
          requireAdmin(),
          new Promise((_, rej) => setTimeout(() => rej(new Error("Auth check timeout")), 8000)),
        ]);

        if (!cancelled) setOk(true);
      } catch (e: any) {
        if (cancelled) return;

        setError(e?.message || "Admin check failed");
        logout();
        router.replace("/admin/login");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ok) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center max-w-md w-full">
          <p className="font-extrabold text-gray-900">Loading admin…</p>
          <p className="mt-2 text-sm text-gray-600">
            Checking your login session.
          </p>
          {error ? (
            <p className="mt-3 text-sm text-pink-700 font-semibold">{error}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <aside className="hidden md:flex">
        <AdminSidebar />
      </aside>

      <AdminMobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1">{children}</div>

      <MenuListener onOpen={() => setMenuOpen(true)} />
    </div>
  );
}

function MenuListener({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const fn = () => onOpen();
    window.addEventListener("open-admin-menu", fn);
    return () => window.removeEventListener("open-admin-menu", fn);
  }, [onOpen]);

  return null;
}