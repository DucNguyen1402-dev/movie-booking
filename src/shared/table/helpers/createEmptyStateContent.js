import { ENTITY_LABELS } from "@features/admin";

export const createEmptyStateContent = (entity, keyword) => {
  const entityLabel = ENTITY_LABELS[entity];

  return {
    title: `Không tìm thấy ${entityLabel}`,
    description: `Không có ${entityLabel} nào khớp với từ khóa "${keyword}".`,
  };
};
