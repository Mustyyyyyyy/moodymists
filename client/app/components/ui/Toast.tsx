"use client";

import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export function Toast({
  open,
  type = "info",
  message,
  onClose,
  duration = 3000,
}: {
  open: boolean;
  type?: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const styles =
    type === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : type === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : "border-pink-200 bg-pink-50 text-pink-800";

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`rounded-2xl border px-4 py-3 shadow-sm ${styles}`}>
        <div className="flex items-start gap-3">
          <p className="text-sm font-semibold">{message}</p>
          <button
            onClick={onClose}
            className="text-xs font-bold opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}