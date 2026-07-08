import { useModalContext } from "@contexts/admin/ModalContext";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useNavigate } from "react-router-dom";

export function useShowtimeActions({handleSubmit, movie}) {
  const navigate = useNavigate();
  const modal = useModalContext();

  const handleShowtimeCanceling = () => {
    modal.close();
    navigate("/admin/movies", { state: { movieId: movie.maPhim } });
  };

  const onCancelClick = () =>
    modal.open({
      type: MODAL_TYPES.SHOWTIME_CREATION,
      title: "Hủy tạo lịch chiếu?",
      subtitle: "Mọi thông tin bạn đã nhập sẽ không được lưu.",
      onConfirm: handleShowtimeCanceling,
    });

  const handleShowtimeCreation = () => {
    modal.close();
    navigate("/admin/movies", { state: { movieId: movie.maPhim } });
  };

  const onConfirmClick = () =>
    modal.open({
      type: MODAL_TYPES.SHOWTIME_CREATION,
      title: "Xác nhận tạo lịch chiếu?",
      subtitle: "Bạn có chắc muốn tạo lịch chiếu này?",
      onConfirm: handleSubmit(handleShowtimeCreation),
    });


    return {
        onCancelClick,
        onConfirmClick
    }
}
