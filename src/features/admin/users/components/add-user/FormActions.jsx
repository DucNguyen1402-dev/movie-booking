export default function FormActions({ onCancel }) {
  return (
    <div className="flex justify-end gap-3 border-t pt-6">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-lg bg-red-500 px-5 py-2.5 font-medium text-white cursor-pointer transition-colors duration-300 hover:bg-red-600"
      >
        Hủy
      </button>

      <button
        type="submit"
        className="rounded-lg bg-green-500 px-5 py-2.5 font-medium text-white cursor-pointer transition-colors duration-300 hover:bg-green-600"
      >
        Thêm người dùng
      </button>
    </div>
  );
}
