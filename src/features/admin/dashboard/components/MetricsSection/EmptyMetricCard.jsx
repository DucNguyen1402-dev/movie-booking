export default function EmptyMetricCard() {
  return (
    <div className="w-full max-w-sm animate-pulse rounded-xl border border-gray-700 bg-[#1e1e1e] p-4 shadow-sm">
      <div className="mb-4 w-full rounded-lg bg-gray-700"></div>

      <div className="mb-3 h-4 w-16 rounded-md bg-gray-700"></div>

      <div className="mb-2 h-5 w-3/4 rounded-md bg-gray-700"></div>
      <div className="mb-4 h-5 w-1/2 rounded-md bg-gray-700"></div>

      <div className="mb-2 h-3 w-full rounded-md bg-gray-700"></div>
      <div className="mb-6 h-3 w-5/6 rounded-md bg-gray-700"></div>

      <div className="flex items-center gap-3">
        <div className="division h-10 w-10 rounded-full bg-gray-700"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 rounded-md bg-gray-700"></div>
          <div className="h-2 w-1/4 rounded-md bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
