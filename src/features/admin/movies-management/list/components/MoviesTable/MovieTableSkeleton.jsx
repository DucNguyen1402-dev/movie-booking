export default function MovieTableSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <tr
          key={index}
          className="border-b border-slate-800/60 bg-[#1e293b]/40"
        >
          {/* Mã */}
          <td className="px-6 py-4">
            <div className="h-4 w-12 animate-pulse rounded bg-slate-700" />
          </td>

          {/* Hình ảnh & Tên phim */}
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-12 shrink-0 animate-pulse rounded bg-slate-700" />
              <div className="space-y-2">
                <div className="h-4 w-40 animate-pulse rounded bg-slate-700" />
                <div className="h-3 w-24 animate-pulse rounded bg-slate-700/60" />
              </div>
            </div>
          </td>

          {/* Ngày khởi chiếu */}
          <td className="px-6 py-4">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-700" />
          </td>

          {/* Đánh giá */}
          <td className="px-6 py-4">
            <div className="h-4 w-10 animate-pulse rounded bg-slate-700" />
          </td>

          {/* Trạng thái */}
          <td className="px-6 py-4">
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-700" />
          </td>

          {/* Hành động */}
          <td className="px-6 py-4 text-right">
            <div className="flex justify-end space-x-2">
              <div className="h-8 w-8 animate-pulse rounded bg-slate-700" />
              <div className="h-8 w-8 animate-pulse rounded bg-slate-700" />
               <div className="h-8 w-8 animate-pulse rounded bg-slate-700" />
                <div className="h-8 w-8 animate-pulse rounded bg-slate-700" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
