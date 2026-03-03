"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminTopbar from "@/app/components/layout/AdminTopbar";
import ProductForm from "@/app/components/products/ProductForm";
import { apiFetch } from "@/app/lib/api";

export default function AdminNewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const createProduct = async (payload: any) => {
    setSaving(true);
    setError("");
    try {
      await apiFetch("/api/products", payload, "POST");
      router.replace("/admin/products");
    } catch (e: any) {
      setError(e?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminTopbar
        title="Add Product"
      />

      <main className="p-6">
        {error && (
          <div className="mb-4 rounded-xl bg-pink-50 border border-pink-200 p-3 text-sm text-pink-700">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-pink-100 bg-white p-6">
          <h2 className="text-xl font-extrabold text-gray-900">
            Create a new candle
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Add name, price, scent notes, and an image.
          </p>

          <div className="mt-6">
            <ProductForm
              onSubmit={createProduct}
              loading={saving}
              submitLabel="Create"
            />
          </div>
        </div>
      </main>
    </div>
  );
}