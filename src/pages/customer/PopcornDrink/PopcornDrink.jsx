import {
  ChevronRight,
  Minus,
  Popcorn,
  Plus,
  RotateCcw,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const productSections = [
  {
    id: "combo",
    title: "Combo gấu",
    subtitle:
      "Combo bắp và nước dành cho một người, cặp đôi hoặc cả nhóm.",
    products: [
      {
        id: "combo-gau",
        name: "Combo gấu",
        description:
          "1 Coke 32oz + 1 bắp 2 ngăn 64oz phô mai và caramel, vùng 1",
        price: 119000,
        visual: ["🍿", "🥤"],
      },
      {
        id: "combo-co-gau",
        name: "Combo có gấu",
        description:
          "2 Coke 32oz + 1 bắp 2 ngăn 64oz phô mai và caramel, vùng 1",
        price: 129000,
        visual: ["🍿", "🥤", "🥤"],
      },
      {
        id: "combo-nha-gau",
        name: "Combo nhà gấu",
        description:
          "4 Coke 22oz + 2 bắp 2 ngăn 64oz phô mai và caramel, vùng 1",
        price: 259000,
        visual: ["🍿", "🍿", "🥤", "🥤"],
      },
    ],
  },
  {
    id: "popcorn",
    title: "Bắp rang vùng",
    subtitle:
      "Bắp rang hai vị giòn thơm cho buổi xem phim trọn vẹn hơn.",
    products: [
      {
        id: "popcorn-2-flavors",
        name:
          "Bắp 2 ngăn 64oz phô mai + caramel",
        description:
          "Một hộp bắp lớn gồm hai vị phô mai và caramel.",
        price: 85000,
        visual: ["🍿"],
      },
    ],
  },
  {
    id: "soft-drink",
    title: "Nước ngọt CNS08",
    subtitle:
      "Các loại nước ngọt 32oz dùng kèm bắp rang.",
    products: [
      {
        id: "coke-zero",
        name: "Coke Zero 32oz",
        description:
          "Nước ngọt không đường, dùng lạnh.",
        price: 37000,
        visual: ["🥤"],
        accent: "from-zinc-700 to-black",
      },
      {
        id: "fanta",
        name: "Fanta 32oz",
        description:
          "Nước ngọt hương cam, dùng lạnh.",
        price: 37000,
        visual: ["🥤"],
        accent:
          "from-orange-400 to-orange-600",
      },
      {
        id: "coke",
        name: "Coke 32oz",
        description:
          "Coca-Cola truyền thống, dùng lạnh.",
        price: 37000,
        visual: ["🥤"],
        accent: "from-red-500 to-red-800",
      },
      {
        id: "sprite",
        name: "Sprite 32oz",
        description:
          "Nước ngọt vị chanh, dùng lạnh.",
        price: 37000,
        visual: ["🥤"],
        accent:
          "from-emerald-400 to-emerald-700",
      },
    ],
  },
  {
    id: "water",
    title: "Nước uống",
    subtitle: "Nước suối đóng chai tiện lợi.",
    products: [
      {
        id: "dasani",
        name:
          "Nước suối Dasani 500/510ml",
        description:
          "Nước tinh khiết đóng chai.",
        price: 20000,
        visual: ["💧"],
        accent: "from-sky-300 to-blue-600",
      },
    ],
  },
  {
    id: "bottled-drink",
    title: "Nước ngọt",
    subtitle:
      "Nước trái cây đóng chai dùng lạnh.",
    products: [
      {
        id: "nutriboost",
        name:
          "Nước trái cây Nutriboost 297ml",
        description:
          "Thức uống trái cây vị dâu.",
        price: 28000,
        visual: ["🍓"],
        accent: "from-rose-300 to-red-600",
      },
      {
        id: "teppy",
        name: "Nước cam Teppy 327ml",
        description:
          "Nước cam có tép, dùng lạnh.",
        price: 28000,
        visual: ["🍊"],
        accent:
          "from-amber-300 to-orange-600",
      },
    ],
  },
  {
    id: "snack",
    title: "Poca",
    subtitle:
      "Snack khoai tây giòn ngon cho buổi xem phim.",
    products: [
      {
        id: "poca-wavy",
        name: "Poca Wavy 54gr",
        description:
          "Snack khoai tây dạng sóng vị bò bít tết.",
        price: 28000,
        visual: ["🍟"],
        accent: "from-red-400 to-red-700",
      },
      {
        id: "lays-stax",
        name:
          "Khoai tây Lay's Stax 100g",
        description:
          "Khoai tây lát trong lon tiện lợi.",
        price: 59000,
        visual: ["🥔"],
        accent:
          "from-yellow-300 to-amber-600",
      },
      {
        id: "poca-potato",
        name: "Poca khoai tây 54gr",
        description:
          "Snack khoai tây vị tự nhiên.",
        price: 28000,
        visual: ["🍟"],
        accent:
          "from-yellow-300 to-yellow-600",
      },
    ],
  },
];

const allProducts = productSections.flatMap(
  (section) => section.products,
);

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductArtwork = ({ product }) => {
  return (
    <div
      className={`relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${
        product.accent ||
        "from-[#fff7dc] to-[#e8d49b]"
      } p-5 shadow-inner sm:h-48`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/35 blur-xl" />

      <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-black/15 blur-2xl" />

      <div className="relative flex items-end justify-center -space-x-5 drop-shadow-[0_14px_12px_rgba(0,0,0,0.25)]">
        {product.visual.map(
          (item, index) => (
            <span
              key={`${product.id}-${index}`}
              className={`select-none leading-none ${
                product.visual.length > 2
                  ? "text-5xl sm:text-6xl"
                  : "text-7xl sm:text-8xl"
              }`}
              style={{
                transform: `translateY(${
                  index % 2 === 0 ? 0 : 8
                }px)`,
              }}
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
};

const QuantityControl = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="inline-flex h-11 items-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.08]">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity === 0}
        className="grid h-full w-11 place-items-center text-white transition hover:bg-white/10 hover:text-[#ffeb00] disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Giảm số lượng"
      >
        <Minus size={18} />
      </button>

      <span className="grid h-full min-w-12 place-items-center border-x border-white/10 text-base font-black text-white">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="grid h-full w-11 place-items-center bg-[#ffeb00] text-black transition hover:bg-[#fff45c]"
        aria-label="Tăng số lượng"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

const ProductCard = ({
  product,
  quantity,
  onChangeQuantity,
}) => {
  return (
    <article className="group grid gap-4 rounded-3xl border border-white/10 bg-[#11182d]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-[#ffeb00]/50 sm:grid-cols-[170px_1fr]">
      <ProductArtwork product={product} />

      <div className="flex min-w-0 flex-col py-1">
        <h3 className="text-base font-black uppercase leading-6 text-white">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm font-medium leading-6 text-white/65">
          {product.description}
        </p>

        <p className="mt-3 text-lg font-black text-[#ffeb00]">
          {formatPrice(product.price)}
        </p>

        <div className="mt-auto pt-5">
          <QuantityControl
            quantity={quantity}
            onDecrease={() =>
              onChangeQuantity(product.id, -1)
            }
            onIncrease={() =>
              onChangeQuantity(product.id, 1)
            }
          />
        </div>
      </div>
    </article>
  );
};

export default function PopcornDrink() {
  const [quantities, setQuantities] =
    useState({});

  const handleChangeQuantity = (
    productId,
    change,
  ) => {
    setQuantities((currentQuantities) => {
      const currentQuantity =
        currentQuantities[productId] || 0;

      const nextQuantity = Math.min(
        20,
        Math.max(
          0,
          currentQuantity + change,
        ),
      );

      return {
        ...currentQuantities,
        [productId]: nextQuantity,
      };
    });
  };

  const orderSummary = useMemo(() => {
    return allProducts.reduce(
      (summary, product) => {
        const quantity =
          quantities[product.id] || 0;

        summary.totalItems += quantity;

        summary.totalPrice +=
          quantity * product.price;

        return summary;
      },
      {
        totalItems: 0,
        totalPrice: 0,
      },
    );
  }, [quantities]);

  const handleResetOrder = () => {
    setQuantities({});
  };

  return (
    <main className="min-h-screen bg-[#0c1428] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b1024]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(111,53,181,0.65),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(37,99,216,0.35),transparent_28%)]" />

        <div className="cine-container relative py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffeb00]/30 bg-[#ffeb00]/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#ffeb00]">
                <Popcorn size={18} />
                Quầy bắp nước Cinestar
              </div>

              <h1 className="mt-5 max-w-3xl font-['Oswald'] text-5xl font-bold uppercase leading-tight tracking-wide text-white md:text-7xl">
                Đặt bắp nước
              </h1>

              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/70 md:text-lg">
                Chọn combo, bắp rang và nước uống
                yêu thích để buổi xem phim của bạn
                thêm trọn vẹn.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#combo"
                  className="cine-btn-yellow gap-2"
                >
                  <ShoppingBag size={18} />
                  Chọn món ngay
                </a>

                <Link
                  to="/movies"
                  className="cine-btn-outline gap-2"
                >
                  <Ticket size={18} />
                  Chọn phim
                </Link>
              </div>
            </div>

            <div className="relative mx-auto grid h-72 w-full max-w-[360px] place-items-center rounded-[40px] border border-white/15 bg-white/[0.07] shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="absolute inset-5 rounded-[30px] border border-dashed border-[#ffeb00]/30" />

              <div className="flex items-end -space-x-8 text-[92px] drop-shadow-[0_18px_18px_rgba(0,0,0,0.35)] sm:text-[112px]">
                <span>🍿</span>

                <span className="translate-y-3">
                  🥤
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[radial-gradient(circle_at_28%_18%,rgba(89,74,183,0.8),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(91,33,182,0.45),transparent_35%),linear-gradient(135deg,#10182f_0%,#121b34_48%,#0d1529_100%)]">
        <div className="cine-container py-14 md:py-20">
          {productSections.map(
            (section, sectionIndex) => (
              <section
                key={section.id}
                id={section.id}
                className={
                  sectionIndex === 0
                    ? "scroll-mt-40"
                    : "mt-20 scroll-mt-40"
                }
              >
                <div className="mb-8 text-center">
                  <h2 className="font-['Oswald'] text-4xl font-bold uppercase tracking-wide text-white md:text-5xl">
                    {section.title}
                  </h2>

                  <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-white/60 md:text-base">
                    {section.subtitle}
                  </p>
                </div>

                <div
                  className={`grid gap-5 ${
                    section.products.length ===
                    1
                      ? "mx-auto max-w-2xl"
                      : "lg:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {section.products.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantity={
                          quantities[
                            product.id
                          ] || 0
                        }
                        onChangeQuantity={
                          handleChangeQuantity
                        }
                      />
                    ),
                  )}
                </div>
              </section>
            ),
          )}
        </div>
      </div>

      <section className="sticky bottom-0 z-40 border-t border-white/10 bg-[#080d1d]/95 py-4 shadow-[0_-18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="cine-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-8 sm:justify-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                Đã chọn
              </p>

              <p className="mt-1 text-lg font-black text-white">
                {orderSummary.totalItems} món
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                Tổng cộng
              </p>

              <p className="mt-1 text-xl font-black text-[#ffeb00]">
                {formatPrice(
                  orderSummary.totalPrice,
                )}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleResetOrder}
              disabled={
                orderSummary.totalItems === 0
              }
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-black text-white transition hover:border-white/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <RotateCcw size={17} />
              Đặt lại
            </button>

            <button
              type="button"
              disabled={
                orderSummary.totalItems === 0
              }
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ffeb00] px-6 text-sm font-black uppercase text-black shadow-[0_6px_0_#9b7b08] transition hover:-translate-y-0.5 hover:bg-[#fff45c] disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-zinc-600 disabled:text-zinc-300 disabled:shadow-none sm:flex-none"
            >
              Tiếp tục
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}