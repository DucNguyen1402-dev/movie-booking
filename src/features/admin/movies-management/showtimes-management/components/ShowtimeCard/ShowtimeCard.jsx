import ShowtimeHeader from "./ShowtimeHeader";
// import ShowtimeInfor from "./ShowtimeInfor/ShowtimeInfor";
import ShowtimeInforHeader from "./ShowtimeInfor/ShowtimeInforHeader";
import ShowtimeInforCard from "./ShowtimeInfor/ShowtimeInforCard";
import NestedLayoutSkeleton from "../Skeleton";

export default function ShowtimeCard({ showtimeInfor = [] }) {
  let tongSuatChieu = 0;

  for (const { cumRapChieu } of showtimeInfor) {
    for (const { lichChieuPhim } of cumRapChieu) {
      tongSuatChieu += lichChieuPhim.length;
    }
  }
  const render =
    showtimeInfor.length === 0 ? (
      <NestedLayoutSkeleton />
    ) : (
      showtimeInfor.map((showtime) => {
        const { tenHeThongRap, logo, maHeThongRap, cumRapChieu } = showtime;

        return cumRapChieu.map(({ lichChieuPhim, diaChi, tenCumRap }) => (
          <>
            <ShowtimeHeader
              key={maHeThongRap}
              tenHeThongRap={tenHeThongRap}
              tongSuatChieu={tongSuatChieu}
              logo={logo}
            />
            <div className="px-8">
              <div className="space-y-8 border-b border-gray-300 pt-3 pb-8">
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
          </>
        ));
      })
    );
  return (
    <section className="grow space-y-5 rounded-xl border bg-gray-50 shadow-sm">
      {render}
    </section>
  );
}
