
export default function MovieSelectionCard({ movie }) {

  return (
    <div className="relative space-y-4 rounded-2xl bg-gray-50 pt-3 pb-12 shadow-sm">
      <div className="flex justify-center border">
        <img
          src={movie.hinhAnh}
          alt= {movie.tenPhim}
          className="w-75 rounded-sm object-cover"
        />
      </div>

      <div className="space-y-4 rounded-xl bg-slate-50 p-8">
        <h1 className="text-xl font-bold tracking-wider text-slate-800">
          {movie.tenPhim}
        </h1>

        <div className="absolute right-1 bottom-2 inline-flex items-center gap-2 px-4 py-1 text-sm font-medium">
          <span className="text-gray-500">Ngày khởi chiếu:</span>
          <span className="font-bold tracking-wider text-rose-500">
            {movie.ngayKhoiChieu}
          </span>
        </div>
      </div>
    </div>
  );
}
