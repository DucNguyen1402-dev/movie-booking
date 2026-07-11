import { Clapperboard, ArrowUpRight  } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MovieStatusCard({ nowShowingMovies, upcomingMovies }) {
  const navigate = useNavigate();
  const location = useLocation();

  const onDetailClick = () =>
    navigate("/admin/movies", {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-800/80 bg-[#141414] p-8 transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.07)]">
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-red-500/10 blur-3xl transition-opacity duration-300 group-hover:bg-red-500/15" />

      <div className="relative z-10 flex h-full flex-col justify-between space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-red-500/10 px-2.5 py-1 text-xs font-semibold tracking-wider text-red-400 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              Hệ thống phim
            </span>
            <p className="mt-2 text-sm font-medium text-gray-500">
              Tổng số lượng phim hiện tại
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-colors duration-300 group-hover:border group-hover:border-red-500 group-hover:text-red-600">
            <Clapperboard className="h-5 w-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <h2 className="font-mono text-5xl font-black tracking-tight text-white">
            {nowShowingMovies.length}
          </h2>
          <span className="text-sm font-medium text-gray-400">
            đang hiển thị
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Tỷ lệ phim sắp chiếu</span>
            <span className="font-medium text-gray-300">
              {Math.round(
                (upcomingMovies.length / (nowShowingMovies.length || 1)) * 100,
              )}
              %
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-900">
            <div
              className="h-full rounded-full bg-linear-to-r from-red-600 to-orange-500 transition-all duration-500"
              style={{
                width: `${Math.min((upcomingMovies.length / (nowShowingMovies.length || 1)) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-gray-900 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-rose-600 font-mono text-lg font-bold text-white">
              {upcomingMovies.length}
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-300">Phim sắp khởi chiếu</p>
              <p className="text-sm text-gray-500">Dự kiến trong tuần tới</p>
            </div>
          </div>

          <button
            onClick={onDetailClick}
            className="flex h-8 cursor-pointer items-center gap-1 rounded-lg border border-gray-800 bg-gray-900 px-3 text-xs font-medium text-gray-400 transition-colors duration-200 hover:bg-gray-800 hover:text-white"
          >
            <span> Chi tiết</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
