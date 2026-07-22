export default function TopFiveRevenueMoviesSkeleton() {
  return (
    <div className="relative animate-pulse overflow-hidden rounded-2xl border border-gray-800 bg-[#141414] p-8 pb-4 shadow-xl">
      <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-yellow-500/5 blur-3xl" />

      <div className="mb-6 flex items-center justify-between border-b border-gray-900 pb-5">
        <div className="w-full space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-52 rounded-md bg-gray-800" />

            <div className="h-4 w-12 rounded bg-gray-800/80" />
          </div>

          <div className="h-3.5 w-72 rounded-md bg-gray-800" />
        </div>

        <div className="h-11 w-11 shrink-0 rounded-xl bg-gray-800/40" />
      </div>

      <div className="space-y-3">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-yellow-500/10 bg-linear-to-r from-[#1e1b15]/60 to-[#141414] p-4">
          <div className="relative z-10 flex items-center justify-between gap-6">
            <div className="flex w-full min-w-0 items-center gap-4">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-gray-800" />

              <div className="w-1/2 min-w-0 space-y-2">
                <div className="h-5 w-full rounded-md bg-gray-800" />
                <div className="h-3.5 w-32 rounded-md bg-gray-800/60" />
              </div>
            </div>

            <div className="shrink-0 space-y-2 text-right">
              <div className="ml-auto h-5 w-20 rounded-md bg-gray-800" />
              <div className="ml-auto h-3.5 w-14 rounded-md bg-gray-800/60" />
            </div>
          </div>

          <div className="relative z-10 mt-4 h-1 w-full rounded-full bg-gray-950">
            <div className="h-full w-4/5 rounded-full bg-gray-800" />
          </div>
        </div>

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-900 bg-[#1b1b1b]/20 p-4"
          >
            <div className="relative z-10 flex items-center justify-between gap-6">
              <div className="flex w-full min-w-0 items-center gap-4">
                <div className="h-8 w-8 shrink-0 rounded-lg bg-gray-800/70" />

                <div className="w-2/5 min-w-0">
                  <div className="h-4 w-full rounded-md bg-gray-800/80" />
                </div>
              </div>

              <div className="shrink-0 space-y-2 text-right">
                <div className="ml-auto h-4.5 w-16 rounded-md bg-gray-800/80" />
                <div className="ml-auto h-3 w-12 rounded-md bg-gray-800/50" />
              </div>
            </div>

            <div className="relative z-10 mt-3.5 h-1 w-full rounded-full bg-gray-950">
              <div className="h-full w-1/2 rounded-full bg-gray-800/60" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-gray-900 pt-4">
        <div className="h-3.5 w-36 rounded-md bg-gray-800/60" />

        <div className="h-8 w-32 rounded-lg bg-gray-800/50" />
      </div>
    </div>
  );
}
