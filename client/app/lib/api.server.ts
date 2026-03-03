const BASE_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL; 

export async function apiFetchServer(endpoint: string) {
  if (!BASE_URL) throw new Error("Missing API_URL (or NEXT_PUBLIC_API_URL)");

  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, { cache: "no-store" });

  const text = await res.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data;
}