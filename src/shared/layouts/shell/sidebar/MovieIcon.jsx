import { Play } from "lucide-react";
const MovieIcon = () => {
  const dots = Array(3).fill(null);

  return (
    <div
      className={`group/inner relative flex h-9 w-11 items-center justify-center rounded-md border border-slate-700/50 bg-linear-to-br from-red-800 via-red-700 to-red-600 shadow-xl transition-all duration-300 group-hover/outer:scale-102 group-hover/outer:shadow-cyan-500/20`}
    >
      <div className="absolute top-0 bottom-0 left-1.5 flex flex-col justify-around gap-1 py-2">
        {dots.map((_, i) => (
          <span
            key={`left-${i}`}
            className="h-0.75 w-0.75 shrink-0 rounded-sm bg-slate-800 transition-colors duration-300 group-hover/outer:bg-cyan-400"
          />
        ))}
      </div>

      <Play className="size-4 fill-current text-white" />

      <div className="absolute top-0 right-1.5 bottom-0 flex flex-col justify-around gap-1 py-2">
        {dots.map((_, i) => (
          <span
            key={`right-${i}`}
            className="h-0.75 w-0.75 shrink-0 rounded-sm bg-slate-800 transition-colors duration-300 group-hover/outer:bg-cyan-400"
          />
        ))}
      </div>
    </div>
  );
};

export default MovieIcon;
