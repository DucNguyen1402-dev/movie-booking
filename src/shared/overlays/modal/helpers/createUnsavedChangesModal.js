import { ENTITY_LABELS, MODAL_TYPES } from "./index";

export const createUnsavedChangesModal = (entity) => {
  const entityLabel = ENTITY_LABELS[entity];

  return {
    type: MODAL_TYPES.UNSAVED_CHANGES,
    title: `Bạn có chắc muốn hủy?`,
    subtitle: `Thông tin ${entityLabel} sẽ không được lưu lại.`,
  };
};
