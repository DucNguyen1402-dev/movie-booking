import { useLocation, useNavigate } from "react-router-dom";

import { ENTITIES } from "@config/admin";
import { runWithLoading } from "@shared/async";
import { loading, modal } from "@shared/overlays";
import { toast, toastContent } from "@shared/toast";
import { format } from "date-fns";

import { createShowtime } from "@features/admin/movies/showtimes/create/api";

export function useShowtimeActions({ handleSubmit, movie }) {
  const navigate = useNavigate();
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "/admin/movies";

  const modalApi = modal.use();
  const loader = loading.use();
  const toaster = toast.use();

  const handleShowtimeCanceling = () =>
    navigate(previousPath, { state: { history } });
  const onCancelClick = async () =>
    modalApi.open({
      ...modal.config.unsavedChanges(ENTITIES.showtime),
      onConfirm: handleShowtimeCanceling,
    });

  const handleShowtimeCreation = async (data) => {
    const { ngayChieu, gioChieu, giaVe, maCumRap } = data;

    //Chỗ này backend requires payload là maRap nhưng giá trị thực truyền vào phải là maCumRap thì mới tạo lịch được
    //fix tạm :
    const payload = {
      maRap: String(maCumRap),
      maPhim: movie.maPhim,
      ngayChieuGioChieu: `${format(ngayChieu, "dd/MM/yyyy")} ${gioChieu}:00`,
      giaVe: Number(giaVe),
    };

    const createShowtimeTask = async () => await createShowtime(payload);

    try {
      await runWithLoading(createShowtimeTask, loader);
      navigate(previousPath, {
        state: {
          maCumRap,
          toastState: toastContent.success.add(ENTITIES.showtime),
          history,
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi xảy ra, vui lòng thử lại sau.";
      toaster.show(toastContent.error(message));
    }
  };

  const onValid = (data) => {
    modalApi.open({
      ...modal.config.add(ENTITIES.showtime),
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
