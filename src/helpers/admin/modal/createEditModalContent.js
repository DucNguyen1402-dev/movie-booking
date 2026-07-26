import { ENTITY_LABELS } from "./index";

export const createEditModalContent = (entity) => {
  const entityLabel = ENTITY_LABELS[entity];

  return {
    title: `Xác nhận lưu thay đổi?`,
    subtitle: `Thông tin ${entityLabel} sẽ được thay đổi trên hệ thống.`,
  };
};
