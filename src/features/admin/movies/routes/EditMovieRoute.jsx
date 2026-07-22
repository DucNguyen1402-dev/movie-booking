import { EditMovieProvider, EditMovie } from "@features/admin/movies/edit";

const EditMovieRoute = () => {
  return (
    <EditMovieProvider>
      <EditMovie />
    </EditMovieProvider>
  );
};

export default EditMovieRoute;
