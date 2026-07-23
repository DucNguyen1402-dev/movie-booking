import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/customer/MainLayout";
import { AdminRoutes,ProtectedRoute } from "./routes/admin";

import Home from "@/pages/customer/Home/Home";
import Login from "@/pages/customer/Login/Login";
import MovieBooking from "@/pages/customer/MovieBooking/MovieBooking";
import MovieDetail from "@/pages/customer/MovieDetail/MovieDetail";
import PaymentCheckout from "@/pages/customer/PaymentCheckout/PaymentCheckout";
import PopcornDrink from "@/pages/customer/PopcornDrink/PopcornDrink";
import Profile from "@/pages/customer/Profile/Profile";
import Register from "@/pages/customer/Register/Register";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="movies" element={<Navigate to="/" replace />} />

        <Route path="detail/:maPhim" element={<MovieDetail />} />

        <Route path="ticketroom/:maLichChieu" element={<MovieBooking />} />

        <Route path="popcorn-drink" element={<PopcornDrink />} />

        <Route path="payment" element={<PaymentCheckout />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />

        <Route path="cinemas" element={<Home />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
