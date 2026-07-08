import { useShowtimeForm } from "../../hooks/useShowtimeForm";
import { validationRules } from "../../config/validation-rules";
import { useShowtimeActions } from "../../hooks/useShowtimeActions";
import { useCinemaSystems } from "../../hooks/useCinemaSystems";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { CinemaOption } from "./CinemaOption";
import { CinemaSingleValue } from "./CinemaSingleValue";

export default function ShowtimeForm({ movie }) {
  // const { handleSubmit, register, errors } = useShowtimeForm({ movie });


   const {data : cinemaSystems =[]} = useCinemaSystems();


  const { control, handleSubmit, register,  formState: { errors }, } = useForm();
    const { onCancelClick, onConfirmClick } = useShowtimeActions({
    handleSubmit,
    movie,
  });

  const options = cinemaSystems.map((system) => ({
    value: system.maHeThongRap,
    label: system.tenHeThongRap,
    logo: system.logo,
  }));

  const onSubmit = (data) => {
    console.log(data);
  };

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

            <Controller
              name="maHeThongRap"
              control={control}
              rules={{
                required: "Vui lòng chọn hệ thống rạp",
              }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={options}
                    placeholder="Chọn hệ thống rạp"
                    components={{
                      Option: CinemaOption,
                      SingleValue: CinemaSingleValue,
                    }}
                    value={
                      options.find((option) => option.value === field.value) ??
                      null
                    }
                    onChange={(option) => field.onChange(option.value)}
                  />

                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
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
            {errors.cumRapChieu && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.cumRapChieu.message}
              </p>
            )}
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
            {errors.maRap && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.maRap.message}
              </p>
            )}
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
            {errors.ngayChieu && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.ngayChieu.message}
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
