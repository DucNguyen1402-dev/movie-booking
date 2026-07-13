import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "@/hooks/customer/useAuth";

const { Title, Text } = Typography;

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.content ||
    error?.response?.data?.message ||
    error?.message ||
    "Đăng nhập thất bại. Bạn kiểm tra lại tài khoản và mật khẩu."
  );
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const redirectPath = location.state?.from || "/";

  const handleLogin = (values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate(redirectPath, { replace: true });
      },
    });
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-[#070b1a] text-white">
      <section className="cine-container grid min-h-[calc(100vh-160px)] items-center gap-10 py-14 lg:grid-cols-[1fr_460px]">
        <div className="hidden lg:block">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#f5c518]">
            Cinestar Movie Ticket
          </p>

          <h1 className="mt-4 max-w-2xl text-6xl font-black leading-tight tracking-[-0.05em] text-white">
            Đăng nhập để đặt vé nhanh hơn
          </h1>

          <p className="mt-5 max-w-xl text-base font-medium leading-8 text-zinc-300">
            Tài khoản giúp bạn đặt vé, chọn ghế và xem lại lịch sử giao dịch
            trong trang cá nhân.
          </p>

          <div className="mt-8 flex gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-3xl font-black text-[#f5c518]">01</p>
              <p className="mt-2 font-bold text-white">Đăng nhập</p>
              <p className="mt-1 text-sm text-zinc-400">Xác thực tài khoản.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
              <p className="text-3xl font-black text-[#f5c518]">02</p>
              <p className="mt-2 font-bold text-white">Chọn ghế</p>
              <p className="mt-1 text-sm text-zinc-400">Giữ chỗ nhanh.</p>
            </div>
          </div>
        </div>

        <Card
          bordered
          className="!rounded-3xl !border-white/10 !bg-white !shadow-[0_24px_100px_rgba(0,0,0,0.45)]"
        >
          <div className="mb-7 text-center">
            <Text className="!text-xs !font-black !uppercase !tracking-[0.24em] !text-[#f5c518]">
              Tài khoản
            </Text>

            <Title level={2} className="!mb-0 !mt-2 !text-[#111827]">
              Đăng nhập
            </Title>

            <p className="mt-2 text-sm text-zinc-500">
              Nhập thông tin tài khoản để tiếp tục.
            </p>
          </div>

          {loginMutation.isError && (
            <Alert
              type="error"
              showIcon
              className="mb-5"
              message={getErrorMessage(loginMutation.error)}
            />
          )}

          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
            <Form.Item
              name="taiKhoan"
              label={<span className="font-bold text-zinc-800">Tài khoản</span>}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tài khoản.",
                },
              ]}
            >
              <Input size="large" placeholder="Nhập tài khoản" />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label={<span className="font-bold text-zinc-800">Mật khẩu</span>}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu.",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loginMutation.isPending}
              className="!mt-2 !h-12 !rounded-xl !bg-[#f5c518] !font-black !uppercase !text-black hover:!bg-[#ffe45c]"
            >
              Đăng nhập
            </Button>
          </Form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="font-black text-[#111827] underline">
              Đăng ký ngay
            </Link>
          </p>
        </Card>
      </section>
    </main>
  );
};

export default Login;