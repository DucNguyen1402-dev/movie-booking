import { EditProvider } from "@features/admin/movies/edit/contexts/EditContext";
import { EditMovie } from "@features/admin/movies/edit/pages";

const EditMovieRoute = () => {
  return (
    <EditProvider>
      <EditMovie />
    </EditProvider>
  );
};

export default EditMovieRoute;
