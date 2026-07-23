import { useSyncLeaveConfirmation } from "@hooks/admin";

import { useEditMovieContext } from "@features/admin/movies/edit/contexts";

import { validationRules } from "@config/admin";

import { Textarea, DateInput } from "@components/admin";
import { InputFields, CheckboxFields } from "./FormFields";


export default function EditFormFields() {
  const {
    editForm: { register, errors, watch, control, isDirty },
  } = useEditMovieContext();

  useSyncLeaveConfirmation(isDirty);

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="space-y-8 rounded-xl bg-gray-800 p-8 shadow-sm lg:col-span-2">
      <InputFields errors={errors} register={register} />

      <div className="flex items-center justify-between">
        <div className="w-1/3">
          <DateInput
            control={control}
            value={watch("ngayKhoiChieu")}
            name="ngayKhoiChieu"
            rules={validationRules.ngayKhoiChieu}
            labels={{
              placeholder: "Chọn ngày khởi chiếu",
              form: "Ngày khởi chiếu",

              requied: "Vui lòng chọn ngày khởi chiếu phim",
            }}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className="text-sm font-semibold text-slate-200">
            Trạng thái phim
          </label>
          <CheckboxFields control={control} />
        </div>
      </div>

      <div className="mt-14">
        <Textarea
          label="Mô tả phim"
          name="moTa"
          rules={validationRules.moTa}
          error={errors.moTa}
          register={register}
          onInput={handleInput}
        />
      </div>
    </div>
  );
}
