import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUser } from "@features/admin/users/edit";
import {useUserInfor} from "@features/admin/users"
import { useModalContext } from "@contexts/admin/modal";
import { useLoadingContext } from "@contexts/admin/loading";
import {useNotificationContext } from "@contexts/admin/notification";
import { MODAL_TYPES } from "@constants/admin/modalTypes";
import { getCurrentUser } from "@utils/shared";
import { useEffect } from "react";

export function useProfileForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const history = location.state?.history ?? [];
  const previousPath = history.at(-1) ?? "admin/profile";

  const currentUser = getCurrentUser();

  const { data: loginedUser, isLoading } =  useUserInfor(currentUser.taiKhoan);


  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (!loginedUser) return;

    reset({
      taiKhoan: loginedUser.taiKhoan,
      hoTen: loginedUser.hoTen,
      email: loginedUser.email,
      soDT: loginedUser.soDT,
      matKhau: loginedUser.matKhau,
      matKhauHienTai: "",
      matKhauMoi: "",
      xacNhanMatKhauMoi: "",
    });
  }, [loginedUser, reset]);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loginedUser"],
      });
    },
  });

  const modal = useModalContext();
  const { showLoading, hideLoading } = useLoadingContext();
  const {  notificationActions } = useNotificationContext();

  const handleCancelPasswordChange = () => {
    modal.close();
    navigate(previousPath, {
      state: {
        history: history.slice(0, -1),
      },
    });
  };

  const onCancelPasswordChangeClick = () => {
    if (isDirty) {
      modal.open({
        type: MODAL_TYPES.SAVE_PROFILE,
        title: "Hủy các thay đổi?",
        subtitle: "Những thay đổi chưa lưu sẽ bị mất.",
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
    modal.close();
    showLoading();

    try {
      const payload = {
        maNhom: currentUser.maNhom,
        taiKhoan: data.taiKhoan,
        hoTen: data.hoTen,
        matKhau: data.matKhau,
        email: data.email,
        soDt: data.soDT,
        maLoaiNguoiDung: currentUser.maLoaiNguoiDung,
      };
      await mutateAsync(payload);
      hideLoading();
      navigate(previousPath, {
        state: {
          history: history.slice(0, -1),
          notification: {
            variant: "success",
            message: "Thông tin của bạn đã được cập nhật thành công",
          },
        },
      });
    } catch (error) {
      hideLoading();
      console.log(error.message);
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

      notificationActions.show({
        variant: "error",
        message,
      });
    }
  };

  const submitPasswordChange = async (data) => {
    modal.close();
    showLoading();

    const { matKhau, matKhauHienTai, matKhauMoi, xacNhanMatKhauMoi } =
      getValues();

    if (matKhau !== matKhauHienTai) {
      hideLoading();
      notificationActions.show({
        variant: "error",
        message: "Mật khẩu hiện tại không chính xác!",
      });
      return;
    }

    if (matKhauMoi !== xacNhanMatKhauMoi) {
      hideLoading();
      notificationActions.show({
        variant: "error",
        message: "Mật khẩu mới không giống nhau",
      });
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
      hideLoading();
      navigate(previousPath, {
        state: {
          history: history.slice(0, -1),
          notification: {
            variant: "success",
            message: "Mật khẩu của bạn đã được thay đổi thành công.",
          },
        },
      });
    } catch (error) {
      hideLoading();
      console.log(error.message);
      const message =
        error?.response?.data?.content ??
        "Đã có lỗi hệ thống xảy ra, vui lòng thử lại sau.";

      notificationActions.show({
        variant: "error",
        message,
      });
    }
  };

  const handleChangeProfile = (data) =>
    modal.open({
      type: MODAL_TYPES.SAVE_PROFILE,
      title: "Xác nhận lưu thay đổi.",
      subtitle: "Thông tin tài khoản của bạn sẽ được cập nhật trên hệ thống.",
      onConfirm: () => submitProfileChange(data),
    });

  const handleChangePassword = (data) =>
    modal.open({
      type: MODAL_TYPES.SAVE_PROFILE,
      title: "Xác nhận đổi mật khẩu",
      subtitle: "Mật khẩu của bạn sẽ được cập nhật trên hệ thống.",
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
    register,
    errors,
    onSubmitEvent,
    isDirty,
    onPasswordSubmitEvent,
    isLoading,
    onCancelPasswordChangeClick,
    loginedUser
  };
}
