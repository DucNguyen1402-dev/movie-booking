import { useModalContext } from "@contexts/admin/ModalContext";

export default function SaveChangesModal() {
  const modal = useModalContext();

  const onCancel = () => modal.close();
  const onConfirm = () => {
    modal.close();
  };
  return (
    <div className="z-100 flex max-w-90 flex-col gap-3 rounded-xl border border-gray-300 bg-white p-6 text-slate-900">
      <h2 className="text-lg font-semibold">Save changes?</h2>

      <p className="text-sm text-slate-500">
        Are you sure you want to save these changes?
      </p>

      <div className="mt-3 flex justify-end gap-3">
        <button
          className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 disabled:cursor-not-allowed"
          onClick={onConfirm}
      
        >
          Save
        </button>
      </div>
    </div>
  );
}
