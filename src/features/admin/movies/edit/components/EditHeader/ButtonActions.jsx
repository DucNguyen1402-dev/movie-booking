import { CancelButton, SaveButton } from "@shared/ui";

import { useEditMovieContext } from "@features/admin/movies/edit/contexts";

const ActionButtons = () => {
  const {
    editActions: { onSaveClick, onCancelClick },
  } = useEditMovieContext();

  return (
    <div className="mt-6 flex space-x-3">
      <SaveButton type="submit" onClick={onSaveClick} surface="deepDark">
        Lưu thay đổi
      </SaveButton>
      <CancelButton onClick={onCancelClick} surface="deepDark">
        Hủy
      </CancelButton>
    </div>
  );
};

export default ActionButtons;
