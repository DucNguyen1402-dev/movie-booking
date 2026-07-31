import { MODAL_TYPES } from "@shared/overlays/modal/constants";
import {
  AddModal,
  DeleteModal,
  EditModal,
  LeavePageModal,
  PasswordChangeModal,
  UnsavedChangesModal,
} from "@shared/overlays/modal/modals";

export const MODAL_TYPE_CONFIG = {
  [MODAL_TYPES.ADD]: {
    ModalComponent: AddModal,
    loading: false,
  },
  [MODAL_TYPES.DELETE]: {
    ModalComponent: DeleteModal,
    loading: true,
  },
  [MODAL_TYPES.EDIT]: {
    ModalComponent: EditModal,
    loading: false,
  },
  [MODAL_TYPES.UNSAVED_CHANGES]: {
    ModalComponent: UnsavedChangesModal,
    loading: false,
  },
  [MODAL_TYPES.LEAVE_PAGE]: {
    ModalComponent: LeavePageModal,
    loading: false,
  },
  [MODAL_TYPES.CHANGE_PASSWORD]: {
    ModalComponent: PasswordChangeModal,
    loading: false,
  },
};
