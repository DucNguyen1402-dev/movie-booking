import { LockKeyhole, Star } from "lucide-react";
import { useEditMovie } from "../../context/EditContext";
import { getRateClasses } from "../../config/editConfig";

export default function EditFormFields() {
  const { editStates, editActions } = useEditMovie();

  return (
    <div className="space-y-8 rounded-xl bg-gray-100 p-8 shadow-sm lg:col-span-2">
      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-gray-700">
          Tên phim
        </label>
        <input
          type="text"
          name="tenPhim"
          value={editStates.movie.tenPhim}
          onChange={editActions.handleChange}
          className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-bold tracking-wider text-gray-700">
            Bí danh (Slug)
          </label>
          <div className="relative">
            <input
              type="text"
              name="biDanh"
              value={editStates.movie.biDanh}
              onChange={editActions.handleChange}
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
          <input
            type="date"
            name="ngayKhoiChieu"
            value={editStates.movie.ngayKhoiChieu}
            onChange={editActions.handleChange}
            className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-gray-700">
          Link Trailer (Youtube)
        </label>
        <input
          type="text"
          name="trailer"
          value={editStates.movie.trailer}
          onChange={editActions.handleChange}
          className="w-full rounded-md border border-gray-400 px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-gray-700">
          Mô tả phim
        </label>
        <textarea
          name="moTa"
          rows="4"
          value={editStates.movie.moTa}
          onChange={editActions.handleChange}
          className="w-full rounded-md border border-gray-400 px-4 py-2 text-gray-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 md:grid-cols-4">
        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
            name="dangChieu"
            checked={editStates.movie.dangChieu}
            onChange={editActions.handleCheckbox}
            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
          />

          <span className="text-sm font-medium text-gray-700">Đang chiếu</span>
        </label>

        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
            name="sapChieu"
            checked={editStates.movie.sapChieu}
            onChange={editActions.handleCheckbox}
            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Sắp chiếu</span>
        </label>

        <label className="flex cursor-pointer items-center space-x-3">
          <input
            type="checkbox"
            name="hot"
            checked={editStates.movie.hot}
            onChange={editActions.handleCheckbox}
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
              name="danhGia"
              min="1"
              max="10"
              value={editStates.movie.danhGia}
              onChange={editActions.handleChange}
              className={`w-8 rounded-sm border border-gray-300 px-1 py-px text-center text-white focus:ring-1 focus:outline-none ${getRateClasses(editStates.movie.danhGia)}`}
            />
            <Star className="h-4 w-4 fill-current text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
