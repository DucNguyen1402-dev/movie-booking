import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Armchair,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  MapPin,
  ShieldCheck,
  Ticket,
  WalletCards,
} from "lucide-react";

import { useBookTickets, useTicketRoom } from "@/hooks/customer/useBooking";
import { formatCurrency } from "@/utils/customer/format";

const SEATS_PER_ROW = 16;

const bookingSteps = [
  "Chọn phim / Rạp / Suất",
  "Chọn ghế",
  "Thanh toán",
  "Xác nhận",
];

const getUserFromLocalStorage = () => {
  const userLocal = localStorage.getItem("user");

  if (!userLocal) return null;

  try {
    return JSON.parse(userLocal);
  } catch {
    return null;
  }
};

const getSeatTypeLabel = (seat) => {
  if (!seat?.loaiGhe) return "Thường";
  return seat.loaiGhe === "Vip" ? "VIP" : "Thường";
};

const groupSeatsByRows = (seats = []) => {
  const sortedSeats = [...seats].sort((a, b) => Number(a.stt) - Number(b.stt));
  const rows = [];

  for (let index = 0; index < sortedSeats.length; index += SEATS_PER_ROW) {
    rows.push(sortedSeats.slice(index, index + SEATS_PER_ROW));
  }

  return rows;
};

const getRowLabel = (index) => String.fromCharCode(65 + index);

const MovieBookingSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="cine-container py-10">
        <div className="h-[150px] animate-pulse rounded-[28px] bg-[#151515]" />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="h-[620px] animate-pulse rounded-[28px] bg-[#151515]" />
          <div className="h-[620px] animate-pulse rounded-[28px] bg-[#151515]" />
        </div>
      </div>
    </main>
  );
};

