import { ENTITY_LABELS, MODAL_TYPES } from "./index";

export const createAddModal = (entity) => {
  const entityLabel = ENTITY_LABELS[entity];

  return {
    type: MODAL_TYPES.ADD,
    title: `Xác nhận tạo ${entityLabel} mới.`,
    subtitle: `Hệ thống sẽ tạo ${entityLabel} mới với thông tin bạn đã nhập`,
  };
};
