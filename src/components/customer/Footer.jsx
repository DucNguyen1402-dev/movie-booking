import { Link } from "react-router-dom";
import {
  MessageCircle,
  Music2,
  Play,
  Star,
} from "lucide-react";

const cinemaList = [
  "CineBooking Quốc Thanh (TP.HCM)",
  "CineBooking Parkcity Hà Nội",
  "CineBooking Sinh Viên (TP.HCM)",
  "CineBooking Huế",
  "CineBooking Đà Lạt",
  "CineBooking Mỹ Tho",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-br from-[#6536b8] to-[#2563d8]">
      <div className="cine-container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#ffeb00] via-[#ef4444] to-[#5b21b6]">
                <Star
                  fill="white"
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-2xl font-black uppercase leading-none">
                  CineBooking
                </p>

                <p className="mt-2 text-sm font-bold uppercase text-white/80">
                  Be happy, be a star
                </p>
              </div>
            </Link>

            <div className="mt-7 flex gap-3">
              <Link
                to="/movies"
                className="cine-btn-yellow flex-1 px-4"
              >
                Đặt vé
              </Link>

              <Link
                to="/popcorn-drink"
                className="cine-btn-outline flex-1 px-4"
              >
                Đặt bắp nước
              </Link>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <MessageCircle size={18} />
              </button>

              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <Play size={18} />
              </button>

              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <Music2 size={18} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-black uppercase">
              Tài khoản
            </h3>

            <ul className="space-y-3 text-sm font-medium text-white/85">
              <li>
                <Link to="/login">
                  Đăng nhập
                </Link>
              </li>

              <li>
                <Link to="/register">
                  Đăng ký
                </Link>
              </li>

              <li>
                <Link to="/profile">
                  Thông tin cá nhân
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-black uppercase">
              Xem phim
            </h3>

            <ul className="space-y-3 text-sm font-medium text-white/85">
              <li>
                <Link to="/movies">
                  Phim đang chiếu
                </Link>
              </li>

              <li>
                <Link to="/movies">
                  Suất chiếu đặc biệt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-black uppercase">
              Dịch vụ khác
            </h3>

            <ul className="space-y-3 text-sm font-medium text-white/85">
              <li>Nhà hàng</li>
              <li>Bowling</li>
              <li>Billiards</li>
              <li>Coffee</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-black uppercase">
              Hệ thống rạp
            </h3>

            <ul className="space-y-3 text-sm font-medium text-white/85">
              {cinemaList.map((cinema) => (
                <li key={cinema}>
                  {cinema}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/30 pt-6 text-center text-sm font-medium text-white/75">
          © 2026 CineBooking Movie Capstone.
          Designed for ReactJS Capstone.
        </div>
      </div>
    </footer>
  );
}