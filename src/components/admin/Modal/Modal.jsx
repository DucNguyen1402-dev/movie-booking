import { useModalContext } from "@contexts/admin/modal";

import AddModal from "./AddModal/AddModal"
import Delete from "./Delete/Delete";
import EditModal from "./EditModal/EditModal"
import LeavePageModal from "./LeavePageModal/LeavePageModal"
import ShowtimeModal from "./Showtime/ShowTimeModal"

const MODALS = {
  deleteMovie: Delete,
  showtimeCreation: ShowtimeModal,
  addingMovie: AddModal,
  addingUser: AddModal,
  deleteUser: Delete,
  cancleEditUser: EditModal,
  editMovie: EditModal,
  leavePage: LeavePageModal,
  saveProfile: EditModal
};

export default function Modal() {

  const { modal, close } = useModalContext();

  const cancelHandler = modal.onCancel ?? close;
  const onCancel = () => cancelHandler();
  const onConfirm = () => modal.onConfirm();


  if (!modal.type) return null;

  const Component = MODALS[modal.type];

  return <Component onCancel={onCancel} onConfirm={onConfirm} title = {modal.title} subtitle = {modal.subtitle}/>;
}
