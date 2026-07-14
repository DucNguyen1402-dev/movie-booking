import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
   console.log("ProtectedRoute");
  const accountInfo = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");
  console.log(accountInfo)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (accountInfo?.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/login" replace />;
  }

  return children;
}