import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import MainLayout from "./layouts/customer/MainLayout";
import Home from "@/pages/customer/Home/Home";
import Login from "@/pages/customer/Login/Login";
import MovieBooking from "@/pages/customer/MovieBooking/MovieBooking";
import MovieDetail from "@/pages/customer/MovieDetail/MovieDetail";
import Movies from "@/pages/customer/Movies/Movies";
import PopcornDrink from "@/pages/customer/PopcornDrink/PopcornDrink";
import Profile from "@/pages/customer/Profile/Profile";
import Register from "@/pages/customer/Register/Register";
import { ProtectedRoute } from "./routes/ProtectRoutes";
import { UserProvider } from "@contexts/admin";
import PaymentCheckout from "@/pages/customer/PaymentCheckout/PaymentCheckout";

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
            <UserProvider>
              <AdminRoutes />
            </UserProvider>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
