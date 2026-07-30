import { TOAST_VARIANT } from "@shared/overlays/toast/constants";

import { ENTITY_LABELS } from "@features/admin";

const success = (message) => ({
  variant: TOAST_VARIANT.SUCCESS,
  message,
});

export const successToast = {
  add: (entity) =>
    success(`Thêm ${ENTITY_LABELS[entity]} vào hệ thống thành công.`),
  update: (entity) => success(`Cập nhật ${ENTITY_LABELS[entity]} thành công.`),
  delete: (entity) => success(`Xóa ${ENTITY_LABELS[entity]} thành công.`),
  changePassword: () =>
    success("Mật khẩu của bạn đã được thay đổi thành công."),
};
