import {
  AddModal,
  DeleteModal,
  EditModal,
  UnsavedChangesModal,
} from "@components/admin/common/Modal";
import { MODAL_TYPES } from "@constants/admin";

export const MODAL_CONFIG = {
  [MODAL_TYPES.ADD]: {
    Component: AddModal,
    loading: true,
  },
  [MODAL_TYPES.DELETE]: {
    Component: DeleteModal,
    loading: false,
  },
  [MODAL_TYPES.EDIT]: {
    Component: EditModal,
    loading: false,
  },
  [MODAL_TYPES.UNSAVED_CHANGES]: {
    Component: UnsavedChangesModal,
    loading: false,
  },
};
