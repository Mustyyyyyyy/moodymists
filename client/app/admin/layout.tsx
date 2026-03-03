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

  useEffect(() => {
    const token = getToken();
    if (!token) return router.replace("/admin/login");

    (async () => {
      try {
        await requireAdmin();
        setOk(true);
      } catch {
        logout();
        router.replace("/admin/login");
      }
    })();
  }, [router]);

  if (!ok) return <div className="p-6">Loading…</div>;

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