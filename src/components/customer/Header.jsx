import { Link, NavLink } from "react-router-dom";
import {
  CircleUserRound,
  House,
  Popcorn,
  Search,
  Star,
  Ticket,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/customer/useAuth";

export default function Header() {
  const currentUser = useCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1024]/95 text-white backdrop-blur-xl">
      <div className="cine-container">
        <div className="flex min-h-[86px] items-center justify-between gap-5">
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[#e4252d] shadow-[0_0_0_4px_rgba(255,255,255,0.08)]">
              <div className="absolute inset-1 rounded-full border-2 border-[#f6c21a]" />

              <Star
                size={24}
                fill="white"
                className="relative z-10 text-white transition group-hover:rotate-12"
              />
            </div>

            <div className="leading-none">
              <p className="text-[26px] font-black uppercase tracking-[-0.04em]">
                <span className="text-white">
                  CINE
                </span>

                <span className="text-[#ffeb00]">
                  STAR
                </span>
              </p>

              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
                Movie ticket
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/movies"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#ffeb00] px-6 text-sm font-black uppercase text-[#111827] shadow-[0_7px_0_#b58c00] transition hover:-translate-y-0.5 hover:bg-[#fff45c]"
            >
              <Ticket size={18} />

              <span className="ml-2">
                Đặt vé ngay
              </span>
            </Link>

            <Link
              to="/popcorn-drink"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#6f35b5] px-6 text-sm font-black uppercase text-white shadow-[0_7px_0_#3e1b72] transition hover:-translate-y-0.5 hover:bg-[#8244ce]"
            >
              <Popcorn size={18} />

              <span className="ml-2">
                Đặt bắp nước
              </span>
            </Link>
          </div>

          <div className="hidden min-w-[280px] items-center rounded-full bg-white px-4 py-2 lg:flex">
            <input
              className="h-8 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Tìm phim, rạp"
            />

            <Search
              size={19}
              className="text-slate-700"
            />
          </div>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <Link
                to="/profile"
                title={currentUser.taiKhoan}
                className="hidden max-w-[190px] items-center gap-2 text-sm font-extrabold text-white transition hover:text-[#ffeb00] sm:flex"
              >
                <CircleUserRound
                  size={24}
                  className="shrink-0"
                />

                <span className="truncate">
                  Hi,{" "}
                  {currentUser.taiKhoan ||
                    currentUser.hoTen}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-2 text-sm font-extrabold text-white transition hover:text-[#ffeb00] sm:flex"
              >
                <CircleUserRound size={24} />
                Đăng nhập
              </Link>
            )}

            <button
              type="button"
              className="flex items-center gap-2 text-sm font-extrabold text-white"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e4252d] text-xs">
                ★
              </span>
              VN
            </button>
          </div>
        </div>

        <div className="flex min-h-[50px] flex-wrap items-center gap-4 border-t border-white/10 text-sm font-bold">
          <nav className="flex items-center gap-7">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 transition ${
                  isActive
                    ? "text-[#ffeb00]"
                    : "text-white hover:text-[#ffeb00]"
                }`
              }
            >
              <House size={18} />
              Trang chủ
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}