import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const accountInfo = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (accountInfo?.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/login" replace />;
  }

  return children;
}