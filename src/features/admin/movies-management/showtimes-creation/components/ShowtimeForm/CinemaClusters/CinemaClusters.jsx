import Select from "react-select";
import { Controller } from "react-hook-form";
import ClusterOption from "./ClusterOption";
import ClusterSingleValue from "./ClusterSingleValue";

export default function CinemaClusters({
  cinemaClusters,
  control,
  isClusterDisabled,
}) {
  const options = cinemaClusters.map((cluster) => ({
    value: cluster.maCumRap,
    label: cluster.tenCumRap,
    address: cluster.diaChi,
  }));

  return (
    <div className="flex flex-col gap-1.5 text-slate-700">
      <label
        className="mb-2 cursor-pointer text-sm font-medium"
        htmlFor="cinema-cluster"
      >
        Cụm rạp
      </label>

      <Controller
        name="maCumRap"
        control={control}
        rules={{ required: "Vui lòng chọn cụm rạp" }}
        render={({ field, fieldState }) => (
          <>
            <Select
              inputId="cinema-cluster"
              options={options}
              placeholder={
                isClusterDisabled
                  ? "Vui lòng chọn hệ thống rạp trước"
                  : "Chọn cụm rạp"
              }
              isDisabled={isClusterDisabled}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: state.isDisabled
                    ? "#f9fafb"
                    : base.backgroundColor,
                }),
                placeholder: (base, state) => ({
                  ...base,
                 color: state.isDisabled ? "#9ca3af" : base.color
                }),
              }}
              components={{
                Option: ClusterOption,
                SingleValue: ClusterSingleValue,
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
