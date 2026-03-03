const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetchServer(endpoint: string) {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_API_URL");

  const res = await fetch(`${BASE_URL}${endpoint}`, { cache: "no-store" });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}