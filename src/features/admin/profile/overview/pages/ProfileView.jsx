import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useNotificationContext } from "@contexts/admin/notification";
import { useConsumeLocationState } from "@hooks/admin";
import { useProfileContext } from "@features/admin/profile/contexts";
import {
  ProfileSkeleton,
  ProfileViewHeader,
  ProfileViewInfor,
} from "@features/admin/profile/overview/components";

export default function ProfileView() {
  const location = useLocation();
  const history = location.state?.history ?? [];
  const navigate = useNavigate();
  const {
    profile: { isLoading, loginedUser },
  } = useProfileContext();

  const { notificationActions } = useNotificationContext();

  useEffect(() => {
    const notification = location.state?.notification;

    if (!notification) return;

    notificationActions.show(notification);
  }, [location.state?.notification, navigate, notificationActions]);

  useConsumeLocationState("notification", 10000);

  if (isLoading) return <ProfileSkeleton />;

  const profileFields = [
    { label: "Tài khoản", value: loginedUser.taiKhoan },
    { label: "Email", value: loginedUser.email },
    { label: "Số điện thoại", value: loginedUser.soDT || "Chưa cập nhật" },
  ];

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
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-4 antialiased">
      <div className="mt-8 flex items-center justify-center">
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
          <ProfileViewHeader name={loginedUser.hoTen} />
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
    </div>
  );
}
