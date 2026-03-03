import Button from "@/app/components/ui/Button";
import { apiFetchServer } from "@/app/lib/api.server";
import { waLink } from "@/app/lib/whatsapp";
import { formatMoneyNGN } from "@/app/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const p = await apiFetchServer(`/api/products/${params.id}`);
    const isOut = p?.inStock === false;

    const message = `Hi MoodyMists Candles 👋🏽
I want to order:
• ${p.name}${p.size ? ` (${p.size})` : ""}
• Price: ${formatMoneyNGN(p.price)}

My delivery address:
Quantity: 1`;

    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Button href="/products" variant="outline">
          ← Back
        </Button>

        <div className="mt-6 grid lg:grid-cols-2 gap-10">
          <div className="rounded-3xl border border-pink-100 bg-white overflow-hidden">
            <img
              src={p.imageUrl || "/images/placeholder.jpg"}
              alt={p.name}
              className="w-full h-[420px] object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{p.name}</h1>
            <p className="mt-3 text-2xl font-extrabold text-gray-900">
              {formatMoneyNGN(p.price)}
            </p>

            <p className="mt-4 text-gray-600">
              {p.description || "Premium scented candle with a clean burn and strong throw."}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(p.notes || []).map((n: string) => (
                <span
                  key={n}
                  className="text-sm px-4 py-2 rounded-full bg-[var(--brand-soft)] border border-pink-200 text-[var(--brand)] font-semibold"
                >
                  {n}
                </span>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                href={isOut ? "#" : waLink(message)}
                className={isOut ? "pointer-events-none opacity-60" : ""}
              >
                {isOut ? "Out of stock" : "Order on WhatsApp"}
              </Button>
              <Button href="/products" variant="outline">
                Browse more
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (e: any) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="mt-6">
          <Button href="/products" variant="outline">
            Back to products
          </Button>
        </div>
      </main>
    );
  }
}