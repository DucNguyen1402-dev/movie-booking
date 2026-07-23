import { useMemo } from "react";

import { useEditMovieContext } from "@features/admin/movies/edit/contexts";

export default function EditImageSection() {
  const {
    editForm: { watch , register},
  } = useEditMovieContext();

  const file = watch("hinhAnh");

  const preview = useMemo(() => {
    if (!file) return null;

    return typeof file === "string"
      ? file
      : file[0]
        ? URL.createObjectURL(file[0])
        : "";
  }, [file]);

  return (
    <div className="flex flex-col items-center justify-between rounded-xl bg-slate-800 p-6 shadow-sm">
      <div className="flex w-full flex-col items-center gap-5">
        <label className="mb-3 block text-center text-xl font-medium tracking-wider text-slate-100">
          Poster Preview
        </label>

        <div className="mx-auto mb-4 flex h-80 w-64 items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-gray-500">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-100">Chưa có ảnh</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          id="file-upload"
          {...register("hinhAnh")}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex cursor-pointer items-center rounded-md  bg-indigo-600 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm transition-colors duration-300 hover:bg-indigo-700"
        >
          Thay đổi hình ảnh
        </label>
      </div>
    </div>
  );
}
