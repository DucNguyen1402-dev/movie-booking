const profileFieldConfigs = [
  { label: "TÀI KHOẢN", name: "taiKhoan", disabled: true },
  { label: "HỌ VÀ TÊN", name: "hoTen" },
  { label: "EMAIL", name: "email", type: "email" },
  { label: "SỐ ĐT", name: "soDT", type: "number" },
];

export const createProfileFields = () =>
  profileFieldConfigs.map((field) => ({
    ...field,
  }));
