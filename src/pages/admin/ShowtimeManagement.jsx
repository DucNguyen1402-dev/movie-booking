import { useMovies } from "@hooks/admin/useMovies";
import { Clapperboard } from "lucide-react";

export default function ShowtimeManagement() {
  const { data: movies = [] } = useMovies();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="mx-auto mt-5 max-w-5xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Movie */}
          <div className="rounded-2xl bg-gray-50 p-4 pt-6 shadow-sm">
            <div className="space-y-5">
              <div className="flex justify-center">
                <img
                  src={movies[8]?.hinhAnh}
                  alt=""
                  className="w-72 rounded-md object-cover"
                />
              </div>

              <div className="space-y-4 rounded-xl bg-slate-50 p-4">
                <h1 className="text-xl font-bold tracking-wider text-slate-800">
                  Avengers Endgame
                </h1>

                <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1 text-sm font-medium">
                  <span className="text-red-600/80">Release Date:</span>
                  <span className="font-bold text-red-600">20/07/2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-lg font-semibold text-slate-800">
              Showtime Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Cinema System
                </label>

                <select className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500">
                  <option>CGV</option>
                  <option>BHD</option>
                  <option>Galaxy</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Cinema Cluster
                </label>

                <select className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500">
                  <option>CGV Vincom Đồng Khởi</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Theater
                </label>

                <select className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500">
                  <option>Rạp 1</option>
                  <option>Rạp 2</option>
                  <option>Rạp 7</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ticket Price
                </label>

                <input
                  type="number"
                  placeholder="75000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Show Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Show Time
                </label>

                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100">
                Cancel
              </button>

              <button className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700">
                Create Showtime
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
