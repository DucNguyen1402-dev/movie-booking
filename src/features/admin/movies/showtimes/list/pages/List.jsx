import {useShowtimeList} from "../hooks/useShowtimeList"
import {
  MovieSelectionCard,
  ShowtimeCard,
} from "@features/admin/movies/showtimes/list/components";

export default function ShowtimeList() {
 
  const { showtimeInfor,
    hasNoShowtime,
    showtimeMovie, isPending} = useShowtimeList();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 py-10">
      <div className="mx-auto mt-2 flex max-w-[90%] gap-4 space-y-2">
        <MovieSelectionCard movie={showtimeMovie ?? {}} hasNoShowtime={hasNoShowtime} />
        <ShowtimeCard
          showtimeInfor={showtimeInfor}
          isPending={isPending}
          hasNoShowtime={hasNoShowtime}
        />
      </div>
    </div>
  );
}
