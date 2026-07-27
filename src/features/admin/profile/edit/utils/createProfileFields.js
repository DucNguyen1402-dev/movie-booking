const profileFieldConfigs = [
  { label: "TÀI KHOẢN", name: "taiKhoan", disabled: true, required: false },
  { label: "HỌ VÀ TÊN", name: "hoTen", required: true },
  { label: "EMAIL", name: "email", type: "email", required: true },
  { label: "SỐ ĐT", name: "soDT", type: "number", required: false },
];

export const createProfileFields = () =>
  profileFieldConfigs.map((field) => ({
    ...field,
  }));
