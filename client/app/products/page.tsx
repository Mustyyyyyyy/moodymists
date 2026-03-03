import ProductGrid from "@/app/components/products/ProductGrid";
import { apiFetchServer } from "@/app/lib/api.server";
import Button from "../components/ui/Button";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await apiFetchServer("/api/products");

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>
          <p className="mt-1 text-gray-600">
            Choose your scent and order directly on WhatsApp.
          </p>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-[var(--brand-soft)] px-4 py-3 text-sm text-gray-700">
          <span className="font-semibold text-[var(--brand)]">Tip:</span> Add your
          address & quantity in the WhatsApp message.
        </div>
                  <Button href="/" variant="outline">
                    Back to home
                  </Button>
              
      </div>

      <div className="mt-8">
        {Array.isArray(products) && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-2xl border border-pink-100 bg-white p-10 text-center">
            <p className="font-semibold text-gray-900">No products yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}