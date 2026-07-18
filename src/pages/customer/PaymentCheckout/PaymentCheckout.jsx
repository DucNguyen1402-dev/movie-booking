import { QRCode } from "antd";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Store,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Link } from "react-router-dom";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

const getStoredOrder = () => {
  try {
    const storedOrder = sessionStorage.getItem("cinestarPopcornOrder");
    return storedOrder ? JSON.parse(storedOrder) : null;
  } catch {
    return null;
  }
};

const paymentMethods = [
  {
    id: "card",
    title: "Thẻ ngân hàng",
    description: "Visa, Mastercard và thẻ ghi nợ",
    icon: CreditCard,
  },
  {
    id: "qr",
    title: "Ví điện tử / QR",
    description: "Quét mã bằng ứng dụng ngân hàng",
    icon: QrCode,
  },
  {
    id: "counter",
    title: "Thanh toán tại quầy",
    description: "Nhận món và thanh toán tại Cinestar",
    icon: Store,
  },
];

const initialCard = {
  number: "",
  name: "",
  expiry: "",
  cvc: "",
  focus: "",
};

const formatCardNumber = (value) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
};

const PaymentMethodButton = ({ method, selected, onSelect }) => {
  const Icon = method.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-[#ffeb00] bg-[#ffeb00]/10"
          : "border-white/10 bg-white/[0.04] hover:border-white/25"
      }`}
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${
          selected ? "bg-[#ffeb00] text-black" : "bg-white/10 text-white"
        }`}
      >
        <Icon size={22} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-black text-white">
          {method.title}
        </span>
        <span className="mt-1 block text-xs font-semibold text-white/50">
          {method.description}
        </span>
      </span>

      <span
        className={`h-5 w-5 rounded-full border-2 p-1 ${
          selected ? "border-[#ffeb00]" : "border-white/25"
        }`}
      >
        {selected && (
          <span className="block h-full w-full rounded-full bg-[#ffeb00]" />
        )}
      </span>
    </button>
  );
};

const Field = ({ label, error, ...inputProps }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-black tracking-[0.13em] text-white/55 uppercase">
      {label}
    </span>

    <input
      {...inputProps}
      className={`h-12 w-full rounded-xl border bg-white/[0.06] px-4 text-sm font-bold text-white transition outline-none placeholder:text-white/25 ${
        error
          ? "border-red-400/70 focus:border-red-400"
          : "border-white/12 focus:border-[#ffeb00]"
      }`}
    />

    {error && (
      <span className="mt-1.5 block text-xs font-semibold text-red-300">
        {error}
      </span>
    )}
  </label>
);

