import { matchPath , useLocation} from "react-router-dom";


export default function Header() {
  const location = useLocation();
  
  const pageConfig = [
    {
      path: "/admin/dashboard",
      title: "Dashboard",
      description: "Theo dõi doanh thu và thống kê hệ thống",
    },
    {
      path: "/admin/profile",
      title: "Trang hồ sơ",
      description: "Quản lý thông tin tài khoản",
    },
    {
      path: "/admin/movies",
      title: "Trang quản lý",
      description: "Quản lý và theo dõi thông tin phim",
    },
    {
      path: "/admin/movies/edit/:id",
      title: "Edit phim",
      description: "Thay đổi thông tin phim",
    },
    {
      path: "/admin/movies/add",
      title: "Add phim",
      description: "Thêm phim mới",
    },
  ];

  let page = null;


    page = pageConfig.find((item) => matchPath(item.path, location.pathname));


  return (
    <header className="sticky top-0 z-20 flex h-20 items-center border-b border-gray-800 bg-[#1e1e1e]/80  px-8 backdrop-blur-md ">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-white">{page?.title}</h1>
        {page?.description && (
          <p className="mt-1 text-sm text-gray-400">{page?.description}</p>
        )}
      </div>
    </header>
  );
}
