import { MapPin } from "lucide-react";

export default function ShowtimeInforHeader({ diaChi, tenCumRap }) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500 shadow-lg shadow-indigo-500/50 transition-transform hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-yellow-300 drop-shadow-[0_0_3px_rgba(253,224,71,0.8)] filter"
        >
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a2 2 0 012 2v2h4V6a2 2 0 012-2h4a2 2 0 012 2v3a1 1 0 01-1 1h-1v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 4h4v8h-4v-8zm-2 2v6H4v-6h10zM6 14h2v2H6v-2zm4 0h2v2h-2v-2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="font-semibold text-slate-700">{tenCumRap}</h3>
      <div className="h-0.5 w-2 bg-slate-600"></div>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(diaChi)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sky-600 transition-colors hover:text-sky-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
      >
        <div className="flex size-5 items-center justify-center rounded-full bg-blue-500">
          <MapPin className="size-3 text-white" />
        </div>
        {diaChi}
      </a>
    </div>
  );
}