export default function PaymentCheckout() {
  const [order] = useState(getStoredOrder);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState(initialCard);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const orderCode = useMemo(() => {
    const orderSeed = String(order?.createdAt || order?.totalPrice || 0)
      .replace(/\D/g, "")
      .padStart(8, "0")
      .slice(-8);

    return `CNS${orderSeed}`;
  }, [order]);

  const qrValue = useMemo(
    () =>
      JSON.stringify({
        merchant: "CINESTAR",
        orderCode,
        amount: order?.totalPrice || 0,
        note: "Thanh toan mo phong cho do an Capstone",
      }),
    [order, orderCode],
  );

  if (!order?.items?.length) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#0b1024] px-5 py-16 text-white">
        <section className="w-full max-w-xl rounded-[32px] border border-white/10 bg-[#11182d] p-8 text-center shadow-2xl md:p-12">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#ffeb00]/10 text-[#ffeb00]">
            <ReceiptText size={38} />
          </span>

          <h1 className="mt-6 text-3xl font-black">Chưa có đơn hàng</h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 font-medium text-white/55">
            Hãy chọn bắp nước trước khi chuyển sang bước thanh toán.
          </p>

          <Link
            to="/popcorn-drink"
            className="cine-btn-yellow mx-auto mt-7 gap-2"
          >
            <ArrowLeft size={18} />
            Quay lại chọn món
          </Link>
        </section>
      </main>
    );
  }

  const handleCardChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "number") nextValue = formatCardNumber(value);
    if (name === "expiry") nextValue = formatExpiry(value);
    if (name === "cvc") nextValue = value.replace(/\D/g, "").slice(0, 4);
    if (name === "name") nextValue = value.toUpperCase().slice(0, 32);

    setCard((current) => ({ ...current, [name]: nextValue }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validateCard = () => {
    const nextErrors = {};
    const cardDigits = card.number.replace(/\D/g, "");

    if (cardDigits.length < 16) {
      nextErrors.number = "Vui lòng nhập đủ 16 số thẻ.";
    }

    if (card.name.trim().length < 2) {
      nextErrors.name = "Vui lòng nhập tên chủ thẻ.";
    }

    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      nextErrors.expiry = "Ngày hết hạn phải có dạng MM/YY.";
    }

    if (card.cvc.length < 3) {
      nextErrors.cvc = "Mã bảo mật chưa hợp lệ.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (paymentMethod === "card" && !validateCard()) return;

    setIsProcessing(true);

    await new Promise((resolve) => window.setTimeout(resolve, 900));

    setIsProcessing(false);
    setIsSuccess(true);
    sessionStorage.removeItem("cinestarPopcornOrder");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSuccess) {
    return (
      <main className="grid min-h-[75vh] place-items-center bg-[radial-gradient(circle_at_50%_10%,rgba(89,74,183,0.5),transparent_35%),#0b1024] px-5 py-16 text-white">
        <section className="w-full max-w-2xl rounded-[36px] border border-emerald-400/25 bg-[#11182d]/95 p-8 text-center shadow-[0_35px_100px_rgba(0,0,0,0.45)] md:p-12">
          <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
            <CheckCircle2 size={50} />
          </span>

          <p className="mt-6 text-xs font-black tracking-[0.24em] text-emerald-300 uppercase">
            Xác nhận thành công
          </p>

          <h1 className="mt-3 text-3xl font-black md:text-4xl">
            Đơn bắp nước đã được ghi nhận
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 font-medium text-white/60">
            Đây là giao dịch mô phỏng dành cho đồ án. Hệ thống chưa trừ tiền từ
            thẻ hoặc tài khoản ngân hàng của bạn.
          </p>

          <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-3 rounded-2xl bg-black/25 p-4 text-left">
            <div>
              <p className="text-xs font-bold text-white/40">Mã đơn</p>
              <p className="mt-1 font-black text-white">{orderCode}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-white/40">Tổng tiền</p>
              <p className="mt-1 font-black text-[#ffeb00]">
                {formatPrice(order.totalPrice)}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="cine-btn-yellow">
              Về trang chủ
            </Link>

            <Link to="/movies" className="cine-btn-outline">
              Tiếp tục chọn phim
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(89,74,183,0.45),transparent_28%),#0b1024] py-10 text-white md:py-14">
      <div className="cine-container">
        <Link
          to="/popcorn-drink"
          className="inline-flex items-center gap-2 text-sm font-black text-white/60 transition hover:text-[#ffeb00]"
        >
          <ArrowLeft size={18} />
          Quay lại chọn món
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_390px] lg:items-start">
          <section className="rounded-[32px] border border-white/10 bg-[#11182d]/95 p-5 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-[0.22em] text-[#ffeb00] uppercase">
                  Thanh toán bảo mật
                </p>

                <h1 className="mt-2 text-3xl font-black md:text-4xl">
                  Chọn phương thức thanh toán
                </h1>
              </div>

              <span className="hidden h-12 w-12 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300 sm:grid">
                <ShieldCheck size={25} />
              </span>
            </div>

            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {paymentMethods.map((method) => (
                <PaymentMethodButton
                  key={method.id}
                  method={method}
                  selected={paymentMethod === method.id}
                  onSelect={(id) => {
                    setPaymentMethod(id);
                    setErrors({});
                  }}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              {paymentMethod === "card" && (
                <div className="grid items-center gap-8 xl:grid-cols-[310px_1fr]">
                  <div className="mx-auto">
                    <Cards
                      number={card.number}
                      name={card.name}
                      expiry={card.expiry}
                      cvc={card.cvc}
                      focused={card.focus}
                      placeholders={{ name: "TEN CHU THE" }}
                      locale={{ valid: "HẾT HẠN" }}
                    />
                  </div>

                  <div className="grid gap-4">
                    <Field
                      label="Số thẻ"
                      name="number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="1234 5678 9012 3456"
                      value={card.number}
                      error={errors.number}
                      onChange={handleCardChange}
                      onFocus={() =>
                        setCard((current) => ({
                          ...current,
                          focus: "number",
                        }))
                      }
                    />

                    <Field
                      label="Tên chủ thẻ"
                      name="name"
                      autoComplete="cc-name"
                      placeholder="NGUYEN VAN A"
                      value={card.name}
                      error={errors.name}
                      onChange={handleCardChange}
                      onFocus={() =>
                        setCard((current) => ({
                          ...current,
                          focus: "name",
                        }))
                      }
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label="Ngày hết hạn"
                        name="expiry"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/YY"
                        value={card.expiry}
                        error={errors.expiry}
                        onChange={handleCardChange}
                        onFocus={() =>
                          setCard((current) => ({
                            ...current,
                            focus: "expiry",
                          }))
                        }
                      />

                      <Field
                        label="CVC/CVV"
                        name="cvc"
                        type="password"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        placeholder="123"
                        value={card.cvc}
                        error={errors.cvc}
                        onChange={handleCardChange}
                        onFocus={() =>
                          setCard((current) => ({
                            ...current,
                            focus: "cvc",
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "qr" && (
                <div className="grid items-center gap-7 rounded-3xl border border-white/10 bg-black/20 p-6 md:grid-cols-[220px_1fr]">
                  <div className="mx-auto rounded-2xl bg-white p-4">
                    <QRCode value={qrValue} size={180} bordered={false} />
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#ffeb00]/10 px-3 py-1.5 text-xs font-black text-[#ffeb00]">
                      <WalletCards size={15} />
                      QR thanh toán mô phỏng
                    </span>

                    <h2 className="mt-4 text-2xl font-black">
                      Quét mã bằng ứng dụng ngân hàng
                    </h2>

                    <p className="mt-3 text-sm leading-6 font-medium text-white/55">
                      Nội dung QR chỉ gồm mã đơn và tổng tiền phục vụ trình diễn
                      giao diện, không chuyển tiền thật.
                    </p>

                    <p className="mt-4 text-2xl font-black text-[#ffeb00]">
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "counter" && (
                <div className="rounded-3xl border border-[#ffeb00]/20 bg-[#ffeb00]/5 p-7 text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#ffeb00] text-black">
                    <Store size={30} />
                  </span>

                  <h2 className="mt-5 text-2xl font-black">
                    Thanh toán tại quầy Cinestar
                  </h2>

                  <p className="mx-auto mt-3 max-w-lg text-sm leading-6 font-medium text-white/55">
                    Sau khi xác nhận, hãy cung cấp mã đơn cho nhân viên để thanh
                    toán và nhận bắp nước tại quầy.
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/45">
                  <LockKeyhole size={16} className="text-emerald-300" />
                  Dữ liệu chỉ được dùng để mô phỏng giao diện trong trình duyệt.
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-[#ffeb00] px-7 text-sm font-black text-black uppercase shadow-[0_6px_0_#9b7b08] transition hover:-translate-y-0.5 hover:bg-[#fff45c] disabled:cursor-wait disabled:opacity-65"
                >
                  {isProcessing ? "Đang xác nhận..." : "Xác nhận thanh toán"}
                  <BadgeCheck size={19} />
                </button>
              </div>
            </form>
          </section>

          <aside className="rounded-[32px] border border-white/10 bg-[#11182d]/95 p-5 shadow-2xl md:p-7 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ffeb00] text-black">
                <ReceiptText size={22} />
              </span>

              <div>
                <h2 className="text-lg font-black">Tóm tắt đơn hàng</h2>
                <p className="text-xs font-semibold text-white/40">
                  {order.totalItems} món · Mã {orderCode}
                </p>
              </div>
            </div>

            <div className="mt-5 max-h-[390px] space-y-4 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-black text-white">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-white/45">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>

                  <p className="text-sm font-black text-[#ffeb00]">
                    {formatPrice(item.subtotal)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Tạm tính</span>
                <span>{formatPrice(order.totalPrice)}</span>
              </div>

              <div className="flex justify-between text-white/50">
                <span>Phí dịch vụ</span>
                <span className="font-black text-emerald-300">Miễn phí</span>
              </div>

              <div className="flex items-end justify-between border-t border-white/10 pt-4">
                <span className="font-black text-white">Tổng thanh toán</span>

                <span className="text-2xl font-black text-[#ffeb00]">
                  {formatPrice(order.totalPrice)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-400/10 p-4 text-emerald-200">
              <ShieldCheck size={22} className="shrink-0" />

              <p className="text-xs leading-5 font-semibold">
                Trang thanh toán mô phỏng, không thực hiện giao dịch tài chính
                thật.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}