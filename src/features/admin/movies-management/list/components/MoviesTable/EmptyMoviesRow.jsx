import { Film } from "lucide-react";

export default function EmptyMoviesRow() {
  return (
    <tr>
      <td
        colSpan={6}
        className="bprder-t border-slate-600 px-4 py-20 text-center"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700/50 text-slate-400">
            <Film className="h-10 w-10" strokeWidth={1.5} />
          </div>

          <h3 className="mb-1 text-xl font-semibold text-slate-100">
            Không tìm thấy phim
          </h3>
          <p className="mx-auto max-w-xs text-sm text-slate-300 mt-4 tracking-wider">
            Phim bạn tìm kiếm không tồn tại trong danh sách, vui lòng tìm kiếm
            với keyword khác.
          </p>
        </div>
      </td>
    </tr>
  );
}
