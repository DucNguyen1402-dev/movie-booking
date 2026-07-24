import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useNotificationContext } from "@contexts/admin";
import { useConsumeLocationState } from "@hooks/admin";

import {
  EmptyShowtimeState,
  ShowtimeHeader,
  ShowtimeInforCard,
  ShowtimeInforHeader,
  ShowtimeInforSkeleton,
} from ".";

export default function ShowtimeSection({
  showtimeInfor,
  isPending,
  hasNoShowtime,
}) {
  const location = useLocation();
  const { notificationActions } = useNotificationContext();

  useEffect(() => {
    if (location.state?.notification) {
      notificationActions.show(location.state.notification);
    }
  }, [location.state, notificationActions]);

  useConsumeLocationState("notification", 5000);

  const tongSuatChieu = useMemo(() => {
    let total = 0;

    for (const { cumRapChieu } of showtimeInfor) {
      for (const { lichChieuPhim } of cumRapChieu) {
        total += lichChieuPhim.length;
      }
    }

    return total;
  }, [showtimeInfor]);

  const newShowtimeClusterId = location.state?.maCumRap;

  if (hasNoShowtime) {
    return (
      <div className="grow">
        <EmptyShowtimeState />;
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="grow">
        <ShowtimeInforSkeleton />
      </div>
    );
  }

  return (
    <section className="relative grow space-y-10 rounded-xl border border-slate-700 bg-slate-800 pt-30 pb-8 shadow-sm">
      {!isPending && !hasNoShowtime && (
        <div className="absolute top-3 right-3 flex items-center gap-2.5 rounded-xl border border-slate-600 bg-slate-700 p-2 pr-4">
          <span className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-slate-600/60 bg-linear-to-br from-orange-600 via-yellow-500 to-yellow-400 px-2 text-lg font-bold text-slate-100 shadow-lg">
            {tongSuatChieu}
          </span>
          <span className="text-sm font-semibold tracking-wide text-slate-100">
            suất chiếu
          </span>
        </div>
      )}
      {showtimeInfor.map((showtime) => {
        const { tenHeThongRap, logo, cumRapChieu } = showtime;
        return (
          <div
            key={tenHeThongRap}
            className="space-y-10 border-b border-dashed border-slate-600 px-8"
          >
            <ShowtimeHeader
              tenHeThongRap={tenHeThongRap}
              tongSuatChieu={tongSuatChieu}
              logo={logo}
            />
            {cumRapChieu.map(
              (
                { lichChieuPhim, diaChi, tenCumRap, maCumRap },
                index,
                array,
              ) => {
                const hasNewShowtime = newShowtimeClusterId === maCumRap;
                const isLastCluster = array.length - 1 === index;
                return (
                  <div
                    key={maCumRap}
                    className={`space-y-10 rounded-md p-4 ${hasNewShowtime ? "animate-flash" : ""}`}
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
      })}
    </section>
  );
}
