import { Ticket } from "lucide-react";

export default function QuickBooking({ movies = [] }) {
  return (
    <section className="relative z-10 -mt-10">
      <div className="cine-container">
        <div className="rounded-lg bg-white p-5 shadow-2xl shadow-black/30">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr_auto]">
            <div className="flex items-center">
              <h2
                className="text-3xl font-black uppercase text-[#374151]"
                style={{ fontFamily: "Oswald, system-ui, sans-serif" }}
              >
                Đặt vé nhanh
              </h2>
            </div>

            <select className="cine-select">
              <option>1. Chọn rạp</option>
              <option>CineBooking Quốc Thanh</option>
              <option>CineBooking Sinh Viên</option>
            </select>

            <select className="cine-select">
              <option>2. Chọn phim</option>
              {movies.slice(0, 8).map((movie) => (
                <option key={movie.maPhim}>{movie.tenPhim}</option>
              ))}
            </select>

            <select className="cine-select">
              <option>3. Chọn ngày</option>
              <option>Hôm nay</option>
              <option>Ngày mai</option>
              <option>Cuối tuần</option>
            </select>

            <select className="cine-select">
              <option>4. Chọn suất</option>
              <option>10:00</option>
              <option>13:30</option>
              <option>19:45</option>
            </select>

            <button className="cine-btn-purple h-12 px-5 py-0">
              <Ticket size={17} />
              <span className="ml-2">Đặt ngay</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}