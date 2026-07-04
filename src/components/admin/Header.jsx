import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const headerMap = {
    "/admin/dashboard": {
      title: "Dashboard",
      description: "Theo dõi doanh thu và thống kê hệ thống",
    },
    "/admin/profile": {
      title: "Trang hồ sơ",
      description: "Quản lý thông tin tài khoản",
    },
    "/admin/movies": {
      title: "Trang quản lý",
      description: "Quản lý và theo dõi thông tin phim",
    },
      "/admin/edit": {
      title: "Edit phim",
      description: "Thay đổi thông tin phim",
    },
  };
  const { title, description } = headerMap[pathname] ?? {
    title: "",
    description: "",
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center border-b border-gray-800 bg-[#1e1e1e]/80 px-8 backdrop-blur-md">
      <div className ="space-y-2">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-400">{description}</p>
        )}
      </div>
    </header>
  );
}
