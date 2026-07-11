import { format } from "date-fns";

export function formatDate(value) {
  const date = new Date(value);

  return format(value, "dd/MM/yyyy");
}
