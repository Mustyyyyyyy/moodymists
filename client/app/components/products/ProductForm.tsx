"use client";

import { useState } from "react";
import Button from "@/app/components/ui/Button";

type ProductInput = {
  name: string;
  price: number;
  description: string;
  notes: string; 
  size: string;
  burnTime: string;
  featured: boolean;
  inStock: boolean;
  imageBase64?: string; 
};

export default function ProductForm({
  initial,
  onSubmit,
  submitLabel = "Save",
  loading,
}: {
  initial?: Partial<ProductInput>;
  onSubmit: (data: any) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}) {
  const [form, setForm] = useState<ProductInput>({
    name: initial?.name || "",
    price: Number(initial?.price || 0),
    description: initial?.description || "",
    notes: (initial as any)?.notes || "",
    size: initial?.size || "",
    burnTime: initial?.burnTime || "",
    featured: !!initial?.featured,
    inStock: initial?.inStock !== undefined ? !!initial?.inStock : true,
    imageBase64: (initial as any)?.imageBase64,
  });

  const [imgPreview, setImgPreview] = useState<string>(
    (initial as any)?.imageUrl || ""
  );

  const update = (k: keyof ProductInput, v: any) =>
    setForm((s) => ({ ...s, [k]: v }));

  const pickImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = String(reader.result || "");
      update("imageBase64", base64);
      setImgPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      notes: form.notes
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      size: form.size,
      burnTime: form.burnTime,
      featured: form.featured,
      inStock: form.inStock,
      ...(form.imageBase64 ? { imageBase64: form.imageBase64 } : {}),
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Price (NGN)</label>
          <input
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            type="number"
            required
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Description</label>
        <textarea
          className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">
          Notes (comma separated)
        </label>
        <input
          className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Vanilla, Amber, Cream"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700">Size</label>
          <input
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
            value={form.size}
            onChange={(e) => update("size", e.target.value)}
            placeholder="200g"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700">Burn time</label>
          <input
            className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-pink-400"
            value={form.burnTime}
            onChange={(e) => update("burnTime", e.target.value)}
            placeholder="35 hours"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 rounded-2xl border border-pink-100 p-4">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
          />
          <span className="text-sm font-semibold text-gray-700">Featured</span>
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-pink-100 p-4">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(e) => update("inStock", e.target.checked)}
          />
          <span className="text-sm font-semibold text-gray-700">In Stock</span>
        </label>
      </div>

      <div className="rounded-2xl border border-pink-100 p-4">
        <label className="text-sm font-semibold text-gray-700">Product Image</label>
        <input
          className="mt-2 block w-full text-sm"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) pickImage(file);
          }}
        />

        {imgPreview ? (
          <div className="mt-4 rounded-2xl overflow-hidden border border-pink-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgPreview} alt="preview" className="w-full h-56 object-cover" />
          </div>
        ) : null}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}