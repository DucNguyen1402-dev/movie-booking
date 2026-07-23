import { useLocation,useNavigate } from "react-router-dom";

import { format } from "date-fns";

import {
  useLoadingContext,
  useModalContext,
  useNotificationContext,
} from "@contexts/admin";
import { createShowtime } from "@features/admin/movies/showtimes/create/api";
import {ensureMinDuration} from "@utils/admin"
import { MIN_LOADING_TIME,MODAL_TYPES } from "@constants/admin";

export function useShowtimeActions({ handleSubmit, movie }) {
  const navigate = useNavigate();
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";


  const modal = useModalContext();
  const { showLoading, hideLoading } = useLoadingContext();
  const { notificationActions } = useNotificationContext();


  
  const handleShowtimeCanceling = () => {
    modal.close();
    navigate(previousPath, { state: { history } });
  };

  const onCancelClick = () =>
    modal.open({
      type: MODAL_TYPES.SHOWTIME_CREATION,
      title: "Hủy tạo lịch chiếu?",
      subtitle: "Mọi thông tin bạn đã nhập sẽ không được lưu.",
      onConfirm: handleShowtimeCanceling,
    });

  const handleShowtimeCreation = async (data) => {
    const { ngayChieu, gioChieu, giaVe, maCumRap } = data;

    const start = new Date();

    //Chỗ này backend yêu cầu payload là maRap nhưng giá trị thực phải là maCumRap thì mới tạo lịch được
    const payload = {
      maRap: String(maCumRap),
      maPhim: movie.maPhim,
      ngayChieuGioChieu: `${format(ngayChieu, "dd/MM/yyyy")} ${gioChieu}:00`,
      giaVe: Number(giaVe),
    };


    try {
      modal.close();
      showLoading();
      await createShowtime(payload);
      await ensureMinDuration(start, MIN_LOADING_TIME)
      hideLoading();
      navigate(previousPath, {
        state: {
          maCumRap,
          notification: {
            variant: "success",
            message: "Đã tạo lịch chiếu thành công.",
          },
          history,
        },
      });
    } catch (error) {
      hideLoading();
      notificationActions.show({
        variant: "error",
        message: error.response?.data?.content,
      });
    }
  };

  const onValid = (data) => {
    modal.open({
      type: MODAL_TYPES.SHOWTIME_CREATION,
      title: "Xác nhận tạo lịch chiếu?",
      subtitle: "Bạn có chắc muốn tạo lịch chiếu này?",
      onConfirm: () =>
        handleShowtimeCreation({
          ...data,
          ngayChieu: format(data.ngayChieu, "yyyy-MM-dd"),
        }),
    });
  };

  const onConfirmClick = () => handleSubmit(onValid)();

  return {
    onCancelClick,
    onConfirmClick,
  };
}
