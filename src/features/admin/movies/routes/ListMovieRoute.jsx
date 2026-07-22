import { MovieListProvider, MovieList } from "@features/admin/movies/list";

export default function ListMovieRoute() {
  return (
    <MovieListProvider>
      <MovieList />
    </MovieListProvider>
  );
}
