import SectionTitle from "@/components/customer/SectionTitle";

const CinemaPreview = ({ cinemaSystems = [] }) => {
  return (
    <section className="bg-zinc-950/70 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Hệ thống rạp"
          title="Chọn rạp chiếu yêu thích"
          description="Dữ liệu hệ thống rạp được lấy trực tiếp từ API QuanLyRap để chuẩn bị cho luồng chọn lịch chiếu."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {cinemaSystems.map((cinema) => (
            <div
              key={cinema.maHeThongRap}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-center transition hover:-translate-y-1 hover:border-red-400/60 hover:bg-red-500/10"
            >
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-3">
                <img src={cinema.logo} alt={cinema.tenHeThongRap} className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="text-sm font-bold text-white">{cinema.tenHeThongRap}</h3>
              <p className="mt-2 text-xs text-zinc-500">Xem lịch chiếu</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinemaPreview;
