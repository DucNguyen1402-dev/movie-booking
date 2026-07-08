import { useMovies } from "@hooks/admin/useMovies";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

export default function ShowtimeManagement() {
  const { data: movies = [] } = useMovies();

  const [movieToSchedule, setMovieToSchedule] = useState({});

  const {id} = useParams();
  const movie = movies.find(movie => movie.maPhim === Number(id));
  

  useEffect(() => {
      if(!movie) return;
      setMovieToSchedule({
        ...movie,
        ngayKhoiChieu: movie.ngayKhoiChieu.split("T")[0]
      });
  }, [movie])


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <div className="mx-auto mt-5 max-w-5xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Movie */}
          <div className="relative space-y-5 rounded-2xl bg-gray-50 p-4 pt-6 pb-12 shadow-sm">
            <div className="flex justify-center">
              <img
                src={movieToSchedule.hinhAnh}
                alt=""
                className="w-72 rounded-sm object-cover"
              />
            </div>

            <div className="space-y-4 rounded-xl bg-slate-50 p-4">
              <h1 className="text-xl font-bold tracking-wider text-slate-800">
                {movieToSchedule.tenPhim}
              </h1>

              <div className="absolute right-1 bottom-2 inline-flex items-center gap-2 px-4 py-1 text-sm font-medium">
                <span className="text-gray-500">Ngày khởi chiếu:</span>
                <span className="font-bold tracking-wider text-rose-500">
                  {movieToSchedule.ngayKhoiChieu}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl bg-gray-50 p-6 shadow-sm lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold tracking-wide text-slate-800">
              Thông tin lịch chiếu
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-1.5 text-slate-700">
                <label className="mb-2 text-sm font-medium">
                  Cinema System
                </label>

                <select className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500">
                  <option>CGV</option>
                  <option>BHD</option>
                  <option>Galaxy</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 text-slate-700">
                <label className="mb-2 text-sm font-medium">
                  Cinema Cluster
                </label>

                <select className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500">
                  <option>CGV Vincom Đồng Khởi</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 text-slate-700">
                <label className="mb-2 text-sm font-medium">Theater</label>

                <select className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500">
                  <option>Rạp 1</option>
                  <option>Rạp 2</option>
                  <option>Rạp 7</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 text-slate-700">
                <label className="mb-2 text-sm font-medium">Ticket Price</label>

                <input
                  type="number"
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-slate-700">
                <label className="mb-2 text-sm font-medium">Show Date</label>

                <input
                  type="date"
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-slate-700">
                <label className="mb-2 text-sm font-medium">Show Time</label>

                <input
                  type="time"
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-12 flex justify-end gap-3">
              <button className="cursor-pointer rounded-sm bg-rose-500 px-5 py-2 text-sm text-white transition-colors duration-300 hover:bg-rose-600">
                Hủy
              </button>

              <button className="cursor-pointer rounded-sm bg-blue-600 px-5 py-2 text-sm text-white transition-colors duration-300 hover:bg-blue-700">
               Tạo lịch chiếu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
