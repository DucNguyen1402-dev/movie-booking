import { format } from "date-fns";

export const createMovieFormData = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    switch (key) {
      case "hinhAnh":
        formData.append("File", value[0], value[0].name);
        break;

      case "ngayKhoiChieu":
        formData.append(key, format(new Date(value), "dd/MM/yyyy"));
        break;

      default:
        formData.append(key, value);
    }
  });

  return formData;
};
