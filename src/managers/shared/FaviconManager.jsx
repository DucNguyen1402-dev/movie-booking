import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import adminIcon from "@/assets/icons/admin/adminIcon.png";
import userIcon from "@/assets/icons/customer/userIcon.png";

const titles = {
  "/admin/dashboard": "Dashboard",
  "/admin/movies": "Movie Management",
  "/admin/users": "User Management",
  "/admin/profile": "Profile",
};

export default function FaviconManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");

    const title = titles[pathname]
      ? `${titles[pathname]} | Movie Admin`
      : "Movie Admin";
    document.title = pathname.startsWith("/admin") ? title : "Cinema booking"

    favicon.rel = "icon";
    favicon.href = pathname.startsWith("/admin") ? adminIcon : userIcon;

    document.head.appendChild(favicon);
  }, [pathname]);

  return null;
}
