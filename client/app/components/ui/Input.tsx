import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({ label, hint, error, className = "", ...props }: Props) {
  return (
    <div className="space-y-1">
      {label ? (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      ) : null}

      <input
        {...props}
        className={`w-full rounded-xl border px-4 py-3 outline-none transition
          ${error ? "border-pink-400" : "border-gray-200 focus:border-pink-400"}
          ${className}`}
      />

      {error ? (
        <p className="text-xs font-semibold text-pink-700">{error}</p>
      ) : hint ? (
        <p className="text-xs text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}