import { EditProvider } from "@features/admin/movies-management/edit/contexts/EditContext";

import { EditMovie } from "@pages/admin/Movies";

const EditMovieRoute = () => {
  return (
    <EditProvider>
      <EditMovie />
    </EditProvider>
  );
};

export default EditMovieRoute;
