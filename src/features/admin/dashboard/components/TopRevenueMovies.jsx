
import { formatCompactCurrency } from "../utils/format/currency";
import { Star, Flame, ArrowUpRight } from "lucide-react";
import {Link} from "react-router-dom"

export default function TopRevenueMovies({ topRevenueMovies }) {

  const maxRevenue = topRevenueMovies?.[0]?.revenue || 1;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-[#141414] p-8 transition-all duration-300 hover:border-gray-700/60 shadow-xl">
     
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-yellow-500/5 blur-3xl" />

    
      <div className="mb-6 flex items-center justify-between border-b border-gray-900 pb-5">
        <div className ="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold tracking-tight text-white">Top 5 Doanh Thu Cao Nhất</h3>
            <span className="flex items-center gap-1 rounded bg-yellow-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-500">
              <Flame className="h-3 w-3 fill-current" /> Hot
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Số liệu thống kê doanh thu phòng vé theo thời gian thực
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-800 bg-[#1b1b1b] text-yellow-500 shadow-inner">
          <Star className="h-5 w-5 fill-current" />
        </div>
      </div>

    
      <div className="space-y-3">
        {topRevenueMovies?.slice(0, 5).map((movie, index) => {
         
          const percentage = Math.round((movie.revenue / maxRevenue) * 100);

          return (
            <div
              key={movie.maPhim}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                index === 0
                  ? "border-yellow-500/20 bg-linear-to-r from-[#1e1b15] to-[#141414] hover:border-yellow-500/40"
                  : "border-gray-900 bg-[#1b1b1b]/40 hover:border-gray-800 hover:bg-[#1b1b1b]/80"
              }`}
            >
              
              <span className={`absolute -right-2 -bottom-4 select-none font-mono text-7xl font-black opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06] ${
                index === 0 ? "text-yellow-500" : "text-gray-400"
              }`}>
                #{index + 1}
              </span>

              <div className="relative z-10 flex items-center justify-between gap-6">
                
                <div className="flex min-w-0 items-center gap-4">
                
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black font-mono shadow-sm ${
                      index === 0
                        ? "bg-linear-to-br from-yellow-500 to-amber-600 text-black"
                        : index === 1
                          ? "bg-linear-to-br from-gray-400 to-gray-600 text-white"
                          : index === 2
                            ? "bg-linear-to-br from-amber-600 to-orange-700 text-white"
                            : "bg-gray-800 border border-gray-700 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 space-y-0.5">
                    <span className={`block truncate font-semibold transition-colors ${
                      index === 0 ? "text-lg text-yellow-400" : " text-gray-200 group-hover:text-white"
                    }`}>
                      {movie.tenPhim}
                    </span>
                    {index === 0 && (
                      <span className="text-sm text-yellow-500/70 font-medium">Đang giữ kỷ lục phòng vé</span>
                    )}
                  </div>
                </div>

               
                <div className="text-right shrink-0 space-y-2">
                  <span className={`block font-mono font-bold tracking-tight ${
                    index === 0 ? "text-xl text-yellow-400" : "text-lg text-emerald-400"
                  }`}>
                    {formatCompactCurrency(movie.revenue)}
                  </span>
                  <span className="text-sm text-gray-500 font-medium font-mono">
                    {percentage}% đóng góp
                  </span>
                </div>
              </div>

            
              <div className="relative z-10 mt-3 h-1 w-full rounded-full bg-gray-950 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0
                      ? "bg-linear-to-r from-yellow-500 to-amber-500"
                      : index === 1
                        ? "bg-gray-500"
                        : index === 2
                          ? "bg-orange-500"
                          : "bg-gray-700"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

            </div>
          );
        })}
      </div>

  
      <div className="mt-5 flex items-center justify-between border-t border-gray-900 pt-4">
        <span className="text-xs text-gray-600 font-mono">Hiển thị tối đa 5 bản ghi</span>
        <Link to ="/admin/movies" className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
          Xem toàn bộ BXH <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}