import { useLocation, useNavigate } from "react-router-dom";

import * as execution from "@shared/execution";
import { loading, modal, toast } from "@shared/overlays";
import { getCurrentUser } from "@shared/utils";

import { ENTITIES } from "@features/admin/shared/config";
import { useUserInfor } from "@features/admin/users";

import { useUpdateUser } from ".";

export function useProfileActions({ handleSubmit, getValues, isDirty }) {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "admin/profile";

  const currentUser = getCurrentUser();

  const { data: loginedUser = [], isLoading } = useUserInfor(
    currentUser.taiKhoan,
  );

  const { mutateAsync } = useUpdateUser();

  const modalApi = modal.use();
  const loader = loading.use();
  const toaster = toast.use();

  const handleCancelPasswordChange = () =>
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  const onCancelPasswordChangeClick = () => {
    if (isDirty) {
      modalApi.open({
        ...modal.config.unsavedPasswordChange(),
        onConfirm: handleCancelPasswordChange,
      });
      return;
    }
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const submitProfileChange = async (data) => {
    const payload = {
      maNhom: currentUser.maNhom,
      taiKhoan: data.taiKhoan,
      hoTen: data.hoTen,
      matKhau: data.matKhau,
      email: data.email,
      soDt: data.soDT,
      maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
    };

    const changeProfileTask = async () => await mutateAsync(payload);

    try {
      await execution.runWithLoading(changeProfileTask, loader);
      navigate(previousPath, {
        state: {
          history: history.slice(0, -1),
          toastState: toast.config.success.update(ENTITIES.profile),
        },
      });
    } catch (error) {
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

      toaster.show(toast.config.error(message));
    }
  };

  const submitPasswordChange = async (data) => {
    const submitChangedPasswordTask = async () => {
      const { matKhau, matKhauHienTai, matKhauMoi, xacNhanMatKhauMoi } =
        getValues();

      if (matKhau !== matKhauHienTai) {
        toaster.show(toast.config.error("Mật khẩu hiện tại không chính xác"));
        return;
      }

      if (matKhauMoi !== xacNhanMatKhauMoi) {
        toaster.show(toast.config.error("Mật khẩu mới không giống nhau"));
        return;
      }

      if (matKhauMoi === matKhau) {
        toaster.show(
          toast.config.error("Mật khẩu mới không được trùng với mật khẩu cũ."),
        );
        return;
      }

      try {
        const payload = {
          maNhom: currentUser.maNhom,
          taiKhoan: data.taiKhoan,
          hoTen: data.hoTen,
          matKhau: matKhauMoi,
          email: data.email,
          soDt: data.soDT,
          maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
        };

        await mutateAsync(payload);

        navigate(previousPath, {
          state: {
            history: history.slice(0, -1),
            toastState: toast.config.success.changePassword(),
          },
        });
      } catch (error) {
        const message =
          error?.response?.data?.content ??
          "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

        toaster.show(toast.config.error(message));
      }
    };

    await execution.runWithLoading(submitChangedPasswordTask, loader);
  };

  const handleChangeProfile = (data) =>
    modalApi.open({
      ...modal.config.edit(ENTITIES.profile),
      onConfirm: () => submitProfileChange(data),
    });

  const handleChangePassword = (data) =>
    modalApi.open({
      ...modal.config.passwordChange(loginedUser.taiKhoan),
      onConfirm: () => submitPasswordChange(data),
    });

  const onValid = (data, action) => {
    switch (action) {
      case "changeProfile":
        handleChangeProfile(data);
        break;

      case "changePassword":
        handleChangePassword(data);
        break;
    }
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();

    handleSubmit((data) => onValid(data, "changeProfile"))();
  };

  const onPasswordSubmitEvent = (e) => {
    e.preventDefault();
    handleSubmit((data) => onValid(data, "changePassword"))();
  };

  return {
    isLoading,
    onCancelPasswordChangeClick,
    onPasswordSubmitEvent,
    onSubmitEvent,
    loginedUser,
  };
}
