import ShowtimeHeader from "./ShowtimeHeader";
import ShowtimeInforHeader from "./ShowtimeInfor/ShowtimeInforHeader";
import ShowtimeInforCard from "./ShowtimeInfor/ShowtimeInforCard";
import ShowtimeInforSkeleton from "./ShowtimeInforSkeleton";
import EmptyShowtimeState from "./EmptyShowtimeState";

export default function ShowtimeCard({ showtimeInfor, isPending, hasNoData }) {
  let tongSuatChieu = 0;

  for (const { cumRapChieu } of showtimeInfor) {
    for (const { lichChieuPhim } of cumRapChieu) {
      tongSuatChieu += lichChieuPhim.length;
    }
  }

  const expression = hasNoData ? (
    <EmptyShowtimeState />
  ) : isPending ? (
    <ShowtimeInforSkeleton />
  ) : (
    showtimeInfor.map((showtime) => {
      const { tenHeThongRap, logo, maHeThongRap, cumRapChieu } = showtime;

      return cumRapChieu.map(
        ({ lichChieuPhim, diaChi, tenCumRap, maCumRap }) => (
          <div key={maCumRap} className="space-y-10">
            <ShowtimeHeader
              tenHeThongRap={tenHeThongRap}
              tongSuatChieu={tongSuatChieu}
              logo={logo}
            />

            <div className="space-y-8 border-b border-gray-300 pb-8">
              <ShowtimeInforHeader diaChi={diaChi} tenCumRap={tenCumRap} />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {lichChieuPhim?.map(
                  ({
                    maLichChieu,
                    maRap,
                    tenRap,
                    ngayChieuGioChieu,
                    thoiLuong,
                    giaVe,
                  }) => (
                    <ShowtimeInforCard
                      key={maLichChieu}
                      maRap={maRap}
                      tenRap={tenRap}
                      ngayChieuGioChieu={ngayChieuGioChieu}
                      thoiLuong={thoiLuong}
                      giaVe={giaVe}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        ),
      );
    })
  );
  return (
    <section className="relative grow space-y-5 rounded-xl border bg-gray-50 p-8 shadow-sm">
      {!isPending && !hasNoData && (
        <div className="absolute top-3 right-3 flex items-center gap-2.5 rounded-xl border border-slate-300 bg-slate-50 p-2 pr-4">
          <span className="animate-bounce flex h-8 min-w-8 items-center justify-center rounded-full border border-slate-200/60 bg-linear-to-br from-orange-600 via-orange-500 to-pink-400 px-2 text-lg font-bold text-white shadow-lg">
            {tongSuatChieu}
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-600">
            suất chiếu
          </span>
        </div>
      )}
      {expression}
    </section>
  );
}
