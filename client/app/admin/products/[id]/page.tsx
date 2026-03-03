"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminTopbar from "@/app/components/layout/AdminTopbar";
import ProductForm from "@/app/components/products/ProductForm";
import Button from "@/app/components/ui/Button";
import { apiFetch } from "@/app/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  notes?: string[];
  size?: string;
  burnTime?: string;
  imageUrl?: string;
  inStock?: boolean;
  featured?: boolean;
};

export default function AdminEditProductPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();
  const [p, setP] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch(`/api/products/${id}`, undefined, "GET");
      setP(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const updateProduct = async (payload: any) => {
    setSaving(true);
    setError("");
    try {
      await apiFetch(`/api/products/${id}`, payload, "PUT");
      router.replace("/admin/products");
    } catch (e: any) {
      setError(e?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async () => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    setError("");
    try {
      await apiFetch(`/api/products/${id}`, undefined, "DELETE");
      router.replace("/admin/products");
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminTopbar
        title="Edit Product"
      />

      <main className="p-6">
        {error && (
          <div className="mb-4 rounded-xl bg-pink-50 border border-pink-200 p-3 text-sm text-pink-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-6">Loading…</div>
        ) : !p ? (
          <div className="rounded-2xl border border-pink-100 bg-white p-10 text-center">
            <p className="font-semibold text-gray-900">Product not found</p>
            <p className="mt-2 text-sm text-gray-600">
              Go back to products and try again.
            </p>
            <div className="mt-5">
              <Button href="/admin/products" variant="outline">
                ← Back
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-pink-100 bg-white p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">{p.name}</h2>
                <p className="text-sm text-gray-600">
                  Update details, image, stock, or featured.
                </p>
              </div>

              <div className="flex gap-2">
                <Button href="/admin/products" variant="outline">
                  ← Back
                </Button>
                <Button onClick={deleteProduct}>Delete</Button>
              </div>
            </div>

            <div className="mt-6">
              <ProductForm
                initial={{
                  name: p.name,
                  price: p.price,
                  description: p.description || "",
                  notes: (p.notes || []).join(", "),
                  size: p.size || "",
                  burnTime: p.burnTime || "",
                  featured: !!p.featured,
                  inStock: p.inStock !== false,
                  imageUrl: p.imageUrl || "",
                } as any}
                onSubmit={updateProduct}
                loading={saving}
                submitLabel="Update"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}