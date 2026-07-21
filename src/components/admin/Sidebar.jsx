import {
  LayoutDashboard,
  Clapperboard,
  Users,
  UserPen,
  SquareArrowRightExit,
  Menu,
} from "lucide-react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import MovieIcon from "./MovieIcon";
import { useUserContext } from "@contexts/admin/user";
import { clearAuth } from "@utils/shared";
import { useLayoutContext } from "@contexts/admin/layout";

const SIDEBAR_LINKS = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    iconColor: "text-indigo-500",
  },
  {
    path: "/admin/movies",
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
];

export default function Sidebar() {
  const {
    isSidebarOpen,

    toggleSidebar,
  } = useLayoutContext();

  const navigate = useNavigate();
  const { storageAvatar, avatarName, account } = useUserContext();

  const navLinkClasses = ` group flex items-center space-x-3 px-2.5 py-2.5 rounded-lg font-medium transition-colors duration-500`;

  const onLogoutClick = () => {
    clearAuth();
    navigate("/login");
  };

  const onMenuClick = () => toggleSidebar();

  return (
    <aside
      className={`group/outer fixed z-20 flex h-full w-64 transform-gpu flex-col border-r border-gray-800 bg-[#1e1e1e] transition-transform duration-300 ease-in-out will-change-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-4/5"}`}
    >
      <div
        className={`flex h-20 items-center border-b border-gray-800 px-6 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? "" : "opacity-0"}`}
      >
        <div className="flex items-center gap-3">
          <MovieIcon />

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

      <nav
        className={`mt-5 flex-1 space-y-6 px-4 py-6 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? "" : "opacity-0"}`}
      >
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

      <div className="flex items-center space-x-3 border-t border-gray-800 p-4">
        <div className="group relative">
          <div className="before:absolute before:bottom-full before:left-0 before:h-4 before:w-full before:bg-transparent before:content-['']"></div>

          <button className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-yellow-600 text-lg font-bold text-slate-100 transition-colors duration-300 hover:bg-yellow-500">
            {storageAvatar ? <img src={storageAvatar} alt ="user avatar"/> : avatarName}
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

            <button
              onClick={onLogoutClick}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-red-400 transition-colors duration-300 hover:bg-red-500/10"
            >
              <SquareArrowRightExit className="text-lg" />
              <span className="text-sm">Đăng xuất</span>
            </button>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate text-sm font-medium text-slate-100">
            {account}
          </p>
          <p className="truncate text-xs text-slate-400">admin</p>
        </div>
      </div>

      <button
        onClick={onMenuClick}
        className="absolute top-2.5 right-1 cursor-pointer rounded-md px-2.5 py-2 text-slate-300 transition-colors duration-200 hover:bg-slate-700/20 hover:text-red-100"
      >
        <Menu className="size-5.5" />
      </button>
      <nav
        className={`absolute top-20 right-1 z-20 mt-5 transition-opacity duration-300 ease-in-out space-y-6 py-6 ${isSidebarOpen ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"}`}
      >
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
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
