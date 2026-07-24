export function formatCurrencyDisplay(value) {
  if (!value) return "";

  return Number(value).toLocaleString("vi-VN");
}
