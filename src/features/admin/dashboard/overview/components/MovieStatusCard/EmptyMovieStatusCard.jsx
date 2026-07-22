export default function EmptyMovieStatusCard() {
  return (
    <div className="relative animate-pulse overflow-hidden rounded-2xl border border-gray-800/80 bg-[#141414] p-8">
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-red-500/5 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between space-y-6">
        <div className="flex items-start justify-between">
          <div className="w-full space-y-3">
            <div className="h-6 w-28 rounded-md bg-gray-800" />

            <div className="h-4 w-44 rounded-md bg-gray-800" />
          </div>

          <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-800/50" />
        </div>

        <div className="flex items-baseline gap-3">
          <div className="h-12 w-20 rounded-xl bg-gray-800" />

          <div className="h-4 w-16 rounded-md bg-gray-800" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-3 w-28 rounded-md bg-gray-800" />
            <div className="h-3 w-8 rounded-md bg-gray-800" />
          </div>

          <div className="h-1.5 w-full rounded-full bg-gray-900">
            <div className="h-full w-1/3 rounded-full bg-gray-800" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-gray-900 pt-4">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-lg bg-gray-800" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded-md bg-gray-800" />
              <div className="h-3 w-24 rounded-md bg-gray-800" />
            </div>
          </div>

          <div className="h-8 w-16 rounded-lg bg-gray-800/60" />
        </div>
      </div>
    </div>
  );
}
