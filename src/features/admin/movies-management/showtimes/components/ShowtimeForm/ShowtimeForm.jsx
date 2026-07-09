import { useShowtimeForm } from "../../hooks/useShowtimeForm";
import { validationRules } from "../../config/validation-rules";
import { useShowtimeActions } from "../../hooks/useShowtimeActions";
import { useCinemaSystems } from "../../hooks/useCinemaSystems";
import { useCinemaClusters } from "../../hooks/useCinemaClusters";
import CinemaSystems from "./CinemaSystems/CinemaSystems";
import CinemaClusters from "./CinemaClusters/CinemaClusters";
import Theather from "./Theather/Theather";
import ShowDate from "./ShowDate/ShowDate";
import TicketPrice from "./TicketPrice/TicketPrice";
import Showtime from "./ShowTime/Showtime";

export default function ShowtimeForm({ movie }) {
  const { handleSubmit, control, watch,  getValues, setValue } = useShowtimeForm({
    movie,
  });
  const { onCancelClick, onConfirmClick } = useShowtimeActions({
    handleSubmit,
    movie,
  });

  const { data: cinemaSystems = [] } = useCinemaSystems();

  const selectedCinemaSystem = watch("maHeThongRap");
  const selectedCluster = watch("maCumRap");
  const selectedTheater = watch("maRap");

  const { data: cinemaClusters = [] } = useCinemaClusters(selectedCinemaSystem);

  const isClusterDisabled = !selectedCinemaSystem;
  const isTheaterDisabled = !selectedCluster;
  const isDatePickerDisabled = !selectedTheater;
  const isTicketPriceDisabled = !selectedTheater;
  const isTimePickerDisabled = !selectedTheater;

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
          <ShowDate
            control={control}
            watch={watch}
            isDatePickerDisabled={isDatePickerDisabled}
          />
          <TicketPrice
            control={control}
            watch={watch}
            validationRules={validationRules.giaVe}
            isTicketPriceDisabled={isTicketPriceDisabled}
          />
          <Showtime
            isTimePickerDisabled={isTimePickerDisabled}
            control = {control}
              watch = {watch}
          />
          s
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
