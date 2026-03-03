"use client";

import { useEffect } from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <div className="relative mx-auto mt-24 w-[92%] max-w-lg rounded-2xl border border-pink-100 bg-white shadow-lg">
        <div className="px-5 py-4 border-b border-pink-100">
          <p className="text-lg font-extrabold text-gray-900">
            {title || "Modal"}
          </p>
        </div>

        <div className="p-5">{children}</div>

        {footer ? (
          <div className="px-5 py-4 border-t border-pink-100">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}