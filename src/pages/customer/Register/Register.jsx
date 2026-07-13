import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/customer/useAuth";

const initialValue = {
  taiKhoan: "",
  matKhau: "",
  xacNhanMatKhau: "",
  email: "",
  soDt: "",
  hoTen: "",
};

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.content ||
    error?.response?.data?.message ||
    error?.message ||
    "Đăng ký thất bại. Bạn kiểm tra lại thông tin."
  );
};

const Register = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [formValue, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue((current) => ({
      ...current,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { taiKhoan, matKhau, xacNhanMatKhau, email, soDt, hoTen } = formValue;

    if (
      !taiKhoan.trim() ||
      !matKhau.trim() ||
      !xacNhanMatKhau.trim() ||
      !email.trim() ||
      !soDt.trim() ||
      !hoTen.trim()
    ) {
      setFormError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (matKhau.length < 6) {
      setFormError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    if (matKhau !== xacNhanMatKhau) {
      setFormError("Mật khẩu xác nhận không khớp.");
      return;
    }

    const payload = {
      taiKhoan,
      matKhau,
      email,
      soDt,
      hoTen,
      maNhom: "GP01",
    };

    registerMutation.mutate(payload, {
      onSuccess: () => {
        alert("Đăng ký thành công. Bạn có thể đăng nhập.");
        navigate("/login");
      },
    });
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#070b1a] py-16 text-white">
      <section className="cine-container grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
        <div className="hidden lg:block">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#f5c518]">
            CINEMA ACCOUNT
          </p>

          <h1 className="mt-4 max-w-2xl text-6xl font-black leading-tight text-white">
            Tạo tài khoản để đặt vé trực tuyến
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-300">
            Đăng ký tài khoản để đăng nhập, chọn ghế, đặt vé và xem lại lịch sử
            giao dịch.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-[0_24px_100px_rgba(0,0,0,0.45)]">
          <div className="mb-7 text-center">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f5c518]">
              Tài khoản mới
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#111827]">
              Đăng ký
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Nhập thông tin để tạo tài khoản CyberSoft.
            </p>
          </div>

          {(formError || registerMutation.isError) && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
              {formError || getErrorMessage(registerMutation.error)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-800">
                Tài khoản
              </span>

              <input
                name="taiKhoan"
                value={formValue.taiKhoan}
                onChange={handleChange}
                placeholder="Ví dụ: long123"
                className="h-12 w-full rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-[#f5c518]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-zinc-800">
                Họ tên
              </span>

              <input
                name="hoTen"
                value={formValue.hoTen}
                onChange={handleChange}
                placeholder="Nhập họ tên"
                className="h-12 w-full rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-[#f5c518]"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-zinc-800">
                  Email
                </span>

                <input
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="h-12 w-full rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-[#f5c518]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-zinc-800">
                  Số điện thoại
                </span>

                <input
                  name="soDt"
                  value={formValue.soDt}
                  onChange={handleChange}
                  placeholder="0900000000"
                  className="h-12 w-full rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-[#f5c518]"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-zinc-800">
                  Mật khẩu
                </span>

                <input
                  type="password"
                  name="matKhau"
                  value={formValue.matKhau}
                  onChange={handleChange}
                  placeholder="Tối thiểu 6 ký tự"
                  className="h-12 w-full rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-[#f5c518]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-zinc-800">
                  Xác nhận mật khẩu
                </span>

                <input
                  type="password"
                  name="xacNhanMatKhau"
                  value={formValue.xacNhanMatKhau}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  className="h-12 w-full rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-900 outline-none transition focus:border-[#f5c518]"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="h-12 w-full rounded-xl bg-[#f5c518] text-sm font-black uppercase text-black transition hover:bg-[#ffe45c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-black text-[#111827] underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;