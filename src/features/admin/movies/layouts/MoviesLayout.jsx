import {MovieProvider} from "@features/admin/movies/list/contexts/MovieContext"
import {Outlet} from "react-router-dom"

export default function MoviesLayout() {
  return (
    <MovieProvider>
      <Outlet />
    </MovieProvider>
  );
}