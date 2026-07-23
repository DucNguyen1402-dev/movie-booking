import { Input } from "@components/admin";

export default function FileImageField({
  handleFileChange,
  error,
  register,
  imgPreview,
}) {
  return (
    <div className="flex justify-between rounded-sm border border-gray-600 px-5 py-3">
      <div className="flex flex-col gap-4">
        <label className="mb-1 block text-sm font-medium text-slate-200">
          Hình ảnh phim
        </label>
        <div className="space-y-3">
          <Input
            type="file"
            label="Tên phim"
            name="hinhAnh"
            rules={{
              required: "Vui lòng chọn hình ảnh",
              onChange: handleFileChange,
            }}
            error={error}
            register={register}
            accept="image/*"
            className="input-file"
          />
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
  );
}
