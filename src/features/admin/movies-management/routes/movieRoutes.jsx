import {Route} from "react-router-dom"
import MoviesLayout from "@features/admin/movies-management/layouts/MoviesLayout"
import EditMovieRoute from "./EditMovieRoute";
import {
  MovieManagement,
  AddMovie,
  ShowtimeManagement,
  ShowtimeCreation,
} from "@features/admin/movies-management/pages";

export const movieRoutes = (
  <Route path="movies" element={<MoviesLayout />}>
    <Route index element={<MovieManagement />} />
    <Route path="edit/:id" element={<EditMovieRoute />} />
    <Route path="add" element={<AddMovie />} />
    <Route path="showtimes/:id" element={<ShowtimeManagement />} />
    <Route path="showtimes/:id/add" element={<ShowtimeCreation />} />
  </Route>
);
