import { MovieList, MovieListProvider } from "@features/admin/movies/list";

const MovieListRoute = () => {
  return (
    <MovieListProvider>
      <MovieList />
    </MovieListProvider>
  );
};

export default MovieListRoute;
