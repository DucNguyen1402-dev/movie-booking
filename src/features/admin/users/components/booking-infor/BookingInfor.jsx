import {
  Calendar,
  Clock3,
  Armchair,
} from "lucide-react";
import {  formatDateTime, formatCurrency}  from "../../utils/format"

export default function BookingInfor({bookings}) {
  return (
    <div className="space-y-8">
      {bookings.map((booking) => {
        const cinema = booking.danhSachGhe[0];

        return (
          <div
            key={booking.maVe}
            className="group overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-lg"
          >
            <div className="grid gap-8 p-6 lg:grid-cols-[220px_1fr]">
              <img
                src={booking.hinhAnh}
                alt={booking.tenPhim}
                className="h-80 w-full rounded-xl object-cover"
              />

              <div className="space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-white">
                      {booking.tenPhim}
                    </h2>

                    <div className="flex flex-wrap gap-5 text-sm text-slate-400 transition-colors duration-300 group-hover:text-yellow-400">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {formatDateTime(booking.ngayDat)}
                      </span>

                      <span className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {booking.thoiLuongPhim} phút
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-yellow-700 bg-yellow-500/10 px-4 py-3 text-center tracking-wider transition-colors duration-300 group-hover:border-yellow-500 group-hover:ring-2 group-hover:ring-yellow-500/20">
                    <p className="text-sm font-medium text-yellow-100 uppercase">
                      Giá vé
                    </p>

                    <p className="mt-1 text-lg font-bold text-yellow-400">
                      {formatCurrency(booking.giaVe)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <dl className="space-y-3 rounded-xl border border-slate-700/50 bg-slate-700/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-slate-800">
                    <dt className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Mã vé
                    </dt>
                    <dd className="font-mono text-xl font-bold tracking-tight text-slate-50">
                      #{booking.maVe}
                    </dd>
                  </dl>

                  <dl className="space-y-3 rounded-xl border border-slate-700/50 bg-slate-700/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-slate-800">
                    <dt className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Hệ thống rạp
                    </dt>
                    <dd className="tracking-wider text-slate-50">
                      {cinema.tenHeThongRap}
                    </dd>
                  </dl>

                  <dl className="space-y-3 rounded-xl border border-slate-700/50 bg-slate-700/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-slate-800">
                    <dt className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Cụm rạp
                    </dt>
                    <dd className="tracking-wider text-slate-50">
                      {cinema.tenCumRap}
                    </dd>
                  </dl>

                  <dl className="space-y-3 rounded-xl border border-slate-700/50 bg-slate-700/50 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-slate-800">
                    <dt className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Rạp
                    </dt>
                    <dd className="tracking-wider text-slate-50">
                      {cinema.tenRap}
                    </dd>
                  </dl>
                </div>

                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Armchair size={18} />
                    <span className="font-medium">Ghế đã đặt</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {booking.danhSachGhe.map((seat, index) => (
                      <div
                        key={`${seat.maGhe}-${index}`}
                        className="rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow"
                      >
                        {seat.tenGhe}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
