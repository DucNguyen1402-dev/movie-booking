export default function ShowtimeHeader({ tenHeThongRap, tongSuatChieu, logo }) {
  return (
    <div className="flex items-center justify-between p-8">
      <div className="flex w-full items-center justify-between text-slate-700">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            className="h-12 w-12 rounded-full border border-gray-300 object-cover"
          />

          <h2 className="text-lg font-semibold">{tenHeThongRap}</h2>
        </div>
        <div className="inline-flex items-center gap-2.5 rounded-xl border border-slate-300 bg-slate-50 p-2 pr-4 ">
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-slate-200/60 bg-linear-to-br from-orange-600 via-orange-500
           to-pink-400 px-2 text-lg font-bold text-white shadow-lg">
            {tongSuatChieu}
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-600">
            suất chiếu
          </span>
        </div>
      </div>
    </div>
  );
}
