import {
  AddModal,
  DeleteModal,
  EditModal,
  UnsavedChangesModal,
} from "@components/admin/common/Modal";

export const MODAL_CONFIG = {
  delete: {
    Component: DeleteModal,
    loading: true,
  },
  add: {
    Component: AddModal,
    loading: false,
  },
  edit: {
    Component: EditModal,
    loading: false,
  },
  unsavedChanges: {
    Component: UnsavedChangesModal,
    loading: false,
  },
};
