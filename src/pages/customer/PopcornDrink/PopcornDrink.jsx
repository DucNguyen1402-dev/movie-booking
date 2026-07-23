import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ChevronRight,
  Minus,
  Plus,
  Popcorn,
  RotateCcw,
  ShoppingBag,
  Ticket,
} from "lucide-react";

const onlineImages = {
  combo:
    "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=900&q=85",
  cola: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=85",
  softDrink:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
  water:
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
  juice:
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85",
  chips:
    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=900&q=85",
};

const fallbackImage =
  "https://placehold.co/900x700/151d35/ffeb00?text=Cinestar+Food";

const productSections = [
  {
    id: "combo",
    title: "Combo gấu",
    subtitle: "Combo bắp và nước dành cho một người, cặp đôi hoặc cả nhóm.",
    products: [
      {
        id: "combo-gau",
        name: "Combo gấu",
        description:
          "1 Coke 32oz + 1 bắp 2 ngăn 64oz phô mai và caramel, vùng 1",
        price: 119000,
        image: onlineImages.combo,
        imageAlt: "Combo bắp rang và nước ngọt tại rạp phim",
      },
      {
        id: "combo-co-gau",
        name: "Combo có gấu",
        description:
          "2 Coke 32oz + 1 bắp 2 ngăn 64oz phô mai và caramel, vùng 1",
        price: 129000,
        image: onlineImages.combo,
        imageAlt: "Combo bắp rang và hai ly nước ngọt",
        imagePosition: "center 58%",
      },
      {
        id: "combo-nha-gau",
        name: "Combo nhà gấu",
        description:
          "4 Coke 22oz + 2 bắp 2 ngăn 64oz phô mai và caramel, vùng 1",
        price: 259000,
        image: onlineImages.combo,
        imageAlt: "Combo bắp nước dành cho nhóm",
        imagePosition: "center 68%",
      },
    ],
  },
  {
    id: "popcorn",
    title: "Bắp rang vùng",
    subtitle: "Bắp rang hai vị giòn thơm cho buổi xem phim trọn vẹn hơn.",
    products: [
      {
        id: "popcorn-2-flavors",
        name: "Bắp 2 ngăn 64oz phô mai + caramel",
        description: "Một hộp bắp lớn gồm hai vị phô mai và caramel.",
        price: 85000,
        image: onlineImages.combo,
        imageAlt: "Bắp rang tại rạp chiếu phim",
        imagePosition: "center 42%",
      },
    ],
  },
  {
    id: "soft-drink",
    title: "Nước ngọt CNS08",
    subtitle: "Các loại nước ngọt 32oz dùng kèm bắp rang.",
    products: [
      {
        id: "coke-zero",
        name: "Coke Zero 32oz",
        description: "Nước ngọt không đường, dùng lạnh.",
        price: 37000,
        image: onlineImages.cola,
        imageAlt: "Nước ngọt Coke Zero dùng lạnh",
      },
      {
        id: "fanta",
        name: "Fanta 32oz",
        description: "Nước ngọt hương cam, dùng lạnh.",
        price: 37000,
        image: onlineImages.juice,
        imageAlt: "Nước ngọt hương cam dùng lạnh",
      },
      {
        id: "coke",
        name: "Coke 32oz",
        description: "Coca-Cola truyền thống, dùng lạnh.",
        price: 37000,
        image: onlineImages.cola,
        imageAlt: "Coca-Cola truyền thống dùng lạnh",
        imagePosition: "center 62%",
      },
      {
        id: "sprite",
        name: "Sprite 32oz",
        description: "Nước ngọt vị chanh, dùng lạnh.",
        price: 37000,
        image: onlineImages.softDrink,
        imageAlt: "Nước ngọt có ga vị chanh",
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
        name: "Nước suối Dasani 500/510ml",
        description: "Nước tinh khiết đóng chai.",
        price: 20000,
        image: onlineImages.water,
        imageAlt: "Nước suối đóng chai dùng tại rạp phim",
      },
    ],
  },
  {
    id: "bottled-drink",
    title: "Nước ngọt",
    subtitle: "Nước trái cây đóng chai dùng lạnh.",
    products: [
      {
        id: "nutriboost",
        name: "Nước trái cây Nutriboost 297ml",
        description: "Thức uống trái cây vị dâu.",
        price: 28000,
        image: onlineImages.juice,
        imageAlt: "Nước trái cây đóng chai dùng lạnh",
        imagePosition: "center 38%",
      },
      {
        id: "teppy",
        name: "Nước cam Teppy 327ml",
        description: "Nước cam có tép, dùng lạnh.",
        price: 28000,
        image: onlineImages.juice,
        imageAlt: "Nước cam có tép dùng lạnh",
        imagePosition: "center 65%",
      },
    ],
  },
  {
    id: "snack",
    title: "Poca",
    subtitle: "Snack khoai tây giòn ngon cho buổi xem phim.",
    products: [
      {
        id: "poca-wavy",
        name: "Poca Wavy 54gr",
        description: "Snack khoai tây dạng sóng vị bò bít tết.",
        price: 28000,
        image: onlineImages.chips,
        imageAlt: "Snack khoai tây dạng sóng",
      },
      {
        id: "lays-stax",
        name: "Khoai tây Lay's Stax 100g",
        description: "Khoai tây lát trong lon tiện lợi.",
        price: 59000,
        image: onlineImages.chips,
        imageAlt: "Khoai tây lát giòn",
        imagePosition: "center 68%",
      },
      {
        id: "poca-potato",
        name: "Poca khoai tây 54gr",
        description: "Snack khoai tây vị tự nhiên.",
        price: 28000,
        image: onlineImages.chips,
        imageAlt: "Snack khoai tây vị tự nhiên",
        imagePosition: "center 35%",
      },
    ],
  },
];

