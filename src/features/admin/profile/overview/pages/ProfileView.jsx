import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "@shared/overlays";
import { Button } from "@shared/ui";

import {
  useConsumeLocationState,
  useTemporaryState,
} from "@features/admin/hooks";
import { useProfileContext } from "@features/admin/profile/contexts";
import {
  ProfileSkeleton,
  ProfileViewHeader,
  ProfileViewInfor,
} from "@features/admin/profile/overview/components";

const ProfileView = () => {
  const location = useLocation();
  const history = location.state?.history ?? [];
  const navigate = useNavigate();
  const {
    profile: { isLoading, loginedUser },
  } = useProfileContext();

  const { show: showToast } = toast.use();

  useConsumeLocationState("toastState");

  const [toastState] = useTemporaryState(location.state?.toastState);

  useEffect(() => {
    if (!toastState) return;

    showToast(toastState);
  }, [toastState, showToast]);

  const profileFields = useMemo(
    () => [
      { label: "Tài khoản", value: loginedUser.taiKhoan },
      { label: "Email", value: loginedUser.email },
      { label: "Số điện thoại", value: loginedUser.soDT || "Chưa cập nhật" },
    ],
    [loginedUser.email, loginedUser.soDT, loginedUser.taiKhoan],
  );

  if (isLoading) return <ProfileSkeleton />;

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
            <Button
              onClick={onUpdateProfileClick}
              className="bg-blue-600 font-medium text-slate-200 hover:bg-blue-700"
              fullWidth={true}
            >
              Cập nhật thông tin
            </Button>

            <div className="flex justify-center">
              <Button
                className="text-slate-400 hover:bg-red-950/10 hover:text-rose-700"
                onClick={onChangePasswordClick}
                size="sm"
              >
                <span className="text-sm">Đổi mật khẩu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
