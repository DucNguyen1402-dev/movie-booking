import { CancelButton, SaveButton } from "@components/admin";
import { useEditMovieContext } from "@features/admin/movies/edit/contexts";

export default function ActionButtons() {
  const { editActions } = useEditMovieContext();

  return (
    <div className="mt-6 flex space-x-3">
      <SaveButton
        type="submit"
        onClick={editActions.onSaveClick}
        surface="deepDark"
      >
        Lưu thay đổi
      </SaveButton>
      <CancelButton onClick={editActions.onCancelClick} surface="deepDark">
        Hủy
      </CancelButton>
    </div>
  );
}