const allProducts = productSections.flatMap((section) => section.products);

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);

const handleImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallbackImage;
};

const ProductArtwork = ({ product }) => (
  <div className="relative h-44 overflow-hidden rounded-2xl bg-[#1a2340] shadow-inner sm:h-48">
    <img
      src={product.image}
      alt={product.imageAlt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={handleImageError}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      style={{ objectPosition: product.imagePosition || "center" }}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/5" />

    <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[10px] font-black tracking-[0.14em] text-white uppercase backdrop-blur-md">
      Cinestar Food
    </span>
  </div>
);

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => (
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

const ProductCard = ({ product, quantity, onChangeQuantity }) => (
  <article className="group grid gap-4 rounded-3xl border border-white/10 bg-[#11182d]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-[#ffeb00]/50 sm:grid-cols-[170px_1fr]">
    <ProductArtwork product={product} />

    <div className="flex min-w-0 flex-col py-1">
      <h3 className="text-base leading-6 font-black text-white uppercase">
        {product.name}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-6 font-medium text-white/65">
        {product.description}
      </p>

      <p className="mt-3 text-lg font-black text-[#ffeb00]">
        {formatPrice(product.price)}
      </p>

      <div className="mt-auto pt-5">
        <QuantityControl
          quantity={quantity}
          onDecrease={() => onChangeQuantity(product.id, -1)}
          onIncrease={() => onChangeQuantity(product.id, 1)}
        />
      </div>
    </div>
  </article>
);

export default function PopcornDrink() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  const handleChangeQuantity = (productId, change) => {
    setQuantities((currentQuantities) => {
      const currentQuantity = currentQuantities[productId] || 0;
      const nextQuantity = Math.min(20, Math.max(0, currentQuantity + change));

      return {
        ...currentQuantities,
        [productId]: nextQuantity,
      };
    });
  };

  const selectedItems = useMemo(
    () =>
      allProducts
        .filter((product) => (quantities[product.id] || 0) > 0)
        .map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantities[product.id],
          subtotal: product.price * quantities[product.id],
        })),
    [quantities],
  );

  const orderSummary = useMemo(
    () =>
      selectedItems.reduce(
        (summary, item) => ({
          totalItems: summary.totalItems + item.quantity,
          totalPrice: summary.totalPrice + item.subtotal,
        }),
        { totalItems: 0, totalPrice: 0 },
      ),
    [selectedItems],
  );

  const handleResetOrder = () => setQuantities({});

  const handleContinue = () => {
    if (orderSummary.totalItems === 0) return;

    const order = {
      items: selectedItems,
      totalItems: orderSummary.totalItems,
      totalPrice: orderSummary.totalPrice,
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("cinestarPopcornOrder", JSON.stringify(order));
    navigate("/payment");
  };

  return (
    <main className="min-h-screen bg-[#0c1428] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b1024]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(111,53,181,0.65),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(37,99,216,0.35),transparent_28%)]" />

        <div className="cine-container relative py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffeb00]/30 bg-[#ffeb00]/10 px-4 py-2 text-sm font-black tracking-[0.18em] text-[#ffeb00] uppercase">
                <Popcorn size={18} />
                Quầy bắp nước Cinestar
              </div>

              <h1 className="mt-5 max-w-3xl font-['Oswald'] text-5xl leading-tight font-bold tracking-wide text-white uppercase md:text-7xl">
                Đặt bắp nước
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 font-medium text-white/70 md:text-lg">
                Chọn combo, bắp rang và nước uống yêu thích để buổi xem phim của
                bạn thêm trọn vẹn.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#combo" className="cine-btn-yellow gap-2">
                  <ShoppingBag size={18} />
                  Chọn món ngay
                </a>

                <Link to="/movies" className="cine-btn-outline gap-2">
                  <Ticket size={18} />
                  Chọn phim
                </Link>
              </div>
            </div>

            <div className="relative mx-auto h-72 w-full max-w-[420px] overflow-hidden rounded-[40px] border border-white/15 bg-white/[0.07] shadow-[0_30px_90px_rgba(0,0,0,0.4)]">
              <img
                src={onlineImages.combo}
                alt="Bắp rang và nước uống tại rạp chiếu phim"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090f22]/80 via-transparent to-white/5" />
              <div className="absolute bottom-6 left-6">
                <p className="text-xs font-black tracking-[0.22em] text-[#ffeb00] uppercase">
                  Movie snack
                </p>
                <p className="mt-1 text-2xl font-black text-white">
                  Trọn vị điện ảnh
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[radial-gradient(circle_at_28%_18%,rgba(89,74,183,0.8),transparent_34%),radial-gradient(circle_at_75%_70%,rgba(91,33,182,0.45),transparent_35%),linear-gradient(135deg,#10182f_0%,#121b34_48%,#0d1529_100%)]">
        <div className="cine-container py-14 md:py-20">
          {productSections.map((section, sectionIndex) => (
            <section
              key={section.id}
              id={section.id}
              className={
                sectionIndex === 0 ? "scroll-mt-40" : "mt-20 scroll-mt-40"
              }
            >
              <div className="mb-8 text-center">
                <h2 className="font-['Oswald'] text-4xl font-bold tracking-wide text-white uppercase md:text-5xl">
                  {section.title}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 font-medium text-white/60 md:text-base">
                  {section.subtitle}
                </p>
              </div>

              <div
                className={`grid gap-5 ${
                  section.products.length === 1
                    ? "mx-auto max-w-2xl"
                    : "lg:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {section.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id] || 0}
                    onChangeQuantity={handleChangeQuantity}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="sticky bottom-0 z-40 border-t border-white/10 bg-[#080d1d]/95 py-4 shadow-[0_-18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="cine-container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-8 sm:justify-start">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
                Đã chọn
              </p>
              <p className="mt-1 text-lg font-black text-white">
                {orderSummary.totalItems} món
              </p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-white/45 uppercase">
                Tổng cộng
              </p>
              <p className="mt-1 text-xl font-black text-[#ffeb00]">
                {formatPrice(orderSummary.totalPrice)}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleResetOrder}
              disabled={orderSummary.totalItems === 0}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 text-sm font-black text-white transition hover:border-white/35 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <RotateCcw size={17} />
              Đặt lại
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={orderSummary.totalItems === 0}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#ffeb00] px-6 text-sm font-black text-black uppercase shadow-[0_6px_0_#9b7b08] transition hover:-translate-y-0.5 hover:bg-[#fff45c] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-zinc-600 disabled:text-zinc-300 disabled:shadow-none sm:flex-none"
            >
              Tiếp tục thanh toán
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}