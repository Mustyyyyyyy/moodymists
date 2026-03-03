export default function ShopFooter() {
  return (
    <footer className="border-t border-pink-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} MoodyMists Candles. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            Made with <span className="text-[var(--brand)]">♥</span> in Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}