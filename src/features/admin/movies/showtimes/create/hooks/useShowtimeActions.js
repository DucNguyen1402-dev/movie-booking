import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import {
  createAddModalContent,
  createUnsavedChangesModalContent,
} from "@helpers/admin/modal";
import { loading } from "@shared/loading";
import { format } from "date-fns";

import { useModalContext, useNotificationContext } from "@contexts/admin";
import { createShowtime } from "@features/admin/movies/showtimes/create/api";
import { ensureMinDuration } from "@utils/admin";
import {
  MIN_LOADING_TIME,
  MODAL_TYPES,
  NOTIFICATION_TYPES,
} from "@constants/admin";

export function useShowtimeActions({ handleSubmit, movie }) {
  const navigate = useNavigate();
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";

  const modal = useModalContext();
  const loader = loading.use();
  const { notificationActions } = useNotificationContext();

  const handleShowtimeCanceling = () => {
    modal.close();
    navigate(previousPath, { state: { history } });
  };

  const onCancelClick = () =>
    modal.open({
      type: MODAL_TYPES.UNSAVED_CHANGES,
      content: createUnsavedChangesModalContent(ENTITIES.showtime),
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
      loader.show();
      await createShowtime(payload);
      await ensureMinDuration(start, MIN_LOADING_TIME);
      loader.hide();
      navigate(previousPath, {
        state: {
          maCumRap,
          notification: {
            variant: NOTIFICATION_TYPES.SUCCESS,
            message: "Đã tạo lịch chiếu thành công.",
          },
          history,
        },
      });
    } catch (error) {
      loader.hide();
      notificationActions.show({
        variant: NOTIFICATION_TYPES.ERROR,
        message: error.response?.data?.content,
      });
    }
  };

  const onValid = (data) => {
    modal.open({
      type: MODAL_TYPES.ADD,
      content: createAddModalContent(ENTITIES.showtime),
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
