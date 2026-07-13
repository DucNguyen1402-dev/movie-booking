import { useNavigate } from "react-router-dom";
import { LogOut, Ticket, UserRound } from "lucide-react";
import {
  getStoredAccessToken,
  useAccountInfo,
  useLogout,
} from "@/hooks/customer/useAuth";
import { formatCurrency, formatDateTime } from "@/utils/customer/format";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const accessToken = getStoredAccessToken();

  const { data: accountInfo, isLoading, isError } = useAccountInfo();

  const bookingHistory = accountInfo?.thongTinDatVe || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!accessToken) {
    return (
      <main className="min-h-[calc(100vh-120px)] bg-[#070b1a] py-16 text-white">
        <section className="cine-container">
          <div className="rounded-3xl bg-white p-10 text-center text-[#111827]">
            <UserRound size={54} className="mx-auto text-zinc-500" />

            <h1 className="mt-4 text-3xl font-black">
              Bạn chưa đăng nhập
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Vui lòng đăng nhập để xem thông tin tài khoản và lịch sử đặt vé.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-6 rounded-xl bg-[#f5c518] px-6 py-3 text-sm font-black uppercase text-black"
            >
              Đăng nhập ngay
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-120px)] bg-[#070b1a] py-16 text-white">
        <section className="cine-container">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8">
            <p className="text-lg font-bold text-zinc-300">
              Đang tải thông tin tài khoản...
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-[calc(100vh-120px)] bg-[#070b1a] py-16 text-white">
        <section className="cine-container">
          <div className="rounded-3xl border border-red-500/20 bg-red-950/30 p-8">
            <h1 className="text-2xl font-black text-red-300">
              Không tải được thông tin tài khoản
            </h1>

            <p className="mt-2 text-sm text-red-200">
              Phiên đăng nhập có thể đã hết hạn. Bạn hãy đăng nhập lại.
            </p>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-black text-black"
            >
              Đăng nhập lại
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#070b1a] py-12 text-white">
      <section className="cine-container">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#f5c518]">
              Tài khoản cá nhân
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
              Hồ sơ của tôi
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-black uppercase text-white transition hover:bg-red-500"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl bg-white p-7 text-[#111827]">
            <div className="text-center">
              <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[#f5c518] text-black">
                <UserRound size={46} />
              </div>

              <h2 className="mt-4 text-2xl font-black">
                {accountInfo?.hoTen || "Người dùng"}
              </h2>

              <p className="mt-1 text-sm font-semibold text-zinc-500">
                {accountInfo?.email || "Đang cập nhật"}
              </p>
            </div>

            <div className="mt-7 space-y-4">
              <div className="rounded-2xl bg-zinc-100 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Tài khoản
                </p>
                <p className="mt-1 font-black">
                  {accountInfo?.taiKhoan || "Đang cập nhật"}
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-100 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Số điện thoại
                </p>
                <p className="mt-1 font-black">
                  {accountInfo?.soDT ||
                    accountInfo?.soDt ||
                    "Đang cập nhật"}
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-100 p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                  Loại người dùng
                </p>
                <p className="mt-1 font-black">
                  {accountInfo?.loaiNguoiDung || "Khách hàng"}
                </p>
              </div>
            </div>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">
                  Lịch sử đặt vé
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  Danh sách các vé đã đặt bằng tài khoản này.
                </p>
              </div>

              <span className="rounded-full bg-[#f5c518] px-4 py-2 text-sm font-black text-black">
                {bookingHistory.length} vé
              </span>
            </div>

            {bookingHistory.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/25 p-10 text-center">
                <Ticket size={48} className="mx-auto text-zinc-500" />

                <p className="mt-4 text-lg font-black text-white">
                  Chưa có lịch sử đặt vé
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Sau khi đặt vé thành công, vé sẽ hiển thị ở đây.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookingHistory.map((ticket) => (
                  <article
                    key={ticket.maVe}
                    className="grid gap-4 rounded-2xl border border-white/10 bg-black/30 p-4 md:grid-cols-[90px_1fr]"
                  >
                    <img
                      src={ticket.hinhAnh}
                      alt={ticket.tenPhim}
                      className="h-32 w-full rounded-xl object-cover md:h-full"
                    />

                    <div>
                      <div className="flex flex-col justify-between gap-3 md:flex-row">
                        <div>
                          <h3 className="text-xl font-black text-white">
                            {ticket.tenPhim}
                          </h3>

                          <p className="mt-1 text-sm text-zinc-400">
                            Ngày đặt: {formatDateTime(ticket.ngayDat)}
                          </p>
                        </div>

                        <p className="text-lg font-black text-[#f5c518]">
                          {formatCurrency(ticket.giaVe || 0)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {ticket.danhSachGhe?.map((seat) => (
                          <span
                            key={seat.maGhe}
                            className="rounded-full bg-[#f5c518] px-3 py-1 text-xs font-black text-black"
                          >
                            Ghế {seat.tenGhe}
                          </span>
                        ))}
                      </div>

                      {ticket.danhSachGhe?.[0] && (
                        <p className="mt-4 text-sm text-zinc-400">
                          Rạp: {ticket.danhSachGhe[0].tenHeThongRap} -{" "}
                          {ticket.danhSachGhe[0].tenCumRap} -{" "}
                          {ticket.danhSachGhe[0].tenRap}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
};

export default Profile;