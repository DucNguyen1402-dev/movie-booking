import { useAddMovie } from "../../hooks/useAddMovie";
import { validationRules } from "@config/admin/validation-rules";
import DateInput from "@features/admin/shared/components/DateInput/DateInput";
import CheckBox from "@features/admin/shared/components/CheckBox";
import { CancelButton, AddButton } from "@components/admin/buttons";

export default function AddForm() {
  const {
    register,
    handleSubmitEvent,
    errors,
    handleFileChange,
    imgPreview,
    onCancelClick,
    watch,
    control,
  } = useAddMovie();

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Tên phim
          </label>
          <div className="space-y-2">
            <input
              type="text"
              {...register("tenPhim", validationRules.tenPhim)}
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.tenPhim && (
              <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
                {errors.tenPhim.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="mb-1 block text-sm font-medium text-slate-300">
            Trailer (Link Youtube)
          </label>
          <div className="space-y-2">
            <input
              type="text"
              {...register("trailer", validationRules.trailer)}
              className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.trailer && (
              <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
                {errors.trailer.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label className="mb-1 block text-sm font-medium text-slate-300">
          Mô tả phim
        </label>
        <div className="space-y-2">
          <textarea
            rows="3"
            {...register("moTa", validationRules.moTa)}
            className="w-full rounded border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          {errors.moTa && (
            <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
              {errors.moTa.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between gap-60">
        <div className="grow">
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
          <CheckBox name="hot" control={control} label="hot" />
          <CheckBox name="dangChieu" control={control} label="Đang chiếu" />
          <CheckBox name="sapChieu" control={control} label="Sắp chiếu" />
        </div>
      </div>

      <div className="mt-8 flex justify-between rounded-sm border border-gray-600 px-5 py-3">
        <div className="flex flex-col gap-4">
          <label className="mb-1 block text-sm font-medium text-slate-200">
            Hình ảnh phim
          </label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              {...register("hinhAnh", {
                required: "Vui lòng chọn hình ảnh",
                onChange: handleFileChange,
              })}
              className="block w-fit text-sm text-slate-200 file:mr-4 file:cursor-pointer file:rounded file:border-2 file:border-indigo-500 file:bg-indigo-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-100 file:transition-colors file:duration-300 hover:file:border-indigo-400"
            />
            {errors.hinhAnh && (
              <p className="z-20 mt-2 w-full rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
                {errors.hinhAnh.message}
              </p>
            )}
          </div>
        </div>
        {imgPreview && (
          <div>
            <img
              src={imgPreview}
              alt="Preview"
              className="h-full w-32 rounded border border-neutral-200 object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-8 mb-2 flex justify-between border-t border-neutral-200 pt-4">
        <p className="text-sm text-gray-300 italic">
          * Vui lòng kiểm tra kỹ thông tin trước khi tạo phim.
        </p>
        <div className="flex gap-5">
          <CancelButton type="button" onClick={onCancelClick} surface="dark">
            Hủy
          </CancelButton>
          <AddButton type="submit" surface="dark">
            Thêm Phim
          </AddButton>
        </div>
      </div>
    </form>
  );
}
