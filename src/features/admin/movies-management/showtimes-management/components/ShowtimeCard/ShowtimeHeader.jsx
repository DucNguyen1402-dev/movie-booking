export default function ShowtimeHeader({ tenHeThongRap, logo }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-full items-center justify-between text-slate-700">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            className="h-12 w-12 rounded-full border border-gray-300 object-cover"
          />

          <h2 className="text-lg font-semibold">{tenHeThongRap}</h2>
        </div>
      </div>
    </div>
  );
}
