"use client";

import Button from "@/app/components/ui/Button";
import { logout } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminTopbar({ title }: { title: string }) {
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  const openMenu = () => {
    window.dispatchEvent(new Event("open-admin-menu"));
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-pink-100 bg-white">
      <div className="flex items-center gap-3">
        <button
          onClick={openMenu}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pink-100 hover:bg-pink-50"
          aria-label="Open menu"
        >
          ☰
        </button>

        <h1 className="text-lg font-extrabold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button href="/" variant="outline">
          View Store
        </Button>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}