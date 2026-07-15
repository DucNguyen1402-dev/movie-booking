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
    <div className="flex flex-col gap-1.5 ">
      <label
        className="mb-2 cursor-pointer text-sm font-medium text-slate-200"
        htmlFor="theater"
      >
        Rạp
      </label>

      <Controller
        name="maRap"
        control={control}
        rules={{ required: "Vui lòng chọn rạp" }}
        render={({ field, fieldState }) => (
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
                  backgroundColor: "#1e293b",
                  borderColor: state.isFocused ? "#3b82f6" : "#475569",
                  color: "#f8fafc",
                  boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
                  "&:hover": {
                    borderColor: "#3b82f6",
                  },
                }),

                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),

                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1e293b",
                  zIndex: 9999,
                }),

                menuList: (base) => ({
                  ...base,
                  backgroundColor: "#1e293b",
                }),

                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#2563eb"
                    : state.isFocused
                      ? "#334155"
                      : "#1e293b",
                  color: "#f8fafc",
                  cursor: "pointer",
                }),

                singleValue: (base) => ({
                  ...base,
                  color: "#f8fafc",
                }),

                input: (base) => ({
                  ...base,
                  color: "#f8fafc",
                }),

                placeholder: (base, state) => ({
                  ...base,
                  color: state.isDisabled ? "#64748b" : "#94a3b8",
                }),

                indicatorSeparator: (base) => ({
                  ...base,
                  backgroundColor: "#475569",
                }),

                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#94a3b8",
                  "&:hover": {
                    color: "#f8fafc",
                  },
                }),
              }}
              classNames={{
                menuList: () => "custom-scrollbar",
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
               <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
