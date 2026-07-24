import {
  CircleDollarSign,
  Star,
  Ticket,
  TicketPercent,
  TrendingUp,
  Users,
} from "lucide-react";

import { useLayoutContext } from "@contexts/admin";
import {
  formatCurrency,
  formatRoundedNumber,
} from "@features/admin/dashboard/utils";

import EmptyMetricCard from "./EmptyMetricCard";
import MetricCard from "./MetricCard";

const createMetricCards = ({
  totalRevenue,
  totalTicketSold,
  userQuantity,
  averageRevenue,
  averageTicketsSold,
  averageRating,
}) => [
  {
    id: "tongDoanhThu",
    title: "Tổng doanh thu",
    desc: "Tổng doanh thu của các phim đang chiếu",
    metric: formatCurrency(totalRevenue, {
      currency: "VND",
      locale: "vi-VN",
    }),
    icon: CircleDollarSign,
    iconClassName: "text-yellow-500",
    iconBackground: "bg-yellow-500/10",
    hoverClasses: "hover:border-yellow-500/40 hover:shadow-yellow-500/5",
  },
  {
    id: "tongVeBan",
    title: "Tổng vé đã bán",
    desc: "Tổng số lượng vé của các phim đang chiếu đã bán",
    metric: formatRoundedNumber(totalTicketSold),
    icon: TicketPercent,
    iconClassName: "text-blue-500",
    iconBackground: "bg-blue-500/10",
    hoverClasses: "hover:border-blue-500/40 hover:shadow-blue-500/5",
  },
  {
    id: "nguoiDung",

    title: "Người dùng",
    desc: "Tổng số người dùng",
    metric: userQuantity,
    icon: Users,
    iconClassName: "text-purple-500",
    iconBackground: "bg-purple-500/10",
    hoverClasses: "hover:border-purple-500/40 hover:shadow-purple-500/5",
  },
  {
    id: "doanhThuTrungBinh",
    title: "Doanh thu trung bình",
    desc: "Doanh thu trung bình mỗi phim đang chiếu",
    metric: formatCurrency(averageRevenue, {
      currency: "VND",
      locale: "vi-VN",
    }),
    icon: TrendingUp,
    iconClassName: "text-cyan-500",
    iconBackground: "bg-cyan-500/10",
    hoverClasses: "hover:border-cyan-500/40 hover:shadow-cyan-500/5",
  },
  {
    id: "danhGiaTrungBinh",
    title: " ĐIỂM ĐÁNH GIÁ TB",
    desc: "Điểm đánh giá trung bình của các phim đang chiếu",
    metric: averageRating.toFixed(1),
    icon: Star,
    iconClassName: "text-amber-500",
    iconBackground: "bg-amber-500/10",
    hoverClasses: "hover:border-amber-500/40 hover:shadow-amber-500/5",
  },

  {
    id: "veBanTrungBinh",
    title: "VÉ BÁN TRUNG BÌNH",
    desc: "Số vé bán trung bình mỗi phim đang chiếu",
    metric: formatRoundedNumber(averageTicketsSold),
    icon: Ticket,
    iconClassName: "text-emerald-500",
    iconBackground: "bg-emerald-500/10",
    hoverClasses: "hover:border-emerald-500/40 hover:shadow-emerald-500/5",
  },
];

export default function MetricsSection({
  isPending,
  userQuantity,
  totalRevenue,
  totalTicketSold,
  averageRevenue,
  averageTicketsSold,
  averageRating,
}) {
  const METRIC_CARDS = createMetricCards({
    totalRevenue,
    totalTicketSold,
    userQuantity,
    averageRevenue,
    averageTicketsSold,
    averageRating,
  });
  const { isSidebarOpen } = useLayoutContext();

  return (
    <section
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${isSidebarOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}
    >
      {isPending
        ? Array.from({ length: 6 }, (_, index) => (
            <EmptyMetricCard key={index} />
          ))
        : METRIC_CARDS.map((metricCard) => (
            <MetricCard
              key={metricCard.id}
              hoverClasses={metricCard.hoverClasses}
              title={metricCard.title}
              iconBackground={metricCard.iconBackground}
              Icon={metricCard.icon}
              iconClassName={metricCard.iconClassName}
              metric={metricCard.metric}
              descs={metricCard.desc}
            />
          ))}
    </section>
  );
}
