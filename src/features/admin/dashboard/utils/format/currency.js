export function formatCompactCurrency(value) {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} tỷ`;
  }

  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)} triệu`;
  }

  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}



export function formatCurrency(
  value,
  {
    currency = "VND",
    locale = "vi-VN",
  } = {}
) {
  return value.toLocaleString(locale, {
    style: "currency",
    currency,
  });
}