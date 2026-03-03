import { getToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, data?: any, method = "POST") {
  if (!BASE_URL) throw new Error("Missing NEXT_PUBLIC_API_URL");

  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: method !== "GET" ? JSON.stringify(data) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.message || "Request failed");
  return json;
}