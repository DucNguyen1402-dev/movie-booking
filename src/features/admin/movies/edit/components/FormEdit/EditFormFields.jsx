import { LockKeyhole, Star } from "lucide-react";
import { useEditMovieContext } from "@features/admin/movies/edit/contexts";
import { getRateClasses } from "../../config/editConfig";
import { validationRules } from "@config/admin/validation-rules";
import DateInput from "@components/admin/DateInput/DateInput";
import CheckBox from "@components/admin/CheckBox";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditFormFields() {
  const {
    editForm: { register, errors, watch, control, isDirty },
  } = useEditMovieContext();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(".", {
      replace: true,
      state: {
        ...location.state,
        shouldConfirmLeave: isDirty,
      },
    });
  }, [isDirty]);

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  return (
    <div className="space-y-8 rounded-xl bg-gray-800 p-8 shadow-sm lg:col-span-2">
      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-slate-200">
          Tên phim
        </label>
        <div className="space-y-2"></div>
        <input
          type="text"
          {...register("tenPhim", validationRules.tenPhim)}
          className="w-full rounded-sm border border-slate-600 bg-slate-700 px-4 py-2 text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
        {errors.tenPhim && (
          <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
            {errors.tenPhim.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <label className="text-sm font-bold tracking-wider text-slate-200">
            Bí danh (Slug)
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("biDanh")}
              className="w-full rounded-sm border border-gray-600 px-4 py-2 text-gray-100"
              disabled
            />
            <LockKeyhole className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-yellow-400" />
          </div>
        </div>

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

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-slate-200">
          Link Trailer (Youtube)
        </label>
        <div className="space-y-2">
          <input
            type="text"
            {...register("trailer", validationRules.trailer)}
            className="w-full rounded-sm border border-gray-600 px-4 py-2 text-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
          />
          {errors.trailer && (
            <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
              {errors.trailer.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="text-sm font-bold tracking-wider text-slate-200">
          Mô tả phim
        </label>
        <div className="space-y-2">
          <textarea
            rows="4"
            {...register("moTa", validationRules.moTa)}
            className="w-full resize-none overflow-hidden rounded border border-slate-600 bg-slate-700 px-3 py-2 text-[15px] text-slate-100 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            onInput={handleInput}
          ></textarea>
          {errors.moTa && (
            <p className="rounded-sm border-l-5 border-red-600 bg-red-950/40 px-2 py-2 text-xs text-red-300">
              {errors.moTa.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
        <CheckBox control={control} name="dangChieu" label="Đang chiếu" />
        <CheckBox control={control} name="sapChieu" label="Sắp chiếu" />
        <CheckBox control={control} name="hot" label="Phim hot" />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-200">Đánh giá:</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              {...register("danhGia")}
              className={`w-8 rounded-sm border border-gray-300 px-1 py-px text-center text-white focus:ring-1 focus:outline-none ${getRateClasses(watch("danhGia"))}`}
            />
            <Star className="h-4 w-4 fill-current text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
