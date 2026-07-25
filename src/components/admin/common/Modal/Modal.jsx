import { useModalContext } from "@contexts/admin/modal";

import AddModal from "./AddModal/AddModal";
import Delete from "./Delete/Delete";
import EditModal from "./EditModal/EditModal";
import LeavePageModal from "./LeavePageModal/LeavePageModal";
import ShowtimeModal from "./Showtime/ShowTimeModal";

const MODALS = {
  deleteMovie: Delete,
  showtimeCreation: ShowtimeModal,
  addingMovie: AddModal,
  addingUser: AddModal,
  deleteUser: Delete,
  cancleEditUser: EditModal,
  editMovie: EditModal,
  leavePage: LeavePageModal,
  saveProfile: EditModal,
};

const Modal = () => {
  const { modal, close, handleConfirmAction } = useModalContext();

  const cancelHandler = modal.onCancel ?? close;
  const onCancel = () => cancelHandler();

  if (!modal.type) return null;

  const Component = MODALS[modal.type];

  return (
    <Component
      onCancel={onCancel}
      onConfirm={handleConfirmAction}
      title={modal.title}
      subtitle={modal.subtitle}
      loading={modal.loading}
    />
  );
};

export default Modal;
