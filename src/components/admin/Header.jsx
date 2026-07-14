import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const history = location.state?.history ?? [];
  const previous = history.at(-1);

  const isDisabledBack = previous === undefined;

  const pageConfig = [
    {
      path: "/admin/dashboard",
      title: "Dashboard",
      description: "Khu vực theo dõi tổng quan hoạt động của hệ thống.",
    },
    {
      path: "/admin/profile",
      title: "Profile",
      description: "Khu vực quản lý thông tin tài khoản.",
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
      title: "Add user",
      description: "Khu vực tạo tài khoản người dùng mới trong hệ thống.",
    },
     {
      path: "/admin/users/edit/:account",
      title: "Edit user",
      description: "Khu vực thay đổi thông tin người dùng trong hệ thống.",
    },
     {
      path: "/admin/users/booking-infor/:account",
      title: "Booking infor",
      description: "Khu vực xem thông tin đặt vé người dùng.",
    },
  ];

  let page = null;

  page = pageConfig.find((item) => matchPath(item.path, location.pathname));

  const navigate = useNavigate();
  const onBackClick = () =>
    navigate(previous, {
      state: {
        history: history.slice(0, -1),
      },
    });

  return (
    <header className="sticky top-0 z-20 flex h-28 items-center border-b border-gray-800 bg-[#1e1e1e]/80 px-8 backdrop-blur-md">
      <div className="space-y-3 py-4">
        <h1 className="text-2xl font-semibold text-white">{page?.title}</h1>
        {page?.description && (
          <p className="mt-1 text-sm text-gray-400">{page?.description}</p>
        )}
        <button
          onClick={onBackClick}
          disabled={isDisabledBack}
          className="mt-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-700 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:outline-none active:scale-95"
          aria-label="Go back"
        >
          <MoveLeft className="size-3" />
        </button>
      </div>
    </header>
  );
}
