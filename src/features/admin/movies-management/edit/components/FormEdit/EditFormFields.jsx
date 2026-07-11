import { LockKeyhole, Star } from "lucide-react";
import { useEditMovie } from "../../contexts/EditContext";
import { getRateClasses } from "../../config/editConfig";
import { validationRules } from "@config/admin/validation-rules";

export default function EditFormFields() {
  const {
    editStates,
    editForm: { register, errors ,watch},
  } = useEditMovie();

  return (
    <div className="space-y-8 rounded-xl bg-gray-100 p-8 shadow-sm lg:col-span-2">
      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-gray-700">
          Tên phim
        </label>
        <div className="space-y-2"></div>
        <input
          type="text"
          {...register("tenPhim", validationRules.tenPhim)}
          className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {errors.tenPhim && (
          <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
            {errors.tenPhim.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-bold tracking-wider text-gray-700">
            Bí danh (Slug)
          </label>
          <div className="relative">
            <input
              type="text"
               {...register("biDanh")}
              className="w-full rounded-md border border-gray-400 bg-gray-50 px-4 py-2 text-gray-500"
              disabled
            />
            <LockKeyhole className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-yellow-600" />
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-bold tracking-wider text-gray-700">
            Ngày khởi chiếu
          </label>
          <div className="space-y-2">
            <input
              type="date"
              {...register("ngayKhoiChieu", validationRules.ngayKhoiChieu)}
              className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {errors.ngayKhoiChieu && (
              <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
                {errors.ngayKhoiChieu.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-gray-700">
          Link Trailer (Youtube)
        </label>
        <div className="space-y-2">
          <input
            type="text"
            {...register("trailer", validationRules.trailer)}
            className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {errors.trailer && (
            <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
              {errors.trailer.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-gray-700">
          Mô tả phim
        </label>
        <div className="space-y-2">
          <textarea
            rows="4"
            {...register("moTa", validationRules.moTa)}
            className="w-full rounded-md border border-gray-400 px-4 py-2 text-gray-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          ></textarea>
          {errors.moTa && (
            <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
              {errors.moTa.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
            {...register("dangChieu")}
            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
          />

          <span className="text-sm font-medium text-gray-700">Đang chiếu</span>
        </label>

        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
            {...register("sapChieu")}
            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Sắp chiếu</span>
        </label>

        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
             {...register("hot")}
            className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
          />
          <span className="text-sm font-semibold text-red-600">
            Phim HOT 🔥
          </span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Đánh giá:</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              {...register("danhGia", validationRules.danhGia)}
              className={`w-8 rounded-sm border border-gray-300 px-1 py-px text-center text-white focus:ring-1 focus:outline-none 
                ${getRateClasses(watch("danhGia"))}`}
            />
            <Star className="h-4 w-4 fill-current text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
