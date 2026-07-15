import { Search } from "lucide-react";

export default function EmptyUsersRow({ colSpan = 6 }) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="border-t border-slate-600 px-4 py-12 text-center"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700/50 text-slate-400">
            <Search className="h-10 w-10" strokeWidth={1.5} />
          </div>

          <h3 className="mb-1 text-xl font-semibold text-slate-200">
            Không tìm thấy kết quả
          </h3>
          <p className="mx-auto mt-4 max-w-xs text-sm tracking-wider text-slate-300">
            User bạn tìm kiếm không tồn tại, vui lòng thử lại với keyword khác.
          </p>
        </div>
      </td>
    </tr>
  );
}
