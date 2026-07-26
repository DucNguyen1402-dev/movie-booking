import { ENTITY_LABELS } from "./index";

export const createDeleteModalContent = (entity, name) => {
  const entityLabel = ENTITY_LABELS[entity];
  const target = name ? `${entityLabel} "${name}"` : entityLabel;

  return {
    title: `Bạn có chắc muốn xóa ${target}?`,
    subtitle: `Thông tin ${entityLabel} sẽ bị xóa khỏi hệ thống.`,
  };
};
