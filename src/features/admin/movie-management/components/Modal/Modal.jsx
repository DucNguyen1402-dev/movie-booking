import DeleteModal from "./DeleteModal";
import SaveChangesModal from "./EditModal/SaveMovieChangesModal";
import DiscardChangesModal from "./EditModal/DiscardMovieChangesModal"
import { useSelector } from "react-redux";
import { selectModalState } from "../../redux/selectors";

const MODALS = {
  deleteMovie: DeleteModal,
  discardMovieChanges: DiscardChangesModal,
  saveMovieChanges: SaveChangesModal
};

export default function Modal() {
  const { type } = useSelector(selectModalState);

  if (!type) return null;

  const Component = MODALS[type];

  return <Component />;
}