const MovieBooking = () => {
  const { maLichChieu } = useParams();
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState([]);

  const { data: ticketRoom, isLoading, error } = useTicketRoom(maLichChieu);
  const bookTicketsMutation = useBookTickets();

  const movieInfo = ticketRoom?.thongTinPhim;

  const seatList = useMemo(
    () => ticketRoom?.danhSachGhe || [],
    [ticketRoom?.danhSachGhe],
  );

  const selectedSeatIds = useMemo(() => {
    return selectedSeats.map((seat) => seat.maGhe);
  }, [selectedSeats]);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seat) => total + Number(seat.giaVe), 0);
  }, [selectedSeats]);

  const groupedSeats = useMemo(() => {
    return groupSeatsByRows(seatList);
  }, [seatList]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedSeats([]);
  }, [maLichChieu]);

  const handleSelectSeat = (seat) => {
    if (seat.daDat) return;

    const isSelected = selectedSeatIds.includes(seat.maGhe);

    if (isSelected) {
      setSelectedSeats((currentSeats) =>
        currentSeats.filter((item) => item.maGhe !== seat.maGhe),
      );

      return;
    }

    setSelectedSeats((currentSeats) => [...currentSeats, seat]);
  };

  const handleBooking = async () => {
    const user = getUserFromLocalStorage();

    if (!user?.accessToken && !localStorage.getItem("accessToken")) {
      alert("Bạn cần đăng nhập trước khi đặt vé.");
      navigate("/login");
      return;
    }

    if (!selectedSeats.length) {
      alert("Bạn vui lòng chọn ít nhất một ghế.");
      return;
    }

    const payload = {
      maLichChieu: Number(maLichChieu),
      danhSachVe: selectedSeats.map((seat) => ({
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
      })),
    };

    try {
      await bookTicketsMutation.mutateAsync(payload);
      alert("Đặt vé thành công!");
      setSelectedSeats([]);
    } catch (bookingError) {
      alert(
        bookingError?.message ||
          "Đặt vé thất bại. Bạn kiểm tra lại tài khoản đăng nhập nhé.",
      );
    }
  };

  if (isLoading) return <MovieBookingSkeleton />;

  if (error || !ticketRoom) {
    return (
      <main className="min-h-screen bg-[#050505] text-white">
        <div className="cine-container py-20">
          <div className="mx-auto max-w-2xl rounded-[28px] border border-white/10 bg-[#151515] p-10 text-center shadow-2xl">
            <p className="text-2xl font-black">
              Không tải được thông tin phòng vé
            </p>

            <p className="mt-3 text-zinc-400">
              Mã lịch chiếu đang dùng:{" "}
              <span className="font-black text-[#f5c518]">{maLichChieu}</span>
            </p>

            <p className="mt-3 text-sm text-red-300">
              {error?.message || "API không trả về dữ liệu phòng vé."}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/detail/1282"
                className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:border-[#f5c518] hover:text-[#f5c518]"
              >
                Quay lại chi tiết phim
              </Link>

              <Link
                to="/movies"
                className="inline-flex rounded-full bg-[#f5c518] px-6 py-3 text-sm font-black text-black"
              >
                Quay lại thư viện phim
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#050505] text-white"
      style={{
        fontFamily:
          '"Be Vietnam Pro", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,#101010_0%,#050505_100%)]">
        <div className="cine-container py-8">
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-[#f5c518] hover:text-[#f5c518]"
          >
            <ArrowLeft size={17} />
            Quay lại thư viện phim
          </Link>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-[#121212] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-4">
                <div className="hidden h-28 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:block">
                  <img
                    src={movieInfo?.hinhAnh}
                    alt={movieInfo?.tenPhim}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs font-black tracking-[0.22em] text-[#f5c518] uppercase">
                    Phòng vé
                  </p>

                  <h1 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white md:text-4xl">
                    {movieInfo?.tenPhim}
                  </h1>

                  <div className="mt-4 grid gap-2 text-sm text-zinc-300 md:grid-cols-2 xl:grid-cols-4">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-[#f5c518]"
                      />
                      <span>
                        {movieInfo?.tenCumRap} - {movieInfo?.tenRap}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0 text-[#f5c518]"
                      />
                      <span>{movieInfo?.diaChi}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-[#f5c518]" />
                      <span>{movieInfo?.ngayChieu}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={17} className="text-[#f5c518]" />
                      <span>{movieInfo?.gioChieu}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs font-bold tracking-[0.18em] text-zinc-500 uppercase">
                  Mã lịch chiếu
                </p>
                <p className="mt-1 text-2xl font-black text-[#f5c518]">
                  #{maLichChieu}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-2 rounded-2xl border border-white/10 bg-[#111] p-3 md:grid-cols-4">
            {bookingSteps.map((step, index) => {
              const isActive = index === 1;
              const isDone = index === 0;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold ${
                    isActive
                      ? "bg-[#f5c518] text-black"
                      : isDone
                        ? "bg-emerald-500/12 text-emerald-300"
                        : "bg-white/[0.03] text-zinc-500"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-full text-xs ${
                      isActive
                        ? "bg-black text-[#f5c518]"
                        : isDone
                          ? "bg-emerald-500 text-black"
                          : "bg-white/10 text-zinc-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {step}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cine-container py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_370px]">
          <div className="rounded-[30px] border border-white/10 bg-[#121212] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.42)] md:p-7">
            <div className="mx-auto max-w-6xl">
              <div className="mb-9 text-center">
                <div className="relative mx-auto h-12 max-w-3xl">
                  <div className="absolute top-2 left-1/2 h-2 w-[86%] -translate-x-1/2 rounded-full bg-[#f5c518] shadow-[0_20px_55px_rgba(245,197,24,0.35)]" />
                  <div className="absolute top-1 left-1/2 h-8 w-[72%] -translate-x-1/2 rounded-[50%] border-t border-[#f5c518]/60 blur-[1px]" />
                </div>

                <p className="-mt-2 text-xs font-black tracking-[0.34em] text-zinc-500 uppercase">
                  Màn hình
                </p>
              </div>

              <div className="[scrollbar-color:#f5c518_#1f1f1f] overflow-x-auto pb-5">
                <div className="min-w-[790px] space-y-2">
                  {groupedSeats.map((rowSeats, rowIndex) => (
                    <div
                      key={getRowLabel(rowIndex)}
                      className="grid grid-cols-[34px_1fr] items-center gap-3"
                    >
                      <div className="text-center text-sm font-black text-zinc-500">
                        {getRowLabel(rowIndex)}
                      </div>

                      <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-2">
                        {rowSeats.map((seat) => {
                          const isSelected = selectedSeatIds.includes(
                            seat.maGhe,
                          );
                          const isVip = seat.loaiGhe === "Vip";

                          let seatClass =
                            "border-white/10 bg-[#242424] text-zinc-300 hover:border-[#f5c518] hover:text-[#f5c518]";

                          if (isVip) {
                            seatClass =
                              "border-[#7057ff]/50 bg-[#261b4f] text-violet-100 hover:border-[#f5c518] hover:text-[#f5c518]";
                          }

                          if (isSelected) {
                            seatClass =
                              "border-[#f5c518] bg-[#f5c518] text-black shadow-[0_0_0_3px_rgba(245,197,24,0.16)]";
                          }

                          if (seat.daDat) {
                            seatClass =
                              "cursor-not-allowed border-red-500/25 bg-red-950/30 text-red-300 opacity-60";
                          }

                          return (
                            <button
                              key={seat.maGhe}
                              type="button"
                              disabled={seat.daDat}
                              onClick={() => handleSelectSeat(seat)}
                              title={`Ghế ${seat.tenGhe} - ${formatCurrency(
                                seat.giaVe,
                              )}`}
                              className={`flex h-10 w-10 items-center justify-center rounded-[10px] border text-[11px] font-black transition duration-200 ${seatClass}`}
                            >
                              {seat.tenGhe}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm font-semibold text-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-lg border border-white/10 bg-[#242424]" />
                  Ghế thường
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-lg border border-[#7057ff]/50 bg-[#261b4f]" />
                  Ghế VIP
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-lg border border-[#f5c518] bg-[#f5c518]" />
                  Đang chọn
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-lg border border-red-500/25 bg-red-950/30" />
                  Đã đặt
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-[30px] border border-white/10 bg-[#121212] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.42)] lg:sticky lg:top-32">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f5c518] text-black">
                <Ticket size={23} />
              </div>

              <div>
                <p className="text-xs font-black tracking-[0.18em] text-[#f5c518] uppercase">
                  Vé của bạn
                </p>

                <h2 className="text-xl font-black tracking-[-0.02em]">
                  Tóm tắt đặt vé
                </h2>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-black/30 p-4">
                <p className="text-xs font-bold tracking-[0.15em] text-zinc-500 uppercase">
                  Phim
                </p>

                <p className="mt-2 font-black text-white">
                  {movieInfo?.tenPhim}
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 p-4">
                <p className="text-xs font-bold tracking-[0.15em] text-zinc-500 uppercase">
                  Rạp
                </p>

                <p className="mt-2 font-black text-white">
                  {movieInfo?.tenCumRap}
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  {movieInfo?.tenRap}
                </p>
              </div>

              <div className="rounded-2xl bg-black/30 p-4">
                <p className="text-xs font-bold tracking-[0.15em] text-zinc-500 uppercase">
                  Ghế đã chọn
                </p>

                {selectedSeats.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedSeats.map((seat) => (
                      <button
                        key={seat.maGhe}
                        onClick={() => handleSelectSeat(seat)}
                        className="rounded-full bg-[#f5c518] px-3 py-1 text-xs font-black text-black"
                      >
                        {seat.tenGhe}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-zinc-500">
                    Bạn chưa chọn ghế nào.
                  </p>
                )}
              </div>

              {selectedSeats.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="space-y-3">
                    {selectedSeats.map((seat) => (
                      <div
                        key={seat.maGhe}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Armchair size={16} className="text-[#f5c518]" />

                          <span className="font-bold">
                            Ghế {seat.tenGhe} - {getSeatTypeLabel(seat)}
                          </span>
                        </div>

                        <span className="font-black">
                          {formatCurrency(seat.giaVe)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-[#f5c518] p-5 text-black">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-black uppercase">Tổng tiền</span>

                  <span className="text-2xl font-black">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={
                  !selectedSeats.length || bookTicketsMutation.isPending
                }
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black uppercase transition ${
                  selectedSeats.length && !bookTicketsMutation.isPending
                    ? "bg-[#e50914] text-white hover:bg-[#ff1f2d]"
                    : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                }`}
              >
                {bookTicketsMutation.isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Đang đặt vé...
                  </>
                ) : (
                  <>
                    <WalletCards size={18} />
                    Xác nhận đặt vé
                  </>
                )}
              </button>

              <div className="flex items-start gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-sm leading-6 text-emerald-200">
                <ShieldCheck size={18} className="mt-0.5 shrink-0" />

                <p>
                  Vé chỉ được đặt thành công khi tài khoản đã đăng nhập và API
                  xác nhận giao dịch.
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs leading-5 text-zinc-500">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                Kiểm tra kỹ ghế, rạp và suất chiếu trước khi xác nhận.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default MovieBooking;
