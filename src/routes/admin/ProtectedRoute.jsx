import { Navigate } from "react-router-dom";

import {getCurrentUser} from "@utils/shared"


export default function ProtectedRoutes({ children }) {
  const accountInfo = getCurrentUser();
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (accountInfo?.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/login" replace />;
  }

  return children;
}