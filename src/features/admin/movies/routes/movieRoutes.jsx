import { Route } from "react-router-dom";

import { AddMovie } from "@features/admin/movies/add";
import {MoviesLayout} from "@features/admin/movies/layouts";
import { ShowtimeCreation , ShowtimeList} from "@features/admin/movies/showtimes";

import EditMovieRoute from "./EditMovieRoute";
import MovieListRoute from "./MovieListRoute"
export const movieRoutes = (
  <Route path="movies" element={<MoviesLayout />}>
    <Route index element={<MovieListRoute />} />
    <Route path="edit/:id" element={<EditMovieRoute />} />
    <Route path="add" element={<AddMovie />} />
    <Route path="showtimes/:id" element={<ShowtimeList />} />
    <Route path="showtimes/:id/add" element={<ShowtimeCreation />} />
  </Route>
);
