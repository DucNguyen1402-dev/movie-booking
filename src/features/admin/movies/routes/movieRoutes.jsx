import { Route } from "react-router-dom";
import {MoviesLayout} from "@features/admin/movies/layouts";
import EditMovieRoute from "./EditMovieRoute";
import ListMovieRoute from "./ListMovieRoute"
import { AddMovie } from "@features/admin/movies/add";
import { ShowtimeCreation , ShowtimeList} from "@features/admin/movies/showtimes";
export const movieRoutes = (
  <Route path="movies" element={<MoviesLayout />}>
    <Route index element={<ListMovieRoute />} />
    <Route path="edit/:id" element={<EditMovieRoute />} />
    <Route path="add" element={<AddMovie />} />
    <Route path="showtimes/:id" element={<ShowtimeList />} />
    <Route path="showtimes/:id/add" element={<ShowtimeCreation />} />
  </Route>
);
