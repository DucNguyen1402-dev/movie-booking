import { useShowtimeForm } from "../../hooks/useShowtimeForm";
import { validationRules } from "../../config/validation-rules";
import { useShowtimeActions } from "../../hooks/useShowtimeActions";
import { useCinemaSystems } from "../../hooks/useCinemaSystems";
import { useCinemaClusters } from "../../hooks/useCinemaClusters";
import CinemaSystems from "./CinemaSystems/CinemaSystems";
import CinemaClusters from "./CinemaClusters/CinemaClusters";
import Theather from "./Theather/Theather";
import ShowDate from "../ShowDate/ShowDate"

export default function ShowtimeForm({ movie }) {
  const { handleSubmit, register, errors, control, watch , getValues} = useShowtimeForm({
    movie,
  });
  const { onCancelClick, onConfirmClick } = useShowtimeActions({
    handleSubmit,
    movie,
  });

  const { data: cinemaSystems = [] } = useCinemaSystems();
  const selectedCinemaSystem = watch("maHeThongRap");
  const isClusterDisabled = !selectedCinemaSystem;
  const { data: cinemaClusters = [] } = useCinemaClusters(selectedCinemaSystem);
  const selectedCluster = watch("maCumRap");
  const isTheaterDisabled = !selectedCluster;

  let theaterList =
    cinemaClusters.find((cluster) => cluster.maCumRap === selectedCluster)
      ?.danhSachRap ?? [];

  return (
    <div className="space-y-6 rounded-3xl bg-gray-50 p-6 shadow-sm lg:col-span-2">
      <h2 className="text-2xl font-bold tracking-wide text-slate-800">
        Thông tin lịch chiếu
      </h2>

      <div>
        <form className="grid gap-5 md:grid-cols-2">
          <CinemaSystems cinemaSystems={cinemaSystems} control={control} />
          <CinemaClusters
            cinemaClusters={cinemaClusters}
            control={control}
            isClusterDisabled={isClusterDisabled}
          />
          <Theather
            list={theaterList}
            control={control}
            isTheaterDisabled={isTheaterDisabled}
          />
          <ShowDate control ={control} getValues = {getValues} watch ={watch}/>

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
              placeholder="VND"
              {...register("giaVe", validationRules.giaVe)}
              className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.giaVe && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.giaVe.message}
              </p>
            )}
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
            {errors.gioChieu && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.gioChieu.message}
              </p>
            )}
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
