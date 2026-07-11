import Delete from "./Delete/Delete";
import SaveChangesModal from "./EditModal/SaveMovieChangesModal";
import DiscardChangesModal from "./EditModal/DiscardMovieChangesModal";
import ShowtimeModal from "./Showtime/ShowTimeModal"
import AddModal from "./AddModal/AddModal"
import { useModalContext } from "@contexts/admin/ModalContext";


const MODALS = {
  deleteMovie: Delete,
  discardMovieChanges: DiscardChangesModal,
  saveMovieChanges: SaveChangesModal,
  showtimeCreation: ShowtimeModal,
  addingMovie: AddModal,
  addingUser: AddModal
};

export default function Modal() {
  const { modal, close } = useModalContext();

  const onCancel = () => close();
  const onConfirm = () => modal.onConfirm();

  if (!modal.type) return null;

  const Component = MODALS[modal.type];

  return <Component onCancel={onCancel} onConfirm={onConfirm} title = {modal.title} subtitle = {modal.subtitle}/>;
}
