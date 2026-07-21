export default function TableSkeleton({
  rows = 10,
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="border-t border-slate-700">
          <td className="px-5 py-4">
            <div className="h-4 w-28 animate-pulse rounded bg-slate-700" />
          </td>

          <td className="py-4">
            <div className="h-4 w-40 animate-pulse rounded bg-slate-700" />
          </td>

          <td className="py-4">
            <div className="h-4 w-56 animate-pulse rounded bg-slate-700" />
          </td>

          <td className="py-4">
            <div className="h-4 w-28 animate-pulse rounded bg-slate-700" />
          </td>

          <td className="py-4">
            <div className="h-7 w-24 animate-pulse rounded-full bg-slate-700" />
          </td>

          <td className="py-4">
            <div className="flex justify-center gap-2">
              <div className="size-9 animate-pulse rounded-md bg-slate-700" />
              <div className="size-9 animate-pulse rounded-md bg-slate-700" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}