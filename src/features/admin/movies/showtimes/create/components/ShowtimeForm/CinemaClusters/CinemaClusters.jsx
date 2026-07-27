import { Controller } from "react-hook-form";
import Select from "react-select";

import { FormLabel } from "@components/admin/ui/form";

import ClusterOption from "./ClusterOption";
import ClusterSingleValue from "./ClusterSingleValue";

const CinemaClusters = ({ cinemaClusters, control, isClusterDisabled }) => {
  const options = cinemaClusters.map((cluster) => ({
    value: cluster.maCumRap,
    label: cluster.tenCumRap,
    address: cluster.diaChi,
  }));

  return (
    <div className="flex flex-col gap-3">
      <FormLabel
        htmlFor="cinema-cluster"
        required={true}
        className={isClusterDisabled ? "text-slate-300" : ""}
      >
        Cụm rạp
      </FormLabel>

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
                  backgroundColor: state.isDisabled ? "#0F172ACC" : "#0F172A66",
                  borderColor: state.isFocused ? "#6366F1" : "#475569",
                  boxShadow: state.isFocused ? "0 0 0 2px #6366F133" : "none",
                  color: "#f8fafc",
                  "&:hover": {
                    borderColor: "#6366F1",
                  },

                  cursor: "pointer",
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
                Option: ClusterOption,
                SingleValue: ClusterSingleValue,
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
};

export default CinemaClusters;
