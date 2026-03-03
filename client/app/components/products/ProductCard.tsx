import Button from "@/app/components/ui/Button";
import { waLink } from "@/app/lib/whatsapp";
import { formatMoneyNGN } from "@/app/lib/format";

export type Product = {
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

export default function ProductCard({ p }: { p: Product }) {
  const message = `Hi MoodyMists Candles 👋🏽
I want to order:
• ${p.name}${p.size ? ` (${p.size})` : ""}
• Price: ${formatMoneyNGN(p.price)}

My delivery address:
My phone number:
Quantity: 1`;

  const isOut = p.inStock === false;

  return (
    <div className="rounded-2xl border border-pink-100 bg-white overflow-hidden shadow-sm hover:shadow transition">
      <div className="h-52 bg-pink-50 border-b border-pink-100">
        <img
          src={p.imageUrl || "/images/placeholder.jpg"}
          alt={p.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-gray-900">{p.name}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {p.size ? `${p.size} • ` : ""}
              {p.burnTime ? `${p.burnTime}` : "Long-lasting"}
            </p>
          </div>

          <p className="font-extrabold text-gray-900">
            {formatMoneyNGN(p.price)}
          </p>
        </div>

        {p.notes?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.notes.slice(0, 3).map((n) => (
              <span
                key={n}
                className="text-xs px-3 py-1 rounded-full bg-[var(--brand-soft)] border border-pink-200 text-[var(--brand)] font-semibold"
              >
                {n}
              </span>
            ))}
          </div>
        ) : null}

        {p.description ? (
          <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
            {p.description}
          </p>
        ) : (
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Hand-poured candle with a premium scent throw — perfect for your
            room, gifts, and relaxation.
          </p>
        )}

        <div className="mt-5 flex gap-3">
          <Button
            href={isOut ? "#" : waLink(message)}
            className={isOut ? "pointer-events-none opacity-60" : ""}
          >
            {isOut ? "Out of stock" : "Order on WhatsApp"}
          </Button>

          <Button href={`/products/${p._id}`} variant="outline">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}