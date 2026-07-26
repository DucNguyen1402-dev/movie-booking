import { useLocation, useNavigate } from "react-router-dom";

import { AddButton } from "@components/admin/ui/buttons";

const AddMovieBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onAddMovieClick = () =>
    navigate("/admin/movies/add", {
      state: {
        history: [...(location.state?.history ?? []), location.pathname],
      },
    });

  return (
    <AddButton onClick={onAddMovieClick} size="lg" surface="dark">
      Thêm phim mới
    </AddButton>
  );
};

export default AddMovieBtn;
