import Button from "@/app/components/ui/Button";

export default function ShopHomePage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/70 to-white" />
        <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-[var(--brand-soft)] blur-3xl opacity-70" />
        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[var(--brand-soft)] blur-3xl opacity-70" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-pink-200 bg-white px-4 py-2 text-xs font-semibold text-[var(--brand)]">
                Hand-poured • Long-lasting • Premium scents
              </span>

              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                MoodyMists Candles —{" "}
                <span className="text-[var(--brand)]">calm in every burn.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                Beautiful scents for your room, your mood, and your moments.
                Shop our best sellers and order in seconds via WhatsApp.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/products">Shop Scents</Button>
                <Button href="/products" variant="outline">
                  View Best Sellers
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                {[
                  { k: "Fast Delivery", v: "Lagos & beyond" },
                  { k: "Premium Wax", v: "Clean burn" },
                  { k: "Strong Throw", v: "Fills the room" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-pink-100 bg-white p-4"
                  >
                    <p className="text-sm font-bold text-gray-900">{x.k}</p>
                    <p className="mt-1 text-xs text-gray-600">{x.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO CARD */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-[var(--brand-soft)] blur-2xl opacity-70" />

              <div className="relative rounded-[2.5rem] border border-pink-100 bg-white p-6 shadow-sm">
                <div className="rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-50 to-white p-6">
                  <p className="text-sm font-semibold text-[var(--brand)]">
                    Featured Mood
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-gray-900">
                    “Soft Girl Evening”
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Vanilla • Cream • Amber — cozy, sweet, and elegant.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {["Vanilla", "Strawberry", "Lavender"].map((x) => (
                      <div
                        key={x}
                        className="rounded-2xl border border-pink-100 bg-white p-3 text-center"
                      >
                        <p className="text-xs text-gray-500">Scent</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {x}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-pink-100 bg-white p-4">
                    <p className="text-xs text-gray-500">Perfect for</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      Bedrooms • Self-care nights • Gifts
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-pink-100 bg-white p-4">
                  <div>
                    <p className="text-xs text-gray-500">MoodyMists promise</p>
                    <p className="text-sm font-semibold text-gray-900">
                      Clean burn • Strong throw • Gift-ready
                    </p>
                  </div>
                  <span className="text-[var(--brand)] font-extrabold">MM</span>
                </div>
              </div>
            </div>
          </div>

          {/* WHY US */}
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Premium scents",
                text: "High-quality fragrance oils for a clean, luxurious smell.",
              },
              {
                title: "Long lasting",
                text: "Slow burn and strong scent throw that fills the room.",
              },
              {
                title: "Perfect gift",
                text: "Beautiful packaging and scents everyone loves.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-pink-100 bg-white p-6"
              >
                <p className="font-extrabold text-gray-900">{c.title}</p>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-pink-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="rounded-3xl border border-pink-100 bg-[var(--brand-soft)] p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Ready to pick a scent?
                </h3>
                <p className="mt-2 text-gray-700 max-w-xl">
                  Explore our candles and order in seconds via WhatsApp.
                </p>
              </div>

              <div className="flex gap-3">
                <Button href="/products">Shop Now</Button>
                <Button href="/products" variant="outline">
                  Browse Scents
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}