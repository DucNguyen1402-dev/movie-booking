import { MODAL_TYPES } from "./index";
export const createChangePasswordModal = (account) => {
  return {
    type: MODAL_TYPES.EDIT,
    title: `Xác nhận đặt lại mật khẩu cho tài khoản "${account}"?`,
    subtitle: "Mật khẩu mới sẽ được cập nhật trên hệ thống.",
  };
};
