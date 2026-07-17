import { useForm } from "react-hook-form";
import { useModalContext } from "@contexts/admin/ModalContext";
import { MODAL_TYPES } from "@constants/admin/modalTypes";

export function useProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      taiKhoan: "",
      hoTen: "Nguyen Hoang Duc",
      email: "",
      soDt: "",
    },
  });

  const modal = useModalContext();

  const handleSaveProfile = () => {}

  const onInvalid = () => {};

  const onValid = () => modal.open({
    type: MODAL_TYPES.SAVE_PROFILE,
    title: "Xác nhận để sửa thông tin.",
    subtitle: "Thông tin của bạn sẽ được lưu thay đổi trên hệ thống.",
    onConfirm : handleSaveProfile
  });

  const onSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit(onValid, onInvalid)();
  }

  return {
    register,
    errors,
    onSubmitEvent,
  };
}
