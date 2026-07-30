import { Outlet } from "react-router-dom";

import { MovieListProvider } from "@features/admin/movies/list";
const MoviesLayout = () => {
  return (
    <MovieListProvider>
      <Outlet />
    </MovieListProvider>
  );
};

export default MoviesLayout;
