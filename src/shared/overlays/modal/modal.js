import { useModalContext } from "./contexts";
import {
  createAddModal,
  createChangePasswordModal,
  createDeleteModal,
  createEditModal,
  createLeavePageModal,
  createUnsavedChangesModal,
  createUnsavedPasswordChangesModal,
} from "./helpers";

export const modal = {
  use: useModalContext,

  config: {
    add: createAddModal,
    delete: createDeleteModal,
    edit: createEditModal,
    leavePage: createLeavePageModal,
    passwordChange: createChangePasswordModal,
    unsavedPasswordChange: createUnsavedPasswordChangesModal,
    unsavedChanges: createUnsavedChangesModal,
  },
};
export default modal;
