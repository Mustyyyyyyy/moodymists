import Button from "@/app/components/ui/Button";
import { apiFetch } from "@/app/lib/api";
import { waLink } from "@/app/lib/whatsapp";
import { formatMoneyNGN } from "@/app/lib/format";

export const dynamic = "force-dynamic";

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

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const p: Product = await apiFetch(`/api/products/${params.id}`, {
    method: "GET",
  });

  const isOut = p.inStock === false;

  const message = `Hi MoodyMists Candles 👋🏽
I want to order:
• ${p.name}${p.size ? ` (${p.size})` : ""}
• Price: ${formatMoneyNGN(p.price)}

My delivery address:
My phone number:
Quantity: 1`;

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-6">
        <Button href="/products" variant="outline">
          ← Back to Products
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl border border-pink-100 bg-white overflow-hidden shadow-sm">
          <div className="aspect-[4/3] bg-pink-50">
            <img
              src={p.imageUrl || "/images/placeholder.jpg"}
              alt={p.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-5 border-t border-pink-100">
            <div className="flex flex-wrap gap-2">
              {p.featured ? (
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--brand-soft)] border border-pink-200 text-[var(--brand)] font-semibold">
                  Best Seller
                </span>
              ) : null}
              <span
                className={`text-xs px-3 py-1 rounded-full border font-semibold ${
                  isOut
                    ? "bg-white border-gray-200 text-gray-500"
                    : "bg-white border-pink-100 text-gray-700"
                }`}
              >
                {isOut ? "Out of stock" : "In stock"}
              </span>
              {p.size ? (
                <span className="text-xs px-3 py-1 rounded-full bg-white border border-pink-100 text-gray-700 font-semibold">
                  {p.size}
                </span>
              ) : null}
              {p.burnTime ? (
                <span className="text-xs px-3 py-1 rounded-full bg-white border border-pink-100 text-gray-700 font-semibold">
                  {p.burnTime}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {p.name}
          </h1>

          <p className="mt-3 text-2xl font-extrabold text-gray-900">
            {formatMoneyNGN(p.price)}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {p.description ||
              "Hand-poured candle with a premium scent throw — perfect for your room, gifts, and relaxation."}
          </p>

          <div className="mt-6">
            <h3 className="font-bold text-gray-900">Scent Notes</h3>
            {p.notes?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.notes.map((n) => (
                  <span
                    key={n}
                    className="text-sm px-4 py-2 rounded-full bg-[var(--brand-soft)] border border-pink-200 text-[var(--brand)] font-semibold"
                  >
                    {n}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Vanilla • Warm spices • Soft florals (example)
              </p>
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-pink-100 bg-white p-5">
            <h3 className="font-bold text-gray-900">Order this candle</h3>
            <p className="mt-2 text-sm text-gray-600">
              Click below to order via WhatsApp. You can edit the message to add
              your quantity and delivery address.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
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

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { title: "Clean burn", text: "Premium wax & steady flame." },
              { title: "Strong throw", text: "Fills your room nicely." },
              { title: "Gift-ready", text: "Beautiful and classy." },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-pink-100 bg-white p-4"
              >
                <p className="font-bold text-gray-900">{x.title}</p>
                <p className="mt-1 text-sm text-gray-600">{x.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}