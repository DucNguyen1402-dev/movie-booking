import { useShowtimeForm } from "../hooks/useShowtimeForm";
import { validationRules } from "../config/validation-rules";
import { useModalContext } from "@contexts/admin/ModalContext";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { useNavigate } from "react-router-dom";

export default function ShowtimeForm({ movie }) {
  const navigate = useNavigate();

  const { handleSubmit, register, errors } = useShowtimeForm({ movie });

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
      onConfirm: handleShowtimeCreation,
    });

  return (
    <div className="space-y-6 rounded-3xl bg-gray-50 p-6 shadow-sm lg:col-span-2">
      <h2 className="text-2xl font-bold tracking-wide text-slate-800">
        Thông tin lịch chiếu
      </h2>

      <div>
        <form className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-1.5 text-slate-700">
            <label
              className="mb-2 cursor-pointer text-sm font-medium"
              htmlFor="cinema-system"
            >
              Hệ thống rạp
            </label>

            <select
              id="cinema-system"
              {...register("heThongRapChieu", {
                required: "Vui lòng chọn hệ thống rạp",
              })}
              className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>CGV</option>
              <option>BHD</option>
              <option>Galaxy</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 text-slate-700">
            <label
              className="mb-2 cursor-pointer text-sm font-medium"
              htmlFor="cinema-cluster"
            >
              Cụm rạp
            </label>

            <select
              id="cinema-cluster"
              {...register("cumRapChieu", {
                required: "Vui lòng chọn cụm rạp",
              })}
              className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>CGV Vincom Đồng Khởi</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 text-slate-700">
            <label
              className="mb-2 cursor-pointer text-sm font-medium"
              htmlFor="theater"
            >
              Rạp
            </label>

            <select
              id="theater"
              {...register("maRap", {
                required: "Vui lòng chọn rap",
              })}
              className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Rạp 1</option>
              <option>Rạp 2</option>
              <option>Rạp 7</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 text-slate-700">
            <label
              className="mb-2 cursor-pointer text-sm font-medium"
              htmlFor="ticket-price"
            >
              Giá vé
            </label>

            <input
              type="number"
              id="ticket-price"
              {...register("giaVe", validationRules.giaVe)}
              className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-slate-700">
            <label
              className="mb-2 cursor-pointer text-sm font-medium"
              htmlFor="show-date"
            >
              Ngày chiếu
            </label>

            <input
              type="date"
              id="show-date"
              {...register("ngayChieu", validationRules.ngayChieu)}

              className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-slate-700">
            <label
              className="mb-2 cursor-pointer text-sm font-medium"
              htmlFor="show-time"
            >
              Giờ chiếu
            </label>

            <input
              type="time"
              id="show-time"
              {...register("gioChieu", validationRules.gioChieu)}
              className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="mt-12 flex justify-end gap-3">
          <button
            className="cursor-pointer rounded-md bg-rose-500 px-5 py-2 text-sm text-white transition-colors duration-300 hover:bg-rose-600"
            onClick={onCancelClick}
          >
            Hủy
          </button>

          <button
            onClick={onConfirmClick}
            className="cursor-pointer rounded-md bg-blue-600 px-5 py-2 text-sm text-white transition-colors duration-300 hover:bg-blue-700"
          >
            Tạo lịch chiếu
          </button>
        </div>
      </div>
    </div>
  );
}
