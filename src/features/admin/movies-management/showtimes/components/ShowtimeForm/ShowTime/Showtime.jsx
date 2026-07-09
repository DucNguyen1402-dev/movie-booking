

export default function Showtime({validationRules}) {
  return (
    <div className="flex flex-col gap-1.5 text-slate-700">
      <label
        className="mb-2 cursor-pointer text-sm font-medium"
        htmlFor="show-time"
      >
        Giờ chiếu
      </label>




      <input
        type="time"
        id="show-time"
        className="w-full cursor-pointer rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
      />
      {fieldState.error && (
        <p className="rounded-sm border-l-5 border-red-500 bg-red-50 px-2 py-1.5 text-xs text-red-700">
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}
