const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

export function waLink(message: string) {
  if (!PHONE) throw new Error("Missing NEXT_PUBLIC_WHATSAPP_PHONE");
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}