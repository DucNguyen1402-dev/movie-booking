import { useState } from "react";
import { ProfileHeader, ProfileForm } from "@features/admin/Profile/components";

export default function Profile() {
  const [userData, setUserData] = useState({
    taiKhoan: "Adm08",
    hoTen: "Admin08",
    email: "adm08@gmail.com",
    soDT: "0127852369",
    maLoaiNguoiDung: "QuanTri",
  });

  const avatarLetter = userData.hoTen
    ? userData.hoTen.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 p-4 pb-20 antialiased">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
        <ProfileHeader name={userData.hoTen} avatarLetter={avatarLetter} />
        <ProfileForm />
      </div>
    </div>
  );
}
