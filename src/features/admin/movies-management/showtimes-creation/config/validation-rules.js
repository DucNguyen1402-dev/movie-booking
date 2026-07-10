export const validationRules = {
  giaVe: {
    required: "Vui lòng nhập giá vé",
    min: {
      value: 75000,
      message: "Giá vé phải từ 75.000 VNĐ trở lên",
    },
    max: {
      value: 200000,
      message: "Giá vé không được vượt quá 200.000 VNĐ",
    },
    valueAsNumber: true,
  },

  ngayChieu: {
    required: "Vui lòng chọn ngày chiếu",
  },

  gioChieu: {
    required: "Vui lòng chọn giờ chiếu",
  },
};