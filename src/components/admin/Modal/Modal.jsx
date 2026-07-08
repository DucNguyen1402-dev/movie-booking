import DeleteModal from "./DeleteModal";
import SaveChangesModal from "./EditModal/SaveMovieChangesModal";
import DiscardChangesModal from "./EditModal/DiscardMovieChangesModal";
import ShowtimeModal from "./Showtime/ShowTimeModal"
import { useModalContext } from "@contexts/admin/ModalContext";


const MODALS = {
  deleteMovie: DeleteModal,
  discardMovieChanges: DiscardChangesModal,
  saveMovieChanges: SaveChangesModal,
  showtimeCreation: ShowtimeModal
};

export default function Modal() {
  const { modal, close } = useModalContext();

  const onCancel = () => close();
  const onConfirm = () => modal.onConfirm();

  if (!modal.type) return null;

  const Component = MODALS[modal.type];

  return <Component onCancel={onCancel} onConfirm={onConfirm} title = {modal.title} subtitle = {modal.subtitle}/>;
}
