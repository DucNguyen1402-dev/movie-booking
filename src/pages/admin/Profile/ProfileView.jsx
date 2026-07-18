import { useLocation, useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/admin/NotificationContext";
import { useEffect } from "react";
import { ProfileSkeleton } from "@features/admin/profile/components/ProfileEdit";
import { useProfileContext } from "@features/admin/profile/contexts";
import { getCurrentUser } from "@utils/shared";
import {
  ProfileViewHeader,
  ProfileViewInfor,
} from "@features/admin/profile/components/ProfileView";

export default function UserProfileView() {
  const { isLoading } = useProfileContext();
  const currentUser = getCurrentUser();

  const location = useLocation();
  const history = location.state?.history ?? [];
  const navigate = useNavigate();
  const { notifActions } = useNotification();

  useEffect(() => {
    if (location.state?.notification) {
      notifActions.showNotification(location.state.notification);
    }
  }, [location.state]);

   const profileFields = [
      { label: "Tài khoản", value: currentUser.taiKhoan },
      { label: "Email", value: currentUser.email },
      { label: "Số điện thoại", value: currentUser.soDT || "Chưa cập nhật" },
    ];

 


  if (isLoading) return <ProfileSkeleton />;

  const avatarLetter = currentUser?.hoTen
    ? currentUser.hoTen.charAt(0).toUpperCase()
    : "U";

  const onUpdateProfileClick = () =>
    navigate("/admin/profile/edit", {
      state: {
        history: [...history, location.pathname],
      },
    });

  const onChangePasswordClick = () =>
    navigate("/admin/profile/password", {
      state: {
        history: [...history, location.pathname],
      },
    });

 
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 p-4 antialiased">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
        <ProfileViewHeader
          avatarLetter={avatarLetter}
          name={currentUser.name}
        />
        <ProfileViewInfor fields={profileFields} />

        <div className="mt-12 space-y-5">
          <button
            onClick={onUpdateProfileClick}
            className="w-full cursor-pointer rounded-md border-none bg-blue-600 py-2.5 text-sm font-medium text-slate-200 transition-colors duration-300 hover:bg-blue-700"
          >
            Cập nhật thông tin
          </button>

          <div className="flex justify-center">
            <button
              className="flex cursor-pointer items-center gap-2 rounded-md px-6 py-2 text-slate-400 transition-colors duration-300 hover:bg-red-950/10 hover:text-rose-700"
              onClick={onChangePasswordClick}
            >
              <span className="text-">Đổi mật khẩu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
