"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTopbar from "@/app/components/layout/AdminTopbar";
import Button from "@/app/components/ui/Button";
import { apiFetch } from "@/app/lib/api";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  inStock?: boolean;
  featured?: boolean;
  createdAt?: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/api/products", undefined, "GET");
      setProducts(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const stats = useMemo(() => {
    const total = products.length;
    const featured = products.filter((p) => p.featured).length;
    const inStock = products.filter((p) => p.inStock !== false).length;
    return { total, featured, inStock };
  }, [products]);

  const removeProduct = async (id: string) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    setError("");
    try {
      await apiFetch(`/api/products/${id}`, undefined, "DELETE");
      await fetchProducts();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AdminTopbar title="Products" />

      <main className="p-6">
        {error && (
          <div className="mb-4 rounded-xl bg-pink-50 border border-pink-200 p-3 text-sm text-pink-700">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Products", value: stats.total },
            { label: "Featured", value: stats.featured },
            { label: "In Stock", value: stats.inStock },
          ].map((x) => (
            <div
              key={x.label}
              className="rounded-2xl border border-pink-100 bg-white p-5"
            >
              <p className="text-sm text-gray-600">{x.label}</p>
              <p className="mt-2 text-2xl font-extrabold text-gray-900">
                {x.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">
              Manage Products
            </h2>
            <p className="text-sm text-gray-600">
              Add, edit, delete products — customers see them instantly.
            </p>
          </div>

          <Button href="/admin/products/new">+ Add Product</Button>
        </div>

        <div className="mt-6 rounded-2xl border border-pink-100 bg-white overflow-hidden">
          {loading ? (
            <div className="p-6">Loading…</div>
          ) : products.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-semibold text-gray-900">No products yet.</p>
              <p className="mt-2 text-sm text-gray-600">
                Click{" "}
                <span className="text-[var(--brand)] font-semibold">
                  Add Product
                </span>{" "}
                to create your first candle.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-pink-100">
              {products.map((p) => (
                <div key={p._id} className="p-5 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-pink-50 border border-pink-100 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imageUrl || "/images/placeholder.jpg"}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-600">
                      ₦{p.price.toLocaleString()} •{" "}
                      {p.inStock === false ? "Out of stock" : "In stock"}{" "}
                      {p.featured ? "• Featured" : ""}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      href={`/admin/products/${p._id}`}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => removeProduct(p._id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}