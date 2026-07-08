import { useAddMovie } from "@features/admin/movies-management/add/hooks/useAddMovie";
import { validationRules } from "@config/admin/validation-rules";

export default function AddMovie() {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleFileChange,
    imgPreview,
  } = useAddMovie();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 pb-10">
      <div className="mx-auto min-w-4xl space-y-8 rounded-lg bg-gray-50 p-8 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-wider text-gray-900">
            Thông tin Phim
          </h2>
          <p className="text-sm text-gray-600">
            Điền thông tin đầy đủ và chính xác cho phim bạn muốn thêm
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="flex justify-between">
            <div className="mt-5 flex w-fit flex-col gap-2">
              <label className="mb-1 block text-sm font-medium text-neutral-600">
                Ngày khởi chiếu
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  {...register("ngayKhoiChieu", validationRules.ngayKhoiChieu)}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-gray-700 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                {errors.ngayKhoiChieu && (
                  <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                    {errors.ngayKhoiChieu.message}
                  </p>
                )}
              </div>
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
                <span className="ml-2 text-sm text-neutral-700">
                  Đang chiếu
                </span>
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

        <div className = "flex justify-between border border-gray-300 mt-8 rounded-sm px-5 py-3">
          <div className="flex flex-col gap-4 ">
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

          <div className="flex justify-end border-t border-neutral-100 pt-4">
            <button
              type="submit"
              className="cursor-pointer rounded bg-green-600 px-6 py-2 font-medium text-white transition-colors duration-300 hover:bg-green-700"
            >
              Thêm Phim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
