import { MovieList,MovieListProvider } from "@features/admin/movies/list";

export default function MovieListRoute() {
  return (
    <MovieListProvider>
      <MovieList />
    </MovieListProvider>
  );
}
