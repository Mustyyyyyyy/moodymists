import Link from "next/link";
import BrandLogo from "@/app/components/brand/BrandLogo";
import Button from "@/app/components/ui/Button";

export default function ShopNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-pink-100">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <BrandLogo href="/" priority />

        <nav className="flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link className="hover:text-[var(--brand)]" href="/products">
            Products
          </Link>

          <Button href="/products" className="hidden sm:inline-flex">
            Shop Now
          </Button>
        </nav>
      </div>
    </header>
  );
}