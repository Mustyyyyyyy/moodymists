import AdminTopbar from "@/app/components/layout/AdminTopbar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <AdminTopbar
        title="Dashboard"
      />

      <main className="p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Total Products", value: "—" },
            { title: "Featured", value: "—" },
            { title: "In Stock", value: "—" },
          ].map((x) => (
            <div
              key={x.title}
              className="rounded-2xl border border-pink-100 bg-white p-5"
            >
              <p className="text-sm text-gray-600">{x.title}</p>
              <p className="mt-2 text-2xl font-extrabold text-gray-900">
                {x.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-pink-100 bg-[var(--brand-soft)] p-5">
          <p className="font-bold text-gray-900">Next step</p>
          <p className="mt-1 text-sm text-gray-700">
            Go to{" "}
            <span className="font-semibold text-[var(--brand)]">Products</span>{" "}
            and add your candles.
          </p>
        </div>
      </main>
    </div>
  );
}