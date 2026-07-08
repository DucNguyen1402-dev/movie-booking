export const validationRules = {
  tenPhim: {
    required: "Tên phim không được bỏ trống",
    minLength: {
      value: 2,
      message: "Tên phim phải có ít nhất 2 ký tự",
    },
    maxLength: {
      value: 100,
      message: "Tên phim không được vượt quá 100 ký tự",
    },
  },

  trailer: {
    required: "Trailer không được bỏ trống",
    pattern: {
      value: /^(https?:\/\/).+/,
      message: "Trailer phải là một URL hợp lệ",
    },
  },

  moTa: {
    required: "Mô tả không được bỏ trống",
    minLength: {
      value: 10,
      message: "Mô tả phải có ít nhất 10 ký tự",
    },
    maxLength: {
      value: 1000,
      message: "Mô tả không được vượt quá 1000 ký tự",
    },
  },

  ngayKhoiChieu: {
    required: "Ngày khởi chiếu không được bỏ trống",
  },
  danhGia: {
    required: "Vui lòng nhập điểm đánh giá",
    min: {
      value: 1,
      message: "Điểm đánh giá phải từ 1 trở lên",
    },
    max: {
      value: 10,
      message: "Điểm đánh giá không được vượt quá 10",
    },
    valueAsNumber: true,
  },
};
