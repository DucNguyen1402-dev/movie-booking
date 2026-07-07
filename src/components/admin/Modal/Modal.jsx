import DeleteModal from "./DeleteModal";
import SaveChangesModal from "./EditModal/SaveMovieChangesModal";
import DiscardChangesModal from "./EditModal/DiscardMovieChangesModal"
import { useModalContext } from "@contexts/admin/ModalContext";


const MODALS = {
  deleteMovie: DeleteModal,
  discardMovieChanges: DiscardChangesModal,
  saveMovieChanges: SaveChangesModal
};

export default function Modal() {
  const {modal} = useModalContext();


  if (!modal.type) return null;

  const Component = MODALS[modal.type];

  return <Component/>;
}
