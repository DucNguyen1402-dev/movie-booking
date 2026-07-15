import { useShowtimeForm } from "../../hooks/useShowtimeForm";
import { validationRules } from "../../config/validation-rules";
import { useShowtimeActions } from "../../hooks/useShowtimeActions";
import { useCinemaSystems } from "../../hooks/useCinemaSystems";
import { useCinemaClusters } from "../../hooks/useCinemaClusters";
import { CancelButton, AddButton } from "@components/admin/buttons";
import CinemaSystems from "./CinemaSystems/CinemaSystems";
import CinemaClusters from "./CinemaClusters/CinemaClusters";
import Theather from "./Theather/Theather";
import DateInput from "@features/admin/shared/components/DateInput/DateInput";
import TicketPrice from "./TicketPrice/TicketPrice";
import Showtime from "./ShowtimePicker/ShowtimePicker";

export default function ShowtimeForm({ movie }) {
  const { handleSubmit, control, watch } = useShowtimeForm();
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
    <div className="relative space-y-6 rounded-3xl bg-gray-800 p-8 shadow-sm lg:col-span-2">
      <h2 className="text-2xl font-bold tracking-wide text-slate-100">
        Thông tin lịch chiếu
      </h2>

      <div>
        <form
          className="grid gap-5 md:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >
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
          <DateInput
            control={control}
            value={watch("ngayChieu")}
            name="ngayChieu"
            rules={{ required: "Vui lòng nhập ngày chiếu phim" }}
            disabled={isDatePickerDisabled}
            labels={{
              placeholder: "Chọn ngày chiếu",
              form: "Ngày chiếu",
              disabled: "Vui lòng chọn rạp chiếu trước",
              requied: "Vui lòng chọn ngày chiếu phim",
            }}
          />
          <TicketPrice
            control={control}
            watch={watch}
            validationRules={validationRules.giaVe}
            isTicketPriceDisabled={isTicketPriceDisabled}
          />
          <Showtime
            isTimePickerDisabled={isTimePickerDisabled}
            control={control}
            watch={watch}
          />
        </form>

        <div className="mt-12 flex justify-end gap-3">
          <CancelButton surface="dark" onClick={onCancelClick}>
            Hủy
          </CancelButton>

          <AddButton surface="dark" onClick={onConfirmClick}>
            Tạo lịch chiếu
          </AddButton>
        </div>
        <p className="absolute bottom-3 left-3 text-sm text-gray-300 italic">
          * Vui lòng kiểm tra kỹ thông tin trước khi tạo lịch chiếu.
        </p>
      </div>
    </div>
  );
}
