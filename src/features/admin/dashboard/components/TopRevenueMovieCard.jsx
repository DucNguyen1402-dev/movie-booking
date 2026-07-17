import { Trophy, TrendingUp, Ticket } from "lucide-react";

export default function TopRevenueMovieCard({ highestRevenueMovie }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-amber-500/10 bg-linear-to-br from-[#141414] to-[#1a1515] p-8 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.06)]">

      <div className="absolute -top-12 -right-12 h-52 w-52 rounded-full bg-linear-to-br from-amber-500/10 to-red-500/5 blur-3xl transition-opacity duration-300 group-hover:from-amber-500/15" />


      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-transparent via-amber-500 to-red-500 transition-all duration-500 group-hover:w-full" />

      <div className="relative z-10 flex h-full flex-col justify-between space-y-8">
 
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-bold tracking-wider text-amber-400 uppercase">
              <Trophy className="h-3.5 w-3.5 animate-bounce text-amber-400" />
              Kỷ lục doanh thu
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-gray-700 sm:inline-block" />
            <span className="hidden text-sm font-medium text-gray-500 sm:inline-block">
              Bảng xếp hạng realtime
            </span>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-500/10">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

   
        <div className="flex items-center gap-20">
         <div className ="space-y-2">
           <h3 className="line-clamp-2 min-h-12 text-2xl font-black tracking-tight text-white transition-colors duration-250 group-hover:text-amber-300 lg:text-3xl">
            {highestRevenueMovie?.tenPhim || "Chưa có dữ liệu phim"}
          </h3>
          <div className =" w-80 overflow-hidden">
            <img  src= {highestRevenueMovie?.hinhAnh} alt ={highestRevenueMovie?.tenPhim} className ="object-contain h-full w-full" />
          </div>
         </div>

          <div className="inline-block rounded-lg border border-gray-900 bg-gray-950/60 px-8 py-6 space-y-2">
            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
              Tổng doanh thu phòng vé
            </p>
            <p className="mt-0.5 bg-linear-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text font-mono text-3xl font-black tracking-tight text-transparent">
              {highestRevenueMovie?.revenue
                ? highestRevenueMovie.revenue.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "0 ₫"}
            </p>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4 border-t border-gray-900 pt-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Ticket className="h-4 w-4 text-yellow-500" />
              <span>Lượng vé ước tính</span>
            </div>
            <p className="font-mono text-lg font-bold text-gray-300 space-x-2">
              <span>{highestRevenueMovie?.ticketSold.toLocaleString("vi-VN")}</span>
              <span className="font-sans text-sm font-normal text-gray-500">
                vé
              </span>
            </p>
          </div>

          <div className="border-left space-y-3 border-gray-900 pl-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500 " />
              <span>Trạng thái</span>
            </div>
            <p className="inline-block rounded border border-emerald-500/10 bg-emerald-500/5 px-2 py-1 text-sm font-semibold text-emerald-400">
              Đang dẫn đầu
            </p>
          </div>
        </div>


        <div className="border-t border-gray-900 pt-4">
          <p className="text-xs text-gray-500 italic">
            * Dữ liệu cập nhật dựa trên doanh thu thực tế.
          </p>
        </div>
      </div>
    </div>
  );
}
