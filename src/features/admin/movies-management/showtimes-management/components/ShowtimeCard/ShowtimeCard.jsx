import ShowtimeHeader from "./ShowtimeHeader";
import ShowtimeInforHeader from "./ShowtimeInfor/ShowtimeInforHeader";
import ShowtimeInforCard from "./ShowtimeInfor/ShowtimeInforCard";
import ShowtimeInforSkeleton from "./ShowtimeInforSkeleton";
import EmptyShowtimeState from "./EmptyShowtimeState";
import { useLocation } from "react-router-dom";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useEffect } from "react";

export default function ShowtimeCard({ showtimeInfor, isPending, hasNoData }) {
  const location = useLocation();
  const { notifActions } = useNotification();

  useEffect(() => {
    if (location.state?.notification) {
      notifActions.showNotification(location.state.notification);
    }
  }, [location.state]);

  let tongSuatChieu = 0;

  for (const { cumRapChieu } of showtimeInfor) {
    for (const { lichChieuPhim } of cumRapChieu) {
      tongSuatChieu += lichChieuPhim.length;
    }
  }

  const newShowtimeClusterId = location.state?.maCumRap;

  const expression = hasNoData ? (
    <EmptyShowtimeState />
  ) : isPending ? (
    <ShowtimeInforSkeleton />
  ) : (
    showtimeInfor.map((showtime) => {
      const { tenHeThongRap, logo, cumRapChieu } = showtime;

      return (
        <div key = {tenHeThongRap} className="space-y-10 border-b border-dashed border-slate-600 px-8">
          <ShowtimeHeader
            tenHeThongRap={tenHeThongRap}
            tongSuatChieu={tongSuatChieu}
            logo={logo}
          />
          {cumRapChieu.map(
            ({ lichChieuPhim, diaChi, tenCumRap, maCumRap }, index, array) => {
              const hasNewShowtime = newShowtimeClusterId === maCumRap;
              const isLastCluster = array.length - 1 === index;
              return (
                <div
                  key={maCumRap}
                  className={`space-y-10 rounded-md ${hasNewShowtime ? "animate-flash" : ""}`}
                >
                  <div
                    className={`space-y-10 pb-8 ${isLastCluster ? "" : "border-b border-gray-500"}`}
                  >
                    <ShowtimeInforHeader
                      diaChi={diaChi}
                      tenCumRap={tenCumRap}
                      hasNewShowtime={hasNewShowtime}
                    />
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
              );
            },
          )}
        </div>
      );
    })
  );

  return (
    <section className="relative grow space-y-10 rounded-xl border border-slate-700 bg-slate-800 pt-30 pb-8 shadow-sm">
      {!isPending && !hasNoData && (
        <div className="absolute top-3 right-3 flex items-center gap-2.5 rounded-xl border border-slate-600 bg-slate-700 p-2 pr-4">
          <span className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-slate-600/60 bg-linear-to-br from-rose-600 via-rose-500 to-rose-400 px-2 text-lg font-bold text-slate-100 shadow-lg">
            {tongSuatChieu}
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-100">
            suất chiếu
          </span>
        </div>
      )}
      {expression}
    </section>
  );
}
