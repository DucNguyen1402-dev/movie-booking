
import {ChartColumn, LayoutDashboard, Clapperboard , Users, Film, UserPen, SquareArrowRightExit} from "lucide-react";
import { NavLink, Link } from "react-router-dom";

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
    path: "/admin/tickets",
    label: "User management",
    icon: Users,
    iconColor: "text-purple-500",
  },
  {
    path: "/admin/users",
    label: "Statistics",
    icon: ChartColumn,
    iconColor: "text-blue-500",
  },

];

export default function Sidebar() {
  const navLinkClasses = ` group flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition-colors duration-500`;

  return (
    <aside className="w-64 bg-[#1e1e1e] border-r border-gray-800 flex flex-col fixed h-full z-10">
      {/* Logo / Brand */}

     <div className="h-20 border-b border-gray-800 flex items-center px-6">
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
      <Film className="text-2xl text-white" />
    </div>

    <div className="leading-tight">
      <h1 className="text-lg font-bold tracking-wide text-white">
        CINEMA
      </h1>
      <p className="text-xs uppercase tracking-[0.25em] text-red-500">
        Admin Panel
      </p>
    </div>
  </div>
</div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-4">
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
                      : `${link.iconColor} group-hover:text-white transition-colors duration-500`
                  }
                />
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer / User Info */}

      <div className="p-4 border-t border-gray-800 flex items-center space-x-3">
        <div className="relative group ">
          <div className="before:content-[''] before:absolute before:bottom-full before:left-0 before:w-full before:h-4 before:bg-transparent"></div>

          <button className=" w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center font-bold text-sm text-white transition-colors duration-400 hover:bg-gray-600 cursor-pointer">
            AD
          </button>
          <div className="absolute bottom-10 left-0 w-50 opacity-0 rounded-xl border border-gray-700 bg-[#1f1f1f] shadow-2xl overflow-hidden transition-opacity duration-500 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto  ">
            <Link className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-800  cursor-pointer transition-colors duration-300" to = "/admin/profile">
              <UserPen className="text-lg text-gray-400" />
              <span className="text-sm text-white">Hồ sơ</span>
            </Link>
            <div className="h-px bg-gray-700" />

            <button className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors duration-300">
              <SquareArrowRightExit className="text-lg" />
              <span className="text-sm">Đăng xuất</span>
            </button>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">Duc Nguyen</p>
          <p className="text-xs text-gray-500 truncate">Super Admin</p>{" "}
        </div>
      </div>
    </aside>
  );
}
