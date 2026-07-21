export const validationRules = {
  taiKhoan: {
    required: "Vui lòng nhập tài khoản",
    minLength: {
      value: 4,
      message: "Tài khoản phải có ít nhất 4 ký tự",
    },
    maxLength: {
      value: 20,
      message: "Tài khoản không được vượt quá 20 ký tự",
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Chỉ được chứa chữ, số và dấu gạch dưới (_)",
    },
  },

  matKhau: {
    required: "Vui lòng nhập mật khẩu",
    minLength: {
      value: 6,
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    },
    maxLength: {
      value: 32,
      message: "Mật khẩu không được vượt quá 32 ký tự",
    },
  },

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
      value: /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
      message: "Số điện thoại không hợp lệ",
    },
  },

  maLoaiNguoiDung: {
    required: "Vui lòng chọn loại người dùng",
  },
};