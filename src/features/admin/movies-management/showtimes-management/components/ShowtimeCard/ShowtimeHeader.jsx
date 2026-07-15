export default function ShowtimeHeader({ tenHeThongRap, logo }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full items-center justify-between text-slate-100">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            className="h-14 w-14 rounded-full border border-gray-600 object-cover"
          />

          <h2 className="text-xl font-semibold">{tenHeThongRap}</h2>
        </div>
      </div>
    </div>
  );
}
