import {
  ChartColumn,
  LayoutDashboard,
  Clapperboard,
  Users,
  UserPen,
  SquareArrowRightExit,
} from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import MovieIcon from "./MovieIcon";

const SIDEBAR_LINKS = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    iconColor: "text-indigo-500",
  },
  {
    path: "/admin/movies/",
    label: "Movie management",
    icon: Clapperboard,
    iconColor: "text-red-500",
  },
  {
    path: "/admin/users",
    label: "User management",
    icon: Users,
    iconColor: "text-purple-500",
  },
  {
    path: "/admin/statistics",
    label: "Statistics",
    icon: ChartColumn,
    iconColor: "text-blue-500",
  },
];

export default function Sidebar() {
  const navLinkClasses = ` group flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition-colors duration-500`;

  return (
    <aside className="group/outer fixed z-10 flex h-full w-64 flex-col border-r border-gray-800 bg-[#1e1e1e]">
      {/* Logo / Brand */}

      <div className="flex h-20 items-center border-b border-gray-800 px-6">
        <div className="flex items-center gap-3">
          <MovieIcon/>

          <div className="leading-tight">
            <h1 className="text-lg font-bold tracking-wide text-white">
              CINEMA
            </h1>
            <p className="text-xs tracking-[0.25em] text-red-500 uppercase">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-5 flex-1 space-y-6 px-4 py-6">
        {SIDEBAR_LINKS.map((link) => (
          <NavLink
            to={link.path}
            key={link.path}
            className={({ isActive }) =>
              `${navLinkClasses} ${
                isActive
                  ? "bg-rose-600 text-white"
                  : "transition-colors duration-300 hover:bg-rose-400 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon
                  className={
                    isActive
                      ? "text-white"
                      : `${link.iconColor} transition-colors duration-500 group-hover:text-white`
                  }
                />
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer / User Info */}

      <div className="flex items-center space-x-3 border-t border-gray-800 p-4">
        <div className="group relative">
          <div className="before:absolute before:bottom-full before:left-0 before:h-4 before:w-full before:bg-transparent before:content-['']"></div>

          <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-sm font-bold text-white transition-colors duration-400 hover:bg-gray-600">
            AD
          </button>
          <div className="pointer-events-none absolute bottom-10 left-0 w-50 overflow-hidden rounded-xl border border-gray-700 bg-[#1f1f1f] opacity-0 shadow-2xl transition-opacity duration-500 group-hover:pointer-events-auto group-hover:opacity-100">
            <Link
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 transition-colors duration-300 hover:bg-gray-800"
              to="/admin/profile"
            >
              <UserPen className="text-lg text-gray-400" />
              <span className="text-sm text-white">Hồ sơ</span>
            </Link>
            <div className="h-px bg-gray-700" />

            <button className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-red-400 transition-colors duration-300 hover:bg-red-500/10">
              <SquareArrowRightExit className="text-lg" />
              <span className="text-sm">Đăng xuất</span>
            </button>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">Duc Nguyen</p>
          <p className="truncate text-xs text-gray-500">Super Admin</p>{" "}
        </div>
      </div>
    </aside>
  );
}
