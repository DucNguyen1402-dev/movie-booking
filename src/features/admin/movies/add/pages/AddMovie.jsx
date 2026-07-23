import { PenLine } from "lucide-react";
import { AddMovieForm } from "@features/admin/movies/add/components";

export default function AddMovie() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 pb-10">
      <div className="space-y-2 mt-10">
        <div className="flex items-center justify-center gap-2 text-slate-200">
          <PenLine className="size-4" />
          <p>Điền đầy đủ và chính xác thông tin để thêm phim vào hệ thống.</p>
        </div>

        <div className="mx-auto mt-5 min-w-4xl space-y-8 rounded-lg bg-slate-800 p-8 pb-2 shadow-sm">
          <AddMovieForm />
        </div>
      </div>
    </div>
  );
}
