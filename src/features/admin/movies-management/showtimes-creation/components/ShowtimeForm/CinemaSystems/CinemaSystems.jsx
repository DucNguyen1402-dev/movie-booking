import Select from "react-select";
import { Controller } from "react-hook-form";
import { CinemaOption } from "./CinemaOption";
import { CinemaSingleValue } from "./CinemaSingleValue";

export default function CinemaSystems({ cinemaSystems, control }) {
  const options = cinemaSystems.map((system) => ({
    value: system.maHeThongRap,
    label: system.tenHeThongRap,
    logo: system.logo,
  }));

  return (
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
              inputId="cinema-system"
              options={options}
              placeholder="Chọn hệ thống rạp"
              components={{
                Option: CinemaOption,
                SingleValue: CinemaSingleValue,
              }}
              value={
                options.find((option) => option.value === field.value) ?? null
              }
              onChange={(option) => field.onChange(option.value)}
          
            />

            {fieldState.error && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
