import { matchPath, useLocation, useNavigate } from "react-router-dom";

import { MoveLeft } from "lucide-react";

import { useLayoutContext } from "@contexts/admin/layout";
import { useModalContext } from "@contexts/admin/modal";
import { MODAL_TYPES } from "@constants/admin/modalTypes";

export default function Header() {
  const { isSidebarOpen } = useLayoutContext();
  const location = useLocation();
  const history = location.state?.history ?? [];
  const shouldConfirmLeave = location.state?.shouldConfirmLeave ?? false;
  const previous = history.at(-1) ?? null;

  const modal = useModalContext();

  const isDisabledBack = previous === null;

  const pageConfig = [
    {
      path: "/admin/dashboard",
      title: "Dashboard",
      description: "Khu vực theo dõi tổng quan hoạt động của hệ thống.",
    },
    {
      path: "/admin/dashboard/revenue-ranking",
      title: "Revenue Ranking",
      description: "Khu vực xem thông tin xếp hạng doanh thu phim",
    },

    {
      path: "/admin/profile",
      title: "Hồ sơ quản trị",
      description:
        "Xem và quản lý thông tin tài khoản và mật khẩu của quản trị viên.",
    },
    {
      path: "/admin/profile/edit",
      title: "Profile Edit",
      description: "Cập nhật thông tin cho tài khoản quản trị.",
    },
    {
      path: "/admin/profile/password",
      title: "Password Settings",
      description: "Cập nhật mật khẩu cho tài khoản quản trị.",
    },
    {
      path: "/admin/movies",
      title: "Movie Management",
      description: "Khu vực quản lý thông tin phim trong hệ thống.",
    },
    {
      path: "/admin/movies/edit/:id",
      title: "Edit Movie",
      description: "Khu vực cập nhật thông tin phim trong hệ thống.",
    },
    {
      path: "/admin/movies/add",
      title: "Add Movie",
      description: "Khu vực thêm phim mới vào hệ thống.",
    },
    {
      path: "/admin/movies/showtimes/:id",
      title: "Showtime Managements",
      description: "Khu vực quản lý lịch chiếu phim trong hệ thống.",
    },
    {
      path: "/admin/movies/showtimes/:id/add",
      title: "Showtime Creation",
      description: "Khu vực thiết lập lịch chiếu mới cho phim.",
    },
    {
      path: "/admin/users/",
      title: "Users Management",
      description:
        "Khu vực quản lý tài khoản và thông tin người dùng trong hệ thống.",
    },
    {
      path: "/admin/users/add",
      title: "Add User",
      description: "Khu vực tạo tài khoản người dùng mới trong hệ thống.",
    },
    {
      path: "/admin/users/edit/:account",
      title: "Edit User",
      description: "Khu vực thay đổi thông tin người dùng trong hệ thống.",
    },
    {
      path: "/admin/users/booking-infor/:account",
      title: "Booking Infor",
      description: "Khu vực xem thông tin đặt vé người dùng.",
    },
  ];

  const page = pageConfig.find((item) =>
    matchPath(item.path, location.pathname),
  );

  const navigate = useNavigate();

  const onBackClick = () => {
    if (!previous) return;

    const goBack = () => {
      navigate(previous, {
        state: {
          history: history.slice(0, -1),
        },
      });
    };

    if (!shouldConfirmLeave) {
      goBack();
      return;
    }

    modal.open({
      type: MODAL_TYPES.LEAVE_PAGE,
      onConfirm: () => {
        modal.close();
        goBack();
      },
      onCancel: modal.close,
    });
  };

  isSidebarOpen;

  return (
    <header
      className={`sticky top-0 z-30 flex h-28 items-center border-b border-gray-800 bg-[#1e1e1e]/80 backdrop-blur-md transition-[padding] duration-300 ease-in-out will-change-transform ${isSidebarOpen ? "pl-8" : "lg:pl-20 2xl:pl-10 "}`}
    >
      <div className="space-y-3 py-4">
        <h1 className="text-2xl font-semibold text-white">{page?.title}</h1>
        {page?.description && (
          <p className="mt-1 text-sm text-gray-400">{page?.description}</p>
        )}
        {!isDisabledBack && (
          <button
            onClick={onBackClick}
            disabled={isDisabledBack}
            className="mt-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none active:scale-95"
            aria-label="Go back"
          >
            <MoveLeft className="size-3" />
          </button>
        )}
      </div>
    </header>
  );
}
