import { EditProvider } from "@features/admin/movies-management/edit/contexts/EditContext";
import { EditMovie } from "@features/admin/movies-management/edit/pages";

const EditMovieRoute = () => {
  return (
    <EditProvider>
      <EditMovie />
    </EditProvider>
  );
};

export default EditMovieRoute;
