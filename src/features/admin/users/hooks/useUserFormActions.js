import { useLocation, useNavigate } from "react-router-dom";
import { useModalContext } from "@contexts/admin/ModalContext";
import { MODAL_TYPES } from "@constants/admin/modalTypes";

export function useUserFormActions({ handleSubmit }) {
  const modal = useModalContext();
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/users";

  const handleCancelAddUser = () => {
    modal.close();
    navigate(previousPath, { state: { history } });
  };
  const onCancelAddUserClick = () =>
    modal.open({
      type: MODAL_TYPES.ADDING_USER,
      title: "Bạn có chắc muốn hủy?",
      subtitle: "Thông tin của bạn sẽ không được lưu",
      onConfirm: handleCancelAddUser,
    });

  return {
    onCancelAddUserClick,
  };



  
}
