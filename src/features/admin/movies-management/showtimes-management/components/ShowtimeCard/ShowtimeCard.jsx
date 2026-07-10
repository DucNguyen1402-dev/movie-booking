import {
  Clock3,
  MapPin,
  Trash,
  Ticket,
  SquarePen,
} from "lucide-react";

export default function ShowtimeCard({showtimeData}){
    
   console.log(showtimeData)
    return (
         <section className="broder-red-300 grow space-y-5 rounded-xl border bg-gray-50 shadow-sm">
          <div className="flex cursor-pointer items-center justify-between border-b border-slate-300 p-8">
            <div className="flex w-full items-center justify-between text-slate-700">
              <div className="flex items-center gap-4">
                <img
                  src="https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
                  className="h-12 w-12 rounded-full border border-gray-300 object-cover"
                />

                <h2 className="text-lg font-semibold">BHD Star Cineplex</h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-12 w-11 flex-col items-center overflow-hidden rounded-lg border-2 border-gray-200 bg-white shadow-sm">
                  <div className="h-3 w-full bg-red-500" />

                  <div className="flex w-full flex-1 items-center justify-center pb-1">
                    <span className="text-lg leading-none font-bold text-gray-800">
                      3
                    </span>
                  </div>
                </div>

                <p className="text-slate-500">
                  <span>lịch chiếu</span>
                </p>
              </div>
            </div>
          </div>

          <div className="px-8">
            <div className="space-y-8 border-b border-gray-300 pt-3 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500">
                  <span className="text-white">1</span>
                </div>
                <h3 className="font-semibold text-slate-700">
                  BHD Star Cineplex - 3/2
                </h3>
                <div className="h-0.5 w-2 bg-slate-600"></div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="flex size-5 items-center justify-center rounded-full bg-blue-500">
                    <MapPin className="size-3 text-white" />
                  </div>
                  L5 Vincom 3/2, Q.10
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <article className="space-y-5 rounded-xl border border-gray-300 bg-linear-to-br from-slate-800 to-slate-700 p-5 pb-3 text-slate-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-md hover:ring-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-yellow-500">
                      Rạp 7
                    </h4>

                    <span className="rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                      #47927
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock3 className="size-4 text-slate-100" />

                      <span>24/01/2025 • 14:11</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Ticket className="size-4 text-slate-100" />

                      <span className="ml-1 text-slate-200">100.000 VNĐ</span>
                    </div>

                    <div className="mt-5 space-x-2">
                      <span>Thời lượng:</span>
                      <span className="ml-1 font-medium text-slate-200">
                        120 phút
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button className="cursor-pointer rounded-lg border-none bg-indigo-600 px-2.5 py-2 transition-colors duration-200 hover:bg-indigo-500">
                      <SquarePen className="size-4 text-indigo-100" />
                    </button>

                    <button className="cursor-pointer rounded-lg border-none bg-red-600 px-2.5 py-2 transition-colors duration-200 hover:bg-red-500">
                      <Trash className="size-4 text-red-100" />
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
    )
}