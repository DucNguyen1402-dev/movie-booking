export default function SaveChangesModal() {
  return (
    <div className="z-100 flex max-w-90 flex-col gap-3 rounded-xl border border-gray-300 bg-white p-6 text-slate-900">
      <h2 className="text-lg font-semibold">
        Save changes?
      </h2>

      <p className="text-sm text-slate-500">
        Do you want to save your changes before leaving this page?
      </p>

      <div className="mt-3 flex justify-end gap-3">
        <button
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}