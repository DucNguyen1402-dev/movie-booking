import { ENTITY_LABELS } from "./index";

export const createUnsavedChangesModalContent = (entity) => {
  const entityLabel = ENTITY_LABELS[entity];

  return {
    title: `Bạn có chắc muốn hủy?`,
    subtitle: `Thông tin ${entityLabel} sẽ không được lưu lại.`,
  };
};
