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


export const userValidationRules = {
  hoTen: {
    required: "Vui lòng nhập họ tên",
    minLength: {
      value: 2,
      message: "Họ tên phải có ít nhất 2 ký tự",
    },
    maxLength: {
      value: 50,
      message: "Họ tên không được vượt quá 50 ký tự",
    },
    pattern: {
      value: /^[A-Za-zÀ-ỹ\s]+$/,
      message: "Họ tên chỉ được chứa chữ cái và khoảng trắng",
    },
  },

  email: {
    required: "Vui lòng nhập email",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email không hợp lệ",
    },
  },

  soDt: {
    required: "Vui lòng nhập số điện thoại",
    pattern: {
      value: /^(0|\+84)(3|5|7|8|9)\d{8}$/,
      message: "Số điện thoại không hợp lệ",
    },
  },
};