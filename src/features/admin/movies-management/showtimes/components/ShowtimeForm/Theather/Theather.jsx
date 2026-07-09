import Select from "react-select";
import { Controller } from "react-hook-form";
import TheaterOption from "./TheaterOption";
import TheaterSingleValue from "./TheaterSingleValue";

export default function Theather({ list, control, isTheaterDisabled }) {
  const options = list.map((list) => ({
    value: list.maRap,
    label: list.tenRap,
  }));
  return (
    <div className="flex flex-col gap-1.5 text-slate-700">
      <label
        className="mb-2 cursor-pointer text-sm font-medium"
        htmlFor="theater"
      >
        Rạp
      </label>

      <Controller
        name="maRap"
        control={control}
        rules={{ required: "Vui lòng chọn rạp" }}
        render={({field, fieldState}) => (
          <>
            <Select
              inputId="theater"
              options={options}
              placeholder={
                isTheaterDisabled ? "Vui lòng chọn cụm rạp trước" : "Chọn rạp"
              }
              isDisabled={isTheaterDisabled}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: state.isDisabled
                    ? "#f9fafb"
                    : base.backgroundColor,
                }),
                placeholder: (base, state) => ({
                  ...base,
                  color: state.isDisabled ? "#9ca3af" : base.color,
                }),
              }}
              components={{
                Option: TheaterOption,
                SingleValue: TheaterSingleValue,
              }}
              value={
                options.find((option) => option.value === field.value) ?? null
              }
              onChange={(option) => field.onChange(option.value)}
            />
            {fieldState.error && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {fieldState.error.message}{" "}
              </p>
            )}
          </>
        )}
      />

      {/* <select
        id="theater"
        {...register("maRap", {
          required: "Vui lòng chọn rap",
        })}

        disabled={isTheaterDisabled}
        className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500 disabled:text-gray-400"
      >
        <option defaultValue="" className="text-gray-400">
          {isTheaterDisabled ? "Vui lòng chọn cụm rạp trước" : "Chọn rạp"}
        </option>
        {list.map((theater) => (
          <option key={theater.maRap} value={theater.maRap}>
            {theater.tenRap}
          </option>
        ))}
      </select>
      {errors.maRap && (
        <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
          {errors.maRap.message}
        </p>
      )} */}
    </div>
  );
}
