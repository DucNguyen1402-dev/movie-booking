import { ENTITY_LABELS } from "./index";

export const createAddModalContent = (entity) => {
  const entityLabel = ENTITY_LABELS[entity];

  return {
    title: `Xác nhận tạo ${entityLabel} mới.`,
    subtitle: `Hệ thông sẽ tạo ${entityLabel} mới với thông tin bạn đã nhập`,
  };
};
