import { useEditMovie } from "../../contexts/EditContext";
import { useMemo } from "react";

export default function EditImageSection() {
  const {
    editActions,
    editForm: { watch, register },
  } = useEditMovie();

  const file = watch("hinhAnh");

  const preview = useMemo(() => {
    if (!file) return null;

    return typeof file === "string"
      ? file
      : file?.[0]
        ? URL.createObjectURL(file[0])
        : "";
  }, [file]);

  return (
    <div className="flex flex-col items-center justify-between rounded-xl bg-white p-6 shadow-sm">
      <div className="flex w-full flex-col items-center gap-5">
        <label className="mb-3 block text-center text-2xl font-medium tracking-wider text-gray-700">
          Hình ảnh poster
        </label>

        <div className="mx-auto mb-4 flex h-64 w-48 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-gray-400">Chưa có ảnh</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          id="file-upload"
          {...register("hinhAnh", {
            onChange: editActions.handleFileChange,
          })}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-indigo-600"
        >
          Thay đổi hình ảnh
        </label>
      </div>
    </div>
  );
}
