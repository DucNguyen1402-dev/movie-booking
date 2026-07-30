import { Input } from "@shared/fields";

const FileImageField = ({ handleFileChange, error, register, imgPreview }) => {
  return (
    <div className="flex justify-between rounded-sm border border-gray-600 px-5 py-3">
      <div className="flex flex-col gap-4">
        <label
          className="mb-1 block text-sm font-medium text-slate-200"
          htmlFor="hinhAnh"
        >
          Hình ảnh phim
        </label>

        <Input
          type="file"
          id="hinhAnh"
          {...register("hinhAnh", {
            required: "Vui lòng chọn hình ảnh",
            onChange: handleFileChange,
          })}
          error={error?.message}
          accept="image/*"
          inputClassName="input-file bg-slate-950/10"
        />
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
};

export default FileImageField;
