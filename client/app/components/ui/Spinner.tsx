export default function Spinner({ label }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-4 w-4 rounded-full border-2 border-pink-200 border-t-pink-600 animate-spin" />
      {label ? <span className="text-sm text-gray-600">{label}</span> : null}
    </div>
  );
}