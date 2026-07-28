import { useSyncLeaveConfirmation } from "@hooks/admin";
import { showtimeValidationRules } from "@features/admin/movies/showtimes/create/config";
import {
  useCinemaClusters,
  useCinemaSystems,
  useShowtimeActions,
  useShowtimeForm,
} from "@features/admin/movies/showtimes/create/hooks";
import { AddButton, CancelButton } from "@components/admin/ui/buttons";
import { DateInput, FormLabel } from "@components/admin/ui/form";

import {
  CinemaClusters,
  CinemaSystems,
  Showtime,
  Theather,
  TicketPrice,
} from ".";

const ShowtimeForm = ({ movie }) => {
  const { handleSubmit, control, watch, isDirty } = useShowtimeForm();
  const { onCancelClick, onConfirmClick } = useShowtimeActions({
    handleSubmit,
    movie,
  });

  useSyncLeaveConfirmation(isDirty);

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
          className="grid gap-x-6 gap-y-8 md:grid-cols-2"
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
          <div className="flex flex-col gap-3">
            <FormLabel
              htmlFor="ngayChieu"
              required={true}
              className={isTimePickerDisabled ? "text-slate-300" : ""}
            >
              Ngày chiếu
            </FormLabel>
            <DateInput
              control={control}
              value={watch("ngayChieu")}
              required={true}
              name="ngayChieu"
              rules={showtimeValidationRules.ngayChieu}
              disabled={isDatePickerDisabled}
              labels={{
                placeholder: "Chọn ngày chiếu",
                form: "Ngày chiếu",
                disabled: "Vui lòng chọn rạp chiếu trước",
                requied: "Vui lòng chọn ngày chiếu phim",
              }}
            />
          </div>
          <TicketPrice
            control={control}
            watch={watch}
            rules={showtimeValidationRules.giaVe}
            isTicketPriceDisabled={isTicketPriceDisabled}
          />
          <Showtime
            isTimePickerDisabled={isTimePickerDisabled}
            control={control}
            watch={watch}
            rules={showtimeValidationRules.gioChieu}
          />
        </form>

        <div className="mt-12 flex justify-end gap-3">
          <CancelButton surface="dark" onClick={onCancelClick}>
            Hủy
          </CancelButton>

          <AddButton surface="deepDark" onClick={onConfirmClick}>
            Tạo lịch chiếu
          </AddButton>
        </div>
        <p className="absolute bottom-3 left-3 text-sm text-gray-300 italic">
          * Vui lòng kiểm tra kỹ thông tin trước khi tạo lịch chiếu.
        </p>
      </div>
    </div>
  );
};

export default ShowtimeForm;
