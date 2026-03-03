import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({
  href = "/",
  size = 70,
  className = "",
  priority = false,
}: {
  href?: string;
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.jpeg"
        alt="MoodyMists Candles"
        width={size}
        height={size}
        priority={priority}
        className="rounded-xl"
      />
      <span className="font-extrabold tracking-tight text-gray-900">
        Moody<span className="text-[var(--brand)]">Mists</span>
      </span>
    </Link>
  );
}