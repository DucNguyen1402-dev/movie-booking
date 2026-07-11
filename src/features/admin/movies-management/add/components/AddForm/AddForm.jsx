import { useAddMovie } from "../../hooks/useAddMovie";
import { validationRules } from "@config/admin/validation-rules";
import DateInput from "@features/admin/shared/components/DateInput/DateInput";

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
          <label className="mb-1 block text-sm font-medium text-neutral-600">
            Tên phim
          </label>
          <div className="space-y-2">
            <input
              type="text"
              {...register("tenPhim", validationRules.tenPhim)}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.tenPhim && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.tenPhim.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="mb-1 block text-sm font-medium text-neutral-600">
            Trailer (Link Youtube)
          </label>
          <div className="space-y-2">
            <input
              type="text"
              {...register("trailer", validationRules.trailer)}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.trailer && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.trailer.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label className="mb-1 block text-sm font-medium text-neutral-600">
          Mô tả phim
        </label>
        <div className="space-y-2">
          <textarea
            rows="3"
            {...register("moTa", validationRules.moTa)}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          {errors.moTa && (
            <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
              {errors.moTa.message}
            </p>
          )}
        </div>
      </div>

    

      <div className="flex justify-between gap-60">
        <div className = "grow ">
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
          <label className="inline-flex cursor-pointer items-center select-none">
            <input
              type="checkbox"
              {...register("hot")}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-800"
            />
            <span className="ml-2 text-sm text-neutral-700">Phim Hot</span>
          </label>
          <label className="inline-flex cursor-pointer items-center select-none">
            <input
              type="checkbox"
              {...register("dangChieu")}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-800"
            />
            <span className="ml-2 text-sm text-neutral-700">Đang chiếu</span>
          </label>
          <label className="inline-flex cursor-pointer items-center select-none">
            <input
              type="checkbox"
              {...register("sapChieu")}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-800"
            />
            <span className="ml-2 text-sm text-neutral-700">Sắp chiếu</span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-between rounded-sm border border-gray-300 px-5 py-3">
        <div className="flex flex-col gap-4">
          <label className="mb-1 block text-sm font-medium text-neutral-600">
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
              className="block w-fit text-sm text-neutral-500 file:mr-4 file:cursor-pointer file:rounded file:border-2 file:border-gray-100 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-500 file:transition-colors file:duration-300 hover:file:border-indigo-400"
            />
            {errors.hinhAnh && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
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

      <div className="mt-8 mb-2 flex justify-between border-t border-neutral-100 pt-4">
        <p className="text-sm text-gray-500 italic">
          * Vui lòng kiểm tra kỹ thông tin trước khi tạo phim.
        </p>
        <div className="flex gap-5">
          <button
            type="button"
            onClick={onCancelClick}
            className="cursor-pointer rounded bg-red-600 px-6 py-2 font-medium text-white transition-colors duration-300 hover:bg-red-700"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded bg-green-600 px-6 py-2 font-medium text-white transition-colors duration-300 hover:bg-green-700"
          >
            Thêm Phim
          </button>
        </div>
      </div>
    </form>
  );
}
