import { Route } from "react-router-dom";
import MoviesLayout from "@features/admin/movies-management/layouts/MoviesLayout";
import EditMovieRoute from "./EditMovieRoute";
import { AddMovie } from "@features/admin/movies-management/add/pages";
import { MovieList } from "@features/admin/movies-management/list/pages";
import { ShowtimeCreation } from "@features/admin/movies-management/showtimes-creation/pages";
import { ShowtimeList } from "@features/admin/movies-management/showtime-list/pages";

export const movieRoutes = (
  <Route path="movies" element={<MoviesLayout />}>
    <Route index element={<MovieList />} />
    <Route path="edit/:id" element={<EditMovieRoute />} />
    <Route path="add" element={<AddMovie />} />
    <Route path="showtimes/:id" element={<ShowtimeList />} />
    <Route path="showtimes/:id/add" element={<ShowtimeCreation />} />
  </Route>
);
