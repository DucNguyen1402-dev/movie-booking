const MovieCardSkeleton = ({ variant = "default" }) => {
  if (variant === "wide") {
    return (
      <div className="min-w-[320px] overflow-hidden rounded-2xl bg-[#171717] ring-1 ring-white/10 md:min-w-[420px]">
        <div className="aspect-[16/9] animate-pulse bg-[#2a2a2a]" />

        <div className="space-y-3 p-4">
          <div className="h-5 w-3/4 animate-pulse rounded bg-[#2a2a2a]" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-[#2a2a2a]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[190px] overflow-hidden rounded-2xl bg-[#1f1f1f] ring-1 ring-white/10 sm:min-w-[210px]">
      <div className="aspect-[2/3] animate-pulse bg-[#2a2a2a]" />

      <div className="space-y-3 p-4">
        <div className="flex justify-between">
          <div className="h-4 w-14 animate-pulse rounded bg-[#2a2a2a]" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#2a2a2a]" />
        </div>

        <div className="h-5 w-full animate-pulse rounded bg-[#2a2a2a]" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-[#2a2a2a]" />
        <div className="h-10 animate-pulse rounded-full bg-[#2a2a2a]" />

        <div className="grid grid-cols-2 gap-2">
          <div className="h-9 animate-pulse rounded-lg bg-[#2a2a2a]" />
          <div className="h-9 animate-pulse rounded-lg bg-[#2a2a2a]" />
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;