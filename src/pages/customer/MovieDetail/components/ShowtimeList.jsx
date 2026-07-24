import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { MapPin, Ticket } from "lucide-react";

import { formatTime } from "@/utils/customer/format";

const ShowtimeList = ({ showtimeData }) => {
  const cinemaSystems = useMemo(
    () => showtimeData?.heThongRapChieu || [],
    [showtimeData?.heThongRapChieu],
  );
  const [activeSystem, setActiveSystem] = useState(
    cinemaSystems[0]?.maHeThongRap || "",
  );

  const currentSystem = useMemo(() => {
    return (
      cinemaSystems.find((system) => system.maHeThongRap === activeSystem) ||
      cinemaSystems[0]
    );
  }, [activeSystem, cinemaSystems]);

  if (!cinemaSystems.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center">
        <p className="text-lg font-bold text-white">Chưa có lịch chiếu</p>
        <p className="mt-2 text-sm text-zinc-500">
          Bạn có thể quay lại sau khi rạp mở lịch chiếu mới.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-3">
        {cinemaSystems.map((system) => (
          <button
            key={system.maHeThongRap}
            type="button"
            className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition ${
              (activeSystem || cinemaSystems[0]?.maHeThongRap) ===
              system.maHeThongRap
                ? "bg-red-600 text-white"
                : "text-zinc-300 hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => setActiveSystem(system.maHeThongRap)}
          >
            <img
              src={system.logo}
              alt={system.tenHeThongRap}
              className="h-10 w-10 rounded-xl bg-white object-contain p-1"
            />
            <span className="text-sm font-bold">{system.tenHeThongRap}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {currentSystem?.cumRapChieu?.map((cluster) => (
          <div
            key={cluster.maCumRap}
            className="rounded-3xl border border-white/10 bg-zinc-950 p-5"
          >
            <div className="mb-4 flex flex-col gap-2 border-b border-white/10 pb-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {cluster.tenCumRap}
                </h3>
                <p className="mt-1 flex items-start gap-2 text-sm text-zinc-500">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  {cluster.diaChi}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-zinc-300">
                <Ticket size={14} />
                {cluster.lichChieuPhim?.length || 0} suất
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {cluster.lichChieuPhim?.map((showtime) => (
                <Link
                  key={showtime.maLichChieu}
                  to={`/ticketroom/${showtime.maLichChieu}`}
                  className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 transition hover:border-red-400 hover:bg-red-600 hover:text-white"
                >
                  {formatTime(showtime.ngayChieuGioChieu)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowtimeList;
