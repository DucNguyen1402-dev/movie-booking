const Medal = ({ rank , animate}) => {
  const getMedalStyle = (num) => {
    switch (num) {
      case 1:
        return {
          bg: "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600",
          text: "text-yellow-950",
          border: "border-yellow-200",
          ribbon: "from-red-500 to-red-700",
        };
      case 2:
        return {
          bg: "bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500",
          text: "text-slate-900",
          border: "border-slate-100",
          ribbon: "from-blue-500 to-blue-700",
        };
      case 3:
        return {
          bg: "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900",
          text: "text-amber-100",
          border: "border-amber-500",
          ribbon: "from-green-600 to-green-800",
        };
      default:
        return {
          bg: "bg-slate-200",
          text: "text-slate-600",
          border: "border-slate-300",
          ribbon: "from-slate-400 to-slate-500",
        };
    }
  };

  const config = getMedalStyle(rank);
  const isTop3 = rank === 1 || rank === 2 || rank === 3;

  return (
    <div className={`relative inline-flex h-14 w-12 items-center justify-center ${animate}`}>
      <div
        className={`absolute top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-md ${config.bg} ${config.border}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10">
          <span
            className={`text-base font-black tracking-tight ${config.text}`}
          >
            {rank}
          </span>
        </div>
      </div>

      {isTop3 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-1 flex h-10 justify-center gap-1.5 overflow-hidden">
          <div
            className={`h-10 w-3 bg-linear-to-b ${config.ribbon} origin-top -rotate-12 transform rounded-b-sm`}
          />
          <div
            className={`h-10 w-3 bg-linear-to-b ${config.ribbon} origin-top rotate-12 transform rounded-b-sm`}
          />
        </div>
      )}
    </div>
  );
};

export default Medal;
