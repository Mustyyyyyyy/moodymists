import { apiFetch } from "./api";

export async function requireAdmin() {
  return apiFetch("/api/auth/me", undefined, "GET");
}