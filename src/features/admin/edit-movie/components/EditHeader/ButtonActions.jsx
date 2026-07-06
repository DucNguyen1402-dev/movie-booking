import { useEditMovie } from "../../context/EditContext";

export default function ActionButtons() {
  const { editActions } = useEditMovie();

  return (
    <div className="mt-6 flex space-x-3">
      <button
        type="submit"
        onClick={editActions.onSaveClick}
        className="w-2/3 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-500"
      >
        Lưu thay đổi
      </button>
      <button
        type="button"
        onClick={editActions.onCancelClick}
        className="w-1/3 cursor-pointer rounded-lg border-none bg-rose-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-rose-500"
      >
        Hủy
      </button>
    </div>
  );
}
