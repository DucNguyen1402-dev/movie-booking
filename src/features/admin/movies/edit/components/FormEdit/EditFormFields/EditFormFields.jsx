import { validationRules } from "@config/admin";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useEditMovieContext } from "@features/admin/movies/edit/contexts";
import { DateInput, FormLabel, Textarea } from "@components/admin/ui/form";

import { CheckboxFields, InputFields } from "./FormFields";

const EditFormFields = () => {
  const {
    editForm: { register, errors, watch, control, isDirty },
  } = useEditMovieContext();

  useSyncLeaveConfirmation(isDirty);

  const registerField = register("moTa", validationRules.moTa);
  const description = watch("moTa");

  return (
    <div className="space-y-8 rounded-xl bg-gray-800 p-8 pb-60 shadow-sm lg:col-span-2">
      <InputFields errors={errors} register={register} />
      <div className="flex flex-col gap-4">
        <FormLabel htmlFor="moTa" required={false}>
          Mô tả phim
        </FormLabel>
        <Textarea
          id="moTa"
          error={errors.moTa?.message}
          resizeKey={description}
          inputRef={registerField.ref}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex w-2/5 flex-col gap-4">
          <FormLabel htmlFor="ngayKhoiChieu" required={true}>
            Ngày khởi chiếu
          </FormLabel>
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
          <FormLabel>Trạng thái phim</FormLabel>
          <CheckboxFields control={control} />
        </div>
      </div>
    </div>
  );
};

export default EditFormFields;
