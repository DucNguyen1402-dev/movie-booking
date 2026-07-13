import { useModalContext } from "@contexts/admin/ModalContext";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useNavigate, useLocation } from "react-router-dom";

export function useEditActions({ handleSubmit }) {
  const navigate = useNavigate();
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/users";
  const modal = useModalContext();

  const handleCancelEdit = () => {
    modal.close();
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const onCancelEditClick = () =>
    modal.open({
      type: MODAL_TYPES.CANCEL_EDIT_USER,
      title: "Hủy thay đổi?",
      subtitle: "Mọi thông tin của bạn sẽ không được lưu",
      onConfirm: handleCancelEdit,
    });



    


  return {
    onCancelEditClick,
  };
}
