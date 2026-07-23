/**
 * Formatting + finance helpers. Currency ALWAYS routes through here so every
 * price on the site is identical: ₦42,000,000 — no decimals, never USD.
 */

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** Format a number of Naira, e.g. 42000000 -> "₦42,000,000". */
export function formatNaira(amount: number): string {
  return nairaFormatter.format(Math.round(amount));
}

const kmFormatter = new Intl.NumberFormat("en-NG", {
  maximumFractionDigits: 0,
});

/** Format mileage in km, e.g. 48000 -> "48,000 km". */
export function formatKm(km: number): string {
  return `${kmFormatter.format(km)} km`;
}

/**
 * Format a raw local number into +234 international form.
 * "08120004477" -> "+234 812 000 4477"
 */
export function formatPhone(local: string): string {
  const digits = local.replace(/\D/g, "").replace(/^0/, "");
  const national = digits.startsWith("234") ? digits.slice(3) : digits;
  const grouped = national.replace(/(\d{3})(\d{3})(\d{0,4}).*/, "$1 $2 $3").trim();
  return `+234 ${grouped}`;
}

/** wa.me link from a local Nigerian number. */
export function whatsappLink(local: string, message?: string): string {
  const digits = local.replace(/\D/g, "").replace(/^0/, "");
  const national = digits.startsWith("234") ? digits : `234${digits}`;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${national}${q}`;
}

/** Pluralise a body type for breadcrumbs: SUV -> SUVs, Bus -> Buses, Luxury -> Luxury cars. */
export function pluralBodyType(bodyType: string): string {
  if (bodyType === "Luxury") return "Luxury cars";
  if (bodyType.endsWith("s")) return `${bodyType}es`;
  return `${bodyType}s`;
}

/**
 * Amortised monthly repayment for a reducing-balance loan.
 * principal = price - downPayment. Returns a rounded Naira figure.
 */
export function monthlyRepayment(
  principal: number,
  annualRatePct: number,
  months: number,
): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}
