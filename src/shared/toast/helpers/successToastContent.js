import { ENTITIES } from "@config/admin/";
import { TOAST_VARIANT } from "@shared/toast";

const createSuccessContent = (message) => ({
  variant: TOAST_VARIANT.SUCCESS,
  message,
});

export const successToastContent = {
  forAdd: (entity) =>
    createSuccessContent(
      `Thêm ${ENTITIES[entity]} mới thành công vào hệ thống.`,
    ),
  forUpdate: (entity) =>
    createSuccessContent(
      `Cập nhật ${ENTITIES[entity]} thành công vào hệ thống.`,
    ),
  forDelete: (entity) =>
    createSuccessContent(`Xóa ${ENTITIES[entity]} thành công vào hệ thống.`),
  forChangePassword: () =>
    createSuccessContent("Mật khẩu của bạn đã được thay đổi thành công."),
};
