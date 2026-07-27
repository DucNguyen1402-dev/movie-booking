import { validationRules } from "@config/admin";

import { useSyncLeaveConfirmation } from "@hooks/admin";
import { useAddMovieActions } from "@features/admin/movies/add/hooks";
import { AddButton, CancelButton } from "@components/admin/ui/buttons";
import { DateInput, Textarea } from "@components/admin/ui/form";

import { CheckboxFields, FileImageField, InputFields } from "./Fields";

const Form = () => {
  const {
    register,
    handleSubmitEvent,
    errors,
    handleFileChange,
    imgPreview,
    onCancelClick,
    watch,
    control,
    isDirty,
  } = useAddMovieActions();

  useSyncLeaveConfirmation(isDirty);

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <form onSubmit={handleSubmitEvent} className="space-y-6 pb-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputFields errors={errors} register={register} />
      </div>

      <Textarea
        label="Mô tả phim"
        name="moTa"
        rules={validationRules.moTa}
        error={errors.moTa}
        register={register}
        onInput={handleInput}
      />

      <div className="mt-5 flex justify-between">
        <div className="min-w-1/3">
          <DateInput
            control={control}
            value={watch("ngayKhoiChieu")}
            name="ngayKhoiChieu"
            rules={{ required: "Vui lòng nhập ngày khởi chiếu cho phim" }}
            labels={{
              placeholder: "Chọn ngày khởi chiếu",
              form: "Ngày khởi chiếu",

              requied: "Vui lòng chọn ngày khởi chiếu phim",
            }}
          />
        </div>

        <div className="flex flex-wrap gap-6 self-end py-2">
          <CheckboxFields control={control} />
        </div>
      </div>

      <div className="mt-12">
        <FileImageField
          register={register}
          error={errors.hinhAnh}
          handleFileChange={handleFileChange}
          imgPreview={imgPreview}
        />
      </div>

      <div className="mt-15 flex justify-end gap-5">
        <CancelButton type="button" onClick={onCancelClick} surface="dark">
          Hủy
        </CancelButton>
        <AddButton type="submit" surface="dark">
          Thêm Phim
        </AddButton>
      </div>

      <p className="text-sm text-gray-300 italic select-none">
        * Vui lòng kiểm tra kỹ thông tin trước khi tạo phim.
      </p>
    </form>
  );
};

export default Form;
