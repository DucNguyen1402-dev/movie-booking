import { MODAL_TYPES } from "./index";

export const createUnsavedPasswordChangesModal = () => {
  return {
    type: MODAL_TYPES.UNSAVED_CHANGES,
    title: `Bạn có chắc muốn hủy thay đổi?`,
    subtitle: "Mật khẩu bạn đã nhập sẽ không được lưu.",
  };
};
