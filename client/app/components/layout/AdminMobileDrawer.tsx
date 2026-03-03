"use client";

import AdminSidebar from "@/app/components/layout/AdminSidebar";

export default function AdminMobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close menu"
      />
      <div className="relative h-full w-72">
        <AdminSidebar onNavigate={onClose} />
      </div>
    </div>
  );
}