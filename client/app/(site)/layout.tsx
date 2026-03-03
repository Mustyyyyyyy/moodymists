import ShopNavbar from "@/app/components/layout/ShopNavbar";
import ShopFooter from "@/app/components/layout/ShopFooter";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ShopNavbar />
      <div className="flex-1">{children}</div>
      <ShopFooter />
    </div>
  );
}