import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">404</p>
      <h1 className="mt-4 text-5xl font-black text-white md:text-7xl">Không tìm thấy trang</h1>
      <p className="mt-5 max-w-xl text-zinc-400">Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.</p>
      <Link to="/" className="mt-8 rounded-full bg-red-600 px-7 py-4 font-bold text-white transition hover:bg-red-500">
        Quay về trang chủ
      </Link>
    </section>
  );
};

export default NotFound;
