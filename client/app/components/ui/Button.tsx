import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "outline";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)]"
      : "border border-pink-200 bg-white text-[var(--brand)] hover:bg-[var(--brand-soft)]";

  if (href) {
    return (
      <Link className={`${base} ${styles} ${className}`} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}