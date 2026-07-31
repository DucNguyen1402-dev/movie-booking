import { format } from "date-fns";
export function createUpdateFormData(movie) {
  const formData = new FormData();

  Object.entries(movie).forEach(([key, value]) => {
    if (key === "ngayKhoiChieu") {
      formData.append(key, format(value, "dd/MM/yyyy"));
      return;
    }

    if (key === "hinhAnh") {
      const file = value?.[0];
      if (file) {
        formData.append("File", file);
      }
      return;
    }

    formData.append(key, value);
  });

  return formData;
}
