import { DateInput, FormLabel, Textarea } from "@shared/fields";
import { AddButton, CancelButton } from "@shared/ui";

import { useSyncLeaveConfirmation } from "@features/admin/hooks";
import { useAddMovieActions } from "@features/admin/movies/add/hooks";
import { movieValidationRules } from "@features/admin/movies/config";

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

  return (
    <form onSubmit={handleSubmitEvent} className="space-y-6 pb-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputFields errors={errors} register={register} />
      </div>

      <div className="flex flex-col gap-3">
        <FormLabel htmlFor="moTa">Mô tả phim</FormLabel>
        <Textarea
          id="moTa"
          resizeKey={watch("moTa")}
          {...register("moTa", movieValidationRules.moTa)}

          error={errors.moTa?.message}
        />
      </div>

      <div className="mt-10 flex justify-between">
        <div className="flex min-w-1/3 flex-col gap-4">
          <FormLabel htmlFor="ngayKhoiChieu">Ngày khởi chiếu</FormLabel>
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
        <div />

        <div className="flex flex-col gap-3">
          <FormLabel htmlFor="Trang" className="cursor-default">
            Trạng thái phim
          </FormLabel>
          <CheckboxFields control={control} />
        </div>
      </div>

      <div className="mt-20">
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
