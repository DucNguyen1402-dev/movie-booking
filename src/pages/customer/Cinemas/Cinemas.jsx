import SectionTitle from "@/components/customer/SectionTitle";
import { useCinemaSystems } from "@/hooks/customer/useCinema";

const Cinemas = () => {
  const { data: cinemaSystems = [], isLoading } = useCinemaSystems();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <SectionTitle
        eyebrow="Rạp chiếu"
        title="Hệ thống rạp đối tác"
        description="Trang rạp được xây dựng từ API LayThongTinHeThongRap. Giai đoạn sau có thể mở rộng chọn cụm rạp và lịch chiếu theo hệ thống."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-40 animate-pulse rounded-3xl bg-zinc-900" />)
          : cinemaSystems.map((cinema) => (
              <article key={cinema.maHeThongRap} className="rounded-3xl border border-white/10 bg-zinc-950 p-6 transition hover:border-red-400/60 hover:bg-red-500/10">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-3">
                  <img src={cinema.logo} alt={cinema.tenHeThongRap} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="text-xl font-black text-white">{cinema.tenHeThongRap}</h3>
                <p className="mt-2 text-sm text-zinc-500">Mã hệ thống: {cinema.maHeThongRap}</p>
              </article>
            ))}
      </div>
    </section>
  );
};

export default Cinemas;
