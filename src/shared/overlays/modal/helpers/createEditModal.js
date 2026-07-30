import { ENTITY_LABELS, MODAL_TYPES } from "./index";

export const createEditModal = (entity) => {
  const entityLabel = ENTITY_LABELS[entity];

  return {
    type: MODAL_TYPES.EDIT,
    title: `Xác nhận lưu thay đổi?`,
    subtitle: `Thông tin ${entityLabel} sẽ được thay đổi trên hệ thống.`,
  };
};
