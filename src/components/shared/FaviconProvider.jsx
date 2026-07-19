import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import adminIcon from "@/assets/icons/admin/adminIcon.png";
import userIcon from "@/assets/icons/customer/userIcon.png";

export default function FaviconProvider() {
  const { pathname } = useLocation();

  useEffect(() => {
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");

    favicon.rel = "icon";
    favicon.href = pathname.startsWith("/admin")
      ? adminIcon
      : userIcon;

    document.head.appendChild(favicon);
  }, [pathname]);

  return null;
}