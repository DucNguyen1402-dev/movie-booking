import {
  MovieSelectionCard,
  ShowtimeSection,
} from "@features/admin/movies/showtimes/list/components";
import { useShowtimeList } from "@features/admin/movies/showtimes/list/hooks";

export default function ShowtimeList() {
  const { showtimeInfor, hasNoShowtime, showtimeMovie, isPending } =
    useShowtimeList();

  const contentMaxWidthClass = hasNoShowtime ? "max-w-6xl" : "max-w-[90%]";
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 py-10">
      <div
        className={`mx-auto mt-2 flex gap-4 space-y-2 ${contentMaxWidthClass}`}
      >
        <MovieSelectionCard
          movie={showtimeMovie ?? {}}
          hasNoShowtime={hasNoShowtime}
        />
        <ShowtimeSection
          showtimeInfor={showtimeInfor}
          isPending={isPending}
          hasNoShowtime={hasNoShowtime}
        />
      </div>
    </div>
  );
}
