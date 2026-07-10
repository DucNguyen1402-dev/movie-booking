const MovieIcon = ({ className = "" }) => {
  // Tạo mảng 4 phần tử để render các lỗ cuộn phim bằng vòng lặp cho gọn
  const dots = Array(3).fill(null);

  return (
    <div
      className={`group/inner relative flex h-8 w-10 cursor-pointer items-center justify-center rounded-md border border-slate-700/50 bg-linear-to-br from-red-950/80 via-red-900 to-red-800 shadow-xl transition-all duration-300 group-hover/outer:scale-105 group-hover/outer:shadow-cyan-500/20 ${className}`}
    >
      <div className="absolute top-0 bottom-0 left-1.5 flex flex-col justify-around gap-1 py-2">
        {dots.map((_, i) => (
          <span
            key={`left-${i}`}
            className="h-0.75 w-0.75 shrink-0 rounded-sm bg-slate-800 transition-colors duration-300 group-hover/outer:bg-cyan-400"
          />
        ))}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-4 w-4 translate-x-0.5 fill-slate-300 text-slate-300 filter transition-all duration-300 group-hover:fill-cyan-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
        />
      </svg>

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
