const BRAZILIAN_CURRENCY_PATTERN = /^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/;

export function parseBrazilianCurrency(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  if (!BRAZILIAN_CURRENCY_PATTERN.test(normalized)) {
    return null;
  }

  const amount = Number(normalized.replace(/\./g, "").replace(",", "."));

  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

export function formatBrazilianCurrency(value: string | number): string {
  const amount = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(amount)) {
    return "";
  }

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}